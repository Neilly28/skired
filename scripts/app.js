console.log("hello from app js");

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
