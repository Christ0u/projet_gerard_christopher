const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require("../config.js");
const { v4: uuidv4 } = require('uuid'); 
const db = require('../models');
const Utilisateurs = db.utilisateurs;

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const utilisateur = await Utilisateurs.findOne({ where: { login } });

    if (!utilisateur) {
      console.log('Utilisateur non trouvé avec le login:', login);
      return res.status(404).send({
        message: `Utilisateur avec le login ${login} non trouvé.`
      });
    }

    const isMatch = await bcrypt.compare(password, utilisateur.password);

    if (!isMatch) {
      console.log('Mot de passe incorrect pour l\'utilisateur:', login);
      return res.status(401).send({
        message: "Mot de passe incorrect."
      });
    }

    const user = {
      id: utilisateur.id,
      login: utilisateur.login,
      firstName: utilisateur.firstName,
      lastName: utilisateur.lastName,
      email: utilisateur.email,
      address: utilisateur.address,
      zipCode: utilisateur.zipCode,
      city: utilisateur.city,
      country: utilisateur.country,
      phone: utilisateur.phone,
      civility: utilisateur.civility
    };

    const accessToken = generateAccessToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.status(200).send({
      message: "Connexion réussie.",
      user,
      token: accessToken
    });

  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    res.status(500).send({
      message: "Erreur lors de la récupération de l'utilisateur avec le login " + login
    });
  }
};

exports.register = (req, res) => {
  const utilisateur = {
    id: uuidv4(), 
    civility: req.body.civility,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
    address: req.body.address,
    zipCode: req.body.zipCode,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone
  };

  bcrypt.hash(utilisateur.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        message: "Une erreur s'est produite lors du hachage du mot de passe."
      });
    }

    utilisateur.password = hash;

    Utilisateurs.create(utilisateur)
      .then(data => {
        res.status(201).send({
          message: "Utilisateur enregistré avec succès.",
          user: data
        });
      })
      .catch(err => {
        console.error('Erreur lors de l\'enregistrement:', err);
        res.status(500).send({
          message: "Erreur lors de l'enregistrement de l'utilisateur."
        });
      });
  });
};

exports.getUser = async (req, res) => {
  try {
    const utilisateur = await Utilisateurs.findByPk(req.token.id);
    if (!utilisateur) {
      return res.status(404).send({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).send(utilisateur);
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la récupération des informations utilisateur.' });
  }
};