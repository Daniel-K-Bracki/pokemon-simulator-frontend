import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants.js';
import pokeball_loader from '../assets/pokeball_loader.png';
import '../Styles/Loading.css';
import '../Styles/ChoseFightingPkmn.css';
import PkmnCard from '../assets/PkmnCard.jsx';

const SimulateFightPage = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);
    const [fightLog, setFightLog] = useState([]);
    const [winner, setWinner] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPokemons = async () => {
            try {

                setLoading(true)

                const response = await fetch(`${API_ENDPOINT}/pokemons`);


                const dt = await response.json();
                const data = dt.data

                setPokemonList(data); 
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            }finally {
                setLoading(false)
            }
        };

        fetchPokemons();
    }, []);

    

    const loadFight = async () => {
    
        try {

            setLoading(true)

            const response = await fetch(`${API_ENDPOINT}/simulate_fight/${pokemon1}/${pokemon2}`, { 
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch fight log');
            }
    
            const res = await response.json();
            const result = res.data

            console.log('Fetched data:', result);
            setFightLog(result.log); 
            setWinner(result.log.at(-1).event_data.pokemon)
            
    
        } catch (error) {
            console.error('Error fetching fight log:', error);
            alert('Error fetching fight log: ' + error.message);
        }finally {
            setLoading(false)
        }
    };


    if (loading) {
        return (
            <div className="loading-container">
                <img src={pokeball_loader} alt="Loading..." className="loading-image" />
                <p>Loading...</p>
            </div>
        );
    }

    const selectedPokemon1 = pokemonList.find(pokemon => pokemon.name === pokemon1);
    const selectedPokemon2 = pokemonList.find(pokemon => pokemon.name === pokemon2);

    return (
        <div className="simulate-fight-page">
            

            <div className="columns-container-grid">
                <div className="column">
                    {selectedPokemon1 && <PkmnCard pokemon={selectedPokemon1} />}
                </div>

                <div className="column">
                    <h2>Simulate Fight</h2>
                    <div className="pokemon-selection">
                        <label>Select Pokémon 1:</label>
                        <input
                            type="text"
                            list="pokemon-list"
                            value={pokemon1}
                            onChange={e => setPokemon1(e.target.value)} 
                            placeholder="Start typing Pokémon name..."
                        />
                        <datalist id="pokemon-list">
                            {pokemonList.map(pokemon => (
                                <option key={pokemon.name} value={pokemon.name} />
                            ))}
                        </datalist>
                    </div>

                    <div className="pokemon-selection">
                        <label>Select Pokémon 2:</label>
                        <input
                            type="text"
                            list="pokemon-list-2"
                            value={pokemon2}
                            onChange={e => setPokemon2(e.target.value)} 
                            placeholder="Start typing Pokémon name..."
                        />
                        <datalist id="pokemon-list-2">
                            {pokemonList.map(pokemon => (
                                <option key={pokemon.name} value={pokemon.name} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="column">
                    {selectedPokemon2 && <PkmnCard pokemon={selectedPokemon2} />}
                </div>
            </div>

            <button className="styled-button" onClick={loadFight}>Start Fight</button>

            {winner && <h3 className="winner-text">Winner: {winner}</h3>}
            <h3>Fight Log:</h3>
            <div className="fight-log">
                {fightLog.map((logItem, index) => (
                    <p key={index} className="log-entry">
                        {logItem.event_name === "Hit" ? 
                            logItem.event_data.effectiveness ==="Normal"?
                                `${logItem.event_data.attacker} attacked ${logItem.event_data.defender} for ${logItem.event_data.damage} - Remaining HP: ${logItem.event_data.hp_left}`
                                : logItem.event_data.effectiveness === "SuperEffective" ?
                                    `${logItem.event_data.attacker} attacked ${logItem.event_data.defender} for ${logItem.event_data.damage}. It's super effective - Remaining HP: ${logItem.event_data.hp_left}`
                                    : `${logItem.event_data.attacker} attacked ${logItem.event_data.defender} for ${logItem.event_data.damage}. it's not very effective - Remaining HP: ${logItem.event_data.hp_left}`
                        : logItem.event_name === "Fainted" ? 
                            `${logItem.event_data.pokemon} FAINTED!` 
                            : `${logItem.event_data.pokemon} is the WINNER with ${logItem.event_data.hp_left} health left!`}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SimulateFightPage;