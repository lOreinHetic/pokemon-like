document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value;
    const hp = parseInt(document.getElementById('pokemon-hp').value, 10);
    const attack = parseInt(document.getElementById('pokemon-attack').value, 10);

    const playerPokemon = new Pokemon(name, hp, attack);
    localStorage.setItem('playerPokemon', JSON.stringify(playerPokemon));
    document.getElementById('start-battle').style.display = 'block';
});