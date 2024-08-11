const express = require('express');
/*const PocketBase = require('pocketbase/cjs');
const cors = require("cors");*/
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(cors());
//app.use(express.json());

const pb = new PocketBase('http://127.0.0.1:8090');

// Servir les fichiers statiques du dossier 'front'
app.use(express.static(path.join(__dirname, '../front')));

app.get('/create_team.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/create_team.html'));
});

/*
// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route pour obtenir une liste paginée de Pokémon
app.get('/pokemon', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 50;
        const resultList = await pb.collection('Pokemon').getList(page, perPage);
        res.json(resultList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route pour obtenir tous les Pokémon
app.get('/pokemon/all', async (req, res) => {
    try {
        const records = await pb.collection('Pokemon').getFullList({
            sort: '-created',
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un Pokémon par ID
app.get('/pokemon/:id', async (req, res) => {
    try {
        const record = await pb.collection('Pokemon').getOne(req.params.id);
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau Pokémon
app.post('/pokemon', async (req, res) => {
    try {
        const data = req.body;
        const record = await pb.collection('Pokemon').create(data);
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un Pokémon par ID
app.put('/pokemon/:id', async (req, res) => {
    try {
        const data = req.body;
        const record = await pb.collection('Pokemon').update(req.params.id, data);
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un Pokémon par ID
app.delete('/pokemon/:id', async (req, res) => {
    try {
        await pb.collection('Pokemon').delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau User
app.post('/user', async (req, res) => {
    try {
        const data = req.body;
        const record = await pb.collection('users').create(data);
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});