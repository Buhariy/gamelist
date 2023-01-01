const db = require("../models");
const Collection = db.collection;
const Op = db.Sequelize.Op;

exports.addToCollections = (req, res) => {
    console.log('dans le addcollec');
    try {
        Collection.create({
            gameId: req.body.gameId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            userId: req.body.userId
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}