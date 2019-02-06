var firebase = require("firebase");

var config = {
   apiKey: "AIzaSyCAZNCdU-Rfn0vU39GFeuUGL5HZznfdsjY",
   authDomain: "cli-twitter-39fe6.firebaseapp.com",
   databaseURL: "https://cli-twitter-39fe6.firebaseio.com",
   projectId: "cli-twitter-39fe6",
   storageBucket: "cli-twitter-39fe6.appspot.com",
   messagingSenderId: "857085902107"
 };

firebase.initializeApp(config);
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);


module.exports = firebase