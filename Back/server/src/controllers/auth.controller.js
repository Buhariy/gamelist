const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
    // Save User to Database
    try {
        User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            // profilePicture:"C:\Users\pc\Pictures\emote twitch\Illustration_sans_titre.png",
            // creationDate: Date.now(),
          });
          res.status(200).send("User created")
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
  };
  
  exports.signin = (req, res) => {
    User.findOne({
      where: {
        pseudo: req.body.PseudoOrEmail
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            profilePicture: user.profilePicture,
            accessToken: token,
            message : "connected"
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };