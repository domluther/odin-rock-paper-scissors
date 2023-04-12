"use strict";

const resultsEle = document.querySelector(".results");
const playerScoreEle = document.querySelector(".playerScore");
const computerScoreEle = document.querySelector(".computerScore");
const playerChoiceEle = document.querySelector(".playerChoice");
const computerChoiceEle = document.querySelector(".computerChoice");
const roundNumberEle = document.querySelector(".roundNumber");
const winnerEle = document.querySelector(".winner");
const newGameButton = document.querySelector(".newGameButton");
const playButtons = document.querySelector(".playButtons");
const difficultySelector = document.querySelector("#difficultySelector");

const game = {
  // Centrally stored options makes it easier to compare
  // multiple options could be implemented with an array for beats/losesTo
  options: {
    "🪨": { beats: "✂️", losesTo: "📄" },
    "📄": { beats: "🪨", losesTo: "✂️" },
    "✂️": { beats: "📄", losesTo: "🪨" },
  },
  mode: "normal",
  gameState: {
    computerScore: 0,
    playerScore: 0,
    round: 1,
    totalRounds: 5,
  },
  roundState: {
    playerChoice: "",
    computerChoice: [],
  },
};

const validGameChoices = Object.keys(game.options);

const getComputerChoice = function (resultsRequired = 2) {
  // By default generates two results - easier than
  const results = [];

  for (let i = 0; i < resultsRequired; i++) {
    const randomIndex = Math.floor(Math.random() * validGameChoices.length);
    results.push(validGameChoices[randomIndex]);
  }
  return results;
};

const compareChoices = function (computerChoice, playerChoice, again = false) {
  // Help debug
  log(
    `${again ? "a second chance : " : ""}${playerChoice} v ${computerChoice}`
  );
  showPlayerChoice(playerChoice);
  showComputerChoice(computerChoice);
  // Same? A tie
  if (computerChoice === playerChoice) return "a tie - need to play again";

  // Player wins? Let them know
  if (game.options[playerChoice].beats === computerChoice)
    return `${playerChoice} beats ${computerChoice} - 🧒 wins`;

  // Only other option is computer wins
  return `${computerChoice} beats ${playerChoice} - 💻 wins`;
};

const playRound = function () {
  // Array of the possible choices

  if (game.gameState.round > game.gameState.totalRounds) return;

  let resultMessage;

  const playerChoice = game.roundState.playerChoice;
  log(`Round ${game.gameState.round}`);
  showRoundNumber();
  let computerChoice = getComputerChoice();

  // In normal mode - just win once. That's all we need.
  if (game.mode === "normal") {
    computerChoice = computerChoice[0];
    // Compare them
    resultMessage = compareChoices(computerChoice, playerChoice);
  }
  if (game.mode === "easy") {
    resultMessage = compareChoices(computerChoice[0], playerChoice);
    resultMessage = resultMessage.includes("💻")
      ? compareChoices(computerChoice[1], playerChoice, true)
      : resultMessage;
  }

  if (game.mode === "hard") {
    resultMessage = compareChoices(computerChoice[0], playerChoice);
    resultMessage = resultMessage.includes("🧒")
      ? compareChoices(computerChoice[1], playerChoice, true)
      : resultMessage;
  }
  log(resultMessage);

  // keep track of score - who won? increment score + rounds. tie? replay
  if (resultMessage.includes("🧒")) {
    game.gameState.playerScore++;
    game.gameState.round++;
  }
  if (resultMessage.includes("💻")) {
    game.gameState.computerScore++;
    game.gameState.round++;
  }

  showScores();

  // report winner
  if (game.gameState.round > game.gameState.totalRounds)
    reportWinner(game.gameState.computerScore, game.gameState.playerScore);
};

const reportWinner = function (computerScore, playerScore) {
  // compare wins (based on an odd number of rounds)
  let winner = computerScore > playerScore ? "💻" : "🧒";
  let score =
    computerScore > playerScore
      ? `${computerScore} - ${playerScore}`
      : `${playerScore} - ${computerScore}`;
  // log message about winner
  log(`${winner} wins ${score}.`);
  showWinner(`${winner} wins ${score}.`);
  newGameButton.classList.remove("hidden");
};

playButtons.addEventListener("click", function (e) {
  const btn = e.target.closest(".button");
  // Make sure a button was clicked
  if (!btn) return;

  game.roundState.playerChoice = btn.dataset.choice;
  // Start a new round with this choice
  playRound();
});

difficultySelector.addEventListener("change", function (e) {
  log(`Difficulty set to ${e.target.value}`);
  resetGame();
  game.mode = e.target.value;
});

newGameButton.addEventListener("click", function (e) {
  const btn = e.target.closest(".button");
  if (!btn) return;
  resetGame();
});

const resetGame = function () {
  log("Game reset");
  game.gameState.computerScore = 0;
  game.gameState.playerScore = 0;
  game.gameState.round = 1;
  game.gameState.totalRounds = 5;
  setEleText(roundNumberEle, " ");
  setEleText(playerChoiceEle, " ");
  setEleText(computerChoiceEle, " ");
  setEleText(playerScoreEle, " ");
  setEleText(computerScoreEle, " ");
  setEleText(winnerEle, " ");
  newGameButton.classList.add("hidden");
};

const showRoundNumber = function () {
  setEleText(roundNumberEle, `Round ${game.gameState.round}`);
};

const showPlayerChoice = function (playerChoice) {
  setEleText(playerChoiceEle, `${playerChoice}`);
};

const showComputerChoice = function (computerChoice) {
  setEleText(computerChoiceEle, `${computerChoice}`);
};

const showScores = function () {
  setEleText(playerScoreEle, game.gameState.playerScore);
  setEleText(computerScoreEle, game.gameState.computerScore);
};

const setEleText = function (ele, text) {
  ele.textContent = text;
};

const showWinner = function (message) {
  setEleText(winnerEle, message);
};

const log = function (message) {
  // resultsEle.innerHTML += `${message} <br>`;
  console.log(message);
};
