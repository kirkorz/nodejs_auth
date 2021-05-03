const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
let keypair = {
  private: key.exportKey(),
  public: key.exportKey("public")
};
console.log(keypair);


const jwt = require("jsonwebtoken");
let obj = { "id": 1, "username": "mkhizeryounas" };
let privateKey = keypair.private;
obj["access_token"] = jwt.sign(obj, privateKey, { algorithm: "RS256",expiresIn:"1h"});
console.log("User", obj);

jwt.verify(obj["access_token"], keypair.public, 
{ algorithm: "RS256"}, 
function(err,decoded) {
    if(err) throw err;
    console.log("Verified token", decoded);
  });