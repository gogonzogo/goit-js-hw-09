import { create } from 'basiclightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  form: document.querySelector('form'),
  btn: document.querySelector('button'),
};

ref.form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  let formPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  })
    formPromise.then(() => {
      console.log(`Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(() => {
      console.log(`Rejected promise ${position} in ${delay}ms`);
    })
  console.log(formPromise);
};

function createPromiseLoop(delay, delayStep, amount) {
  for (i = 1; i <= amount; i++) {
    let promisePosition = i;
    let promiseDelay = delay += delayStep;
    console.log(promisePosition);
    console.log(promiseDelay);
    createPromise(promisePosition, promiseDelay);
  };
};

function formValidation(formDelay, formStep, formAmount) {
  let whiteSpaces = /^\S*$/;
  if (formDelay < 1 || formStep < 1 || formAmount < 1) {
    console.log("REQUIRED: Inputs must be greater than 0!");
  } else {
    createPromiseLoop(formDelay, formStep, formAmount);
  }
}

function formDataParser(object) {
  let promiseFormDelay = parseInt(object.get('delay'));
  let promiseFormDelayStep = parseInt(object.get('step'));
  let promiseFormAmount = parseInt(object.get('amount'));
  formValidation(promiseFormDelay, promiseFormDelayStep, promiseFormAmount);
}

function handleSubmit(e) {
  e.preventDefault();
  let formData = new FormData(ref.form);
  formDataParser(formData);
}