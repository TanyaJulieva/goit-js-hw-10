import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('[type="submit"]'),
  fulfilledInput: document.querySelector('[value="fulfilled"]'),
  rejectedInput: document.querySelector('[value="rejected"]'),
  delayInput: document.querySelector('[name="delay"]'),
};

elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  // elements.fulfilledInput.checked = false;
  // elements.rejectedInput.checked = false;
  // elements.delayInput.value = '';

  let delay = elements.delayInput.value;

  const promise = new Promise((res, rej) => {
    elements.delayInput.value = '';

    setTimeout(() => {
      if (elements.fulfilledInput.checked) {
        res(delay);
      }
      if (elements.rejectedInput.checked) {
        rej(delay);
      }
      console.log(promise);
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  // elements.fulfilledInput.checked = false;
  // elements.rejectedInput.checked = false;
}
