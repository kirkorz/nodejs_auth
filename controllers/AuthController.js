const key = 
{   private:
    '-----BEGIN RSA PRIVATE KEY-----\nMIIBPAIBAAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/AypS5UV8NDFGaCdYstbYx\nrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQJBAJV5xsGayKxlcO0G+wKV\noKz/fihckw0o6kXTldGfnWUrQdWSEFeIznCeVbMRhntAiejVuIovLjvdRBp4mnn4\nTuECIQDk9eEK8lt5I8BgGHAgj5Y+DbIqngA74MtLUpz8LGOMUQIhAL4EFAUkzJtR\nlN9zQ7+FCSi+lvd7GUt2gJT2gfeK38VDAiEAwKlyG88CT/ZYi8QknhGVIFRQBvJ7\nSeeHybMTrFMB1XECIQCmpCb2l95EvJhGGu0oUkDFFdiJ89AsKSH9Ae7bLFSwxwIg\nK3LNRypKCfAF+64theNMPhQta3sO8EZoNJGc7WGIPh4=\n-----END RSA PRIVATE KEY-----',
    public:
    '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/A\nypS5UV8NDFGaCdYstbYxrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQ==\n-----END PUBLIC KEY-----' 
}
const jwtHelper = require("../helpers/jwt.helper");

const Dbquery = require('../dataquery/auth.js')


const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

let signup = async(req,res) =>{
    try{
        const result = Dbquery.singup(req.body);
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
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    login:login,
    signup:signup
}