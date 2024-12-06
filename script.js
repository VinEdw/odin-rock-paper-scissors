const choices = ["rock", "paper", "scissors"];
const winningScore = 5;
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;

function writeMessage(message) {
  const messageElement = document.querySelector("#messages");
  if (messageElement.textContent) {
    messageElement.textContent += "\n";
  }
  messageElement.textContent += message;
}

function getComputerChoice() {
  const choiceIdx = Math.floor(Math.random() * choices.length);
  return choices[choiceIdx];
}

function modulo(n, d) {
  return ((n % d) + d) % d;
}

/**
 * @param {string} humanChoice 
 * @param {string} computerChoice
 * @returns {number}
 */
function playRound(humanChoice, computerChoice) {
  const humanChoiceIdx = choices.indexOf(humanChoice.toLowerCase());
  const computerChoiceIdx = choices.indexOf(computerChoice.toLowerCase());

  const idxDifference = modulo(computerChoiceIdx - humanChoiceIdx, choices.length);
  const threshold = Math.floor(choices.length / 2);

  let status;
  if (idxDifference === 0) {
    writeMessage(`- It's a tie! (${humanChoice} matches ${computerChoice})`);
    status = 0;
  }
  else if (idxDifference > threshold) {
    writeMessage(`- You win! (${humanChoice} beats ${computerChoice})`);
    status = 1;
  }
  else {
    writeMessage(`- You lose! (${humanChoice} is no match for ${computerChoice})`);
    status = -1;
  }

  return status;
}

/**
 * @param {string} humanChoice 
 */
function playGame(humanChoice) {
  const computerChoice = getComputerChoice();
  const outcome = playRound(humanChoice, computerChoice);

  if (outcome === 1) {
    ++humanScore;
  }
  else if (outcome === -1) {
    ++computerScore;
  }

  ++currentRound;
  const scoreString = `(${humanScore}-${computerScore})`;

  if (humanScore >= winningScore) {
    writeMessage("====================");
    writeMessage(`You win! ${scoreString}`);
    removeHumanChoiceEventListeners();
  }
  else if (computerScore >= winningScore) {
    writeMessage("====================");
    writeMessage(`You lose! ${scoreString}`);
    removeHumanChoiceEventListeners();
  }
  else {
    writeMessage(`Round ${currentRound} ${scoreString}:`);
  }
}

/**
 * @param {PointerEvent} e
 */
function humanChoiceButtonHandler(e) {
  const button = e.target;
  const choice = button.value;
  playGame(choice);
}

function addHumanChoiceEventListeners() {
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(button => button.addEventListener("click", humanChoiceButtonHandler));
}

function removeHumanChoiceEventListeners() {
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(button => button.removeEventListener("click", humanChoiceButtonHandler));
}

addHumanChoiceEventListeners();
