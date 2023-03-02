const scoreEl = document.querySelector(".score");
const startScreenEl = document.querySelector(".startScreen");
let gameAreaEl = document.querySelector(".gameArea");

//globel variable
let play = { speed: 4, score: 0 };
let audioEl = new Audio("sound.mp3");

//step four
//create keys object
const keys = {
  arrowUp: false,
  arrowDown: false,
  arrowLeft: false,
  arrowRight: false,
};
//step two
//keyDown code
const keyDown = (e) => {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(e.key);
  // console.log(keys);
};

//step three
//keyUp code
const keyUp = (e) => {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(e.key);
  // console.log(keys);
};

// jb aapka car enemy ke car se touch karega to game over hogayega

const isCollide = (a, b) => {
  aRact = a.getBoundingClientRect();
  bRact = b.getBoundingClientRect();

  return !(
    aRact.bottom < bRact.top ||
    aRact.top > bRact.bottom ||
    aRact.right < bRact.left ||
    aRact.left > bRact.right
  );
};

//moveLines code

const moveLines = () => {
  let linesEl = document.querySelectorAll(".lines");
  linesEl.forEach((item) => {
    if (item.y > 450) {
      item.y -= 500;
    }
    item.y += play.speed;
    item.style.top = item.y + "px";
  });
};

// end game code
const gameEnd = () => {
  audioEl.pause();

  play.start = false;
  startScreenEl.classList.remove("hide");
  startScreenEl.innerHTML =
    " game Over <br> Final Score is " +
    play.score +
    " <br> press to restart Game";
};

//moveEnemy car code
const moveEnemy = (car) => {
  let enemyEl = document.querySelectorAll(".enemy");
  enemyEl.forEach((item) => {
    if (isCollide(car, item)) {
      console.log("Boom HIT");
      gameEnd();
    }
    if (item.y > 550) {
      item.y = -300;
      item.style.left = Math.round(Math.random() * 250) + "px";
    }
    item.y += play.speed;
    item.style.top = item.y + "px";
  });
};

//playGame code
const playGame = () => {
  // target car class
  let car = document.querySelector(".car");

  //isse property se road ka charo (4) ro taraf ka value mil gayega
  let road = gameAreaEl.getBoundingClientRect();

  if (play.start) {
    audioEl.play();

    // moveLines function calll
    moveLines();
    // moveLines function calll
    moveEnemy(car);
    // ye hai y-axis ke liye
    if (keys.ArrowUp && play.y > road.top + 70) {
      //top 70 ke upper nahi ga sakta hai
      play.y -= play.speed;
    }
    if (keys.ArrowDown && play.y < road.bottom - 80) {
      //bottom 80 ke niche nahi ga sakta hai
      play.y += play.speed;
    }
    // ye hai x-axis ke liye
    if (keys.ArrowLeft && play.x > 0) {
      //left 0 means road ka 0
      play.x -= play.speed;
    }
    if (keys.ArrowRight && play.x < road.width - 50) {
      //accutual road ke width se -50 car ka width kar diyaga hai
      play.x += play.speed;
    }

    //is ke help se car ko dynamicaly value increase or decrease hota rahe ga.

    car.style.top = play.y + "px";
    car.style.left = play.x + "px";

    window.requestAnimationFrame(playGame);

    play.score++;
    let ps = play.score - 1;
    scoreEl.innerText = "Score : " + ps;

    //ye
  }
};
//startScreenEl code
const start = () => {
  //gameAreaEl code
  // gameAreaEl.classList.remove("hide");
  gameAreaEl.innerHTML = "";
  // startScreenEl code
  startScreenEl.classList.add("hide");
  play.start = true;
  play.score = 0;
  window.requestAnimationFrame(playGame); // requistAF aak call back function hota hai

  // road ke center mai white line ke liye
  for (x = 0; x < 5; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 100;
    // roadline mai gap dene ke liye ok.
    roadLine.style.top = roadLine.y + "px";
    gameAreaEl.appendChild(roadLine);
  }

  //create a div,class and append in gameArea
  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameAreaEl.appendChild(car);

  play.y = car.offsetTop;
  play.x = car.offsetLeft;

  // console.log("top position : " + car.offsetTop);

  // console.log("left position : " + car.offsetLeft);

  // create multiple enemy car
  for (x = 0; x < 3; x++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");
    // enemyCar.y = x * 100;
    enemyCar.y = (x + 1) * 300 * -1;
    // roadline mai gap dene ke liye ok.
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.round(Math.random() * 250) + "px";
    gameAreaEl.appendChild(enemyCar);
  }
};
//randomColor generator code
const randomColor = () => {
  const c = () => {
    let hex = Math.round(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  };
  return "#" + c() + c() + c();
};

//step one
startScreenEl.addEventListener("click", start);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
