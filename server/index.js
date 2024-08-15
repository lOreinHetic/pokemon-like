const express = require('express');
const bodyParser = require('body-parser');
const PocketBase = require('pocketbase/cjs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Initialisation Pocketbase
const pb = new PocketBase('http://127.0.0.1:8090');

// Middleware pour parser les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer EJS comme moteur de templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'votre_clé_secrète', // Remplacez par une clé secrète unique
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettez "true" si vous utilisez HTTPS
}));

// SUPPRIMER - Test pour voir si l'API fonctionne
app.get('/api/test', (req, res) => {
    res.send('API fonctionne');
});


// --------------------------------------------------------------------------------------------------------------------
// POKEMON POCKETBASE
// --------------------------------------------------------------------------------------------------------------------

// Route pour récupérer les pokémons
app.get('/api/pokemon', async (req, res) => {
    try {
        const records = await pb.collection('pokemon').getFullList({
            expand: 'Competences',
            fields: 'Name,Type,HP,ATK,Defense,ATK_spe,Defense_spe,Vitesse,Competences'
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir tous les Pokémon
app.get('/api/pokemon/all', async (req, res) => {
    try {
        const records = await pb.collection('pokemon').getFullList({
            fields: 'Name,Type,HP,ATK,Defense,ATK_spe,Defense_spe,Vitesse,Competences'
        });

        for (const record of records) {
            let competenceDetails = [];
            if (record.Competences && record.Competences.length > 0) {
                for (const competenceId of record.Competences) {
                    const competence = await pb.collection('competences').getOne(competenceId, {
                        fields: 'Name,Type,Puissance,Precision'
                    });
                    competenceDetails.push(competence);
                }
            }
            record.CompetenceDetails = competenceDetails;
        }

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un Pokémon par ID
app.get('/api/pokemon/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const record = await pb.collection('pokemon').getOne(id, {
            fields: 'Name,Type,HP,ATK,Defense,ATK_spe,Defense_spe,Vitesse,Competences'
        });

        let competenceDetails = [];
        if (record.Competences && record.Competences.length > 0) {
            for (const competenceId of record.Competences) {
                const competence = await pb.collection('competences').getOne(competenceId, {
                    fields: 'Name,Type,Puissance,Precision'
                });
                competenceDetails.push(competence);
            }
        }

        record.CompetenceDetails = competenceDetails;

        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour ajouter un nouveau Pokémon
app.post('/api/pokemon', async (req, res) => {
    try {
        const data = {
            Name: req.body.Name,
            Type: req.body.Type,
            HP: req.body.HP,
            ATK: req.body.ATK,
            Defense: req.body.Defense,
            ATK_spe: req.body.ATK_spe,
            Defense_spe: req.body.Defense_spe,
            Vitesse: req.body.Vitesse,
        };

        const record = await pb.collection('pokemon').create(data);
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un Pokémon par ID
app.delete('/api/pokemon/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pb.collection('pokemon').delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// --------------------------------------------------------------------------------------------------------------------
// USERS POCKETBASE
// --------------------------------------------------------------------------------------------------------------------

// Route pour afficher page de connexion
app.get('/login', (req, res) => {
    res.render('login.ejs', { errorMessage: null });
});

// Route pour afficher la page d'inscription
app.get('/signup', (req, res) => {
    res.render('signup.ejs', { errorMessage: null });
});

// Route pour traiter l'inscription
app.post('/api/users/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await pb.collection('users').create({
            username: username,
            email: email,
            password: password,
            passwordConfirm: password
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.render('signup.ejs', { errorMessage: 'Erreur lors de l\'inscription, veuillez réessayer.' });
    }
});

// Route pour traiter la connexion
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Authentification avec PocketBase
        const authData = await pb.collection('users').authWithPassword(email, password);

        if (authData) {
            // Si l'authentification est réussie, sauvegarder l'utilisateur dans la session
            req.session.user = authData.user;

            // Rediriger vers la page d'accueil
            res.redirect('/');
        } else {
            // Si l'authentification échoue, renvoyer un message d'erreur
            res.render('login.ejs', { errorMessage: 'Erreur de connexion, veuillez réessayer.' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        // Si une erreur survient, renvoyer un message d'erreur
        res.render('login.ejs', { errorMessage: 'Erreur de connexion, veuillez réessayer.' });
    }
});


// --------------------------------------------------------------------------------------------------------------------
// INDEX
// --------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('index.ejs');
});


// --------------------------------------------------------------------------------------------------------------------
// CREATE_TEAM
// --------------------------------------------------------------------------------------------------------------------

// Route pour afficher la page de création d'équipe
app.get('/create_team', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/pokemon/all');
        const pokemons = await response.json();
        console.log(pokemons[0])
        // Récupérer l'équipe actuelle de la session, ou initialiser une nouvelle équipe vide
        let team = req.session.team || [];

        res.render('create_team', { pokemons, team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour valider l'équipe et passer au combat
app.post('/validate_team', (req, res) => {
    if (req.session.team && req.session.team.length === 3) {
        res.redirect('/combat');
    } else {
        res.status(400).send('Votre équipe doit contenir 3 Pokémon.');
    }
});


// --------------------------------------------------------------------------------------------------------------------
// COMBAT
// --------------------------------------------------------------------------------------------------------------------

// Route pour afficher la page de combat
app.get('/combat', async (req, res) => {
    try {
        // Décoder l'équipe passée en paramètre
        const team = JSON.parse(decodeURIComponent(req.query.team));
        console.log("Équipe décodée:", team);

        if (!team || team.length !== 3) {
            return res.status(400).send('Votre équipe doit contenir 3 Pokémon.');
        }

        // Appel à l'API pour obtenir tous les Pokémon
        const response = await fetch('http://localhost:3000/api/pokemon/all');
        const allPokemons = await response.json();
        console.log("Pokémon ennemi potentiel:", allPokemons);

        // Sélectionner un Pokémon aléatoire de l'équipe de l'ennemi
        const randomIndex = Math.floor(Math.random() * allPokemons.length);
        const enemyPokemon = allPokemons[randomIndex];
        console.log("Pokémon ennemi sélectionné:", enemyPokemon);

        // Récupérer le premier Pokémon de l'équipe du joueur
        const playerPokemonName = team[0].name;
        const playerPokemon = team[0];
        console.log("Pokémon joueur sélectionné:", playerPokemon);

        // Récupérer le Pokémon du joueur depuis la base de données
        const playerPokemonFromDB = allPokemons.find(p => p.Name === playerPokemonName);

        if (playerPokemonFromDB) {
            playerPokemon.competences = playerPokemonFromDB.CompetenceDetails || [];
        } else {
            playerPokemon.competences = [];
        }

        console.log("Pokémon joueur sélectionné avec compétences:", playerPokemon);

        // Rendu de la vue "combat"
        res.render('combat', {
            team: team,
            enemyPokemon: {
                name: enemyPokemon.Name,
                currentHP: enemyPokemon.HP,
                totalHP: enemyPokemon.HP,
                competences: enemyPokemon.CompetenceDetails || []
            },
            playerPokemon: {
                name: playerPokemon.name,
                currentHP: playerPokemon.hp,
                totalHP: playerPokemon.hp,
                competences: playerPokemon.competences
            }
        });
    } catch (error) {
        console.error("Erreur lors du rendu de la page de combat:", error);
        res.status(500).send("Erreur du serveur");
    }
});






// --------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});