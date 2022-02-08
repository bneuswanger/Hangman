// Keyboard related items and functionality
import { testLetter, checkGameStatus } from "./app.js";

const KEYBOARD_DIV = document.getElementById("keyboard-container");

const createKeys = () => {
  for (let key of KEYS) {
    const KEY_DIV = document.createElement("div"); //create the div and attach it to KEYBOARD_DIV
    KEY_DIV.className = "key-div key-div-neutral";
    KEYBOARD_DIV.appendChild(KEY_DIV);

    const KEY_PARA = document.createElement("p"); //create a paragraph tag for the key label to live inside and attach it to the KEY_DIV
    KEY_PARA.className = "keyLabel";
    KEY_DIV.appendChild(KEY_PARA);

    let keyLabel = document.createTextNode(key); //create a letter for the key label
    keyLabel.className = "keyLabel";
    KEY_PARA.appendChild(keyLabel);
    KEY_DIV.addEventListener("click", keyJobs, { once: true });
  }
};

const keyJobs = function () {
  //don't convert this to an arrow function!
  let chosenKey = this.textContent;
  testLetter(chosenKey, this); //works; key value is passed into checkPuzzle function. breaks if use arrow function
  checkGameStatus();
};

const removeKeys = (KEYBOARD_DIV) => {
  while (KEYBOARD_DIV.firstChild) {
    KEYBOARD_DIV.removeChild(KEYBOARD_DIV.firstChild);
  }
};

const KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "!",
  "?",
];

export { KEYS, createKeys, keyJobs, removeKeys };
