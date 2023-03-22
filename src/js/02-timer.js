import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputDataPickerEL = document.querySelector('#datetime-picker')

const buttonStarEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEL = document.querySelector('[data-hours]');
const minutesEL = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');

let selectedDate = null;

buttonStarEl.disabled = true;
buttonStarEl.addEventListener('click', handleStartCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date()){
      window.alert("Please choose a date in the future")
      return;
    } else {
      selectedDate = selectedDates[0].getTime();
      buttonStarEl.disabled = false;
    }
  },
};

flatpickr(inputDataPickerEL, options);

function handleStartCounter() {
   counter.start();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
   const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = new Date();
      let deltaTime = selectedDate - currentDate;
      updateTimerface(convertMs(deltaTime));
      buttonStarEl.disabled = true;
      inputDataPickerEL.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();

      }
    }, 1000);
  },

 stop() {
    buttonStarEl.disabled = true;
    inputDataPickerEL.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimerface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEL.textContent = `${hours}`;
  minutesEL.textContent = `${minutes}`;
  secondsEL.textContent = `${seconds}`;
}

 function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}