import React from 'react';

const PokemonCard = ({ pokemon }) => {
    const { name, primary_type, secondary_type, stats } = pokemon;

    const getTypeColor = (type) => {
        const colors = {
            Normal: { color: '#A8A77A', textColor: '#000' },
            Fire: { color: '#EE8130', textColor: '#fff' },
            Water: { color: '#6390F0', textColor: '#fff' },
            Grass: { color: '#7AC74C', textColor: '#fff' },
            Electric: { color: '#F7D02C', textColor: '#000' },
            Ice: { color: '#96D9D6', textColor: '#000' },
            Fighting: { color: '#C22E28', textColor: '#fff' },
            Poison: { color: '#A33EA1', textColor: '#fff' },
            Ground: { color: '#E2BF65', textColor: '#000' },
            Flying: { color: '#A98FF3', textColor: '#000' },
            Psychic: { color: '#F95587', textColor: '#fff' },
            Bug: { color: '#A6B91A', textColor: '#000' },
            Rock: { color: '#B6A136', textColor: '#fff' },
            Ghost: { color: '#735797', textColor: '#fff' },
            Dragon: { color: '#6F35FC', textColor: '#fff' },
            Dark: { color: '#705746', textColor: '#fff' },
            Steel: { color: '#B7B7CE', textColor: '#000' },
            Fairy: { color: '#D685E4', textColor: '#000' },
            Fighting: { color: '#C22E28', textColor: '#fff' },
            Flying: { color: '#A98FF3', textColor: '#000' },
            Bug: { color: '#A6B91A', textColor: '#000' },
            Rock: { color: '#B6A136', textColor: '#fff' },
            Ghost: { color: '#735797', textColor: '#fff' },
            Dragon: { color: '#6F35FC', textColor: '#fff' },
            Dark: { color: '#705746', textColor: '#fff' },
        };
    
        return colors[type] || { color: '#ccc', textColor: '#000' }; 
    };

    const getStatBarWidth = (statValue) => {
        return (statValue / 300) *100 ;
    };

    return (
        <div className="pokemon-card">
            <h2>{name}</h2>

            <div className="types-container">
                <div className="type" style={{ backgroundColor: getTypeColor(primary_type).color, textColor: getTypeColor(primary_type).textColor }}>
                    {primary_type}
                </div>
                {secondary_type && (
                    <div className="type" style={{ backgroundColor: getTypeColor(secondary_type).color, textColor: getTypeColor(primary_type).textColor }}>
                        {secondary_type}
                    </div>
                )}
            </div>
            
            <div className="stats-container">
                <div className="stat-number">HP: {stats.hp}</div>
                <div className="stat-bar hp-bar" style={{width: `${getStatBarWidth(stats.hp)}%`}}></div>
            </div>
            <div className="stats-container">
                <div className="stat-number">Attack: {stats.atk}</div>
                <div className="stat-bar atk-bar" style={{ width: `${getStatBarWidth(stats.atk)}%` }}></div>
            </div>
            <div className="stats-container">
                <div className="stat-number">Defense: {stats.def}</div>
                <div className="stat-bar def-bar" style={{ width: `${getStatBarWidth(stats.def)}%` }}></div>
            </div>
            <div className="stats-container">
                <div className="stat-number">Agility: {stats.agi}</div>
                <div className="stat-bar agi-bar" style={{ width: `${getStatBarWidth(stats.agi)}%` }}></div>
            </div>
        </div>
    );
};

export default PokemonCard;