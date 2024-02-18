import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Succes from '../img/succes.svg';
import ErrorIcon from '../img/err.svg';

const elements = {
  form: document.querySelector('.form'),
  fulfilledInput: document.querySelector('[value="fulfilled"]'),
  rejectedInput: document.querySelector('[value="rejected"]'),
  delayInput: document.querySelector('[name="delay"]'),
};

elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  const delay = evt.currentTarget.elements.delay.value;
  const radioBtn = evt.currentTarget.elements.state.value;

  createPromise(radioBtn, delay)
    .then(res => {
      iziToast.show({
        iconUrl: Succes,
        class: 'popup-message',
        position: 'topRight',
        title: 'OK',
        titleColor: '#FFFFFF',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(rej => {
      iziToast.show({
        iconUrl: ErrorIcon,
        class: 'popup-message',
        position: 'topRight',
        title: 'Error',
        titleColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        message: `Rejected promise in ${delay}ms`,
      });
    });

  function createPromise(btn, delay) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (btn === 'fulfilled') {
          res({ delay });
        }
        else {
          rej({ delay });
        }
      }, delay);
    });
  }
  evt.currentTarget.reset();
}
