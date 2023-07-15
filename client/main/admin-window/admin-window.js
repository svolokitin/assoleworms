import $api from "../../auth/instanceAxios.js";
import { API_SERVER_URL } from "../../auth/config.js";
import user from "../../auth/user.js";

const buttons = document.querySelector('.buttons');
const main_container = document.querySelector('.main-container');
const account = document.getElementById('account');
const quizData = [];
const mainData = [];
const usersData = [];
const users = [];
let indexObject = 0;

const getUsers = async () =>  {
    try {
        await $api.get('/api/find')
        .then(function(response) {
            usersData.push(response.data);
        })
        .catch(function(error) {
            console.log(error.message);
        })
    } catch (error) {
        alert(error.message)
    }
}

getUsers();

const getQuiz = async () => {
    await $api.get(`${API_SERVER_URL}/api/quiz/find`)
    .then(function(response){
        quizData.push(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
}

getQuiz();


buttons.addEventListener('click', function (event) {   //делегирование
    if (event.target.closest('#button1')) {
        window.location.href = '/main/admin-window/addQuiz';
    }
    if (event.target.closest('#button2')) {
        window.location.href = '/main/admin-window/updateQuiz';
    }
    if (event.target.closest('#button3')) {
        window.location.href = '/main/admin-window/deleteQuiz'
    }
    if (event.target.closest('#button4')) {
        let count = 0;
        function getQuizRecurs () {
            if (count === quizData[0].length) return;
            const htmlText = `
                <br>
                <br>
                <h1>ID: ${quizData[0][count].id}</h1>
                <h1>Difficult: ${quizData[0][count].difficult}</h1>
                <h1>Question: ${quizData[0][count].question}</h1>
                <h1>Variant: ${quizData[0][count].a}</h1>
                <h1>Variant: ${quizData[0][count].b}</h1>
                <h1>Variant: ${quizData[0][count].c}</h1>
                <h1>Variant: ${quizData[0][count].d}</h1>
                <h1>correct: ${quizData[0][count].correct}</h1>
            `;
            mainData.push(htmlText);
            console.log(mainData[count])
            count++;
            getQuizRecurs();
        }
        getQuizRecurs();
        main_container.innerHTML = mainData;
    }
    if (event.target.closest('#button5')) {
        console.log(usersData[0][0])
        let count = 0;
        function getUsersRecurs () {
            if (count === usersData[0].length) return;
            const htmlText = `
                <br>
                <br>
                <h1>ID: ${usersData[0][count].id}</h1>
                <h1>full_name: ${usersData[0][count].full_name}</h1>
                <h1>email: ${usersData[0][count].email}</h1>
                <h1>roles: ${usersData[0][count].roles}</h1>
            `;
            users.push(htmlText);
            console.log(users[count])
            count++;
            getUsersRecurs();
        }
        getUsersRecurs();
        main_container.innerHTML = users;
    }
});


