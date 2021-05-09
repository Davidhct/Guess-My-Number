let randNum = document.querySelector(".number");
let htmlBody = document.querySelector("body");
let guessInput = document.querySelector(".guess");

document.querySelector(".again").addEventListener("click", resetGame);
document.querySelector(".check").addEventListener("click", gameLogic);

window.addEventListener("keydown", function (event) {
  if (event.which === 13) {
    event.preventDefault();
    document.querySelector(".check").click();
  }
});

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

function setMessage(message) {
  document.querySelector(".message").textContent = message;
}
function setScore(newScore) {
  document.querySelector(".score").textContent = newScore;
}

function gameLogic() {
  const guess = Number(guessInput.value);

  // no input
  if (!guess) {
    setMessage("⛔ No number!");

    // player wins
  } else if (guess === secretNumber) {
    setMessage("🎯 You win!!!");
    randNum.textContent = secretNumber;

    htmlBody.style.backgroundColor = "rgb(96, 179, 71)";
    randNum.style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    // guessing to high
  } else if (guess !== secretNumber) {
    if (score > 1) {
      let mess = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
      setMessage(mess);
      score--;

      setScore(score);
    } else {
      setMessage("😵 Game Over!");
      setScore(0);
    }
  }
}

function resetGame() {
  score = 20;
  setScore(score);
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  randNum.textContent = "?";
  setMessage("Start guessing...");
  guessInput.value = "";
  htmlBody.style.backgroundColor = "rgb(89 70 70)";
  randNum.style.width = "15rem";
}
