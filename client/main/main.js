import $api from "../auth/instanceAxios.js";
import user from "../auth/user.js";

const form = document.getElementById('form');
const account = document.getElementById('account');
const log = document.getElementById('log');
const reg = document.getElementById('reg');
const logout = document.getElementById('logout');


const getName = async () => {
    await $api.get('/api/getname')
    .then(function(response) {
        account.innerText = response.data;
        console.log('Privet huilo!')
    })
    .catch(function(error) {
        return error.message;
    })
}

getName();


form.addEventListener('click', function (event) {   //делегирование
    if (event.target.closest('#logout')) {
        event.preventDefault();
        
        user.logout();
        console.log('Logout...')
    }
});






