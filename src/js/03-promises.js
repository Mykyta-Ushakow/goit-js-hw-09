
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

const { delayInput, stepInput, amountInput, submitBtn } = refs;

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    // Fulfill
    return new Promise((resolve, reject) => {

      resolve({ position, delay });
      
    });
  } else {
    // Reject
    return new Promise((resolve, reject) => {
        
      reject({position, delay});

    });
  }

}

function handleClick() {
  event.preventDefault();

  setTimeout(() => {

    createPromise(1, Number(delayInput.value))
      .then(values => notifySuccess(values))
      .catch(error => notifyFailure(error));
    
    for (let i = 1; i < amountInput.value; i++) {
      setTimeout(() => createPromise(i + 1, Number(delayInput.value) + stepInput.value * i)
        .then(values => notifySuccess(values))
        .catch(error => notifyFailure(error)),
        
        stepInput.value * i);
    }
    
  },
    delayInput.value);

}

function notifySuccess({position, delay}) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { timeout: 10000 });
}
function notifyFailure({position, delay}) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {timeout: 10000});
}

submitBtn.addEventListener("click", handleClick);