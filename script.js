const message = document.querySelector(".message");
const scoreOutput = document.querySelector(".score");
const badLeft = document.querySelector(".badLeft");
const btn = document.querySelector(".btn");
const basket = document.querySelector(".basket");
const container = document.querySelector(".container");
let boundBasket = basket.getBoundingClientRect();
let boundContainer = container.getBoundingClientRect();
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let player = {
  score: 0,
  inPlay: false,
  speed: 15,
};

btn.addEventListener("click", startGame);
document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

function pressKeyOn(e) {
  keys[e.key] = true;
}

function pressKeyOff(e) {
  keys[e.key] = false;
}

function startGame() {
  message.style.display = "none";
  btn.style.display = "none";
  basket.style.display = "block";
  player.score = 0;
  player.totalBad = 10;
  player.inPlay = true;

  makeBadGuys(6);
  requestAnimationFrame(playGame);
}

function BadGuys(num) {
  for (let x = 0; x < num; x++) {
    makeBad();
  }
}

function makeBadGuys(num) {
  for (let i = 0; i < num; i++) {
    makeBad();
  }
}

function makeBad() {
  if (player.totalBad > 0) {
    let div = document.createElement("div");
    div.innerHTML = "#" + player.totalBad;
    player.totalBad--;
    div.classList.add("baddy");
    div.x = Math.random() * boundContainer.width - 100;
    if (div.x < 0) {
      div.x = 100;
    }
    div.y = Math.random() * 500 * -1 - 200;
    div.speed = Math.ceil(Math.random() * 10) + 3;
    div.style.backgroundColor = "#" + Math.random().toString(16).substr(-6);
    div.style.top = div.y + "px";
    div.style.left = div.x + "px";

    let ran = Math.floor(Math.random() * 50 + 50);
    div.style.height = ran + "px";
    div.style.lineHeight = ran + "px";
    container.appendChild(div);
  }
}
function playGame() {
  if (player.inPlay) {
    if (
        keys.ArrowDown &&
        boundBasket.y < boundContainer.height - boundBasket.height
      ) {
        boundBasket.y += player.speed;
      }
      if (keys.ArrowUp && boundBasket.y > 0) {
        boundBasket.y -= player.speed;
      }
      if (keys.ArrowLeft && boundBasket.x > 0) {
        boundBasket.x -= player.speed;
      }
      if (
        keys.ArrowRight &&
        boundBasket.x < boundContainer.width - boundBasket.width
      ) {
        boundBasket.x += player.speed;
      }

    basket.style.top = boundBasket.y + "px";

    basket.style.left = boundBasket.x + "px";
  

  requestAnimationFrame(playGame);
  let tempEnemy = document.querySelectorAll(".baddy");
  if (tempEnemy.length == 0) {
    endGame();
  } else {
    for (let i = 0; i < tempEnemy.length; i++) {
      bgMover(tempEnemy[i]);
    }
  }
}
}

function endGame() {
  player.inPlay = false;
  btn.style.display = "block";
  message.style.display = "block";
  message.innerHTML = "End Game";
  basket.style.display = "none";
}

function bgMover(el) {
  el.y += el.speed;

  if (el.y > boundContainer.height - 80) {
    el.y = -100;
    el.x = Math.random() * boundContainer.width - 100;
    if (el.x < 0) {
      el.x = 100;
    }
  }

  el.style.top = el.y + "px";
  el.style.left = el.x + "px";

  if (isCollide(basket, el)) {
    container.removeChild(el);
    makeBad();
    scoreOutput.innerHTML = ++player.score;
  }
}
function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
