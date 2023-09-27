const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    if (nameInput.value.length < 3) {
        nameError.classList.remove('hidden');
        valid = false;
    } else {
        nameError.classList.add('hidden');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.classList.remove('hidden');
        valid = false;
    } else {
        emailError.classList.add('hidden');
    }

    if (messageInput.value.length < 20 || messageInput.value.length > 255) {
        messageError.classList.remove('hidden');
        valid = false;
    } else {
        messageError.classList.add('hidden');
    }

    if (valid) {
        // Deshabilitar el botón de envío para evitar múltiples envíos
        submitButton.disabled = true;

        // Crear un objeto con los datos del formulario
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };

        // Realizar la solicitud POST con Axios
        axios.post('https://mail-service-y5h7.onrender.com/mail', formData, { timeout: 60000 })
            .then(response => {
                // Limpiar el formulario después de un envío exitoso
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                submitButton.true = false; // Habilitar el botón después de limpiar el formulario

                // Aquí puedes manejar la respuesta de la API si es necesario
                console.log('Respuesta de la API:', response.data);
            })
            .catch(error => {
                // Manejar errores de la solicitud POST aquí, si es necesario
                console.error('Error en la solicitud POST:', error);

                // Habilitar el botón en caso de error
                submitButton.disabled = false;
            });
    }
});

submitButton.addEventListener('click', function () {
    submitButton.style.backgroundColor = 'rgba(255, 87, 51, 0.8)';
});