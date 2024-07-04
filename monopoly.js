// PRELOAD IMAGES
let p1 = new Image();
p1.src = "./images/blue.jpg";
let p2 = new Image();
p2.src = "./images/red.jpg";
var play1 = document.createElement("img");
var play2 = document.createElement("img");
let d1 = new Image();
d1.src = "./images/1.png";
let d2 = new Image();
d2.src = "./images/2.png";
let d3 = new Image();
d3.src = "./images/3.png";
let d4 = new Image();
d4.src = "./images/4.png";
let d5 = new Image();
d5.src = "./images/5.png";
let d6 = new Image();
d6.src = "./images/6.png";

window.onload = function () {
  GameBoard();
};

// globals
var p1Money = 3000;
var p2Money = 3000;

function GameBoard() {
  // load player models
  var player1 = document.querySelector("#player01");
  player1.height = 80;
  player1.src = p1.src;
  var player2 = document.querySelector("#player02");
  player2.height = 80;
  player2.src = p2.src;

  // load dies
  var die1 = document.querySelector("#die01");
  die1.height = 50;
  die1.src = d2.src;
  var die2 = document.querySelector("#die02");
  die2.height = 50;
  die2.src = d4.src;

  // display gameboard
  var secAccess = document.querySelectorAll("section");
  for (var i = 0; i < secAccess.length; i++) {
    var row = String(secAccess[i].attributes.suite.value).slice(0, 2);
    var col = String(secAccess[i].attributes.suite.value).slice(2, 4);
    secAccess[i].style.gridRow = row;
    secAccess[i].style.gridColumn = col;

    //display prices
    if (secAccess[i].attributes.val.value > 0) {
      secAccess[i].innerHTML += " $" + secAccess[i].attributes.val.value;
    }
  }

  //display player money
  document.querySelector("#player1amt").innerHTML = "$" + p1Money;
  document.querySelector("#player2amt").innerHTML = "$" + p2Money;

  // place player onto starting grid
  play1.height = 30;
  play1.src = p1.src;
  play2.height = 30;
  play2.src = p2.src;
  secAccess[0].appendChild(play1);
  secAccess[0].appendChild(play2);

  // highlight player turn
  document.querySelector("#player1div").style.border = "10px solid teal";

  console.log("help");
}
