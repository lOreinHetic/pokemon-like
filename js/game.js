class Pokemon {
    constructor(name, hp, attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }

    isAlive() {
        return this.hp > 0;
    }
}

let playerPokemons = [];
let enemyPokemon;
let currentPlayerPokemon;

function loadPokemons() {
    const storedPokemons = JSON.parse(localStorage.getItem('playerPokemons'));
    if (storedPokemons) {
        playerPokemons = storedPokemons.map(p => new Pokemon(p.name, p.hp, p.attack));
    }
}

function selectPokemon(index) {
    currentPlayerPokemon = playerPokemons[index];
    document.getElementById('pokemon-selection').style.display = 'none';
    document.getElementById('combat-zone').style.display = 'block';
    document.getElementById('player-pokemon-stats').innerText = `Nom: ${currentPlayerPokemon.name}, HP: ${currentPlayerPokemon.hp}, Attaque: ${currentPlayerPokemon.attack}`;
    enemyPokemon = new Pokemon('Enemy', Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 30) + 10);
    document.getElementById('enemy-pokemon-stats').innerText = `Nom: ${enemyPokemon.name}, HP: ${enemyPokemon.hp}, Attaque: ${enemyPokemon.attack}`;
}

function displayPokemonSelection() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    playerPokemons.forEach((pokemon, index) => {
        if (pokemon.isAlive()) {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon-item';
            pokemonDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <p>Nom: ${pokemon.name}, HP: ${pokemon.hp}, Attaque: ${pokemon.attack}</p>
                    <button onclick="selectPokemon(${index})">Sélectionner</button>
                </div>
            `;
            pokemonList.appendChild(pokemonDiv);
        }
    });
}

function battleRound(action) {
    if (!currentPlayerPokemon.isAlive() || !enemyPokemon.isAlive()) {
        alert('Le combat est terminé');
        return;
    }

    if (action === 'attack') {
        enemyPokemon.takeDamage(currentPlayerPokemon.attack);
        document.getElementById('enemy-pokemon-stats').innerText = `Nom: ${enemyPokemon.name}, HP: ${enemyPokemon.hp}, Attaque: ${enemyPokemon.attack}`;
    } else if (action === 'defend') {
        currentPlayerPokemon.takeDamage(Math.floor(enemyPokemon.attack / 2));
    }

    if (enemyPokemon.isAlive()) {
        const enemyAction = Math.random() < 0.5 ? 'attack' : 'defend';
        if (enemyAction === 'attack') {
            currentPlayerPokemon.takeDamage(enemyPokemon.attack);
        } else {
            enemyPokemon.takeDamage(Math.floor(currentPlayerPokemon.attack / 2));
        }
    }

    document.getElementById('player-pokemon-stats').innerText = `Nom: ${currentPlayerPokemon.name}, HP: ${currentPlayerPokemon.hp}, Attaque: ${currentPlayerPokemon.attack}`;

    if (!currentPlayerPokemon.isAlive() || !enemyPokemon.isAlive()) {
        alert('Le combat est terminé');
    }
}

function changePokemon() {
    document.getElementById('combat-zone').style.display = 'none';
    document.getElementById('pokemon-selection').style.display = 'block';
    displayPokemonSelection();
}

// Ajouter les écouteurs d'événements après le chargement de la page
window.onload = function() {
    loadPokemons();
    displayPokemonSelection();
}

// Attacher les fonctions à window pour les rendre accessibles globalement
window.battleRound = battleRound;
window.changePokemon = changePokemon;
window.selectPokemon = selectPokemon;
