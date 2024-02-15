import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  submitBtn: document.querySelector('[type="submit"]'),
  fulfilledInput: document.querySelector('[value="fulfilled"]'),
  rejectedInput: document.querySelector('[value="rejected"]'),
  delayInput: document.querySelector('[name="delay"]'),
};

elements.submitBtn.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  let delay = Number(elements.delayInput.value);

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (elements.fulfilledInput.checked) {
        res(delay);
      } else {
        rej(delay);
      }
      console.log(promise);
    }, delay);
  });

  promise
  .then((delay) =>
    iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
    })
  )

  .catch((delay) => iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
  }));
  
}
