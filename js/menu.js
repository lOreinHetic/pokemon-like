document.getElementById('open-menu-btn').addEventListener('click', function() {
    document.getElementById('side-menu').style.width = '250px';
});

document.getElementById('close-menu-btn').addEventListener('click', function() {
    document.getElementById('side-menu').style.width = '0';
});

function goToHome() {
    window.location.href = 'index.html';
}

function pauseGame() {
    // Logique pour mettre en pause le jeu
    console.log('Jeu en pause');
    alert('Jeu en pause');
}

function restartGame() {
    // Logique pour relancer le jeu
    console.log('Recommencer le jeu');
    alert('Le jeu va recommencer');
    window.location.reload(); // Recharger la page pour recommencer le jeu
}

window.goToHome = goToHome;
window.pauseGame = pauseGame;
window.restartGame = restartGame;
