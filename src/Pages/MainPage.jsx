import React, { useEffect, useState } from 'react';
import PkmnCard from '../assets/PkmnCard';
import { API_ENDPOINT } from '../constants.js';
import pokeball_loader from '../assets/pokeball_loader.png';
import '../Styles/Loading.css';
import '../Styles/Button.css'; 
import '../Styles/PkmnCard.css';
import '../Styles/MainTheme.css'

const MainPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');
    const [allTypes, setAllTypes] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleSelectPokemon = async (pokemon) => {

        if (selected.some(selectedPkmn => selectedPkmn.name === pokemon.name)) {
            alert('Pokemon already on selected list!');
            return;
        }
        if (selected.length === 3){
            alert('You can only select up to 3 Pokémon!');
            return;
        }
            setSelected([...selected, pokemon]); 
    };

    const handleRemovePokemon = async (pokemon) => {

            const updatedSelected = selected.filter(selectedPkmn => selectedPkmn.name !== pokemon.name);
            setSelected(updatedSelected); 
    };

    useEffect(() => {
        const fetchPokemonsAndTypes = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/pokemons`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }

                const dt = await response.json();
                const data = dt.data
                
                console.log('Fetched data:', data);
                setPokemons(Object.values(data));  
                
                const types = [...new Set(data.map(pokemon => pokemon.primary_type).filter(type => type))];
                setAllTypes(types);  
            } catch (error) {
                console.error('Failed to fetch Pokémon:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonsAndTypes();
    }, []);


    const filteredPokemons = selectedType 
        ? pokemons.filter(pokemon => 
            pokemon.primary_type === selectedType || 
            pokemon.secondary_type === selectedType 
          ) 
        : pokemons;

    if (loading) {
        return (
            <div className="loading-container">
                <img src={pokeball_loader} alt="Loading..." className="loading-image" />
                <p>Loading Pokémon...</p>
            </div>
        );
    }

    return (
        <div className="main-page">
            <h2>Explore, Discover, and Catch Them All!</h2>

            <label htmlFor="type-filter" className="type-label">Filter by Type:</label>
            <select 
                id="type-filter" 
                value={selectedType} 
                onChange={e => setSelectedType(e.target.value)}
                className="type-filter"
            >
                <option value="">All Types</option>
                {allTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <div style={{ display: 'flex' }}> 
                <div className="pokemon-list" style={{ flex: 1, marginRight: '320px' }}>
                    {filteredPokemons.length > 0 ? (
                        filteredPokemons.map((pokemon, index) => (
                            <div key={index} onClick={() => handleSelectPokemon(pokemon)}>
                                <PkmnCard 
                                    pokemon={pokemon} 
                                />
                            </div>
                        ))
                    ) : (
                        <p>No Pokémon available</p>
                    )}
                </div>

                <div className="selected-pokemon-fixed" style={{ marginLeft: '20px' }}> 
                    <h3>Selected Pokémon:</h3>
                    <div >
                        {selected.length > 0 ? (
                            selected.map((pokemon, index) => (
                                <div key={index} onClick={() => handleRemovePokemon(pokemon)}>
                                <PkmnCard 
                                    pokemon={pokemon} 
                                />
                            </div>
                            ))
                        ) : (
                            <p>No selected Pokémon</p>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MainPage;