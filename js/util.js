// сообщение об успешной отправке
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode('true');
  document.body.append(successMessage);

  successMessage.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
    }
  });
};

// сообщение об ошибке
const showErrorMessage = () => {
  const successMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const successMessage = successMessageTemplate.cloneNode('true');
  const errorButton = successMessage.querySelector('.error__button');

  document.body.append(successMessage);

  errorButton.addEventListener('click', () => {
    successMessage.remove();
  });

  successMessage.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successMessage.remove();
    }
  });
};


// функция оформления сообщения об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.top = '50%';
  alertContainer.style.transform = 'translateY(-50%)';
  alertContainer.style.padding = '50px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ffaa99ba';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showAlert, showSuccessMessage, showErrorMessage };
