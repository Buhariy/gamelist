const db = require("../models");
const User = db.user;


checkDuplicatePseudo = (req, res, next) => {    
      // Email
      User.findOne({
        where: {
          email: req.body.pseudo,
        }
      }).then(user => {
        if (user && user.id != req.body.id) {
          res.status(400).send({
            message: "Failed! Cet pseudo est déjà utilisé!"
          });
          return;
        }
        next();
      });
  };

  const verifyUpdatePseudo = {
    checkDuplicatePseudo: checkDuplicatePseudo,
  };

  module.exports = verifyUpdatePseudo; 