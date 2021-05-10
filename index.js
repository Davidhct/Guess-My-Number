let randNum = document.querySelector(".number");
let htmlBody = document.querySelector("body");
let guessInput = document.querySelector(".guess");
const modal = document.querySelector(".modal");
const GOModal = document.querySelector(".game-over-modal");
const GOoverlay = document.querySelector(".overlay-over");
const overlay = document.querySelector(".overlay");

document.querySelector(".again").addEventListener("click", resetGame);
document.querySelector(".check").addEventListener("click", gameLogic);
document.querySelector("#close-modal").addEventListener("click", closeModal);
document
  .querySelector("#game-over-close-modal")
  .addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
GOoverlay.addEventListener("click", closeModal);

window.addEventListener("keydown", function (event) {
  if (event.which === 13) {
    event.preventDefault();
    document.querySelector(".check").click();
  }
});

const winModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const gameOverModal = function () {
  GOModal.classList.remove("hidden-over");
  GOoverlay.classList.remove("hidden-over");
};

function closeModal(event) {
  if (
    event.target.id === "game-over-close-modal" ||
    event.target.classList.contains("overlay-over")
  ) {
    GOModal.classList.add("hidden-over");
    GOoverlay.classList.add("hidden-over");
  } else {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  resetGame();
}

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
    winModal();
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
      gameOverModal();
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
