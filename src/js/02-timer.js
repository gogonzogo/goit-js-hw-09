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

ref.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidation(selectedDates[0]);
  },
};

const dateTimePicker = flatpickr(ref.input, options);
let timerId = null;

ref.btn.addEventListener('click', timerStartOnClick);

function timerStartOnClick(evt) {
    ref.btn.disabled = true;
    ref.input.disabled = true;
    timerId = setInterval(timerCountdown, 1000);
  };

function dateValidation(date) {
  if (date < new Date()) {
    Notify.failure("Please choose a date in the future");
    ref.btn.disabled = true;
  } else {
    ref.btn.disabled = false;
  };
};

function timerCountdown() {
  const dateSelected = new Date(dateTimePicker.selectedDates[0].getTime());
  const today = new Date().getTime();
  const timeDelta = dateSelected - today;
  const millisecondCnv = convertMs(timeDelta);
  createMarkup(millisecondCnv);

  if (timeDelta < 1000) {
    clearInterval(timerId);
    return Notify.info('Countdown complete!')
  };
};

function createMarkup({ days, hours, minutes, seconds }) {
  ref.day.innerText = addLeadingZero(days);
  ref.hour.innerText = addLeadingZero(hours);
  ref.minute.innerText = addLeadingZero(minutes);
  ref.second.innerText = addLeadingZero(seconds);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}
