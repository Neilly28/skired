console.log("hello from app js");

// reset button
function refreshPage() {
  window.location.reload();
}
document.querySelector(".x").addEventListener("click", refreshPage);

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 27 || event.keyCode === 82) {
    refreshPage();
  }
});

// dynamic taskbar time
let date = new Date();
console.log(date);
let hours = date.getHours();
console.log(hours);
let mins = date.getMinutes();
console.log(mins);
let time = `${hours}:${mins}`;
console.log(time);
let timeDisplay = document.querySelector(".taskbar-time");
console.log(timeDisplay);
timeDisplay.innerText = time;

// close canvas
// const x = document.querySelector(".x");
// console.log(x);

// x.addEventListener("click", closeCanvas());

const myComputerImg = document.querySelector(".mycomputer-img");
const recycleBinImg = document.querySelector(".recyclebin-img");
const ieImg = document.querySelector(".ie-img");
const startImg = document.querySelector(".start-img");

const showMy = function () {
  myComputerImg.classList.toggle("hidden");
};
const showRecycle = function () {
  recycleBinImg.classList.toggle("hidden");
};
const showIe = function () {
  ieImg.classList.toggle("hidden");
};
const showStart = function () {
  startImg.classList.toggle("hidden");
};

// const hideAll = function () {
//   myComputerImg.classList.add("hidden");
//   recycleBinImg.classList.add("hidden");
//   ieImg.classList.add("hidden");
//   startImg.classList.add("hidden");
// };

const myComputerBtn = document.querySelector(".desktop-icon.mycomputer");
const myRecycleBtn = document.querySelector(".desktop-icon.recyclebin");
const myIeBtn = document.querySelector(".desktop-icon.ie");
const startBtn = document.querySelector(".taskbar-start");

myComputerBtn.addEventListener("click", showMy);
myRecycleBtn.addEventListener("click", showRecycle);
myIeBtn.addEventListener("click", showIe);
startBtn.addEventListener("click", showStart);
