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
  const username = getUrlParameter("username");
  firebase.initializeApp(config.firebaseConfig);
  // const username = "WanderingQi";
  console.log(username);
  var clickCount = 0;
  var data = [{ title1: "Hello", title2: "@" + username, content: null }];

  var db = firebase.firestore();
  var docRef = db.collection("users").doc(username);

  docRef
    .get()
    .then(function(doc) {
      return doc.data();
    })
    .then(function(d) {
      var profileImg = d.additionalInfo.profile_image_url;
      delete d["additionalInfo"];
      delete d["userCategory"];
      const arr = Object.values(d);

      const tweetCount = arr.length;
      data.push({
        title1: "You Have Tweeted",
        title2: tweetCount + " Times",
        content: null
      });
      data.push({
        title1: "In",
        title2: "2020",
        content: null
      });
      data.push({
        title1: "It's not the",
        title2: "Easiest Time",
        content: null
      });

      data.push({
        title1: "There are",
        title2: "Happy Moments",
        content: `<div class="card">
        <img
          src=${profileImg}
        />
        <div class="card-content">
          <h3>${username}</h3>
          <p>${arr[5].tweet_text}</p>
        </div>
      </div>
      `
      });

      data.push({
        title1: "And",
        title2: "Sad Ones",
        content: `<div class="card">
        <img
          src=${profileImg}
        />
        <div class="card-content">
          <h3>${username}</h3>
          <p>${arr[1].tweet_text}</p>
        </div>
      </div>
      `
      });

      data.push({
        title1: "But",
        title2: "We Are Here For You",
        content: null
      });
      data.push({
        title1: "We have Prepared a",
        title2: "Special 🎁 For You",
        content: "Click anywhere to find out"
      });

      document.getElementById("content").innerHTML = "Click to Continue";
      console.log(data);
    })
    .catch(function(error) {
      console.log("Error getting cached document:", error);
    });

  document.getElementById("body").addEventListener("click", function() {
    if (clickCount < data.length) {
      changeText(data[clickCount]);
      clickCount++;
    } else {
      window.location.href = "https://twitter.com/messages";
    }
  });
};
