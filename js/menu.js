document.getElementById('open-menu-btn').addEventListener('click', function() {
    var menu = document.getElementById('side-menu');
    var button = document.getElementById('open-menu-btn');
    if (menu.style.width === '250px') {
        menu.style.width = '0';
        button.innerHTML = '&#9776;';
        button.classList.remove('open');
    } else {
        menu.style.width = '250px';
        button.innerHTML = '&times;';
        button.classList.add('open');
    }
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
    window.location.reload();
}

window.goToHome = goToHome;
window.pauseGame = pauseGame;
window.restartGame = restartGame;
