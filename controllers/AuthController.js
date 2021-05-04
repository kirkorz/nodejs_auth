const key = 
{   private:
    '-----BEGIN RSA PRIVATE KEY-----\nMIIBPAIBAAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/AypS5UV8NDFGaCdYstbYx\nrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQJBAJV5xsGayKxlcO0G+wKV\noKz/fihckw0o6kXTldGfnWUrQdWSEFeIznCeVbMRhntAiejVuIovLjvdRBp4mnn4\nTuECIQDk9eEK8lt5I8BgGHAgj5Y+DbIqngA74MtLUpz8LGOMUQIhAL4EFAUkzJtR\nlN9zQ7+FCSi+lvd7GUt2gJT2gfeK38VDAiEAwKlyG88CT/ZYi8QknhGVIFRQBvJ7\nSeeHybMTrFMB1XECIQCmpCb2l95EvJhGGu0oUkDFFdiJ89AsKSH9Ae7bLFSwxwIg\nK3LNRypKCfAF+64theNMPhQta3sO8EZoNJGc7WGIPh4=\n-----END RSA PRIVATE KEY-----',
    public:
    '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/A\nypS5UV8NDFGaCdYstbYxrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQ==\n-----END PUBLIC KEY-----' 
}
const axios = require("axios");
const {google} = require('googleapis');
const jwtHelper = require("../helpers/jwt.helper");

const Dbquery = require('../dataquery/auth.js');

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";


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


let signup = async(req,res) =>{
    try{
        const result = await Dbquery.singup(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let login = async(req,res) =>{
    try{
        const user = await Dbquery.login(req.body);
        const accessToken = await jwtHelper.generateToken(user,key.private,accessTokenLife);
        return res.status(200).json(accessToken);
    } catch(error){
        return res.status(500).json(error);
    }
}

let verifyGoogle = (req,res) =>{
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
    ];
    
    const url =  oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    //   access_type: 'offline',
    
    // If you only need one scope you can pass it as a string
    scope: scopes
    });
    res.status(200).send({url});
}
let loginGoogle = async (req,res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
  
        // Fetch the user's profile with the access token and bearer
        const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
            headers: {
                Authorization: `Bearer ${tokens.id_token}`,
            },
            },
        )
        .then(res => res.data)
        .catch(error => {
            throw new Error(error.message);
        });
        const user = await Dbquery.findGuser(googleUser);
        if(user){
            const accessToken = await jwtHelper.generateToken(user,key.private,accessTokenLife);
            return res.status(200).json(accessToken);
        }
        else{
            const user = await Dbquery.addGuser(googleUser);
            const accessToken = await jwtHelper.generateToken(user,key.private,accessTokenLife);
            return res.status(200).json(accessToken);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// {
//     id: '108033021270447284220',
//     name: 'Bảo Phạm Văn',
//     given_name: 'Bảo',
//     family_name: 'Phạm Văn',
//     picture: 'https://lh3.googleusercontent.com/a-/AOh14Gg7zuuGKh836fZ2WuG5ULk2zT5PbFR-px63f-PV=s96-c',
//     locale: 'vi'
//   }

module.exports = {
    login:login,
    signup:signup,
    loginGoogle:loginGoogle,
    verifyGoogle:verifyGoogle
}