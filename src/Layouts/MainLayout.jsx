import React from 'react';
import { Link } from 'react-router-dom'; 
import { Outlet } from 'react-router-dom'; 
import '../Styles/MainLayout.css'; 

const MainLayout = () => {
    return (
        <div className="main-layout">
            <header className="header">
                <h1>Welcome to the NOT Pokémon World!</h1>
                <div className="button-container">
                <Link to="/" className="styled-button">Home</Link>
                <Link to="/add-pokemon" className="styled-button">Add Pokémon</Link>
                <Link to="/simulate-fight" className="styled-button">Simulate Fight</Link>
                <Link to="/trainers" className="styled-button">Trainers</Link>
                <Link to="/trainer-battles" className="styled-button">Trainer Battles</Link>
            </div>
            </header>
            <main>
                <Outlet /> 
            </main>
            <footer className="footer">
                <p>&copy; Definitely not Pokemon, nothing to see here!!!
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;