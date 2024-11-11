const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
  const choice_idx = Math.floor(Math.random() * choices.length);
  return choices[choice_idx];
}
