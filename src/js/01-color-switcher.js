const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStartEl.addEventListener('click', handleStart);
buttonStopEl.addEventListener('click', handleStop);
buttonStopEl.toggleAttribute('disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeBackgroundColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}

function handleStart() {
   timerId = setInterval(changeBackgroundColor, 1000)
    
    buttonStartEl.toggleAttribute('disabled');
    buttonStopEl.removeAttribute('disabled');
}

function handleStop() {
    clearInterval(timerId); 
    
    buttonStartEl.removeAttribute('disabled');
    buttonStopEl.toggleAttribute('disabled');
}