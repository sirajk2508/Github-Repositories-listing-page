let errorMessageContainer = document.getElementById('error');

const showError = (message) => {
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.color = 'red';
    errorMessageContainer.style.fontWeight = 'bold';
}

export default showError;
