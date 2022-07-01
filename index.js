"use strict";

let plScore = document.getElementById("playerScore");
let comScore = document.getElementById("comScore");
let updateText = document.getElementById("update");
const start = document.querySelector(".startGame");
const newGame = document.querySelector(".newGame");
const picks = document.querySelectorAll(".option");

const options = ["rock", "paper", "scissors"];
const computerPlay = function () {
  return options[Math.trunc(Math.random() * options.length)];
};

let playerPick;

picks.forEach((pick) => {
  pick.addEventListener("click", function () {
    updateText.textContent = "Waiting...";
    pick.style["pointer-events"] = "none";
    setTimeout(() => {
      let outcome = playRound(pick.getAttribute("id"), computerPlay());
      console.log(outcome);
      updateScore(outcome);

      pick.style["pointer-events"] = "auto";
    }, 1000);
  });
});

const playRound = function (playerSelection, computerSelection) {
  let winText, loseText, drawText;
  if (playerSelection.toLowerCase() === computerSelection) {
    drawText = `This round ended in a draw. You both chose ${playerSelection}.`;
    updateText.textContent = drawText;
    return drawText;
  }
  if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    loseText = `You lost this round! Computer chose ${computerSelection} and ${computerSelection.toLowerCase()} beats ${playerSelection}`;
    updateText.textContent = loseText;
    return loseText;
  } else {
    winText = `You won this round! Computer chose ${computerSelection} and ${playerSelection} beats ${computerSelection.toLowerCase()}`;
    updateText.textContent = winText;
    return winText;
  }
};

const whoWon = function () {
  let finalOutcome = "";

  if (+plScore.textContent === 5) {
    finalOutcome = `You Won! 🏆`;
  }
  if (+comScore.textContent === 5) {
    finalOutcome = `You Lost! 😢 Rematch? 😤`;
  }
  document.querySelector(".options").classList.add("hide");
  document.getElementById("select").style.display = "none";
  setTimeout(() => {
    updateText.style.fontSize = "2rem";
    updateText.textContent = finalOutcome;
  }, 2000);
};

const game = function () {
  document.querySelector(".options").classList.remove("hide");
  document.getElementById("select").style.display = "flex";
  updateText.textContent = "";
  plScore.textContent = 0;
  comScore.textContent = 0;
  newGame.classList.remove("hide");
  updateText.style.fontSize = "0.7rem";
};

const updateScore = function (outcome) {
  let gameOutcome = outcome;

  if (gameOutcome.split(" ").includes("won")) {
    plScore.textContent = +plScore.textContent + 1;
  }
  if (gameOutcome.split(" ").includes("lost")) {
    comScore.textContent = +comScore.textContent + 1;
  }
  if (gameOutcome.split(" ").includes("draw")) {
    console.log("draw");
  }
  if (+plScore.textContent === 5 || +comScore.textContent === 5) {
    picks.forEach((pick) => {
      pick.style["pointer-events"] = "none";
    });
    whoWon();
  }
};

const startGame = function () {
  game();
};

const getPick = function () {};

start.addEventListener("click", startGame);

newGame.addEventListener("click", startGame);
