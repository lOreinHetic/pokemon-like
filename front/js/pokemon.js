// Classe Pokémon
export class Pokemon {
    constructor(name, type, hp, attack) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
    }

    // Méthode pour calculer les dégâts
    calculateDamage(target) {
        let damage = this.attack;
        // Logique de calcul des dégâts en fonction du type (si nécessaire)
        return damage;
    }
}

//const response = fetch('http://localhost:3000/pokemon/all')
//console.log("response", response.json())

/*
// Liste des Pokémon disponibles
export const availablePokemons = [
    new Pokemon('Bulbizarre', 'plante', 100, 15),
    new Pokemon('Carapuce', 'eau', 120, 12),
    new Pokemon('Salamèche', 'feu', 110, 14),
    new Pokemon('Roucool', 'plante', 90, 10),
    new Pokemon('Rondoudou', 'eau', 95, 11),
    new Pokemon('Pikachu', 'feu', 105, 13)
];
*/
