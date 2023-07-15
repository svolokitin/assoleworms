import Users from '../user.js';

const user_name = document.getElementById('field_name');
const user_password = document.getElementById('field_password');
const form = document.querySelector('#form');

function userLogin () {
    Users.login(user_name.value, user_password.value);
}

form.addEventListener('submit', startEvent);

function startEvent (event) {
    event.preventDefault();

    userLogin();
}
