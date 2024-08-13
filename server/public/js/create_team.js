async function fetchPokemon() {
    try {
        // Appel à l'API
        const response = await fetch('http://localhost:3000/api/pokemon');
        
        // Vérification si la réponse est correcte
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        // Parsing de la réponse en JSON
        const pokemons = await response.json();

        // Sélection de l'élément HTML où les données seront affichées
        const pokemonContainer = document.getElementById('pokemon-container');

        // Boucle sur chaque Pokémon et création d'éléments HTML pour l'affichage
        pokemons.forEach(pokemon => {
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');

            pokemonElement.innerHTML = `
                <h3>${pokemon.Name}</h3>
                <p><strong>ATK:</strong> ${pokemon.ATK}</p>
                <p><strong>PV:</strong> ${pokemon.PV}</p>
                <p><strong>Collection ID:</strong> ${pokemon.collectionId}</p>
                <p><strong>Collection Name:</strong> ${pokemon.collectionName}</p>
                <p><strong>Created:</strong> ${new Date(pokemon.created).toLocaleString()}</p>
                <p><strong>Updated:</strong> ${new Date(pokemon.updated).toLocaleString()}</p>
            `;

            pokemonContainer.appendChild(pokemonElement);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Appel de la fonction pour récupérer et afficher les données lorsque la page est chargée
document.addEventListener('DOMContentLoaded', fetchPokemon);