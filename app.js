const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?']
const puzzles = [
    {
        text: 'hi there!',
        hint: 'A salutation, of sorts',
    },
    {
        text: 'It is snowing!',
        hint: 'Floridians rarely say it',
    },
    {
        text: 'Hello world',
        hint: 'A coders salutation',
    },
    {
        text: 'who are you?',
        hint: 'Who who, who who?',
    },
    {
        text: 'california',
        hint: 'US State',
    },
    {
        text: 'mitochondrion',
        hint: 'A powerhouse',
    },
    {
        text: 'Yellowstone',
        hint: 'Both a park and a TV show',
    },
    {
        text: 'kayak',
        hint: 'A watercraft',
    },
    {
        text: 'walleye',
        hint: 'A type of fish',
    },
    {
        text: 'elbow',
        hint: 'A bendy body part',
    },
    {
        text: 'this is a long one with many small words',
        hint: 'It is what it is!',
    },
    {
        text: 'loon',
        hint: 'An eccentric bird',
    },
    {
        text: 'green bay packers',
        hint: 'A sports team',
    },
    {
        text: 'have you ever seen the rain?',
        hint: 'Fogerty wants to know',
    },
]
const keyboardDiv = document.getElementById('keyboard-container');
const getNewPuzzleBtn = document.getElementById('newPuzzle');
const blanksContainer = document.getElementById('blanks-container');
const hintBtn = document.getElementById('hint-btn');
const hintTxtDiv = document.getElementById('hint-txt-div');
const hintTxt = document.getElementById('hint-txt');
const congratsTxt = document.getElementById('congrats');




let isGameOver = false;
let hit = 0;
let miss = 0;
//Player has 

const resetScore = () => {
    hit = 0;
    miss = 0;
}

const createKeys = () => {
    for (let key of keys) {
        const keyDiv = document.createElement("div"); //create the div and attach it to keyboardDiv
        keyDiv.className = "key-div key-div-neutral";
        keyboardDiv.appendChild(keyDiv);

        const keyPara = document.createElement('p'); //create a paragraph tag for the key label to live inside and attach it to the keyDiv
        keyPara.className = 'keyLabel';
        keyDiv.appendChild(keyPara);

        let keyLabel = document.createTextNode(key); //create a letter for the key label
        keyLabel.className = 'keyLabel';
        keyPara.appendChild(keyLabel);

        keyDiv.addEventListener('click', function () {
            let chosenKey = this.innerText;
            testLetter(chosenKey, this); //works; key value is passed into checkPuzzle function
            checkGameStatus();
        })
    }
}
createKeys(keys);


const getNewPuzzle = () => {                                    
    clearPuzzle();
    resetKeyboard();
    resetScore();
    if (puzzles.length === 0) {
        alert("You've exhausted the options, please refresh and play again!")
    } else {
        let num = Math.floor(Math.random() * (puzzles.length));     //generates random index position in the array of possible puzzles
        // console.log(`INDEX OF PUZZLE: ${num}`);
        let text = puzzles[num].text;
        console.log(`PUZZLE TEXT: ${text}`);
        let hint = puzzles[num].hint;
        // console.log(`PUZZLE HINT: ${hint}`);
        buildBlanks(text);
        hintBtn.style.display = "block";
        hintTxt.innerText = `Hint: ${hint}`;
        puzzles.splice(num, 1); //removes current puzzle from array
    }
}

const resetKeyboard = function () {
    const keyDivs = document.querySelectorAll('.key-div')
    for (let key of keyDivs) {
        key.classList.remove('key-div-success')
        key.classList.remove('key-div-failure')
        key.classList.remove('key-div-game-over')
        key.classList.add('key-div-neutral')
    }
}

const clearPuzzle = () => {
    while (blanksContainer.firstChild) {
        blanksContainer.removeChild(blanksContainer.firstChild);
    }
}



getNewPuzzle();


const checkGameStatus = () => {
    const blanksRemaining = document.getElementsByClassName('blanks-box-hidden').length;
    console.log(`Blanks remaining: ${blanksRemaining}`)
    if (blanksRemaining === 0) {
        gameOverWin();
    }
}

const gameOverWin = () => {
    console.log("game over")
    isGameOver = true;
    keyboardDiv.style.display = 'none';
    congratsTxt.style.display = 'block';
}

// ////experimental
// const determineActive = () => { //exp
//     const activeLettersDivs = document.querySelectorAll('.blanks-box'); //delete & uncomment below
//     const activeLettersArray = [...activeLettersDivs].map(n => n.innerText) //delete & uncomment below
//     console.log(`TOTAL LETTERS TO SOLVE: ${activeLettersArray.length}`) //delete & uncomment below
//     return activeLettersDivs; //exp
// }
// ////experimental


const testLetter = (chosenKey, chosenKeyDiv) => {
    // determineActive();
    // console.log(`chosenKey is ${chosenKey}`)
    // console.log(chosenKeyDiv)
    const activeLettersDivs = document.querySelectorAll('.blanks-box');
    for (let blank of activeLettersDivs) {
        if (blank.innerText === chosenKey) {
            blank.classList.remove('blanks-box-hidden');
            blank.classList.add('blanks-box-revealed');
        }
    }
    const activeLettersArray = [...activeLettersDivs].map(n => n.innerText)
    console.log(`TOTAL LETTERS TO SOLVE: ${activeLettersArray.length}`)
    if (activeLettersArray.includes(chosenKey)) {
        chosenKeyDiv.classList.remove('key-div-neutral');
        chosenKeyDiv.classList.add('key-div-success');
        hit++;

    } else {
        chosenKeyDiv.classList.remove('key-div-neutral');
        chosenKeyDiv.classList.add('key-div-failure');
        miss++;

    }
    console.log(`hit count: ${hit}`);
    console.log(`miss count: ${miss}`);
}



getNewPuzzleBtn.addEventListener('click', function () {
    getNewPuzzle();
    isGameOver = false;
    keyboardDiv.style.display = 'grid';
    congratsTxt.style.display = 'none';
})

hintBtn.addEventListener('click', function () {
    if (hintTxt.style.color === "white") {
        hintTxt.style.color = "#06060E";
    } else {
        hintTxt.style.color = "white";
    }
})


function buildBlanks(puzzle) {
    let wordsArray = puzzle.split(" ");
    // console.log(wordsArray);
    for (let word of wordsArray) {
        const wordBox = document.createElement("div");
        wordBox.className = "words-box";
        blanksContainer.appendChild(wordBox);
        for (let letter of word) {
            const letterDiv = document.createElement("div");
            letterDiv.className = "blanks-box blanks-box-hidden";
            wordBox.appendChild(letterDiv);
            const letterNode = document.createTextNode(letter.toUpperCase());
            letterDiv.appendChild(letterNode);
        }
    }
}


