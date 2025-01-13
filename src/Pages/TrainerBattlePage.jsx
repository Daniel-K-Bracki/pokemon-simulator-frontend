import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants.js'; 
import pokeball_loader from '../assets/pokeball_loader.png';
import '../Styles/Loading.css';
import '../Styles/ChoseFightingPkmn.css';


const TrainerBattlePage = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer1, setSelectedTrainer1] = useState('');
    const [selectedTrainer2, setSelectedTrainer2] = useState('');
    const [strategy1, setStrategy1] = useState('');
    const [strategy2, setStrategy2] = useState('');
    const [fightLog, setFightLog] = useState([]);
    const [winner, setWinner] = useState('');
    const [remaining, setRemaining] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchTrainers = async () => {
                try {
        
                    setLoading(true);
        
                    const response = await fetch(`${API_ENDPOINT}/trainers`); 
                    if (!response.ok) {
                        throw new Error(`Network response was not ok (${response.status})`);
                    }
                    const dt = await response.json();
                    const data = dt.data
                    const trainersWithPokemon = data.filter(trainer => trainer.team && trainer.team.length > 0);

                    setTrainers(trainersWithPokemon); 
        
                } catch (error) {
                    console.error('Failed to fetch trainers:', error);
                } finally {
                    setLoading(false); 
                }
            };

            fetchTrainers();
    }, []);


    const loadFight = async () => {

        if(!selectedTrainer1 || !selectedTrainer2 || !strategy1 || !strategy2){
            alert('You must first chose both trainers and their strategies');
            return;
        }
    
        try {
            setLoading(true)

            const response = await fetch(`${API_ENDPOINT}/simulate_trainer_fight/${selectedTrainer1}/${strategy1}/${selectedTrainer2}/${strategy2}`, { 
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
            console.log(res)
            setFightLog(result.log); 
            setWinner(result.log.at(-1).event_data.trainer) 
            setRemaining(result.log.at(-1).event_data.pokemon_left.join(', '))
    
        } catch (error) {
            console.error('Error fetching fight log:', error);
            alert('Error fetching fight log: ' + error.message);
        } finally {
            setLoading(false)
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <img src={pokeball_loader} alt="Loading..." className="loading-image" />
                <p>Loading Battle Results...</p>
            </div>
        );
    }

    return (
        <div className="trainer-battle-page">
            <h2>Trainer Battle</h2>

            <div className="columns-container">

            <div className="trainer-column">
                    <div className="trainer-selection">
                        <label>Select Trainer 1:</label>
                    </div>
                    <div className="trainer-selection">
                        <select onChange={e => setSelectedTrainer1(e.target.value)}>
                            <option value="">-- Select Trainer 1 --</option>
                            {trainers.map(trainer => (
                                <option key={trainer.name} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="trainer-selection">
                        <label>Select Strategy 1:</label>
                    </div>
                    <div className="trainer-selection">
                        <select onChange={e => setStrategy1(e.target.value)}>
                            <option value="">-- Select Strategy 1 --</option>
                            <option value="StrongestAtk">Prioritize Attack</option>
                            <option value="StrongestDef">Prioritize Defense</option>
                            <option value="StrongestSum">Prioritize Stats Sum</option>
                            <option value="StrongestType">Prioritize Typing</option>
                            <option value="Random">Random</option>
                        </select>
                    </div>
                </div>
                

                <div className="column middle-column">
                    <button className="styled-button" onClick={loadFight}>Fight!</button>
                </div>


                <div className="trainer-column">
                    <div className="trainer-selection">
                        <label>Select Trainer 2:</label>
                    </div>
                    <div className="trainer-selection">
                        <select onChange={e => setSelectedTrainer2(e.target.value)}>
                            <option value="">-- Select Trainer 2 --</option>
                            {trainers.map(trainer => (
                                <option key={trainer.name} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="trainer-selection">
                        <label>Select Strategy 2:</label>
                    </div>
                    <div className="trainer-selection">
                        <select onChange={e => setStrategy2(e.target.value)}>
                            <option value="">-- Select Strategy 2 --</option>
                            <option value="StrongestAtk">Prioritize Attack</option>
                            <option value="StrongestDef">Prioritize Defense</option>
                            <option value="StrongestSum">Prioritize Stats Sum</option>
                            <option value="StrongestType">Prioritize Typing</option>
                            <option value="Random">Random</option>
                        </select>
                    </div>
                </div>
            </div>

            {winner && <h3 className="winner-text">Winner: {winner}</h3>}
            {remaining && <h3 className="winner-text">Remaining Pokemon: {remaining}</h3>}
            <h3>Fight Log:</h3>


            <div className="fight-log">
            {fightLog.map((logItem, index) => (
                <div key={index} className="log-entry">
                    {logItem.event_name === "ChoosePokemon" ? (
                        <p className="choose-pokemon-entry">
                            <strong>{logItem.event_data.trainer}</strong> chose their next Pokémon. <em>Go {logItem.event_data.pokemon}!</em>
                        </p>
                    ) : logItem.event_name === "Hit" ? (
                        <p className='hit-entry'>
                            <strong>{logItem.event_data.attacker}</strong> attacked <strong>{logItem.event_data.defender}</strong> for <strong>{logItem.event_data.damage}</strong>! 
                            {logItem.event_data.effectiveness === "SuperEffective" && (
                                <span className={`hit-entry ${logItem.event_data.effectiveness.toLowerCase()}`}> It's super effective!</span>
                            )}
                            {logItem.event_data.effectiveness === "NotVeryEffective" && (
                                <span className={`hit-entry ${logItem.event_data.effectiveness.toLowerCase()}`}> It's not very effective.</span>
                            )}
                            <span> Remaining HP: {logItem.event_data.hp_left}</span>
                        </p>
                    ) : logItem.event_name === "Fainted" ? (
                        <p className="faint-entry">
                            <strong>{logItem.event_data.pokemon}</strong> FAINTED!
                        </p>
                    ) : logItem.event_name === "PokemonWinner" ?(
                        <p className="winner-entry">
                            <strong>{logItem.event_data.pokemon}</strong> is the WINNER with <strong>{logItem.event_data.hp_left}</strong> health left!
                        </p>
                    ) : (
                        <p className="winner-entry">
                            <strong>{logItem.event_data.trainer}</strong> is the WINNER with remaining pokemon still standing: <strong>{logItem.event_data.pokemon_left}</strong>
                        </p>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default TrainerBattlePage;