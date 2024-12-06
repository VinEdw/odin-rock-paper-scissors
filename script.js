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

function getHumanChoice() {
  let message = "Enter the number for one of the choices below:";
  for (let i = 0; i < choices.length; ++i) {
    const choice = choices[i];
    message += `\n- (${i + 1}) ${choice}`;
  }

  while (true) {
    let choiceIdx = +prompt(message) - 1;

    if (isNaN(choiceIdx) || choiceIdx < 0 || choiceIdx >= choices.length) {
      const invalidInputMessage = "Invalid input: Please try again";
      console.log(invalidInputMessage);
      continue;
    }

    return choices[choiceIdx];
  }
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
    console.log(`It's a tie! (${humanChoice} matches ${computerChoice})`);
    status = 0;
  }
  else if (idxDifference > threshold) {
    console.log(`You win! (${humanChoice} beats ${computerChoice})`);
    status = 1;
  }
  else {
    console.log(`You lose! (${humanChoice} is no match for ${computerChoice})`);
    status = -1;
  }

  return status;
}

/**
 * @param {number} rounds
 */
function playGame(rounds) {
  for (let i = 1; i <= rounds; ++i) {
    console.log(`Round ${i}:`);
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const outcome = playRound(humanChoice, computerChoice);

    if (outcome === 1) {
      ++humanScore;
    }
    else if (outcome === -1) {
      ++computerScore;
    }
  }

  console.log(`The ${rounds} rounds are done. The score is ${humanScore}-${computerScore}`);
  if (humanScore > computerScore) {
    console.log("You win!");
  }
  else if (humanScore < computerScore) {
    console.log("You lose!");
  }
  else {
    console.log("It's a tie!");
  }
}

playGame(5);
