
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    datetimePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector('[data-start]'),
    timer: document.querySelector(".timer"),
    daysDisplay: document.querySelector('[data-days]'),
    hoursDisplay: document.querySelector('[data-hours]'),
    minutesDisplay: document.querySelector('[data-minutes]'),
    secondsDisplay: document.querySelector('[data-seconds]'),
}

const { datetimePicker, startBtn, timer, daysDisplay, hoursDisplay, minutesDisplay, secondsDisplay } = refs;

startBtn.setAttribute("disabled", "");

timer.style.fontSize = '24px';
timer.style.display = 'flex';
timer.style.gap = '30px'
timer.style.marginTop = '30px'

for (const child of timer.children) {
    child.style.display = 'flex';
    child.style.flexDirection = 'column';
    child.style.justifyContent = 'center';
    child.style.alignItems = 'center';
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        
    if ((selectedDates[0] - new Date()) < 0) {
        startBtn.setAttribute("disabled", "");
        Notify.warning("Please choose a date in the future");
        return;
    } 

    startBtn.removeAttribute("disabled");
  },
};

const fp = flatpickr(datetimePicker, options);

let timerId = null;

function startCounter() {
  datetimePicker.setAttribute("disabled", "");
  startBtn.setAttribute("disabled", "");

  refreshCounters();
  timerId = setInterval(refreshCounters, 1000);
}

function refreshCounters() {
    
  let difference = fp.selectedDates[0] - new Date();
  const timeTables = convertMs(difference);
  
  if (difference <= 0) {
    datetimePicker.removeAttribute("disabled");
    clearInterval(timerId);
    return;
  }
    
  daysDisplay.textContent = addLeadingZero(timeTables.days);

  hoursDisplay.textContent = addLeadingZero(timeTables.hours);

  minutesDisplay.textContent = addLeadingZero(timeTables.minutes);

  secondsDisplay.textContent = addLeadingZero(timeTables.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

startBtn.addEventListener("click", startCounter);