# Pokémon Simulator Documentation

# Pages Overview
1. Main Page (MainPage.js)
The main page allows users to browse and select Pokémon. Users can filter Pokémon by type and view selected Pokémon.

# Key Functions:
- Fetch a list of Pokémon from the API.
Allow users to filter Pokémon by type.
- Manage user-selected Pokémon.


2. Add Pokémon Page (AddPokemonPage.js)
- Users can add new Pokémon to the system by providing necessary details such as name, type, and stats.

# Key Functions:
- Validate Pokémon input data.
- Submit new Pokémon data to the API.
- Reset form fields upon successful submission.


3. Simulate Fight Page (SimulateFightPage.js)
This page enables users to select two Pokémon and simulate a battle between them, displaying the fight log and the winner.

# Key Functions:
- Fetch a list of Pokémon.
- Allow users to select Pokémon for the fight.
- Fetch and display the fight log and winning Pokémon.


4. Trainer Battle Page (TrainerBattlePage.js)
A page that allows users to select two trainers and strategies for a battle between them, displaying the fight results.

# Key Functions:
- Fetch trainers with available Pokémon.
- Allow selection of trainers and strategies.
- Display fight log and result with winning trainer.


#API Endpoints
- GET /trainers: Fetch a list of trainers with Pokémon.
- POST /pokemons: Add a new Pokémon to the database.
- GET /simulate_fight/{trainer1}/{trainer2}: Simulate a fight between two trainers.
- GET /simulate_trainer_fight/{trainer1}/{strategy1}/{trainer2}/{strategy2}: Simulate a trainer fight with selected strategies.

# Usage
Navigate through different pages to select trainers, Pokémon, and strategies.
Observe the fight logs to view the sequence of actions during battles.