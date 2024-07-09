// 사용변수
const GAME_TIME = 8;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [
  "apple", "banana", "cherry", "date", "fig", "grape", "kiwi", "lemon", "lime", "mango",
  "melon", "nectarine", "orange", "papaya", "peach", "pear", "plum", "quince", "raisin", "raspberry",
  "strawberry", "tangerine", "watermelon", "apricot", "blackberry", "blueberry", "cantaloupe", "cranberry", "currant", "dragonfruit",
  "elderberry", "gooseberry", "grapefruit", "guava", "honeydew", "jackfruit", "kumquat", "lychee", "mandarin", "mulberry",
  "olive", "passionfruit", "persimmon", "pineapple", "plantain", "pomegranate", "pomelo", "starfruit", "ugli", "yuzu",
  "acai", "ackee", "avocado", "bilberry", "boysenberry", "breadfruit", "cactus", "carambola", "chayote", "cloudberry",
  "coconut", "cranberry", "durian", "feijoa", "goji", "gooseberry", "grapefruit", "honeyberry", "huckleberry", "jabuticaba",
  "jambul", "jujube", "kiwano", "langsat", "longan", "loquat", "mamey", "mangosteen", "marionberry", "miracle",
  "monstera", "nance", "pawpaw", "pequi", "pitanga", "pitaya", "rambutan", "redcurrant", "salak", "salmonberry",
  "santol", "sapodilla", "soursop", "surinam", "tamarillo", "tamarind", "whitecurrant", "ziziphus"
];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

init(); // 초기세팅

function init() {
  buttonChange("게임로딩중...");
  setTimeout(() => {
    buttonChange("게임시작");
  }, 500); // Simulate loading time
  wordInput.addEventListener("input", checkMatch);
}

// 게임 실행
function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 150);
  buttonChange("게임중");
  const randomIndex = Math.floor(Math.random() * words.length);
  wordDisplay.innerText = words[randomIndex];
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}

// 단어 일치체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  } else if (time === 0) {
    wordInput.value = "";
  }
}

buttonChange("게임시작");

function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}