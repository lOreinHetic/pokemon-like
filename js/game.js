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
let timerInterval;
let gameTime = 0;
let playerTurn = true; // True if it's player's turn, false if it's enemy's turn

function loadPokemons() {
    const storedPokemons = JSON.parse(localStorage.getItem('playerPokemons'));
    if (storedPokemons) {
        playerPokemons = storedPokemons.map(p => new Pokemon(p.name, p.hp, p.attack));
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        gameTime++;
        document.getElementById('timer').innerText = `Temps: ${gameTime}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function selectPokemon(index) {
    currentPlayerPokemon = playerPokemons[index];
    document.getElementById('pokemon-selection').style.display = 'none';
    document.getElementById('combat-zone').style.display = 'block';
    document.getElementById('player-pokemon-stats').innerText = `Nom: ${currentPlayerPokemon.name}, HP: ${currentPlayerPokemon.hp}, Attaque: ${currentPlayerPokemon.attack}`;
    enemyPokemon = new Pokemon('Enemy', Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 30) + 10);
    document.getElementById('enemy-pokemon-stats').innerText = `Nom: ${enemyPokemon.name}, HP: ${enemyPokemon.hp}, Attaque: ${enemyPokemon.attack}`;
    startTimer();
    playerTurn = true;
    updateTurnIndicator();
    showActionButtons();
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

function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turn-indicator');
    turnIndicator.innerText = `Tour: ${playerTurn ? 'Joueur' : 'Adversaire'}`;
}

function showActionButtons() {
    document.getElementById('attack-button').style.display = 'block';
    document.getElementById('defend-button').style.display = 'block';
    document.getElementById('change-pokemon-button').style.display = 'block';
}

function hideActionButtons() {
    document.getElementById('attack-button').style.display = 'none';
    document.getElementById('defend-button').style.display = 'none';
    document.getElementById('change-pokemon-button').style.display = 'none';
}

function chooseAction(action) {
    hideActionButtons();
    playerTurn = false;
    updateTurnIndicator();
    setTimeout(() => {
        const enemyAction = Math.random() < 0.5 ? 'attack' : 'defend';
        const result = executeRound(action, enemyAction);
        alert(result);
        playerTurn = true;
        updateTurnIndicator();
        if (currentPlayerPokemon.isAlive() && enemyPokemon.isAlive()) {
            showActionButtons();
        } else {
            showGameOverMessage();
        }
    }, 2000); // Simulate enemy's thinking time with a 2-second delay
}

function executeRound(playerAction, enemyAction) {
    if (!currentPlayerPokemon.isAlive() || !enemyPokemon.isAlive()) {
        return;
    }

    let playerDamage = 0;
    let enemyDamage = 0;

    // Player's action
    if (playerAction === 'attack') {
        enemyDamage = currentPlayerPokemon.attack;
        enemyPokemon.takeDamage(enemyDamage);
    } else if (playerAction === 'defend') {
        playerDamage = Math.floor(enemyPokemon.attack / 2);
        currentPlayerPokemon.takeDamage(playerDamage);
    }

    // Enemy's action
    if (enemyAction === 'attack') {
        playerDamage = enemyPokemon.attack;
        currentPlayerPokemon.takeDamage(playerDamage);
    } else if (enemyAction === 'defend') {
        enemyDamage = Math.floor(currentPlayerPokemon.attack / 2);
        enemyPokemon.takeDamage(enemyDamage);
    }

    document.getElementById('enemy-pokemon-stats').innerText = `Nom: ${enemyPokemon.name}, HP: ${enemyPokemon.hp}, Attaque: ${enemyPokemon.attack}`;
    document.getElementById('player-pokemon-stats').innerText = `Nom: ${currentPlayerPokemon.name}, HP: ${currentPlayerPokemon.hp}, Attaque: ${currentPlayerPokemon.attack}`;

    return `Vous avez ${playerAction === 'attack' ? `infligé ${enemyDamage} dégâts` : `perdu ${playerDamage} HP`} à l'ennemi.\nL'adversaire a ${enemyAction === 'attack' ? `infligé ${playerDamage} dégâts` : `perdu ${enemyDamage} HP`} à vous.`;
}

function showGameOverMessage() {
    let message = '';
    if (!currentPlayerPokemon.isAlive() && !enemyPokemon.isAlive()) {
        message = 'Le combat est terminé : Match nul';
    } else if (!currentPlayerPokemon.isAlive()) {
        message = 'Le combat est terminé : Vous avez perdu';
    } else if (!enemyPokemon.isAlive()) {
        message = 'Le combat est terminé : Vous avez gagné';
    }
    alert(message);
    stopTimer();
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
window.changePokemon = changePokemon;
window.selectPokemon = selectPokemon;
window.chooseAction = chooseAction;
