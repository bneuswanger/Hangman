// ** CTRL F **
// Snowman
// Snowflake

const BUTTONS = document.querySelectorAll(".buttons");
const BUTTONS_ARR = [...BUTTONS];

let one = document.querySelectorAll('.floor, .body-bottom');
let two = document.querySelectorAll('.floor, .body-bottom, .body-middle');
let three = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head');
let four = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1');
let five = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1, arm2');
let six = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2');
let seven = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose');
let eight = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose, .mouth');
let nine = document.querySelectorAll('.floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose, .mouth, .hat');

// Snowman
const snowManBuilder = () => {
    const BLANKS_REVEALED = document.getElementsByClassName(
      "blanks-box-revealed"
    ); //this is an HTMLcollection of the revealed blanks
    const BLANKS_SOLVED = [...BLANKS_REVEALED].length; //this is the length of an array containing the revealed blanks//
    const BLANKS_TOTAL = document.getElementsByClassName("blanks-box").length;
    let x = Math.ceil((BLANKS_SOLVED / BLANKS_TOTAL) * 100); //x = percent solved
    console.log(`The percent solved is ${x}`);
    if (!x) {
      return;
    } else if (x > 0 && x <= 10) {
      //add bottom & floor
      for(let part of one){
        part.style.visibility = "visible";
      }
    } else if (x > 10 && x <= 20) {
      //add middle
      for(let part of two){
        part.style.visibility = "visible";
      }
    } else if (x > 20 && x <= 30) {
      //add head
      for(let part of three){
        part.style.visibility = "visible";
      }
    } else if (x > 30 && x <= 40) {
      //add arm 1
      for(let part of four){
        part.style.visibility = "visible";
      }
    } else if (x > 40 && x <= 50) {
      //add arm 2
      for(let part of five){
        part.style.visibility = "visible";
      }
    } else if (x > 50 && x <= 60) {
      //add buttons
      for(let part of five){
        part.style.visibility = "visible";
      }
      addSnowmanButtons();
    } else if (x > 60 && x <= 70) {
      //add eyes
      for(let part of six){
        part.style.visibility = "visible";
      }
      addSnowmanButtons(); 
    } else if (x > 70 && x <= 80) {
      //add nose
      for(let part of seven){
        part.style.visibility = "visible";
      }
      addSnowmanButtons();
    } else if (x > 80 && x <= 90) {
      //add mouth
      for(let part of eight){
        part.style.visibility = "visible";
      }
      addSnowmanButtons();
    } else if (x > 90 && x <= 100) {
      //add hat
      for(let part of nine){
        part.style.visibility = "visible";
      }
      addSnowmanButtons();
    }
  };

  
  
  const hideSnowman = () => {
    for(let part of nine){
      part.style.visibility = "hidden";
    }
    hideSnowmanButtons();
  };


  const addSnowmanButtons = () => {
    for (let button of BUTTONS_ARR) {
      button.style.visibility = "visible";
    }
  };
  const hideSnowmanButtons = () => {
    for (let button of BUTTONS_ARR) {
      button.style.visibility = "hidden";
    }
  };

  // SNOWFLAKE

  function createSnowFlake() {
    const SNOW_DIV = document.createElement("div");
    const FLAKE_ARR = ["❄", "❅", "❊", "❉"];
    const RAND_FLAKE = FLAKE_ARR[Math.floor(Math.random() * 4)];
    SNOW_DIV.textContent = RAND_FLAKE;
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
  
  export { snowManBuilder, hideSnowman, hideSnowmanButtons, addSnowmanButtons, createSnowFlake};