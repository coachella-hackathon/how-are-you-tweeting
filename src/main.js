/* eslint-disable */
// import "bootstrap";
import "./style.css";
import anime from "animejs/lib/anime.es.js";

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
var timeout;
function changeText(username) {
  var section = document.getElementById("section");
  var title1 = document.getElementById("title-1");
  var title2 = document.getElementById("title-2");
  var content = document.getElementById("content");

  clearTimeout(timeout);
  timeout = setTimeout(function() {
    title1.innerHTML = "Hello";
    title2.innerHTML = "@" + username;
  }, 8000);
}
window.onload = function() {
  const username = getUrlParameter("username");

  changeText(username);
};
