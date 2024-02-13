import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
};

elements.btnStart.disabled = true;

const currentDate = new Date().getTime();

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    let ms = userSelectedDate - currentDate;
    if (ms < 0) {
        elements.btnStart.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      return
    };
    elements.btnStart.disabled = false;
  },
};

flatpickr(elements.input, options);

function addLeadingZero(number) {
    return number.padStart(2, '0')
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
  