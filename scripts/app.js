console.log("hello from app js");

// reset if x is clicked
function refreshPage() {
  window.location.reload();
}
document.querySelector(".x").addEventListener("click", refreshPage);

// reset if Enter or R is pressed
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 82 || event.keyCode === 13) {
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

// dom manipuilation to show and hide images
// capture the icons
const myComputerImg = document.querySelector(".mycomputer-img");
const recycleBinImg = document.querySelector(".recyclebin-img");
const ieImg = document.querySelector(".ie-img");
const startImg = document.querySelector(".start-img");

// create functions to toggle hidden class
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

// capture the images you want to hide and show
const myComputerBtn = document.querySelector(".desktop-icon.mycomputer");
const myRecycleBtn = document.querySelector(".desktop-icon.recyclebin");
const myIeBtn = document.querySelector(".desktop-icon.ie");
const startBtn = document.querySelector(".taskbar-start");

// add click listener and call functions to toggle hidden class
myComputerBtn.addEventListener("click", showMy);
myRecycleBtn.addEventListener("click", showRecycle);
myIeBtn.addEventListener("click", showIe);
startBtn.addEventListener("click", showStart);
