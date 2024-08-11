import { Pokemon } from './pokemon.js';

let playerTeam = [];

// Fonction pour afficher les Pokémon disponibles
async function displayAvailablePokemons() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';

    const availablePokemons = await fetchAvailablePokemons(); // Récupération des Pokémon via l'API

    availablePokemons.forEach((pokemon, index) => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon-item';
        pokemonDiv.innerHTML = `
            <div>
                <p><strong>Nom:</strong> ${pokemon.name}</p>
                <p><strong>Type:</strong> ${pokemon.type}</p>
                <p><strong>HP:</strong> ${pokemon.hp}</p>
                <p><strong>Attaque:</strong> ${pokemon.attack}</p>
            </div>
            <button onclick="addPokemonToTeam(${index})">Ajouter à l'équipe</button>
        `;
        pokemonList.appendChild(pokemonDiv);
    });

    // Stocker les Pokémon disponibles dans une variable globale pour une utilisation ultérieure
    window.availablePokemons = availablePokemons;
}

// Fonction pour ajouter un Pokémon à l'équipe
function addPokemonToTeam(index) {
    if (playerTeam.length < 3) {
        const selectedPokemon = window.availablePokemons[index];
        if (!playerTeam.some(p => p.name === selectedPokemon.name)) { // Vérifie si le Pokémon est déjà dans l'équipe
            playerTeam.push(selectedPokemon);
            displayPlayerTeam();
        } else {
            alert(`${selectedPokemon.name} est déjà dans votre équipe.`);
        }
    } else {
        alert('Vous avez déjà 3 Pokémon dans votre équipe.');
    }
}

// Fonction pour afficher l'équipe du joueur
function displayPlayerTeam() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';

    playerTeam.forEach((pokemon, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team-item';
        teamDiv.innerHTML = `
            <div>
                <p><strong>Nom:</strong> ${pokemon.name}</p>
                <p><strong>Type:</strong> ${pokemon.type}</p>
                <p><strong>HP:</strong> ${pokemon.hp}</p>
                <p><strong>Attaque:</strong> ${pokemon.attack}</p>
            </div>
            <button onclick="removePokemonFromTeam(${index})">Retirer</button>
        `;
        teamList.appendChild(teamDiv);
    });
}

// Fonction pour retirer un Pokémon de l'équipe
function removePokemonFromTeam(index) {
    playerTeam.splice(index, 1);
    displayPlayerTeam();
}

// Fonction pour valider l'équipe et passer au combat
function validateTeam() {
    if (playerTeam.length === 3) {
        localStorage.setItem('playerTeam', JSON.stringify(playerTeam));
        window.location.href = 'combat.html';
    } else {
        alert('Vous devez avoir 3 Pokémon dans votre équipe pour commencer le combat.');
    }
}

// Initialiser la page
window.onload = function() {
    displayAvailablePokemons();
    displayPlayerTeam();
}

// Exposer les fonctions au scope global
window.addPokemonToTeam = addPokemonToTeam;
window.removePokemonFromTeam = removePokemonFromTeam;
window.validateTeam = validateTeam;
