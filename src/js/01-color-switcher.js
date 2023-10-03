/*
1. Дістати рефи.
2. Створити змінну з інтервалом. 
3. Написати функції для обробки інтервалу та скопіювати функцію рандомних кольорів.
4. Прив'язати функції до елементів через лістнери.
    4.1. Кнопці Старт треба запобігти дій за-замовчуванням, зробити її неактивною через інлайн-стилі, приписати змінній-інтервалу потрібний інтервал, де викликатиметься функція зміни кольорів з результатом виконання функції рандомного кольору.
    4.2. Кнопці Стоп треба запобігти дій за-замовчуванням, зробити її неактивною через інлайн-стилі, прибрати інтервал та переписати змінну-інтервал на null,
        4.2.1. Зробити кнопку Старт активною прибравши відповідний інлайн стиль.
*/

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
