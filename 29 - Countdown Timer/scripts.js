let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing one
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainerSeconds = seconds % 60;
  const display = `${minutes}:${
    remainerSeconds < 10 ? '0' : ''
  }${remainerSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(time) {
  const end = new Date(time);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const seconds = end.getSeconds();
  endTime.textContent = `Be back at ${hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
