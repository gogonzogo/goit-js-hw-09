import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  input: document.querySelector('input'),
  btn: document.querySelector('button'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
}

// ref.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidation();
  },
};

const dateTimePicker = flatpickr(ref.input, options);

ref.btn.addEventListener('click', conuntdownOnClick);

function conuntdownOnClick(evt) {
  if (evt.target === ref.btn) {
    const timerCountdown = setInterval(() => {
      const countdownArray = convertMs(dateDelta());
      console.log(dateDelta());
      ref.day.innerText = addLeadingZero(countdownArray.days);
      ref.hour.innerText = addLeadingZero(countdownArray.hours);
      ref.minute.innerText = addLeadingZero(countdownArray.minutes);
      ref.second.innerText = addLeadingZero(countdownArray.seconds);
    }, 1000);
  } else if (countdownArray.seconds === 0) {
    console.log("HELP!!!");
    clearInterval(timerCountdown);
    return;
  };
};

function dateDelta() {
  if (dateTimePicker.selectedDates[0] < new Date()) {
    return;
  } else {
    const dateSelected = new Date(dateTimePicker.selectedDates[0].getTime());
    const today = new Date().getTime();
    const timeDelta = dateSelected - today;
    return timeDelta;
  };
};

function dateValidation() {
  if (dateTimePicker.selectedDates[0] < new Date()) {
    Notify.failure("Please choose a date in the future");
    ref.btn.disabled = true;
  } else {
    ref.btn.disabled = false;
  };
};

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

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}



