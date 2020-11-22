/* eslint-disable */
// import "bootstrap";
import "./style.css";
var _ = require("lodash");
const config = require("../config");
var Chart = require("chart.js");

import { firebase } from "@firebase/app";
require("firebase/firestore");

// import "./assets/img/rigo-baby.jpg";
// import "./assets/img/4geeks.ico";

function getUrlParameter(sParam) {
  //Params should be spit by ? and & because freeboh returns us paramters with ? (should be & as we already have a parameter)
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split(/\?|\&/),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}
function changeText(data) {
  var section = document.getElementById("section");
  var title1 = document.getElementById("title-1");
  var title2 = document.getElementById("title-2");
  var content = document.getElementById("content");

  title1.innerHTML = data.title1;
  title2.innerHTML = data.title2;
  content.innerHTML = data.content;
}
window.onload = function() {
  // const username = getUrlParameter("username");
  firebase.initializeApp(config.firebaseConfig);
  const username = "WanderingQi";
  var clickCount = 0;
  var data = [{ title1: "Hello", title2: "@" + username, content: null }];

  var db = firebase.firestore();
  var docRef = db.collection("users").doc(username);

  // TO remove in prod
  // var getOptions = {
  //   source: "cache"
  // };

  docRef
    .get()
    .then(function(doc) {
      return doc.data();
    })
    .then(function(d) {
      delete d["additionalInfo"];
      delete d["userCategory"];
      const arr = Object.values(d);

      const tweetCount = arr.length;
      data.push({
        title1: "You Have Tweeted",
        title2: tweetCount + " Times",
        content: null
      });

      var tweetByMonthChartObj = _.countBy(arr, function(obj) {
        console.log(obj);
        return new Date(obj.created_at).toLocaleString("default", {
          month: "short"
        });
      });
      var tweetByMonthChartData = Object.keys(tweetByMonthChartObj).map(k => {
        return { x: tweetByMonthChartObj[k], y: k };
      });
      console.log(tweetByMonthChartData);
      var tweetByMonthChart = new Chart(
        document.getElementById("tweetByMonthChart").getContext("2d"),
        {
          type: "line",
          data: tweetByMonthChartData
          // options: options
        }
      );
      data.push({
        title1: "And You are So Active on Twitter",
        title2: null,
        content: tweetByMonthChart
      });

      document.getElementById("content").innerHTML = "Click to Continue";
      console.log(data);
    })
    .catch(function(error) {
      console.log("Error getting cached document:", error);
    });

  document.getElementById("body").addEventListener("click", function() {
    console.log(data);
    if (clickCount < data.length) {
      changeText(data[clickCount]);
      clickCount++;
    }
  });
};
