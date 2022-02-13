// imports
import { KEYS, createKeys, keyJobs, removeKeys } from "./keyboard.js";
import { PUZZLES } from "./puzzles.js";
import {
  snowManBuilder,
  hideSnowman,
  createSnowFlake,
} from "./snowman-flake.js";

// Elements
const KEYBOARD_DIV = document.getElementById("keyboard-container");
const NEW_PUZ_BTN = document.getElementById("newPuzzle");
const BLANKS_CONTAINER = document.getElementById("blanks-container");
const HINT_BTN = document.getElementById("hint-btn");
const HINT_TXT = document.getElementById("hint-txt");
const OUTCOME_WIN = document.getElementById("outcome-win");
const OUTCOME_LOSS = document.getElementById("outcome-loss");
const HIT_INC_CONTAINER = document.getElementById("hit-inc-container");
const DIFFICULTY = document.querySelector("#difficulty");
const PUZZLE_SCORE_DISPLAY = document.getElementById("puzzle-score")
const GAME_SCORE_DISPLAY = document.getElementById("game-score")
const PHRASE_COUNT = document.getElementById("phrase-count")

// Event Listeners
NEW_PUZ_BTN.addEventListener("click", () => {
  runSnowman();
});

HINT_BTN.addEventListener("click", () => {
  HINT_TXT.classList.toggle("not-visible");
});

//Scoring
let puzzleCount = 0;
let puzzleScore;
let gameScore = 0;
let isGameOver;
let miss = 0;
let snowStop;

const runSnowman = () => {
  DIFFICULTY.value === "easy" ? newPuzzleEasy() : newPuzzleHard();
  isGameOver = false;
};

const runReset = () => {
  if (!PUZZLES.length) {
    alert("You've exhausted the options, please refresh and play again!");
  } else {
    miss = 0;
    OUTCOME_WIN.style.display = "none";
    OUTCOME_LOSS.style.display = "none";
    hideSnowman();
    removeKeys(KEYBOARD_DIV);
    createKeys(KEYS);
    clearPuzzle();
    resetKeyboard();
    resetIncBars();
    clearInterval(snowStop);
  }
};
// USE THIS VERSION of getNewPuzzle WHEN DRAWING FROM MY SIMPLE ARRAY
const newPuzzleEasy = () => {
  resetPuzzleScore();
  let num = Math.floor(Math.random() * PUZZLES.length); //generates random index position in the array of possible PUZZLES
  let text = PUZZLES[num].text;
  let hint = PUZZLES[num].hint;
  OUTCOME_LOSS.textContent = `Oh no! You've been penalized 100 points for failing to reveal: ${text.toUpperCase()}`;
  HINT_BTN.style.display = "block";
  HINT_TXT.textContent = `Hint: ${hint}`;
  PUZZLES.splice(num, 1); //removes current puzzle from array
  runReset();
  buildPuzzle(text);
};

// USE THIS VERSION OF getNewPuzzle WHEN DRAWING FROM WORDS API
const newPuzzleHard = async () => {
  // await this fetch for api to respond
  resetPuzzleScore();
  let text = await fetch("https://random-words-api.vercel.app/word")
    .then((response) => response.json())
    .then((json) => json[0]);
  // console.log(`PUZZLE TEXT: ${text.word}`);
  OUTCOME_LOSS.textContent = `Oh no! You've been penalized 100 points for failing to reveal:'${text.word.toUpperCase()}'`;
  HINT_BTN.style.display = "block";
  HINT_TXT.textContent = `Hint: ${text.definition}`;
  runReset();
  buildPuzzle(text.word);
};

const resetKeyboard = () => {
  const KEY_DIVS = document.querySelectorAll(".key-div");
  for (let key of KEY_DIVS) {
    key.classList.remove("key-div-success");
    key.classList.remove("key-div-failure");
    key.classList.remove("key-div-game-over");
    key.classList.add("key-div-neutral");
  }
};



const resetPuzzleScore = () => {
  puzzleScore = 0;
  PUZZLE_SCORE_DISPLAY.textContent = `Current puzzle score: ${puzzleScore}`
}

const clearPuzzle = () => {
  //also clears hit stauts bar
  while (BLANKS_CONTAINER.firstChild) {
    BLANKS_CONTAINER.removeChild(BLANKS_CONTAINER.firstChild);
  }
  while (HIT_INC_CONTAINER.firstChild) {
    HIT_INC_CONTAINER.removeChild(HIT_INC_CONTAINER.firstChild);
  }
};

const resetIncBars = () => {
  const MISS_INC = document.querySelectorAll(".miss-inc");
  for (let x of MISS_INC) {
    x.classList.remove("miss-inc-active");
  }
};

export const checkGameStatus = () => {
  const BLANKS_REMAINING =
    document.getElementsByClassName("blanks-box-hidden").length;
  if (miss === 6) {
    gameScore = gameScore - 100; //Loss Penalty
    gameOverLose();
  }
  if (BLANKS_REMAINING === 0) {
    console.log(gameScore)
    gameScore = gameScore + 50; //Win Bonus
    console.log(gameScore)
    gameOverWin();
  }
};

const disableKeyboard = () => {
  const KEY_DIVS = document.querySelectorAll(".key-div");
  for (let key of KEY_DIVS) {
    key.removeEventListener("click", keyJobs);
  }
};

const gameOverLose = () => {
  isGameOver = true;
  OUTCOME_LOSS.style.display = "block";
  disableKeyboard();
  calcGameScore();
  puzzleCount++;
  PHRASE_COUNT.textContent = `Puzzles completed: ${puzzleCount}`
};

const gameOverWin = () => {
  isGameOver = true;
  OUTCOME_WIN.textContent = "Congratulations! +50 points!";
  OUTCOME_WIN.style.display = "block";
  disableKeyboard();
  calcGameScore();
  puzzleCount++;
  PHRASE_COUNT.textContent = `Puzzles completed: ${puzzleCount}`
  snowStop = setInterval(createSnowFlake, 20);
};

export const testLetter = (chosenKey, chosenKeyDiv) => {
  const ACTIVE_LETTERS_DIVS = document.querySelectorAll(".blanks-box");
  for (let blank of ACTIVE_LETTERS_DIVS) {
    if (blank.textContent === chosenKey) {
      blank.classList.remove("blanks-box-hidden");
      blank.classList.add("blanks-box-revealed");
    }
  }
  const ACTIVE_LETTERS_ARR = [...ACTIVE_LETTERS_DIVS].map((n) => n.textContent);
  if (ACTIVE_LETTERS_ARR.includes(chosenKey)) {
    chosenKeyDiv.classList.remove("key-div-neutral");
    chosenKeyDiv.classList.add("key-div-success");
  } else {
    chosenKeyDiv.classList.remove("key-div-neutral");
    chosenKeyDiv.classList.add("key-div-failure");
    miss++;
    const ALL_MISS_INCS = document.querySelectorAll(".miss-inc"); //these two lines increment the miss status bar
    ALL_MISS_INCS[miss - 1].classList.add("miss-inc-active");
  }
  logHits();
  calcPuzzleScore();
};

const logHits = () => {
  //accumulates green status bars as correct letters are guessed
  const BLANKS_REVEALED = document.getElementsByClassName(
    "blanks-box-revealed"
  ); //this is an HTMLcollection of the revealed blanks
  const BLANKS_SOLVED = [...BLANKS_REVEALED].length; //this is the length of an array containing the revealed blanks
  for (let i = 0; i + 1 <= BLANKS_SOLVED; i++) {
    const HIT_STATUS_DIVS = document.querySelectorAll(".hit-inc");
    const HIT_STATUS_ARR = [...HIT_STATUS_DIVS];
    HIT_STATUS_ARR[i].classList.add("hit-inc-active");
  }
  snowManBuilder();
};

const calcPuzzleScore = () => {
  const BLANKS_SOLVED = document.querySelectorAll(".blanks-box-revealed").length; //number of blanks revealed
  const BLANKS_TOTAL = document.getElementsByClassName("blanks-box").length; //total length of puzzle
  let x = Math.ceil((BLANKS_SOLVED / BLANKS_TOTAL) * 100); //x = percent solved
  if (DIFFICULTY.value === 'easy') {
    puzzleScore = x - (miss * 10);
  } else {
    puzzleScore = (x * 2) - (miss * 8);
  }

  PUZZLE_SCORE_DISPLAY.textContent = `Current puzzle score: ${puzzleScore}`
}

const calcGameScore = () => {
  gameScore += puzzleScore
  GAME_SCORE_DISPLAY.textContent = `Cumulative game score: ${gameScore}`
}

function buildPuzzle(puzzle) {
  let wordsArray = puzzle.split(" ");
  for (let word of wordsArray) {
    const WORD_BOX = document.createElement("div");
    WORD_BOX.className = "words-box";
    BLANKS_CONTAINER.appendChild(WORD_BOX);
    for (let letter of word) {
      const LETTER_DIV = document.createElement("div");
      LETTER_DIV.className = "blanks-box blanks-box-hidden";
      WORD_BOX.appendChild(LETTER_DIV);
      const LETTER_NODE = document.createTextNode(letter.toUpperCase());
      LETTER_DIV.appendChild(LETTER_NODE);
      const HIT_INC_DIV = document.createElement("div");
      HIT_INC_DIV.className = `hit-inc`;
      HIT_INC_CONTAINER.appendChild(HIT_INC_DIV);
    }
  }
}

// START THE GAME
runSnowman();


