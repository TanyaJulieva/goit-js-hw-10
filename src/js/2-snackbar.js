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
  createPromise(delay)


  function createPromise(delay) {
    return new Promise((res, rej) => {
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
  
    
      .then(delay => {
        iziToast.show({
          iconUrl: Icon,
          title: 'OK',
          titleColor: '#FFFFFF',
          backgroundColor: '#59A10D',
          messageColor: '#FFFFFF',
          message: `Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(delay => {
        iziToast.show({
          title: 'Error',
          titleColor: '#FFFFFF',
          backgroundColor: '#EF4040',
          messageColor: '#FFFFFF',
          message: `Rejected promise in ${delay}ms`,
        });
      });
  }
    

    evt.currentTarget.reset()
}
