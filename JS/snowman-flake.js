// ** CTRL F **
// Snowman
// Snowflake

const BUTTONS = document.querySelectorAll(".buttons");
const BUTTONS_ARR = [...BUTTONS];

let bodyBot = document.querySelectorAll(".floor, .body-bottom");
let bodyMid = document.querySelectorAll(".floor, .body-bottom, .body-middle");
let head = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head"
);
let armOne = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1"
);
let armTwo = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1, arm2"
);
let eyes = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2"
);
let nose = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose"
);
let mouth = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose, .mouth"
);
let hat = document.querySelectorAll(
  ".floor, .body-bottom, .body-middle, .head, .arm1, .arm2, .eye-container, .eye1, .eye2, .nose, .mouth, .hat"
);

// Snowman
const snowManBuilder = () => {
  const BLANKS_SOLVED = document.querySelectorAll(".blanks-box-revealed").length; //number of blanks revealed
  const BLANKS_TOTAL = document.getElementsByClassName("blanks-box").length; //total length of puzzle
  let x = Math.ceil((BLANKS_SOLVED / BLANKS_TOTAL) * 100); //x = percent solved
  // console.log(`The percent solved is ${x}`);
  if (!x) {
    return;
  } else if (x > 0 && x <= 10) {
    //add bottom & floor
    for (let part of bodyBot) {
      part.style.visibility = "visible";
    }
  } else if (x > 10 && x <= 20) {
    //add middle
    for (let part of bodyMid) {
      part.style.visibility = "visible";
    }
  } else if (x > 20 && x <= 30) {
    //add head
    for (let part of head) {
      part.style.visibility = "visible";
    }
  } else if (x > 30 && x <= 40) {
    //add arm 1
    for (let part of armOne) {
      part.style.visibility = "visible";
    }
  } else if (x > 40 && x <= 50) {
    //add arm 2
    for (let part of armTwo) {
      part.style.visibility = "visible";
    }
  } else if (x > 50 && x <= 60) {
    //add buttons
    for (let part of armTwo) {
      part.style.visibility = "visible";
    }
    addSnowmanButtons();
  } else if (x > 60 && x <= 70) {
    //add eyes
    for (let part of eyes) {
      part.style.visibility = "visible";
    }
    addSnowmanButtons();
  } else if (x > 70 && x <= 80) {
    //add nose
    for (let part of nose) {
      part.style.visibility = "visible";
    }
    addSnowmanButtons();
  } else if (x > 80 && x <= 90) {
    //add mouth
    for (let part of mouth) {
      part.style.visibility = "visible";
    }
    addSnowmanButtons();
  } else if (x > 90 && x <= 100) {
    //add hat
    for (let part of hat) {
      part.style.visibility = "visible";
    }
    addSnowmanButtons();
  }
};

const hideSnowman = () => {
  for (let part of hat) {
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

const createSnowFlake = () => {
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
};

export {
  snowManBuilder,
  hideSnowman,
  hideSnowmanButtons,
  addSnowmanButtons,
  createSnowFlake,
};
