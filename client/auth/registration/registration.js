import Users from '../user.js';

const user_name = document.getElementById('field_name');
const user_email = document.getElementById('field_email');
const user_password = document.getElementById('field_password');
const form = document.querySelector('#form');

function userRegistration () {
    Users.registration(user_name.value, user_email.value, user_password.value);
}

form.addEventListener('submit', startEvent);

function startEvent (event) {
    event.preventDefault();

    userRegistration();
}
