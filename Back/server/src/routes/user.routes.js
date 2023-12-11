const { authJwt} = require("../middleware");
const { checkDuplicateEmail } = require("../middleware/verifyUpdateEmail.js");
const { checkDuplicatePseudo } = require("../middleware/verifyUpdatePseudo.js");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/MyProfil/:id",controller.myProfil);
  
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.post("/collection",controller.userBoard);
  
  app.post("/update", checkDuplicateEmail,checkDuplicatePseudo,controller.userUpdate);
};