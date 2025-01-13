import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants.js';
import pokeball_loader from '../assets/pokeball_loader.png';
import '../Styles/Loading.css';
import '../Styles/AddPkmn.css'



const AddPokemonPage = () => {

    const [pokemon, setPokemon] = useState({
        name: '',
        primary_type: '',
        secondary_type: '',
        stats: {
            hp: 1,
            atk: 1,
            def: 1,
            agi: 1,
        },
    });

    const pokemonTypes = [ "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]
    //const [pokemonTypes, setPokemonTypes] = useState([]); 


    const [loadingTypes, setLoadingTypes] = useState(false); 
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPokemon((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setPokemon((prev) => ({
            ...prev,
            stats: {
                ...prev.stats,
                [name]: Number(value),
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pokemon.primary_type === pokemon.secondary_type){
            alert('Please select only primary typing, or two diferen ttypings!')
            return;
        }

        if (pokemon.name.length>30){
            alert('Please select a shorter name, whole Bee Movie script is not an acceptable name!')
            return;
        }

        try {

            setLoading(true)

            console.log(pokemon)

            const response = await fetch(`${API_ENDPOINT}/pokemons`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pokemon), 
            });

            if (!response.ok) {
                throw new Error('Failed to add Pokémon');
            }

            alert('Pokémon added successfully!');
           
            setPokemon({
                name: '',
                primary_type: '',
                secondary_type: '',
                stats: {
                    hp: 1, 
                    atk: 1,
                    def: 1,
                    agi: 1,
                },
            });
        } catch (error) {
            console.error(error);
            alert('Error adding Pokémon: ' + error.message);
        }finally {
            setLoading(false); 
        }
    };


/*
    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                setLoadingTypes(true)

                const response = await fetch(`${API_ENDPOINT}/types`); 
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }

                const data = await response.json();
                //const dt = await response.json();
                //const data = dt.data

                setPokemonTypes(data); 
                
            } catch (error) {
                console.error('Failed to fetch Pokémon types:', error);
            } finally {
                setLoadingTypes(false); 
            }
        };

        fetchPokemonTypes();
    }, []);

    */

    if (loading) {
        return (
            <div className="loading-container">
                <img src={pokeball_loader} alt="Loading..." className="loading-image" />
                <p>Loading Pokémon...</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Add Pokémon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={pokemon.name}
                    onChange={handleChange}
                    required
                />


                <label>Primary Type:</label>
                <select name="primary_type" value={pokemon.primary_type} onChange={handleChange} required>
                    <option value="">Select a type...</option>
                    {loadingTypes ? (
                        <option>Loading types...</option> 
                    ) : (
                        pokemonTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))
                    )}
                </select>

                <label>Secondary Type (optional):</label>
                <select name="secondary_type" value={pokemon.secondary_type} onChange={handleChange}>
                    <option value="">Select a type...</option>
                    {loadingTypes ? (
                        <option>Loading types...</option> 
                    ) : (
                        pokemonTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))
                    )}
                </select>

                <h3>Stats</h3>


                <div className="stat-row">
                    <div className="stat-column">
                        <label>HP:</label>
                    </div>
                    <div className="stat-column">
                        <input
                            type="number"
                            name="hp"
                            min="1"
                            max="250"
                            value={pokemon.stats.hp}
                            onChange={handleStatChange}
                            className="fixed-width-input" 
                        />
                    </div>
                    <div className="stat-column">
                        <input
                            type="range"
                            name="hp"
                            min="1"
                            max="250"
                            value={pokemon.stats.hp}
                            onChange={handleStatChange}
                            className="stat-range" 
                        />
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-column">
                        <label>Attack:</label>
                    </div>
                    <div className="stat-column">
                        <input
                            type="number"
                            name="atk"
                            min="1"
                            max="250"
                            value={pokemon.stats.atk}
                            onChange={handleStatChange}
                            className="fixed-width-input"
                        />
                    </div>
                    <div className="stat-column">
                        <input
                            type="range"
                            name="atk"
                            min="1"
                            max="250"
                            value={pokemon.stats.atk}
                            onChange={handleStatChange}
                            className="stat-range"
                        />
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-column">
                        <label>Defense:</label>
                    </div>
                    <div className="stat-column">
                        <input
                            type="number"
                            name="def"
                            min="1"
                            max="250"
                            value={pokemon.stats.def}
                            onChange={handleStatChange}
                            className="fixed-width-input"
                        />
                    </div>
                    <div className="stat-column">
                        <input
                            type="range"
                            name="def"
                            min="1"
                            max="250"
                            value={pokemon.stats.def}
                            onChange={handleStatChange}
                            className="stat-range"
                        />
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-column">
                        <label>Agility:</label>
                    </div>
                    <div className="stat-column">
                        <input
                            type="number"
                            name="agi"
                            min="1"
                            max="250"
                            value={pokemon.stats.agi}
                            onChange={handleStatChange}
                            className="fixed-width-input"
                        />
                    </div>
                    <div className="stat-column">
                        <input
                            type="range"
                            name="agi"
                            min="1"
                            max="250"
                            value={pokemon.stats.agi}
                            onChange={handleStatChange}
                            className="stat-range"
                        />
                    </div>
                </div>

                <button type="submit" className="styled-button">Add Pokémon</button>
            </form>
        </div>
    );
};

export default AddPokemonPage;