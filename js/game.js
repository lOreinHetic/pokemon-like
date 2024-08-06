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

document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    const newPokemon = new Pokemon(name, hp, attack);
    console.log('Nouveau Pokemon créé:', newPokemon);
});
