var admin = require("firebase-admin");

//thay file firebase sdk
const serviceAccount = require("./firebase-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.notiConfig = admin;
