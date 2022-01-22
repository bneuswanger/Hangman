const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?']

const keyboardDiv = document.getElementById('keyboard');
const getNewPhraseBtn = document.getElementById('newPhrase');


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
        text: 'ok boomer',
        hint: 'you know you are old when a kid says this to you',
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
    extractLetters(getNewPhrase());
})

const getNewPhrase = () => { //returns string of phrase
    let num = Math.floor(Math.random() * (phrases.length)); //generates random index position in the array of possible phrases
    console.log(`index of phrase: ${num}`);
    console.log(`phrase text: ${phrases[num].text}`)
    return phrases[num].text 
}
// console.log(getNewPhrase()[2])

function extractLetters(phrase) {
    for (index of phrase) {
        console.log(index);
    }
}

