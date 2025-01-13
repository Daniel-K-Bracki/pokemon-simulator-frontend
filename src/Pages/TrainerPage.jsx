import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants.js';
import PkmnCard from '../assets/PkmnCard.jsx';
import pokeball_loader from '../assets/pokeball_loader.png';
import '../Styles/Loading.css';
import '../Styles/TrainerPage.css';

const TrainerSelectPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [pokemonList, setPokemonList] = useState([]); 
    const [trainerPokemon, setTrainerPokemon] = useState([]); 
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [loading, setLoading] = useState(true);
    const [newTrainerName, setNewTrainerName] = useState("");

    const fetchTrainers = async () => {
        try {

            setLoading(true);

            const response = await fetch(`${API_ENDPOINT}/trainers`); 
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            const dt = await response.json();
            const data = dt.data
            console.log(data)
            setTrainers(data); 

        } catch (error) {
            console.error('Failed to fetch trainers:', error);
        } finally {
            setLoading(false); 
        }
    };

    const fetchAllPokemons = async () => {

        try {

            setLoading(true);
            const response = await fetch(`${API_ENDPOINT}/pokemons`);
            if (!response.ok) {

                throw new Error(`Network response was not ok (${response.status})`);

            }
            const dt = await response.json();
            const data = dt.data
            setPokemonList(data.map(pokemon => pokemon.name))

        } catch (error) {

            console.error('Failed to fetch Pokémon:', error);

        } finally {

            setLoading(false); 

        }
    };


    const fetchTarinersTeam = async (trainerName) => {

        try {

            setLoading(true);
            const response = await fetch(`${API_ENDPOINT}/trainer_pokemons/${trainerName}`);
            if (!response.ok) {

                throw new Error(`Network response was not ok (${response.status})`);

            }
            const dt = await response.json();
            const data = dt.data
            console.log(data)
            setTrainerPokemon(data)

        } catch (error) {

            console.error('Failed to fetch Pokémon:', error);

        } finally {

            setLoading(false); 

        }

    }

    useEffect(() => {

        fetchTrainers();
        fetchAllPokemons();
        
    }, []);


    const handleTrainerSelection = (trainerName) => {

        setSelectedTrainer(trainerName); 
        setSelectedPokemon('');      
        fetchTarinersTeam(trainerName)

    };


    const handleDeletePokemon = async (pokemonName) => {

        if (!selectedTrainer) return;
 
        try {
            setLoading(true);
            console.log(`${API_ENDPOINT}/trainer_pokemons/${selectedTrainer}/${pokemonName}`)
            const response = await fetch(`${API_ENDPOINT}/trainer_pokemons/${selectedTrainer}/${pokemonName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete Pokémon');
            }

            fetchTarinersTeam(selectedTrainer)
            console.log(`${pokemonName} has been removed from ${selectedTrainer.name}'s team.`);
        } catch (error) {
            console.error('Error during delete operation:', error);
        } finally {
            setLoading(false); 
        }

    };

    const handleAddTrainer = async () => {

        if (!newTrainerName.trim()) {
            alert('Trainer name cannot be empty!');
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINT}/trainer_pokemons/${newTrainerName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add new trainer');
            }

            alert('Trainer added successfully!'); 
            setNewTrainerName(''); 
        }  catch (error) {
            console.error('Error adding trainer:', error);
            alert('Error adding trainer: ' + error.message);
        }

        fetchTrainers();

    };

    const handleAddPokemon = async () => {
        if (!selectedTrainer || !selectedPokemon) return;
        

        if (trainerPokemon.length < 6) {
            const selectedPkmnData = pokemonList.find(pkmn => pkmn === selectedPokemon);
            if (!selectedPkmnData) {
                alert('Pokémon not found in the database!');
                return;
            }
            
        
                try {
                    setLoading(true);

                    const response = await fetch(`${API_ENDPOINT}/trainer_pokemons/${selectedTrainer}/${selectedPokemon}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to add Pokémon');
                    }
                    console.log(`${selectedPokemon} has been added to ${selectedTrainer}'s team.`);
                    setSelectedPokemon(''); 
                    setSelectedTrainer(selectedTrainer); 

                } catch (error) {
                    console.error('Error during add operation:', error);
                } finally {
                    setLoading(false); 
                }
                fetchTarinersTeam(selectedTrainer);
                fetchTrainers();

        } else {
            alert(`${selectedTrainer} already has 6 Pokémon!`);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <img src={pokeball_loader} alt="Loading..." className="loading-image" />
                <p>Loading Trainers and Pokémon...</p>
            </div>
        );
    }

    return (
        <div className="trainer-select-page">
            <div className="add-trainer-container">
                <h2>Add New Trainer:</h2>
                <input
                    type="text"
                    placeholder="Trainer Name"
                    value={newTrainerName}
                    onChange={e => setNewTrainerName(e.target.value)}
                    required
                />
                <button onClick={handleAddTrainer}>Add Trainer</button> 
            </div>
    
            <h2>Select a Trainer</h2>
    
            <select onChange={e => { console.log(e.target.value)
                handleTrainerSelection(e.target.value)}} value={selectedTrainer || ''}>
                <option value="">-- Select a Trainer --</option>
                {trainers.map(trainer => (
                    <option key={trainer.name} value={trainer.name}>{trainer.name}</option>
                ))}
            </select>
    
            {selectedTrainer && (
                <div className="trainer-info">
                    <h2>{selectedTrainer}'s Team:</h2>
                    <div className="pokemon-list">
                        {trainerPokemon && trainerPokemon.map((pokemon, index) => (
                            <div key={index}>
                                <PkmnCard pokemon={pokemon} />
                                <button 
                                    onClick={() => handleDeletePokemon(pokemon.name)} 
                                    className="styled-button"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    {!selectedTrainer.pokemon && trainerPokemon.length < 6 && (
                        <div className="add-pokemon-container">
                            <label htmlFor="pokemon-select">Add Pokémon:</label>
                            <select 
                                id="pokemon-select" 
                                value={selectedPokemon} 
                                onChange={e => setSelectedPokemon(e.target.value)} 
                            >
                                <option value="">-- Select Pokémon --</option>
                                {pokemonList.map(pokemon => (
                                    <option key={pokemon} value={pokemon}>{pokemon}</option>
                                ))}
                            </select>
                            <button onClick={handleAddPokemon}>Add Pokémon</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrainerSelectPage;