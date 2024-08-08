import { Pokemon } from './pokemon.js';

// Fonction pour ajouter un nouveau formulaire de Pokémon
function addPokemonEntry() {
    const form = document.getElementById('team-form');
    const newEntry = document.createElement('div');
    newEntry.className = 'pokemon-entry';
    newEntry.innerHTML = `
        <label for="pokemon-name">Nom:</label>
        <input type="text" class="pokemon-name" name="name">
        <label for="pokemon-hp">HP:</label>
        <input type="number" class="pokemon-hp" name="hp">
        <label for="pokemon-attack">Attaque:</label>
        <input type="number" class="pokemon-attack" name="attack">
    `;
    form.appendChild(newEntry);
}

// Fonction pour enregistrer les Pokémons
function savePokemons() {
    const pokemons = [];
    const entries = document.getElementsByClassName('pokemon-entry');
    for (let entry of entries) {
        const name = entry.querySelector('.pokemon-name').value;
        const hp = parseInt(entry.querySelector('.pokemon-hp').value, 10);
        const attack = parseInt(entry.querySelector('.pokemon-attack').value, 10);
        pokemons.push(new Pokemon(name, hp, attack));
    }
    localStorage.setItem('playerPokemons', JSON.stringify(pokemons));
}

document.getElementById('add-pokemon').addEventListener('click', addPokemonEntry);
document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    savePokemons();
    alert('Pokémons sauvegardés!');
});

// Charger les Pokémons à partir du stockage local
window.onload = function() {
    if (localStorage.getItem('playerPokemons')) {
        const storedPokemons = JSON.parse(localStorage.getItem('playerPokemons'));
        storedPokemons.forEach(pokemon => {
            addPokemonEntry();
            const entries = document.getElementsByClassName('pokemon-entry');
            const lastEntry = entries[entries.length - 1];
            lastEntry.querySelector('.pokemon-name').value = pokemon.name;
            lastEntry.querySelector('.pokemon-hp').value = pokemon.hp;
            lastEntry.querySelector('.pokemon-attack').value = pokemon.attack;
        });
    }
}
