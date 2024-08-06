import { Pokemon } from './pokemon.js';
//console.log('Pokemon class imported:', Pokemon);

let storedPlayerPokemon = JSON.parse(localStorage.getItem('playerPokemon'));
let playerPokemon = new Pokemon(storedPlayerPokemon.name, storedPlayerPokemon.hp, storedPlayerPokemon.attack);

let enemyPokemon = new Pokemon('Salamèche', 100, 15);

document.addEventListener('DOMContentLoaded', (event) => {
    if (playerPokemon) {
        updateStats();
    }
});

function updateStats() {
    document.getElementById('player-stats').textContent = `Joueur: ${playerPokemon.name} | HP: ${playerPokemon.hp} | Attaque: ${playerPokemon.attack}`;
    document.getElementById('enemy-stats').textContent = `Ennemie: ${enemyPokemon.name} | HP: ${enemyPokemon.hp} | Attaque: ${enemyPokemon.attack}`;
}

/* document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    playerPokemon = new Pokemon(name, hp, attack);
    console.log('Nouveau Pokemon créé:', playerPokemon);
}); */

function battleRound(playerMove) {
    console.log("Battle round started");

    if (!playerPokemon || !enemyPokemon) {
        console.log('Les deux Pokémon doivent être définis');
        return;
    }

    const enemyMove = Math.random() > 0.5 ? 'attack' : 'defend';
    console.log(`Le joueur utilise ${playerMove}`);
    console.log(`L'ennemie utilise ${enemyMove}`);

    if (playerMove === 'attack' && enemyMove !== 'defend') {
        enemyPokemon.takeDamage(playerPokemon.attack);
    } else if (enemyMove === 'attack' && playerMove !== 'defend') {
        playerPokemon.takeDamage(enemyPokemon.attack);
    }

    console.log(`Joueur HP: ${playerPokemon.hp}`);
    console.log(`Ennemie HP: ${enemyPokemon.hp}`);

    updateStats();

    if (!playerPokemon.isAlive()) {
        document.body.innerHTML = '<h1>Le joueur a été vaincu !</h1>';
    } else if (!enemyPokemon.isAlive()) {
        document.body.innerHTML = '<h1>L\'ennemie a été vaincu !</h1>';
    }
}

window.battleRound = battleRound;
