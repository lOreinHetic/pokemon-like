//console.log('create_team.js is loaded');
import { Pokemon } from './pokemon.js';

//console.log('Pokemon class imported:', Pokemon);

document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    //console.log('Formulaire soumis');
    
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    const playerPokemon = new Pokemon(name, hp, attack);
    console.log('Pokemon créé:', playerPokemon);

    localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));

    const startBattleButton = document.getElementById('start-battle');
    startBattleButton.style.display = 'block';
    //console.log('Bouton commancer le combat');
});
