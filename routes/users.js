var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/AuthController")



router.post("/signup",AuthController.signup);
router.post("/login",AuthController.login);

/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
