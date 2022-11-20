// сообщение об успешной отправке
const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
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

// сообщение об ошибке отправки
const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButtonElement = errorMessage.querySelector('.error__button');

  document.body.append(errorMessage);

  errorButtonElement.addEventListener('click', () => {
    errorMessage.remove();
  });

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorMessage.remove();
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
