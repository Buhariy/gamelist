const { where } = require("sequelize");
const db = require("../models");
const Collection = db.collection;
const Op = db.Sequelize.Op;

exports.addToCollections = async (req, res) => {
    console.log('dans le addcollec');
    try {
       await Collection.create({
            gameId: req.body.gameId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            userId: req.body.userId
        });

    } catch (error) {
        res.status(500).send({ message: "ce jeux est déjà dans ta collection connard" });
    }
}

exports.deleteToCollection = (req,res) => {
    console.log('dans le supCollec');
    try{
        Collection.destroy({
            where: {
                gameId: req.body.gameId,
                userId: req.body.userId
            }
        })
    }catch(error){
        res.status(500).send({message: error.message});
    }
}
