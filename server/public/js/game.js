document.addEventListener('DOMContentLoaded', function() {
    // Supposons que les données du joueur et de l'ennemi soient transmises via des balises de script data-attributes
    let playerPokemon = {
        name: document.getElementById('playerPokemonName').innerText,
        currentHP: parseInt(document.getElementById('playerPokemonHP').innerText),
        totalHP: parseInt(document.getElementById('playerPokemonTotalHP').innerText),
        competences: [
            { name: 'Attaque 1', puissance: 5, precision: 90 },
            { name: 'Attaque 2', puissance: 3, precision: 100 }
        ],
        atk: 1
    };

    let enemyPokemon = {
        name: document.getElementById('enemyPokemonName').innerText,
        currentHP: parseInt(document.getElementById('enemyPokemonHP').innerText),
        totalHP: parseInt(document.getElementById('enemyPokemonTotalHP').innerText),
        def: 1
    };

    function attack(attacker, defender, attackIndex) {
        const attack = attacker.competences[attackIndex];
        const hitChance = Math.random() * 100;

        console.log(attack);

        if (hitChance <= attack.precision) {
            const damage = Math.round((attack.puissance * attacker.atk) / defender.def);
            console.log(damage);

            defender.currentHP = parseInt(document.getElementById('enemyPokemonHP').innerText, 10);

            if (updateHPBars(defender, damage) <= 0) {
                console.log("T'AS GAGNE");
                window.location.href = '/winner';
            }

        } else {
            console.log(`${attacker.name} a raté son attaque !`);
        }
    }

    function updateHPBars(pokemon, attack) {
        const hpPercentageElement = pokemon === playerPokemon
            ? document.getElementById('playerHPBar')
            : document.getElementById('enemyHPBar');

        const hpTextElement = pokemon === playerPokemon
            ? null
            : document.getElementById('enemyPokemonHP');

        if (pokemon !== playerPokemon) {
            let enemyHP = parseInt(hpTextElement.innerText, 10);
            enemyHP -= attack;

            hpTextElement.innerText = enemyHP;

            const hpPercentage = (enemyHP / pokemon.totalHP) * 100;
            hpPercentageElement.style.width = `${Math.max(hpPercentage, 0)}%`;

            return hpPercentage;
        } else {
            const hpPercentage = (pokemon.currentHP / pokemon.totalHP) * 100;
            hpPercentageElement.style.width = `${hpPercentage}%`;

            return hpPercentage;
        }
    }


    function updatePlayerCard(newPokemon) {
        // Vérifier que toutes les propriétés existent avant de mettre à jour la carte du joueur
        if (newPokemon && newPokemon.name && newPokemon.hp) {
            playerPokemon = {
                name: newPokemon.name,
                currentHP: parseInt(newPokemon.hp),
                totalHP: parseInt(newPokemon.hp),
                competences: newPokemon.competences || []
            };

            document.getElementById('playerPokemonName').innerText = playerPokemon.name;
            document.getElementById('playerPokemonHP').innerText = playerPokemon.currentHP;
            document.getElementById('playerPokemonTotalHP').innerText = playerPokemon.totalHP;

            const hpPercentage = (playerPokemon.currentHP / playerPokemon.totalHP) * 100;
            document.getElementById('playerHPBar').style.width = `${hpPercentage}%`;

            document.getElementById('attack1').innerText = playerPokemon.competences[0] ? playerPokemon.competences[0].Name : 'Aucune compétence';
            document.getElementById('attack2').innerText = playerPokemon.competences[1] ? playerPokemon.competences[1].Name : 'Aucune compétence';
        } else {
            console.error("Erreur : Le Pokémon sélectionné ne possède pas toutes les propriétés nécessaires.");
        }
    }


    document.getElementById('attack1').addEventListener('click', function() {
        attack(playerPokemon, enemyPokemon, 0);
    });

    document.getElementById('attack2').addEventListener('click', function() {
        attack(playerPokemon, enemyPokemon, 1);
    });

// Listener pour le bouton "Pokemon"
    document.getElementById('changePokemon').addEventListener('click', function() {
        document.getElementById('pokemonPopup').style.display = 'block'; // Afficher la popup de sélection de Pokémon
    });

    // Listener pour les boutons de sélection de Pokémon dans la popup
    document.querySelectorAll('.selectPokemonButton').forEach(button => {
        button.addEventListener('click', function() {
            // Récupérer l'équipe complète du joueur depuis les attributs data- du DOM
            let teamData = document.getElementById('team').dataset.team;
            let team = JSON.parse(teamData);
            let selectedPokemonName = this.dataset.pokemon;
            let selectedPokemon = team.find(pokemon => pokemon.name === selectedPokemonName);
            if (selectedPokemon) {
                console.log('Pokémon sélectionné:', selectedPokemonName);
                updatePlayerCard(selectedPokemon); // Mettre à jour la carte du joueur avec le nouveau Pokémon
                document.getElementById('pokemonPopup').style.display = 'none'; // Fermer la popup après la sélection
            } else {
                console.error('Pokémon non trouvé dans l\'équipe:', selectedPokemonName);
            }
        });
    });

    // Listener pour le bouton "Fermer" dans la popup de sélection de Pokémon
    document.getElementById('closePokemonPopup').addEventListener('click', function() {
        document.getElementById('pokemonPopup').style.display = 'none'; // Fermer la popup de sélection de Pokémon
    });

    document.getElementById('runAway').addEventListener('click', function() {
        document.getElementById('runAwayPopup').style.display = 'block';
    });

    document.getElementById('confirmRunAway').addEventListener('click', function() {
        window.location.href = '/';
    });

    document.getElementById('cancelRunAway').addEventListener('click', function() {
        document.getElementById('runAwayPopup').style.display = 'none';
    });
});