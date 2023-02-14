import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('input'),
  btn: document.querySelector('button'),
}

ref.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidation();
  }
  
};

const dateTimePicker = flatpickr(ref.input, options);

function dateValidation() {
  if (dateTimePicker.selectedDates[0] < new Date()) {
    Notify.failure("Please choose a date in the future");
    ref.btn.disabled = true;
  } else {
    ref.btn.disabled = false;
  }
}

ref.btn.addEventListener('click', handleClick);

function handleClick(evt) {
  
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



