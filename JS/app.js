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

// Event Listeners
NEW_PUZ_BTN.addEventListener("click", function () {
  runSnowman();
});

HINT_BTN.addEventListener("click", function () {
  if (HINT_TXT.style.color === "rgb(226, 226, 243)") {
    HINT_TXT.style.color = "#06060e";
  } else {
    HINT_TXT.style.color = "rgb(226, 226, 243)";
  }
});

let isGameOver;
let miss = 0;
let snowStop;

const resetScore = () => {
  miss = 0;
};

const runSnowman = () => {
  getNewPuzzle();
  isGameOver = false;
};

const runSetup = () => {
  hideSnowman();
  removeKeys(KEYBOARD_DIV);
  createKeys(KEYS);
  clearPuzzle();
  resetKeyboard();
  resetScore();
  resetIncBars();
  clearInterval(snowStop);
}
// USE THIS VERSION of getNewPuzzle WHEN DRAWING FROM MY SIMPLE ARRAY
const getNewPuzzle = () => {
  KEYBOARD_DIV.style.visibility = "visible";
  OUTCOME_WIN.style.display = "none";
  OUTCOME_LOSS.style.display = "none";
  runSetup();
  if (PUZZLES.length === 0) {
    alert("You've exhausted the options, please refresh and play again!");
  } else {
    if (document.querySelector("#difficulty").value === "easy") {
      let num = Math.floor(Math.random() * PUZZLES.length); //generates random index position in the array of possible PUZZLES
      // console.log(`INDEX OF PUZZLE: ${num}`);
      let text = PUZZLES[num].text;
      // console.log(`PUZZLE TEXT: ${text}`);
      let hint = PUZZLES[num].hint;
      // console.log(`PUZZLE HINT: ${hint}`);
      OUTCOME_LOSS.textContent = `Oh no! It was: ${text.toUpperCase()}`;
      buildPuzzle(text);
      HINT_BTN.style.display = "block";
      HINT_TXT.textContent = `Hint: ${hint}`;
      PUZZLES.splice(num, 1); //removes current puzzle from array
    } else if (document.querySelector("#difficulty").value === "hard") {
      getNewPuzzleHard(snowStop, KEYBOARD_DIV, KEYS);
    }
  }
};

// USE THIS VERSION OF getNewPuzzle WHEN DRAWING FROM WORDS API
const getNewPuzzleHard = async (snowStop, KEYBOARD_DIV, KEYS) => {
  hideSnowman();
  removeKeys(KEYBOARD_DIV);
  createKeys(KEYS);
  clearPuzzle();
  resetKeyboard();
  resetScore();
  resetIncBars();
  clearInterval(snowStop);
  // await this fetch for api to respond
  let text = await fetch("https://random-words-api.vercel.app/word")
    .then((response) => response.json())
    .then((json) => json[0]);
  console.log(`PUZZLE TEXT: ${text.word}`);
  // console.log(`PUZZLE HINT: ${text.definition}`)
  OUTCOME_LOSS.textContent = `Whoops! Correct answer: '${text.word.toUpperCase()}'`;
  buildPuzzle(text.word);
  HINT_BTN.style.display = "block";
  HINT_TXT.textContent = `Hint: ${text.definition}`;
};

const resetKeyboard = function () {
  const KEY_DIVS = document.querySelectorAll(".key-div");
  for (let key of KEY_DIVS) {
    key.classList.remove("key-div-success");
    key.classList.remove("key-div-failure");
    key.classList.remove("key-div-game-over");
    key.classList.add("key-div-neutral");
  }
};

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

getNewPuzzle(snowStop, KEYBOARD_DIV, KEYS);

export const checkGameStatus = () => {
  const BLANKS_REMAINING =
    document.getElementsByClassName("blanks-box-hidden").length;
  // console.log(`Blanks remaining: ${BLANKS_REMAINING}`)
  // console.log(`misses: ${miss}`)
  if (miss === 6) {
    gameOverLose();
  }
  if (BLANKS_REMAINING === 0) {
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
  // KEYBOARD_DIV.style.visibility = "hidden";
  OUTCOME_LOSS.style.display = "block";
  disableKeyboard();
};

const gameOverWin = () => {
  // console.log("game over")
  isGameOver = true;
  // KEYBOARD_DIV.style.visibility = "hidden";
  OUTCOME_WIN.textContent = "Congratulations!";
  OUTCOME_WIN.style.display = "block";
  disableKeyboard();
  snowStop = setInterval(createSnowFlake, 20);
};

export const testLetter = (chosenKey, chosenKeyDiv) => {
  // console.log(`chosenKey is ${chosenKey}`)
  // console.log(chosenKeyDiv)
  const ACTIVE_LETTERS_DIVS = document.querySelectorAll(".blanks-box");
  for (let blank of ACTIVE_LETTERS_DIVS) {
    if (blank.textContent === chosenKey) {
      blank.classList.remove("blanks-box-hidden");
      blank.classList.add("blanks-box-revealed");
    }
  }
  const ACTIVE_LETTERS_ARR = [...ACTIVE_LETTERS_DIVS].map((n) => n.textContent);
  // console.log(ACTIVE_LETTERS_DIVS)
  // console.log(ACTIVE_LETTERS_ARR)
  // console.log(`TOTAL LETTERS TO SOLVE: ${ACTIVE_LETTERS_ARR.length}`)
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
