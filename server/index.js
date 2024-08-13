const express = require('express');
const PocketBase = require('pocketbase/cjs');
const path = require('path');

const app = express();
const pb = new PocketBase('http://127.0.0.1:8090');

// Configurer EJS comme moteur de templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Route pour récupérer les données et rendre la page 'login'
app.get('/login', async (req, res) => {
    res.render('login.ejs');
});

// Route pour récupérer les données et rendre la page 'index'
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// Route pour récupérer les données et rendre sur la page 'create_team'
app.get('/create_team', async (req, res) => {
    try {
        const records = await pb.collection('pokemon').getFullList();
        // Rendu de la page EJS avec les données
        res.render('create_team.ejs', { pokemons: records });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer les données et rendre la page 'combat'
app.get('/combat', async (req, res) => {
    res.render('combat.ejs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});