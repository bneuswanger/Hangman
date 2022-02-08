// ** CTRL F **
// Snowman
// Snowflake



// Snowman
const snowManBuilder = () => {
    const BLANKS_REVEALED = document.getElementsByClassName(
      "blanks-box-revealed"
    ); //this is an HTMLcollection of the revealed blanks
    const BLANKS_SOLVED = [...BLANKS_REVEALED].length; //this is the length of an array containing the revealed blanks//
    const BLANKS_TOTAL = document.getElementsByClassName("blanks-box").length;
    let x = Math.ceil((BLANKS_SOLVED / BLANKS_TOTAL) * 100); //x = percent solved
    console.log(`The percent solved is ${x}`);
    if (x === 0) {
      return;
    } else if (x > 0 && x <= 10) {
      //add bottom & floor
      document.querySelector(".floor").style.visibility = "visible";
      document.querySelector(".body-bottom").style.visibility = "visible";
    } else if (x > 10 && x <= 20) {
      //add middle
      document.querySelector(".floor").style.visibility = "visible";
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
    } else if (x > 20 && x <= 30) {
      //add head
      document.querySelector(".floor").style.visibility = "visible";
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
    } else if (x > 30 && x <= 40) {
      //add arm 1
      document.querySelector(".floor").style.visibility = "visible";
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
    } else if (x > 40 && x <= 50) {
      //add arm 2
      document.querySelector(".floor").style.visibility = "visible";
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
    } else if (x > 50 && x <= 60) {
      //add buttons
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
      addSnowmanButtons();
    } else if (x > 60 && x <= 70) {
      //add eyes
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
      addSnowmanButtons();
      document.querySelector(".eye-container").style.visibility = "visible";
      document.querySelector(".eye1").style.visibility = "visible";
      document.querySelector(".eye2").style.visibility = "visible";
    } else if (x > 70 && x <= 80) {
      //add nose
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
      addSnowmanButtons();
      document.querySelector(".eye-container").style.visibility = "visible";
      document.querySelector(".eye1").style.visibility = "visible";
      document.querySelector(".eye2").style.visibility = "visible";
      document.querySelector(".nose").style.visibility = "visible";
    } else if (x > 80 && x <= 90) {
      //add mouth
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
      addSnowmanButtons();
      document.querySelector(".eye-container").style.visibility = "visible";
      document.querySelector(".eye1").style.visibility = "visible";
      document.querySelector(".eye2").style.visibility = "visible";
      document.querySelector(".nose").style.visibility = "visible";
      document.querySelector(".mouth").style.visibility = "visible";
    } else if (x > 90 && x <= 100) {
      //add hat
      document.querySelector(".body-bottom").style.visibility = "visible";
      document.querySelector(".body-middle").style.visibility = "visible";
      document.querySelector(".head").style.visibility = "visible";
      document.querySelector(".arm1").style.visibility = "visible";
      document.querySelector(".arm2").style.visibility = "visible";
      addSnowmanButtons();
      document.querySelector(".eye-container").style.visibility = "visible";
      document.querySelector(".eye1").style.visibility = "visible";
      document.querySelector(".eye2").style.visibility = "visible";
      document.querySelector(".nose").style.visibility = "visible";
      document.querySelector(".mouth").style.visibility = "visible";
      document.querySelector(".hat").style.visibility = "visible";
    }
  };

  const hideSnowman = () => {
    document.querySelector(".floor").style.visibility = "hidden";
    document.querySelector(".body-bottom").style.visibility = "hidden";
    document.querySelector(".body-middle").style.visibility = "hidden";
    document.querySelector(".head").style.visibility = "hidden";
    document.querySelector(".arm1").style.visibility = "hidden";
    document.querySelector(".arm2").style.visibility = "hidden";
    document.querySelector(".eye-container").style.visibility = "hidden";
    document.querySelector(".eye1").style.visibility = "hidden";
    document.querySelector(".eye2").style.visibility = "hidden";
    document.querySelector(".nose").style.visibility = "hidden";
    document.querySelector(".mouth").style.visibility = "hidden";
    document.querySelector(".hat").style.visibility = "hidden";
    hideSnowmanButtons();
  };

    
  const addSnowmanButtons = () => {
    const BUTTONS = document.querySelectorAll(".buttons");
    const BUTTONS_ARR = [...BUTTONS];
    for (let button of BUTTONS_ARR) {
      button.style.visibility = "visible";
    }
  };
  const hideSnowmanButtons = () => {
    const BUTTONS = document.querySelectorAll(".buttons");
    const BUTTONS_ARR = [...BUTTONS];
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