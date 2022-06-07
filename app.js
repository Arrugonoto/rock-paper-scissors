const botChoices = ["rock", "paper", "scissors"];
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const displayUserScore = document.getElementById("user-score");
const displayBotScore = document.getElementById("computer-score");
const result = document.querySelector(".result p");
const resetButton = document.querySelector(".btn-reset");
const choice = document.querySelectorAll(".choice");
const numberOfRounds = document.querySelector(".round-number");

const selectDifficultyWindow = document.querySelector(
  ".difficulty-levels-container"
);
const shadyBg = document.querySelector(".hide-background");
const setEasy = document.querySelector("#easy");
const setMedium = document.querySelector("#medium");
const setExpert = document.querySelector("#expert");

let userScore = 0;
let computerScore = 0;
let botChoice = "";
let roundNumber = 1;
let pointsForWin;

numberOfRounds.textContent = roundNumber;

const countRoundNumber = () => {
  roundNumber++;
  numberOfRounds.textContent = roundNumber;
};

const rollAnswer = () => {
  botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];
};

rock.addEventListener("click", () => {
  countRoundNumber();
  rollAnswer();
  switch (botChoice) {
    case "rock":
      result.innerHTML = `<span class="user-color-font">Rock</span> 
         against <span class="bot-color-font">Rock</span>. Draw!`;
      break;
    case "paper":
      result.innerHTML = `<span class="bot-color-font">Paper</span> 
         covers <span class="user-color-font">Rock</span>. You lost!`;
      lost(rock);
      break;
    case "scissors":
      result.innerHTML = `<span class="user-color-font">Rock</span> 
         beats <span class="bot-color-font">Scissors</span>. You won!`;
      won(rock);
  }
  checkMatchResult();
});

paper.addEventListener("click", () => {
  countRoundNumber();
  rollAnswer();
  switch (botChoice) {
    case "rock":
      result.innerHTML = `<span class="user-color-font">Paper</span> 
         covers <span class="bot-color-font">Rock</span>. You won!`;
      won(paper);
      break;
    case "paper":
      result.innerHTML = `<span class="user-color-font">Paper</span> 
         against <span class="bot-color-font">Paper</span>. Draw!`;
      break;
    case "scissors":
      result.innerHTML = `<span class="bot-color-font">Scissors</span> beats 
         <span class="user-color-font">Paper</span>. You lost!`;
      lost(paper);
  }
  checkMatchResult();
});

scissors.addEventListener("click", () => {
  countRoundNumber();
  rollAnswer();
  switch (botChoice) {
    case "rock":
      result.innerHTML = `<span class="bot-color-font">Rock</span> beats
          <span class="user-color-font">Scissors</span>. You lost!`;
      lost(scissors);
      break;
    case "paper":
      result.innerHTML = `<span class="user-color-font">Scissors</span> beats
          <span class="bot-color-font">Paper</span>. You won!`;
      won(scissors);
      break;
    case "scissors":
      result.innerHTML = `<span class="user-color-font">Scissors</span>
          against <span class="bot-color-font">Scissors</span>. Draw!`;
  }
  checkMatchResult();
});

const won = (element) => {
  userScore++;
  displayUserScore.innerText = userScore;
  element.classList.add("effect-won");
  setTimeout(() => {
    element.classList.remove("effect-won");
  }, 500);
};

const lost = (element) => {
  computerScore++;
  displayBotScore.innerText = computerScore;
  element.classList.add("effect-lost");
  setTimeout(() => {
    element.classList.remove("effect-lost");
  }, 500);
};

const hideOptions = () => {
  selectDifficultyWindow.style.opacity = "0";
  selectDifficultyWindow.style.transform = `translate(-50%,
    -20%
  )`;
  shadyBg.style.opacity = "0";
  setTimeout(() => {
    selectDifficultyWindow.style.display = "none";
    shadyBg.style.display = "none";
  }, 400);
};

const displayWonMessage = (messageText) => {
  let textStyle = "text-won";
  showResult(messageText, textStyle);
};

const displayFailMessage = (messageText) => {
  let textStyle = "text-lost";
  showResult(messageText, textStyle);
};

const showResult = (messageText, textStyle) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("display-result");
  let gameOverContent = `<div class="result-wrapper"><h1 class="${textStyle}">${messageText}</h1><button class="btn-reset">restart game</button></div>`;
  messageContainer.innerHTML = gameOverContent;
  const resultWrapper = messageContainer.querySelector(".result-wrapper");

  resultWrapper.style.display = "flex";
  resultWrapper.style.flexDirection = "column";
  resultWrapper.style.alignItems = "center";
  const resetGameButton = messageContainer.querySelector(".btn-reset");
  resetGameButton.addEventListener("click", () => {
    resetGame();
    document.body.removeChild(messageContainer);
  });

  document.body.appendChild(messageContainer);
};

setEasy.addEventListener("click", () => {
  pointsForWin = 3;
  hideOptions();
});
setMedium.addEventListener("click", () => {
  pointsForWin = 6;
  hideOptions();
});
setExpert.addEventListener("click", () => {
  pointsForWin = 10;
  hideOptions();
});

const checkMatchResult = () => {
  let winText = "";
  let failText = "";

  if (userScore == pointsForWin && userScore == 3) {
    winText = "You won!";
    displayWonMessage(winText);
  } else if (computerScore == pointsForWin && computerScore == 3) {
    failText = "You lost!";
    displayFailMessage(failText);
  }

  if (userScore == pointsForWin && userScore == 6) {
    winText = "Impressive, You won!";
    displayWonMessage(winText);
  } else if (computerScore == pointsForWin && computerScore == 6) {
    failText = "I can't believe it, You lost!";
    displayFailMessage(failText);
  }
  if (userScore == pointsForWin && userScore == 10) {
    winText = "Impossible, You have cheated don't You?!";
    displayWonMessage(winText);
  } else if (computerScore == pointsForWin && computerScore == 10) {
    failText = "You lost! hehe";
    displayFailMessage(failText);
  }
};

const resetGame = () => {
  userScore = 0;
  computerScore = 0;
  displayUserScore.innerText = userScore;
  displayBotScore.innerText = computerScore;
  result.innerText = "";
  roundNumber = 1;
  numberOfRounds.innerText = roundNumber;
  selectDifficultyWindow.style.display = "flex";
  selectDifficultyWindow.style.transform = `translate(-50%,
    -50%
  )`;
  shadyBg.style.display = "block";
  selectDifficultyWindow.style.opacity = "1";
  shadyBg.style.opacity = "1";
};

resetButton.addEventListener("click", resetGame);
