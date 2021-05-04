var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/AuthController")
const axios = require("axios");
const {google} = require('googleapis');
const { loginGoogle } = require('../controllers/AuthController');

const oauth2Client = new google.auth.OAuth2(
    '238713150282-8hsg1fducabo29j7c5189fejif65o5cu.apps.googleusercontent.com',
    '_pnlG3WuuNtcI-87_Ty-4ZIk',
    'http://localhost:3000/users/google/callback'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
let geturl = ()=>{
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
      ];
      
      return oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        //   access_type: 'offline',
      
        // If you only need one scope you can pass it as a string
        scope: scopes
      });
      
}
async function getGoogleUser(code) {
    
  }
router.post("/signup",AuthController.signup);
router.post("/login",AuthController.login);
router.get("/google",AuthController.verifyGoogle);
router.use("/google/callback",AuthController.loginGoogle);
/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
