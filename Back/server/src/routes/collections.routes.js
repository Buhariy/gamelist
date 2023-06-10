const controller = require("../controllers/collections.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers: '*'",
      "Access-Control-Allow-Methods: GET, POST",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/addCollection", controller.addToCollections);
  app.post("/deleteCollection",controller.deleteToCollection);
};