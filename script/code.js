"use strict";
// Set this value here
const roundsToPlay = 3;

const resultsEle = document.querySelector(".results");

const log = function (message) {
  resultsEle.innerHTML += `${message} <br>`;
  console.log(message);
};

const getComputerChoice = function (validGameChoices) {
  // Randomly pick a valid index based on length of array
  const randomIndex = Math.floor(Math.random() * validGameChoices.length);
  return validGameChoices[randomIndex];
};

const getPlayerChoice = function (validGameChoices) {
  // Prompt for choice
  let playerChoice;
  // Validation - could add alert if not met
  let valid = false;
  while (!valid) {
    playerChoice = prompt("(r)ock, (s)cissors or (p)aper?");
    valid = validGameChoices.includes(playerChoice);
  }
  // only return first character - all I need

  return playerChoice.charAt(0);
};

const compareChoices = function (computerChoice, playerChoice) {
  // lower case both inputs to start with to make checking easier
  let computerChoiceLower = computerChoice.toLowerCase();
  let playerChoiceLower = playerChoice.toLowerCase();

  log(`${computerChoiceLower} v ${playerChoiceLower}`);

  if (computerChoiceLower === playerChoiceLower)
    return "a tie - need to play again";

  if (computerChoiceLower === "r" && playerChoiceLower === "p")
    return "paper beats rock - player wins";

  if (computerChoiceLower === "r" && playerChoiceLower === "s")
    return "rock beats scissors - computer wins";

  if (computerChoiceLower === "p" && playerChoiceLower === "r")
    return "paper beats rock - computer wins";

  if (computerChoiceLower === "s" && playerChoiceLower === "r")
    return "rock beats scissors - player wins";

  if (computerChoiceLower === "s" && playerChoiceLower === "p")
    return "scissors beats paper - computer wins";

  if (computerChoiceLower === "p" && playerChoiceLower === "s")
    return "scissors beats paper - player wins";

  // Return a string depending on winner
};

const game = function (rounds) {
  // Array of the possible choices
  const validGameChoices = ["r", "p", "s"];
  let computerScore = 0;
  let playerScore = 0;

  // initialise condition
  let roundsPlayed = 0;
  let keepGoing = roundsPlayed < rounds;

  // repeat the game loop rounds times
  while (keepGoing) {
    // console.group would be better if these two lines only happened once per round
    console.group(`Round ${roundsPlayed + 1}`);
    log(`Round ${roundsPlayed + 1}`);
    const computerChoice = getComputerChoice(validGameChoices);
    const playerChoice = getPlayerChoice(validGameChoices);

    // Compare them
    const resultMessage = compareChoices(computerChoice, playerChoice);
    log(resultMessage);

    // keep track of score - who won? increment score + rounds. tie? replay
    if (resultMessage.includes("player")) {
      playerScore++;
      console.groupEnd(`Round ${roundsPlayed + 1}`);
      roundsPlayed++;
    }
    if (resultMessage.includes("computer")) {
      computerScore++;
      console.groupEnd(`Round ${roundsPlayed + 1}`);
      roundsPlayed++;
    }

    // Stop when played enough rounds
    if (roundsPlayed === rounds) keepGoing = false;
  }

  // report winner
  reportWinner(computerScore, playerScore);
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

game(roundsToPlay);
