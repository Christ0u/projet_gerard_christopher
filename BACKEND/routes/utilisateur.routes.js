const { checkJwt } = require('./jwtMiddleware');

module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controllers.js");

  var router = require("express").Router();

  router.post("/login", utilisateur.login);
  router.post("/register", utilisateur.register);
  router.put("/me", utilisateur.getUser);
  router.put("/mee", utilisateur.updateUser);
  
  app.use('/api/utilisateur', router);
};