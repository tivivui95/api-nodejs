const express = require('express');
const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const app = express();
app.use(express.json());
const notificationByToken = require("./notification/notification");

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array());

function pushNotification(title, body, channel, tokens) {
    const message = {
      notification: {
        title: title,
        body: body,
        channel: channel,
      },
      tokens: tokens,
    };
    const x = notificationByToken.sendPushNotification(message);
    console.log(x);
  }
  
  app.post("/SendNotification", function(req, res) {
    const title = req.body.title;
    const msg = req.body.msg;
    const channel = req.body.channel;
    var tokens = req.headers.tokens;
  
    console.log("Token is: " + req.headers.tokens);
    console.dir(req.body);
  
    if (!tokens) {
      tokens = ['AIzaSyAcmuYWGdgwuBx4KPqGqqlEP8-I3xmdFY4'];
    }
  
    if (!title) {
      console.log("Failed title");
      res.send("No title");
      return;
    }
    if (!msg) {
      console.log("Failed content");
      res.send("No message");
      return;
    }
  
    const x = pushNotification(title, msg, channel, tokens);
    if (!x) res.send("success");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port: ", port));