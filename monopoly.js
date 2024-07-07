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
  document.querySelector("#RollDice").onclick = DiceRoll;
};

// globals
var currLocP1 = 0;
var currLocP2 = 0;
var p1Money = 3000;
var p2Money = 3000;
var total = 0;
var flag = 0;
var rrCountP1 = 0;
var rrCountP2 = 0;
const takeAChanceText = ["Second Place in Beauty Contest: $10", "Bank Pays You Dividend of $50", "Repair your Properties. You owe $250", "Speeding Fine: $15", "Holiday Fund Matures: Receive $100", "Pay Hospital Fees: $100"];
const takeAChanceMoney = [10, 50, -250, -15, 100, -100];

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

function DiceRoll() {
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;
  total = dice1 + dice2;
  // total = 5;

  //load dies
  var die1 = document.querySelector("#die01");
  die1.height = 50;
  var die2 = document.querySelector("#die02");
  die2.height = 50;
  document.querySelector(".buffer").innerHTML = "ROLL: " + total;

  if (dice1 == 1) {die1.src = d1.src;}
  else if (dice1 == 2) {die1.src = d2.src;}
  else if (dice1 == 3) {die1.src = d3.src;}
  else if (dice1 == 4) {die1.src = d4.src;}
  else if (dice1 == 5) {die1.src = d5.src;}
  else if (dice1 == 6) {die1.src = d6.src;}

  if (dice2 == 1) {die2.src = d1.src;}
  else if (dice2 == 2) {die2.src = d2.src;}
  else if (dice2 == 3) {die2.src = d3.src;}
  else if (dice2 == 4) {die2.src = d4.src;}
  else if (dice2 == 5) {die2.src = d5.src;}
  else if (dice2 == 6) {die2.src = d6.src;}

  //whose turn is it?
  if (flag == 0){
      currLocP1 = PlayerMove(currLocP1, play1);
      document.querySelector("#player1div").style.border = "none";
      document.querySelector("#player2div").style.border = "10px solid maroon";
      if (dice1 == dice2) {
          flag = 0;
      }
      else {
          flag = 1;
      }
  }
  else if (flag == 1) {
      currLocP2 = PlayerMove(currLocP2, play2);
      document.querySelector("#player2div").style.border = "none";
      document.querySelector("#player1div").style.border = "10px solid teal";
      if (dice1 == dice2) {
          flag = 1;
      }
      else {
          flag = 0;
      }
  }

  //update player money
  document.querySelector("#player1amt").innerHTML = "$" + p1Money;
  document.querySelector("#player2amt").innerHTML = "$" + p2Money;

  // GAME END
  if (p1Money < 0 ){
      alert("PLAYER 1 LOSES!");
      document.querySelector("#RollDice").disabled = true;
      console.log("PLAYER 1 LOSES!");
  }
  if (p2Money < 0 ){
      alert("PLAYER 2 LOSES!");
      document.querySelector("#RollDice").disabled = true;
      console.log("PLAYER 2 LOSES!");
  }
}

function PlayerMove(locP, player) {
  const speed = 100;
  var timer;
  var secAccess = document.querySelectorAll("section");
  var loc;

  if (locP + total < 40){
      for (var i = locP; i <= locP + total; i++) {
          secAccess[i].appendChild(player);
          loc = i;
      }
  }
  else {
      for (var i = locP; i <= 39; i++) {
          secAccess[i].appendChild(player);
      }
      for (var i = 0; i <= locP + total - 40; i++) {
          secAccess[i].appendChild(player);
          loc = i;
      }
      if (flag == 0){
          p1Money -= parseInt(secAccess[0].attributes.val.value);
      }
      else if (flag == 1) {
          p2Money -= parseInt(secAccess[0].attributes.val.value);
      }
      alert("You passed GO! You get $200");
  }

  locP = loc;
  locP = Interact(secAccess, locP, player);

  return locP;
}

function Interact(secAccess, locP, player) {
    // lands on unowned property
    if (secAccess[locP].classList.contains("z") && secAccess[locP].attributes.owned.value != "true"){
        secAccess[locP].attributes.owned.value = "true";
        secAccess[locP].style.color = "white";
        if (flag == 0) {
            secAccess[locP].style.background = "teal";
            p1Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        else if (flag == 1) {
            secAccess[locP].style.background = "maroon";
            p2Money -= parseInt(secAccess[locP].attributes.val.value);
        }

        // railroads
        if (secAccess[locP].classList.contains("rr")) {
            if (flag == 0) {
                if (rrCountP1 + rrCountP2 <= 4) {
                    rrCountP1 += 1;
                    console.log(rrCountP1);
                }
            }
            else if (flag == 1) {
                if (rrCountP1 + rrCountP2 <= 4) {
                    rrCountP2 += 1;
                }
            }
        }
    }
    // chance or community chest
    else if (secAccess[locP].classList.contains("cc") || secAccess[locP].classList.contains("chance")) {
        var rand = Math.floor(Math.random() * 6);
        if (flag == 0) {
            p1Money += takeAChanceMoney[rand];
        }
        else if (flag == 1) {
            p2Money += takeAChanceMoney[rand];
        }
        alert(takeAChanceText[rand]);
    }
    // free parking
    else if ((secAccess[locP].classList.contains("parking"))) {
        alert("You landed on Free Parking!");
    }
    // go
    else if ((secAccess[locP].classList.contains("go"))) {

    }
    // jail
    else if ((secAccess[locP].classList.contains("jail"))){
        if (flag == 0) {
            p1Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        else if (flag == 1) {
            p2Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        alert("You landed in JAIL! Pay $50")
    }
    // go to jail
    else if (secAccess[locP].classList.contains("goToJail")) {
        locP = 10;
        secAccess[locP].appendChild(player);

        if (flag == 0) {
            p1Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        else if (flag == 1) {
            p2Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        alert("GO TO JAIL! Pay $50");
    }
    // tax 
    else if (secAccess[locP].classList.contains("tax")) {
        if (flag == 0) {
            p1Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        else if (flag == 1) {
            p2Money -= parseInt(secAccess[locP].attributes.val.value);
        }
        console.log("TAX: " + secAccess[locP].attributes.val.value);
    }
    // land on owned property
    else if (secAccess[locP].attributes.owned.value == "true") {
        // railroad
        if (secAccess[locP].classList.contains("rr")) {
            if (flag == 0) {
                p1Money -= 25 * rrCountP2;
                p2Money += 25 * rrCountP2;
                console.log("Railroad rent: " + 25 * rrCountP2);
            }
            else if (flag == 1) {
                p2Money -= 25 * rrCountP1;
                p1Money += 25 * rrCountP1;
                console.log("Railroad rent: " + 25 * rrCountP1);
            }
        }
        // utility 
        else if (secAccess[locP].classList.contains("utility")) {
            if (flag == 0) {
                p1Money -= total * 5;
                p2Money += total * 5;
            }
            else if (flag == 1) {
                p2Money -= total * 5;
                p1Money += total * 5;
            }
            console.log("Utility rent: " + total * 5);
        }
        // coloured (increment of 10%)
        else {
            secAccess[locP].attributes.xland.value = parseInt(secAccess[locP].attributes.xland.value) + 1;

            if (flag == 0) {
                p1Money -= Math.ceil(parseInt(secAccess[locP].attributes.val.value) * 0.1 * 1.2 ** (parseInt(secAccess[locP].attributes.xland.value - 1)));
                p2Money += Math.ceil(parseInt(secAccess[locP].attributes.val.value) * 0.1 * 1.2 ** (parseInt(secAccess[locP].attributes.xland.value - 1)));
            }
            else if (flag == 1) {
                p2Money -= Math.ceil(parseInt(secAccess[locP].attributes.val.value) * 0.1 * 1.2 ** (parseInt(secAccess[locP].attributes.xland.value - 1)));
                p1Money += Math.ceil(parseInt(secAccess[locP].attributes.val.value) * 0.1 * 1.2 ** (parseInt(secAccess[locP].attributes.xland.value - 1)));
            }

            console.log("Name: " + secAccess[locP].attributes.id.value + " Times landed: " + secAccess[locP].attributes.xland.value + " Rent paid out: " + Math.ceil(parseInt(secAccess[locP].attributes.val.value) * 0.1 * 1.2 ** (parseInt(secAccess[locP].attributes.xland.value - 1))));
        }
    }

    return locP;
}