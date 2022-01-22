const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?']

const keyboardDiv = document.getElementById('keyboard');

const createKey = () => {
    for (let key of keys) {
        
        console.log(key)
        
        const keyDiv = document.createElement("div"); //create the div and attach it to keyboardDiv
        keyDiv.className = "keyDiv";
        keyboardDiv.appendChild(keyDiv);

        const keyPara = document.createElement('p'); //create the paragraphs and attach to keyDivs
        keyPara.className = 'keyLabel';
        keyDiv.appendChild(keyPara);

        let keyLabel = document.createTextNode(key);
        keyLabel.className = 'keyLabel';
        keyPara.appendChild(keyLabel);
    }
}
createKey(keys);