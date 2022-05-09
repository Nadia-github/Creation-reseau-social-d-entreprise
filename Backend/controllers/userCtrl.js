const models = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { or } = require('sequelize/types');
const { Sequelize, Model, DataTypes } = require('sequelize');

require ("dotenv").config();

exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = models.users.build({
        nom: req.body.nom,
        prenom: req.body.prenom,
        sexe: req.body.sexe, 
        email: req.body.email,
        password: hash,
        isAdmin: req.body.admin, //besoin de confirmation
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            // jwt.sign => on va créer un token avec premier argument le user._id et le second argument la clé de cryptage
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};