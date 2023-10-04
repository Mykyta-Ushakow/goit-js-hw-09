const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
    background: document.querySelector("body"),
}

const { startBtn, stopBtn, background } = refs;

let intervalHandler;

function changeColor(event) {
    event.preventDefault();

    if (intervalHandler === null) {
        stopBtn.toggleAttribute("disabled");
    }

    startBtn.toggleAttribute("disabled");
    intervalHandler = setInterval(timedChangeColor, 1000);
}

function timedChangeColor() {
    background.style.backgroundColor = getRandomHexColor();
}


function stopChangeColor(event) {
    event.preventDefault();

    clearInterval(intervalHandler);
    intervalHandler = null;
    stopBtn.toggleAttribute("disabled");
    startBtn.toggleAttribute("disabled");

}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener("click", changeColor);
stopBtn.addEventListener("click", stopChangeColor);
