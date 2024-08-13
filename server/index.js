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

// Route pour récupérer les données et rendre la page HTML
app.get('/create_team', async (req, res) => {
    try {
        const records = await pb.collection('pokemon').getFullList();
        // Rendu de la page EJS avec les données
        res.render('create_team.ejs', { pokemons: records });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer les données et rendre la page HTML
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// Route pour récupérer les données et rendre la page HTML
app.get('/combat', async (req, res) => {
    res.render('combat.ejs');
});

// Route pour récupérer les données et rendre la page HTML
app.get('/login', async (req, res) => {
    res.render('login.ejs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});