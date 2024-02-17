import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Icon from '/img/icons.svg';

const elements = {
  form: document.querySelector('.form'),
  fulfilledInput: document.querySelector('[value="fulfilled"]'),
  rejectedInput: document.querySelector('[value="rejected"]'),
  delayInput: document.querySelector('[name="delay"]'),
};

elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  let delay = elements.delayInput.value;

  console.log(createPromise(delay));

  createPromise(delay)
    .then(delay => {
      iziToast.show({
        class: 'popup-message',
        iconUrl: Icon,
        position: 'topRight',
        title: 'OK',
        titleColor: '#FFFFFF',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        class: 'popup-message',
        position: 'topRight',
        title: 'Error',
        titleColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        message: `Rejected promise in ${delay}ms`,
      });
    });

  function createPromise() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (elements.fulfilledInput.checked) {
          res(delay);
        }
        if (elements.rejectedInput.checked) {
          rej(delay);
        };
      }, delay);
    });
  }
  
  // const promise = new Promise((res, rej) => {
  //   setTimeout(() => {
  //     if (elements.fulfilledInput.checked) {
  //       res(delay);
  //     }
  //     if (elements.rejectedInput.checked) {
  //       rej(delay);
  //     }
  //     console.log(promise);
  //   }, delay);
  // });

  // promise
  //   .then(delay => {
  //     iziToast.show({
  //       class: 'popup-message',
  //       iconUrl: Icon,
  //       position: 'topRight',
  //       title: 'OK',
  //       titleColor: '#FFFFFF',
  //       backgroundColor: '#59A10D',
  //       messageColor: '#FFFFFF',
  //       message: `Fulfilled promise in ${delay}ms`,
  //     });
  //   })
  //   .catch(delay => {
  //     iziToast.show({
  //       class: 'popup-message',
  //       position: 'topRight',
  //       title: 'Error',
  //       titleColor: '#FFFFFF',
  //       backgroundColor: '#EF4040',
  //       messageColor: '#FFFFFF',
  //       message: `Rejected promise in ${delay}ms`,
  //     });
  // });
}
