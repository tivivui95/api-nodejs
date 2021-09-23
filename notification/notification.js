const admin = require("./notification-config").notiConfig;
//thay registration token

function sendPushNotification(message) {
  admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      console.log(response.successCount + " messages were sent successfully");
    })
    .catch((error) => {
      console.log("Error sending message: ", error);
    });
}
module.exports.sendPushNotification = sendPushNotification;
