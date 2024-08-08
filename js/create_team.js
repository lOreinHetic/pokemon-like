import { Pokemon } from './pokemon.js';

let pokemons = [];

// Fonction pour afficher les Pokémons
function displayPokemons() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    pokemons.forEach((pokemon, index) => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.className = 'pokemon-item';
        pokemonDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p>Nom: ${pokemon.name}, HP: ${pokemon.hp}, Attaque: ${pokemon.attack}</p>
                <div>
                    <button onclick="editPokemon(${index})">Modifier</button>
                    <button onclick="deletePokemon(${index})">Supprimer</button>
                </div>
            </div>
        `;
        pokemonList.prepend(pokemonDiv); // Ajoute le dernier Pokémon en haut de la liste
    });
}

// Fonction pour ajouter un nouveau Pokémon
function addPokemon() {
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    if (name && hp && attack) {
        const pokemon = new Pokemon(name, hp, attack);
        pokemons.push(pokemon);
        displayPokemons();
        savePokemons(); // Sauvegarde des Pokémons après l'ajout
        document.getElementById('team-form').reset();
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

// Fonction pour modifier un Pokémon
function editPokemon(index) {
    const pokemon = pokemons[index];
    document.getElementById('pokemon-name').value = pokemon.name;
    document.getElementById('pokemon-hp').value = pokemon.hp;
    document.getElementById('pokemon-attack').value = pokemon.attack;

    const addButton = document.getElementById('add-pokemon');
    const form = document.getElementById('team-form');

    addButton.style.display = 'none'; // Masquer le bouton Ajouter Pokémon
    const saveButton = document.createElement('button');
    saveButton.id = 'save-button';
    saveButton.innerText = 'Sauvegarder les modifications';
    saveButton.onclick = function() {
        savePokemon(index);
    };

    form.appendChild(saveButton);
}

// Fonction pour sauvegarder les modifications d'un Pokémon
function savePokemon(index) {
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    if (name && hp && attack) {
        pokemons[index] = new Pokemon(name, hp, attack);
        displayPokemons();
        savePokemons(); // Sauvegarde des Pokémons après modification
        document.getElementById('team-form').reset();

        const saveButton = document.getElementById('save-button');
        saveButton.remove(); // Supprimer le bouton Sauvegarder les modifications

        const addButton = document.getElementById('add-pokemon');
        addButton.style.display = 'inline'; // Afficher le bouton Ajouter Pokémon
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

// Fonction pour supprimer un Pokémon
function deletePokemon(index) {
    pokemons.splice(index, 1);
    displayPokemons();
    savePokemons(); // Sauvegarde des Pokémons après suppression
}

// Fonction pour enregistrer les Pokémons dans le stockage local
function savePokemons() {
    localStorage.setItem('playerPokemons', JSON.stringify(pokemons));
}

// Fonction pour lancer le combat
function startBattle() {
    savePokemons();
    window.location.href = 'combat.html';
}

// Charger les Pokémons à partir du stockage local
window.onload = function() {
    document.getElementById('add-pokemon').addEventListener('click', addPokemon);

    if (localStorage.getItem('playerPokemons')) {
        pokemons = JSON.parse(localStorage.getItem('playerPokemons')).map(p => new Pokemon(p.name, p.hp, p.attack));
        displayPokemons();
    }
}

// Attacher les fonctions à window pour les rendre accessibles globalement
window.startBattle = startBattle;
window.editPokemon = editPokemon;
window.deletePokemon = deletePokemon;
