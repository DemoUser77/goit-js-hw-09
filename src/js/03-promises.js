const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[ name="step"]');
const amountEl = document.querySelector('[name="amount"]');
// const submitEl = document.querySelector('submit')


formEl.addEventListener('click', handlePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      };
    }, delay);
  });
}

function handlePromise(event) {
  event.preventDefault();
  

  let firstDelay = Number (delayEl.value);
  let delayStep = Number(stepEl.value);
  let amount = Number(amountEl.value);

  for (let i = 0; i < amount; i += 1 ) {
    let promiseDelay = firstDelay + delayStep * i;

    createPromise(i + 1, promiseDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
    event.currentTarget.reset();

  }

}