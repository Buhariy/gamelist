const db = require("../models");
const User = db.user;


checkDuplicateEmail = (req, res, next) => {    
      // Email
      User.findOne({
        where: {
          email: req.body.email,
        }
      }).then(user => {
        if (user && user.id != req.body.id) {
          res.status(400).send({
            message: "Failed! Cet email est déjà utilisé!"
          });
          return;
        }
  
        next();
      });
  };

  const verifyUpdateEmail = {
    checkDuplicateEmail: checkDuplicateEmail,
  };

  module.exports = verifyUpdateEmail;   