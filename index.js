const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;
const serviceAccount = require("./a.json");

const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
app.use(express.json());
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/test', function(req,res) {
    console.dir(req.body);
    res.send('re');
})

app.post("/notify", function(req, res)  {
    console.dir(req.body);
  const message = {
    topic: req.headers.channel,
    notification: {
      title: req.body.title,
      body: req.body.msg,
    },
    data: {
      token: req.body.token,
    },
    android: {
      ttl: 4500,
      priority: "normal",
    },
    apns: {
      headers: {
        "apns-priority": "5",
        "apns-expiration": "1604750400",
      },
    },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      res.send(`Successfully sent message: ${response}`);
    })
    .catch((error) => {
      res.send(`Error sending message: ${error}`);
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at ${port}`
  );
});