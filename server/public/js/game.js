document.addEventListener('DOMContentLoaded', function() {
    const attack1Btn = document.getElementById('attack1');
    const attack2Btn = document.getElementById('attack2');
    const changePokemonBtn = document.getElementById('changePokemon');
    const runAwayBtn = document.getElementById('runAway');

    attack1Btn.addEventListener('click', function() {
        console.log('Attaque 1 sélectionnée:', attack1Btn.innerText);
        // Logique pour gérer l'attaque 1
    });

    attack2Btn.addEventListener('click', function() {
        console.log('Attaque 2 sélectionnée:', attack2Btn.innerText);
        // Logique pour gérer l'attaque 2
    });

    changePokemonBtn.addEventListener('click', function() {
        console.log('Changement de Pokémon');
        // Logique pour changer de Pokémon
    });

    runAwayBtn.addEventListener('click', function() {
        console.log('Fuite sélectionnée');
        // Logique pour fuir le combat
    });
});


        // Fonction pour gérer les actions de combat
        function performAction(action) {
            console.log("Action: " + action);
            // Ajouter ici les appels AJAX ou la logique pour gérer les actions de combat
        }

        // Fonction pour changer de Pokémon
        function switchPokemon() {
            console.log("Changement de Pokémon");
            // Ajouter ici la logique pour changer de Pokémon
        }

        // Fonction pour fuir le combat
        function runAway() {
            console.log("Fuite");
            // Ajouter ici la logique pour fuir le combat
        }
