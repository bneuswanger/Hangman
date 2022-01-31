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
    "?"
];
const PUZZLES = [
    {
        text: "hi there!",
        hint: "A salutation, of sorts"
    },
    {
        text: "It is snowing!",
        hint: "Floridians rarely say it"
    },
    {
        text: "Hello world",
        hint: "A coders salutation"
    },
    {
        text: "who are you?",
        hint: "Who who, who who?"
    },
    {
        text: "california",
        hint: "US State"
    },
    {
        text: "mitochondrion",
        hint: "A powerhouse"
    },
    {
        text: "Yellowstone",
        hint: "Both a park and a TV show"
    },
    {
        text: "kayak",
        hint: "A watercraft"
    },
    {
        text: "walleye",
        hint: "A type of fish"
    },
    {
        text: "elbow",
        hint: "A bendy body part"
    },
    {
        text: "this is a long one with many small words",
        hint: "It is what it is!"
    },
    {
        text: "loon",
        hint: "An eccentric bird"
    },
    {
        text: "green bay packers",
        hint: "A sports team"
    },
    {
        text: "have you ever seen the rain?",
        hint: "Fogerty wants to know"
    }
];
const KEYBOARD_DIV = document.getElementById("keyboard-container");
const NEW_PUZ_BTN = document.getElementById("newPuzzle");
const BLANKS_CONTAINER = document.getElementById("blanks-container");
const HINT_BTN = document.getElementById("hint-btn");
const HINT_TXT = document.getElementById("hint-txt");
const OUTCOME_TXT = document.getElementById("outcome");
const HIT_INC_CONTAINER = document.getElementById("hit-inc-container");

let isGameOver = false; //this isn't used anywhere yet, but the boolean works
let hit = 0;
let miss = 0;
let snowStop;

const resetScore = () => {
    hit = 0;
    miss = 0;
};

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

        KEY_DIV.addEventListener(
            "click",
            function () {
                let chosenKey = this.innerText;
                testLetter(chosenKey, this); //works; key value is passed into checkPuzzle function
                checkGameStatus();
            },
            { once: true }
        );
    }
};

const removeKeys = (KEYBOARD_DIV) => {
    while (KEYBOARD_DIV.firstChild) {
        KEYBOARD_DIV.removeChild(KEYBOARD_DIV.firstChild);
    }
};

// USE THIS VERSION of getNewPuzzle WHEN DRAWING FROM MY SIMPLE ARRAY
const getNewPuzzle = (snowStop, KEYBOARD_DIV, KEYS) => {
    hideSnowman();
    removeKeys(KEYBOARD_DIV);
    createKeys(KEYS);
    clearPuzzle();
    resetKeyboard();
    resetScore();
    resetIncBars();
    clearInterval(snowStop);
    if (PUZZLES.length === 0) {
        alert("You've exhausted the options, please refresh and play again!")
    } else {
        let num = Math.floor(Math.random() * (PUZZLES.length));     //generates random index position in the array of possible PUZZLES
        // console.log(`INDEX OF PUZZLE: ${num}`);
        let text = PUZZLES[num].text;
        // console.log(`PUZZLE TEXT: ${text}`);
        let hint = PUZZLES[num].hint;
        // console.log(`PUZZLE HINT: ${hint}`);
        buildPuzzle(text);
        HINT_BTN.style.display = "block";
        HINT_TXT.innerText = `Hint: ${hint}`;
        PUZZLES.splice(num, 1); //removes current puzzle from array
    }
};

//USE THIS VERSION OF getNewPuzzle WHEN DRAWING FROM WORDS API
// const getNewPuzzle = async (snowStop, KEYBOARD_DIV, KEYS) => {
//     hideSnowman();
//     removeKeys(KEYBOARD_DIV);
//     createKeys(KEYS);
//     clearPuzzle();
//     resetKeyboard();
//     resetScore();
//     resetIncBars();
//     clearInterval(snowStop);
//     // await this fetch for api to respond
//     let text = await fetch("https://random-words-api.vercel.app/word")
//         .then((response) => response.json())
//         .then((json) => json[0]);
//     console.log(`PUZZLE TEXT: ${text.word}`);
//     // console.log(`PUZZLE HINT: ${text.definition}`)
//     buildPuzzle(text.word);
//     HINT_BTN.style.display = "block";
//     HINT_TXT.innerText = `Hint: ${text.definition}`;
// };

const resetKeyboard = function () {
    const KEY_DIVS = document.querySelectorAll(".key-div");
    for (let key of KEY_DIVS) {
        key.classList.remove("key-div-success");
        key.classList.remove("key-div-failure");
        key.classList.remove("key-div-game-over");
        key.classList.add("key-div-neutral");
    }
};

const clearPuzzle = () => { //also clears hit stauts bar
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

const hideSnowman = () => {
    document.querySelector('.floor').style.visibility = "hidden"
    document.querySelector('.body-bottom').style.visibility = "hidden"
    document.querySelector('.body-middle').style.visibility = "hidden"
    document.querySelector('.head').style.visibility = "hidden"
    document.querySelector('.arm1').style.visibility = "hidden"
    document.querySelector('.arm2').style.visibility = "hidden"
    document.querySelector('.eye-container').style.visibility = "hidden"
    document.querySelector('.eye1').style.visibility = "hidden"
    document.querySelector('.eye2').style.visibility = "hidden"
    document.querySelector('.nose').style.visibility = "hidden"
    document.querySelector('.mouth').style.visibility = "hidden"
    document.querySelector('.hat').style.visibility = "hidden"
    hideButtons();
}

const addButtons = () => {
    const BUTTONS = document.querySelectorAll('.buttons')
    const BUTTONS_ARR = [...BUTTONS];
    for (let button of BUTTONS_ARR) {
        button.style.visibility = "visible";
    }
}
const hideButtons = () => {
    const BUTTONS = document.querySelectorAll('.buttons')
    const BUTTONS_ARR = [...BUTTONS];
    for (let button of BUTTONS_ARR) {
        button.style.visibility = "hidden";
    }
}

getNewPuzzle(snowStop, KEYBOARD_DIV, KEYS);

const checkGameStatus = () => {
    const BLANKS_REMAINING = document.getElementsByClassName("blanks-box-hidden")
        .length;
    // console.log(`Blanks remaining: ${BLANKS_REMAINING}`)
    // console.log(`misses: ${miss}`)
    if (BLANKS_REMAINING === 0) {
        gameOverWin();
    }
    if (miss === 6) {
        gameOverLose();
    }
};

const gameOverLose = () => {
    isGameOver = true;
    KEYBOARD_DIV.style.display = "none";
    OUTCOME_TXT.innerText = "Better luck next time!";
    OUTCOME_TXT.style.display = "block";
};

const gameOverWin = () => {
    // console.log("game over")
    isGameOver = true;
    KEYBOARD_DIV.style.display = "none";
    OUTCOME_TXT.innerText = "Congratulations!";
    OUTCOME_TXT.style.display = "block";
    snowStop = setInterval(createSnowFlake, 20);
};

const testLetter = (chosenKey, chosenKeyDiv) => {
    // console.log(`chosenKey is ${chosenKey}`)
    // console.log(chosenKeyDiv)
    const ACTIVE_LETTERS_DIVS = document.querySelectorAll(".blanks-box");
    for (let blank of ACTIVE_LETTERS_DIVS) {
        if (blank.innerText === chosenKey) {
            blank.classList.remove("blanks-box-hidden");
            blank.classList.add("blanks-box-revealed");
        }
    }
    const ACTIVE_LETTERS_ARR = [...ACTIVE_LETTERS_DIVS].map((n) => n.innerText);
    // console.log(ACTIVE_LETTERS_DIVS)
    // console.log(ACTIVE_LETTERS_ARR)
    // console.log(`TOTAL LETTERS TO SOLVE: ${ACTIVE_LETTERS_ARR.length}`)
    if (ACTIVE_LETTERS_ARR.includes(chosenKey)) {
        chosenKeyDiv.classList.remove("key-div-neutral");
        chosenKeyDiv.classList.add("key-div-success");
        hit++;
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
    const BLANKS_REVEALED = document.getElementsByClassName("blanks-box-revealed"); //this is an HTMLcollection of the revealed blanks
    const BLANKS_SOLVED = [...BLANKS_REVEALED].length; //this is the length of an array containing the revealed blanks
    // console.log(`Solved: ${BLANKS_SOLVED}`);
    // const unsolved = document.getElementsByClassName('blanks-box-hidden').length;
    // console.log(`Unsolved: ${unsolved}`)
    // const total = document.getElementsByClassName('blanks-box').length;
    // console.log(`Total: ${total}`)
    for (let i = 0; i + 1 <= BLANKS_SOLVED; i++) {
        const HIT_STATUS_DIVS = document.querySelectorAll(".hit-inc");
        const HIT_STATUS_ARR = [...HIT_STATUS_DIVS];
        HIT_STATUS_ARR[i].classList.add("hit-inc-active");
    }
    snowManBuilder();
};


NEW_PUZ_BTN.addEventListener("click", function () {
    getNewPuzzle(snowStop, KEYBOARD_DIV, KEYS);
    isGameOver = false;
    KEYBOARD_DIV.style.display = "grid";
    OUTCOME_TXT.style.display = "none";
});

HINT_BTN.addEventListener("click", function () {
    if (HINT_TXT.style.color === "white") {
        HINT_TXT.style.color = "#06060E";
    } else {
        HINT_TXT.style.color = "white";
    }
});

function buildPuzzle(puzzle) {
    //also builds hit status bar
    // console.log(puzzle)
    let wordsArray = puzzle.split(" ");
    // console.log(wordsArray);
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

function createSnowFlake() {
    const BODY = document.querySelector("body");
    const SNOW_DIV = document.createElement("div");
    const FLAKE_ARR = ["❄", "❅", "❊", "❉"];
    const RAND_FLAKE = FLAKE_ARR[Math.floor(Math.random() * 4)];
    SNOW_DIV.innerText = RAND_FLAKE;
    SNOW_DIV.classList.add("snow");
    SNOW_DIV.style.left = Math.random() * (window.innerWidth / 1.03) + "px";
    let rand = Math.random() * 8 + 2;
    let timeout = rand * 990;
    SNOW_DIV.style.animationDuration = rand + "s";
    SNOW_DIV.style.opacity = Math.random() + 0.3;
    SNOW_DIV.style.fontSize = Math.random() * 30 + "px";
    BODY.appendChild(SNOW_DIV);
    setTimeout(() => {
        SNOW_DIV.remove();
    }, timeout);
}

function createSnowFlake() {
    const SNOW_DIV = document.createElement("div");
    const FLAKE_ARR = ["❄", "❅", "❊", "❉"];
    const RAND_FLAKE = FLAKE_ARR[Math.floor(Math.random() * 4)];
    SNOW_DIV.innerText = RAND_FLAKE;
    SNOW_DIV.classList.add("snow");
    SNOW_DIV.style.left = Math.random() * (window.innerWidth / 1.03) + "px";
    let rand = Math.random() * 8 + 2;
    let timeout = rand * 990;
    SNOW_DIV.style.animationDuration = rand + "s";
    SNOW_DIV.style.opacity = Math.random() + 0.3;
    SNOW_DIV.style.fontSize = Math.random() * 30 + "px";
    document.body.appendChild(SNOW_DIV);
    setTimeout(() => {
        SNOW_DIV.remove();
    }, timeout);
}

//////Playing with conditional for snowman increment

const snowManBuilder = () => {

    const BLANKS_REVEALED = document.getElementsByClassName("blanks-box-revealed"); //this is an HTMLcollection of the revealed blanks
    const BLANKS_SOLVED = [...BLANKS_REVEALED].length; //this is the length of an array containing the revealed blanks// 
    const BLANKS_TOTAL = document.getElementsByClassName('blanks-box').length;
    let x = Math.ceil((BLANKS_SOLVED / BLANKS_TOTAL) * 100); //x = percent solved
    console.log("The percent solved is below:")
    console.log(x)
    if (x === 0) {
        return;
    } else if (x > 0 && x <= 10) { //add bottom
        document.querySelector('.floor').style.visibility = "visible"
        document.querySelector('.body-bottom').style.visibility = "visible"
    } else if (x > 10 && x <= 20) { //add middle
        document.querySelector('.floor').style.visibility = "visible"
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
    } else if (x > 20 && x <= 30) { //add head
        document.querySelector('.floor').style.visibility = "visible"
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
    } else if (x > 30 && x <= 40) { //add arm 1
        document.querySelector('.floor').style.visibility = "visible"
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
    } else if (x > 40 && x <= 50) { //add arm 2
        document.querySelector('.floor').style.visibility = "visible"
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
    } else if (x > 50 && x <= 60) { //add buttons
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
        addButtons();
    } else if (x > 60 && x <= 70) { //add eyes
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
        addButtons();
        document.querySelector('.eye-container').style.visibility = "visible"
        document.querySelector('.eye1').style.visibility = "visible"
        document.querySelector('.eye2').style.visibility = "visible"
    } else if (x > 70 && x <= 80) { //add nose
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
        addButtons();
        document.querySelector('.eye-container').style.visibility = "visible"
        document.querySelector('.eye1').style.visibility = "visible"
        document.querySelector('.eye2').style.visibility = "visible"
        document.querySelector('.nose').style.visibility = "visible"
    } else if (x > 80 && x <= 90) { //add mouth
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
        addButtons();
        document.querySelector('.eye-container').style.visibility = "visible"
        document.querySelector('.eye1').style.visibility = "visible"
        document.querySelector('.eye2').style.visibility = "visible"
        document.querySelector('.nose').style.visibility = "visible"
        document.querySelector('.mouth').style.visibility = "visible"
    } else if (x > 90 && x <= 100) { //add hat
        document.querySelector('.body-bottom').style.visibility = "visible"
        document.querySelector('.body-middle').style.visibility = "visible"
        document.querySelector('.head').style.visibility = "visible"
        document.querySelector('.arm1').style.visibility = "visible"
        document.querySelector('.arm2').style.visibility = "visible"
        addButtons();
        document.querySelector('.eye-container').style.visibility = "visible"
        document.querySelector('.eye1').style.visibility = "visible"
        document.querySelector('.eye2').style.visibility = "visible"
        document.querySelector('.nose').style.visibility = "visible"
        document.querySelector('.mouth').style.visibility = "visible"
        document.querySelector('.hat').style.visibility = "visible"
    }
}

