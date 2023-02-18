const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
}

let backgroundColorTimer = null;
ref.stopBtn.disabled = true;

ref.startBtn.addEventListener("click", handleStartBtnClick);

function handleStartBtnClick(evt) {
  setTimeout(() => {
    backgroundColorTimer = setInterval(() => {
      ref.body.style.cssText = (`background-color: ${getRandomHexColor()}`);
    }, 1000)
  },4);
  ref.startBtn.disabled = true;
  ref.stopBtn.disabled = false;
}

ref.stopBtn.addEventListener("click", handleStopBtnClick);

function handleStopBtnClick(e) {
  clearInterval(backgroundColorTimer);
  ref.stopBtn.disabled = true;
  ref.startBtn.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
