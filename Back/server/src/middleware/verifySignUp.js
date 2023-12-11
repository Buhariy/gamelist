const db = require("../models");
const User = db.user;


checkDuplicatePseudoOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      where: {
        pseudo: req.body.pseudo,
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed ! Ce pseudo est déjà utilisé !"
        });
        return;
      }
  
      // Email
      User.findOne({
        where: {
          email: req.body.email,
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Cet email est déjà utilisé!"
          });
          return;
        }
  
        next();
      });
    }); 
  };

  const verifySignUp = {
    checkDuplicatePseudoOrEmail: checkDuplicatePseudoOrEmail,
  };

  module.exports = verifySignUp;   