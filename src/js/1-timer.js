import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

console.log(elements.btnStart)

elements.btnStart.disabled = true;

let userSelectedDate;
let intervalID;
let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date().getTime();
    userSelectedDate = selectedDates[0].getTime();
    let ms = userSelectedDate - currentDate;

    if (ms < 0) {
      elements.btnStart.disabled = true;
      iziToast.show({
        class: 'popup-message',
        position: 'topRight',
        title: 'Error',
        titleColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        message: 'Please choose a date in the future',
      });
      return;
    }
    elements.btnStart.disabled = false;
    elements.btnStart.addEventListener('click', handlerClick);
  },
};

flatpickr(elements.input, options);

function handlerClick() {
  elements.btnStart.disabled = true;
  elements.input.disabled = true;
  
  // const currentDate = new Date().getTime();
  userSelectedDate = new Date(elements.input.value).getTime();
  let ms = userSelectedDate - currentDate;

  intervalID = setInterval(() => {
    ms -= 1000;
    elements.seconds.textContent = addLeadingZero(convertMs(ms).seconds);
    elements.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
    elements.hours.textContent = addLeadingZero(convertMs(ms).hours);
    elements.days.textContent = addLeadingZero(convertMs(ms).days);

    if (ms <= 0) {
      clearInterval(intervalID);

      elements.seconds.textContent = '00';
      elements.minutes.textContent = '00';
      elements.hours.textContent = '00';
      elements.days.textContent = '00';
      elements.input.disabled = false;
    }
  }, 1000);
}

function addLeadingZero(number) {
  return ('0' + number).slice(-2);
}

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
