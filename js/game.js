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

let playerPokemon;
let enemyPokemon = new Pokemon('Salamèche', 100, 15);

document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    playerPokemon = new Pokemon(name, hp, attack);
    console.log('Nouveau Pokemon créé:', playerPokemon);
});

function battleRound(playerMove) {
    if (!playerPokemo || !enemyPokemon) {
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

    if (!playerPokemon.isAlive()) {
        document.body.innerHTML = '<h1>Le joueur a été vaincu !</h1>';
    } else if (!enemyPokemon.isAlive()) {
        document.body.innerHTML = '<h1>L\'ennemie a été vaincu !</h1>';
    }
}
