const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?']

const keyboardDiv = document.getElementById('keyboard-container');
const getNewPhraseBtn = document.getElementById('newPhrase');
const blanksContainer = document.getElementById('blanks-container');
const hintBtn = document.getElementById('hint-btn');
const hintTxtDiv = document.getElementById('hint-txt-div')
const hintTxt = document.getElementById('hint-txt')

const createKey = () => {
    for (let key of keys) {
        const keyDiv = document.createElement("div"); //create the div and attach it to keyboardDiv
        keyDiv.className = "keyDiv";
        keyboardDiv.appendChild(keyDiv);

        const keyPara = document.createElement('p'); //create a paragraph tag for the key label to live inside and attach it to the keyDiv
        keyPara.className = 'keyLabel';
        keyDiv.appendChild(keyPara);

        let keyLabel = document.createTextNode(key); //create a letter for the key label
        keyLabel.className = 'keyLabel';
        keyPara.appendChild(keyLabel);
    }
}
createKey(keys);

const phrases = [
    {
        text: 'hi there!',
        hint: 'A salutation, of sorts',
    },
    {
        text: 'i am groot',
        hint: 'Marvel Comics character',
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
]

getNewPhraseBtn.addEventListener('click', function () {
    getNewPhrase();
})



////Hint button - work on this next

hintBtn.addEventListener('click', function () {
    if (hintTxt.style.color === "white") {
        hintTxt.style.color = "#06060E";
    } else {
        hintTxt.style.color = "white";
    }
})




const getNewPhrase = () => {                                    //returns string of phrase
    clearPhrase();
    if (phrases.length === 0) {
        alert("You've exhausted the options, please refresh and play again!")
    } else {

        let num = Math.floor(Math.random() * (phrases.length));     //generates random index position in the array of possible phrases
        console.log(`INDEX OF PHRASE: ${num}`);
        let text = phrases[num].text;
        console.log(`PHRASE TEXT: ${text}`);
        let hint = phrases[num].hint;
        console.log(`PHRASE HINT: ${hint}`);
        buildBlanks(text);
        hintBtn.style.display = "block";
        hintTxt.innerText = `Hint: ${hint}`;
        phrases.splice(num, 1);
    }
}


const clearPhrase = () => {
    while (blanksContainer.firstChild) {
        blanksContainer.removeChild(blanksContainer.firstChild);
    }
}

function buildBlanks(phrase) {
    let wordsArray = phrase.split(" ");
    console.log(wordsArray);
    for (let word of wordsArray) {
        const wordBox = document.createElement("div");
        wordBox.className = "words-box";
        blanksContainer.appendChild(wordBox);
        for (let letter of word) {
            const letterDiv = document.createElement("div");
            letterDiv.className = "blanks-box-hidden";
            wordBox.appendChild(letterDiv);
            const letterNode = document.createTextNode(letter.toUpperCase());
            letterDiv.appendChild(letterNode);
        }
    }
}


