let team = [];

function addToTeam(name, type, hp, atk, defense, atk_spe, defense_spe, vitesse) {
    if (team.length < 3) {
        team.push({ name, type, hp, atk, defense, atk_spe, defense_spe, vitesse });
        updateTeamList();
    } else {
        alert("Vous ne pouvez avoir que 3 Pokémon dans une équipe.");
    }
}

function removeFromTeam(index) {
    team.splice(index, 1);
    updateTeamList();
}

function updateTeamList() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';

    team.forEach((pokemon, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${pokemon.name} 
            <button class="remove-btn" onclick="removeFromTeam(${index})">Retirer</button>
        `;
        teamList.appendChild(li);
    });
}

function showPopup() {
    if (team.length === 3) {
        const teamSummaryList = document.getElementById('team-summary-list');
        teamSummaryList.innerHTML = '';

        team.forEach(pokemon => {
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            teamSummaryList.appendChild(li);
        });

        document.getElementById('popup').style.display = 'flex';
        console.log('Équipe actuelle:', team); // Afficher l'équipe dans la console du navigateur
    } else {
        alert("Votre équipe doit contenir exactement 3 Pokémon.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const combatBtn = document.getElementById('combatBtn');
    const continueBtn = document.getElementById('continueBtn');
    
    combatBtn.addEventListener('click', function() {
        // Afficher l'équipe dans la console pour vérifier
        console.log("Equipe sélectionnée:", team);

        // Rediriger vers la page de combat avec l'équipe
        window.location.href = `/combat?team=${encodeURIComponent(JSON.stringify(team))}`;
    });

    continueBtn.addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });
});
