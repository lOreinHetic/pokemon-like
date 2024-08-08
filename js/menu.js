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
    console.log('Jeu en pause');
    alert('Jeu en pause');
}

function restartGame() {
    console.log('Recommencer le jeu');
    alert('Le jeu va recommencer');
    window.location.reload(); // Recharger la page pour recommencer le jeu
}

window.goToHome = goToHome;
window.pauseGame = pauseGame;
window.restartGame = restartGame;
