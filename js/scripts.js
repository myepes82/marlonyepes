const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const submitButton = document.getElementById("submit-button");

function showError(element, message) {
  element.textContent = message;
  element.classList.remove("hidden");
}

function hideError(element) {
  element.textContent = "";
  element.classList.add("hidden");
}

function validateName() {
  if (nameInput.value.length < 3) {
    showError(nameError, "Name must be at least 3 characters long.");
    return false;
  }
  hideError(nameError);
  return true;
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    showError(emailError, "Enter a valid email address.");
    return false;
  }
  hideError(emailError);
  return true;
}

function validateMessage() {
  if (messageInput.value.length < 20 || messageInput.value.length > 255) {
    showError(
      messageError,
      "Message must be between 20 and 255 characters long."
    );
    return false;
  }
  hideError(messageError);
  return true;
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  return isNameValid && isEmailValid && isMessageValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    submitButton.disabled = true;

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    axios
      .post("https://mail-service-y5h7.onrender.com/mail", formData, {
        timeout: 60000,
      })
      .then((response) => {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        submitButton.true = false;

        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("POST Request Error:", error);

        submitButton.disabled = false;
      });
  }
});

submitButton.addEventListener("click", function () {
  submitButton.style.backgroundColor = "rgba(255, 87, 51, 0.8)";
});

const recommendationsMenu = document.querySelector(".recommendations-menu");
const liElements = recommendationsMenu.querySelectorAll("li");

if (liElements.length > 7) {
  recommendationsMenu.classList.add("scrollable-menu");
}
