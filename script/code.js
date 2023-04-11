const getComputerChoice = function (possibleChoices) {
  // Pick Rock, Paper or Scissors randomly
  // Log it for testing
  // Return that value
};

const getPlayerChoice = function (possibleChoices) {
  // Ask for choice
  // Ignore validation
  // Log it for testing
  // Return that value
};

const compareChoices = function (computerChoice, playerChoice) {
  // lower case both inputs to start with to make checking easier
  let computerChoiceLower = computerChoice.toLowerCase();
  let playerChoiceLower = playerChoice.toLowerCase();

  console.log(`${computerChoiceLower} v ${playerChoiceLower}`);

  if (computerChoiceLower === playerChoiceLower) return "a tie";

  if (computerChoiceLower === "rock" && playerChoiceLower === "paper")
    return "paper beats rock - player wins";

  if (computerChoiceLower === "rock" && playerChoiceLower === "scissors")
    return "rock beats scissors - computer wins";

  if (computerChoiceLower === "paper" && playerChoiceLower === "rock")
    return "paper beats rock - computer wins";

  if (computerChoiceLower === "scissors" && playerChoiceLower === "rock")
    return "rock beats scissors - player wins";

  // Return a string depending on winner
};

const game = function (rounds) {
  // Array of the possible choices
  const validGameChoices = ["rock", "paper", "scissors"];
  let computerScore = 0;
  let playerScore = 0;

  let roundsPlayed = 0;
  keepGoing = true;
  while (keepGoing) {
    // repeat the game loop rounds times
    // getComputerChoice
    const computerChoice = "rock";
    // getPlayerChoice
    const playerChoice = "paper";
    // Compare them
    const resultMessage = compareChoices(computerChoice, playerChoice);
    console.log(resultMessage);

    // keep track of score - who won? increment score + rounds. tie? replay
    if (resultMessage.includes("player")) {
      playerScore++;
      roundsPlayed++;
    }
    if (resultMessage.includes("computer")) {
      computerScore++;
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

  // log message about winner
  console.log(`${winner} wins overall!`);
};

game(5);
