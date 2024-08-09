class Pokemon {
    constructor(name, type, hp, attack) {
        this.name = name;
        this.type = type;  // "eau", "feu", "plante"
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

// Liste des Pokémon disponibles
const availablePokemons = [
    new Pokemon('Bulbizarre', 'plante', 100, 15),
    new Pokemon('Carapuce', 'eau', 120, 12),
    new Pokemon('Salamèche', 'feu', 110, 14),
    new Pokemon('Roucool', 'plante', 90, 10),
    new Pokemon('Rondoudou', 'eau', 95, 11),
    new Pokemon('Pikachu', 'feu', 105, 13)
];

// Fonction pour calculer les dégâts en fonction du type
function calculateDamage(attack, attackerType, defenderType) {
    let typeModifier = 1;

    if (attackerType === 'feu' && defenderType === 'plante') {
        typeModifier = 2; // Feu est fort contre Plante
    } else if (attackerType === 'feu' && defenderType === 'eau') {
        typeModifier = 0.5; // Feu est faible contre Eau
    } else if (attackerType === 'eau' && defenderType === 'feu') {
        typeModifier = 2; // Eau est fort contre Feu
    } else if (attackerType === 'eau' && defenderType === 'plante') {
        typeModifier = 0.5; // Eau est faible contre Plante
    } else if (attackerType === 'plante' && defenderType === 'eau') {
        typeModifier = 2; // Plante est fort contre Eau
    } else if (attackerType === 'plante' && defenderType === 'feu') {
        typeModifier = 0.5; // Plante est faible contre Feu
    }

    return attack * typeModifier;
}

// Exporter les éléments pour utilisation dans d'autres fichiers
export { Pokemon, availablePokemons, calculateDamage };
