const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
  const choiceIdx = Math.floor(Math.random() * choices.length);
  return choices[choiceIdx];
}
