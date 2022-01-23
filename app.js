const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?']

const keyboardDiv = document.getElementById('keyboard-container');
const getNewPhraseBtn = document.getElementById('newPhrase');
const blanksContainer = document.getElementById('blanks-container');

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
        hint: 'who who, who who?',
    },
    {
        text: 'california',
        hint: 'US State',
    },
    {
        text: 'mitochondrion',
        hint: 'powerhouse',
    },
    {
        text: 'Yellowstone',
        hint: 'A park and a TV show',
    },
    {
        text: 'kayak',
        hint: 'a watercraft',
    },
    {
        text: 'walleye',
        hint: 'a fish',
    },
    {
        text: 'elbow',
        hint: 'a body part',
    },
    {
        text: 'this is a long one with many small words',
        hint: 'it is what it is!',
    },
]

getNewPhraseBtn.addEventListener('click', function () {
    getNewPhrase();
})

const getNewPhrase = () => {                                    //returns string of phrase
    clearPhrase();
    let num = Math.floor(Math.random() * (phrases.length));     //generates random index position in the array of possible phrases
    console.log(`INDEX OF PHRASE: ${num}`);
    let text = phrases[num].text;
    console.log(`PHRASE TEXT: ${text}`);
    let hint = phrases[num].hint;                           
    console.log(`PHRASE HINT: ${hint}`);
    buildBlanks(text);                                       
                                     
}


const clearPhrase = () => {
    while (blanksContainer.firstChild) {
        blanksContainer.removeChild(blanksContainer.firstChild);
    }
}

function buildBlanks(phrase) {
    let wordsArray = phrase.split(" ");
    console.log (wordsArray);
    for(let word of wordsArray) {
        const wordBox = document.createElement("div");
        wordBox.className = "words-box";
        blanksContainer.appendChild(wordBox);
        for(let letter of word) {
            const letterDiv = document.createElement("div");
            letterDiv.className = "blanks-box-hidden";
            wordBox.appendChild(letterDiv);
            const letterNode = document.createTextNode(letter.toUpperCase());
            letterDiv.appendChild(letterNode);
        }
        console.log (word.length);
    }
}
    

