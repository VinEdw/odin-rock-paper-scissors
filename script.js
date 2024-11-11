const choices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

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
