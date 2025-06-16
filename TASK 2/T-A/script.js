document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    let errors = [];

    if (name === '') {
        errors.push('Name is required.');
    }

    if (email === '') {
        errors.push('Email is required.');
    } else if (!validateEmail(email)) {
        errors.push('Please enter a valid email address.');
    }

    if (message === '') {
        errors.push('Message is required.');
    }

    if (errors.length > 0) {
        errorMessage.innerText = errors.join(' ');
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert('Form submitted successfully!');
        document.getElementById('contactForm').reset();
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
