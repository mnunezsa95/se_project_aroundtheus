// Form Validation

function showInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(options.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

enableValidation(config);
