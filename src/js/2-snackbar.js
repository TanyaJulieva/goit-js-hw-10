import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

  const promise = new Promise((res, rej) => {
    elements.delayInput.value = '';
    // elements.fulfilledInput.checked = false;

    setTimeout(() => {
      if (elements.fulfilledInput.checked) {
        elements.fulfilledInput.checked = false;
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
}
