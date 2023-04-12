"use strict";
// Set this value here
const roundsToPlay = 3;

const resultsEle = document.querySelector(".results");
const playButtons = document.querySelector(".playButtons");

const game = {
  // Centrally stored options makes it easier to compare
  // multiple options could be implemented with an array for beats/losesTo
  options: {
    rock: { beats: "scissors", losesTo: "paper" },
    paper: { beats: "rock", losesTo: "scissors" },
    scissors: { beats: "paper", losesTo: "rock" },
  },
};
const gameState = {
  computerScore: 0,
  playerScore: 0,
  roundsPlayed: 0,
  totalRounds: 5,
};

const log = function (message) {
  resultsEle.innerHTML += `${message} <br>`;
  console.log(message);
};

const getComputerChoice = function (validGameChoices) {
  // Randomly pick a valid index based on length of array
  const randomIndex = Math.floor(Math.random() * validGameChoices.length);
  return validGameChoices[randomIndex];
};

const compareChoices = function (computerChoice, playerChoice) {
  // Help debug
  log(`${playerChoice} v ${computerChoice}`);

  // Same? A tie
  if (computerChoice === playerChoice) return "a tie - need to play again";

  // Player wins? Let them know
  if (game.options[playerChoice].beats === computerChoice)
    return `${playerChoice} beats ${computerChoice} - player wins`;

  // Only other option is computer wins
  return `${computerChoice} beats ${playerChoice} - computer wins`;
  // Return a string depending on winner
};

const playRound = function (playerChoice) {
  // Array of the possible choices

  if (gameState.roundsPlayed === gameState.totalRounds) return;

  //
  const validGameChoices = Object.keys(game.options);

  log(`Round ${gameState.roundsPlayed + 1}`);
  const computerChoice = getComputerChoice(validGameChoices);

  // Compare them
  const resultMessage = compareChoices(computerChoice, playerChoice);
  log(resultMessage);

  // keep track of score - who won? increment score + rounds. tie? replay
  if (resultMessage.includes("player")) {
    gameState.playerScore++;
    console.groupEnd(`Round ${gameState.roundsPlayed + 1}`);
    gameState.roundsPlayed++;
  }
  if (resultMessage.includes("computer")) {
    gameState.computerScore++;
    console.groupEnd(`Round ${gameState.roundsPlayed + 1}`);
    gameState.roundsPlayed++;
  }

  // Stop when played enough rounds

  // report winner
  if (gameState.roundsPlayed === gameState.totalRounds)
    reportWinner(gameState.computerScore, gameState.playerScore);
};

const reportWinner = function (computerScore, playerScore) {
  // compare wins (based on an odd number of rounds)
  let winner = computerScore > playerScore ? "Computer" : "Player";
  let score =
    computerScore > playerScore
      ? `${computerScore} - ${playerScore}`
      : `${playerScore} - ${computerScore}`;
  // log message about winner
  log(`${winner} wins ${score}.`);
};

playButtons.addEventListener("click", function (e) {
  const btn = e.target.closest(".button");
  // Make sure a button was clicked
  if (!btn) return;

  // Start a new round with this choice
  playRound(btn.dataset.choice);
});
