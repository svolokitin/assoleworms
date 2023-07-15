import { API_SERVER_URL } from "../../auth/config.js";
import $api from "../../auth/instanceAxios.js";

const quiz = document.getElementById('quizContainer');
const diff = document.getElementById('diff');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const form = document.querySelector('#form');
const fildInput = document.querySelector('#fild');

let indexObject = 0;
let countTrueAns = 0;
let countFalseAns = 0;

//Здесь начинается говнокод

const quizData = [];   //объявляю массив, потому что не получилось получить объект из запроса 

const saveResults = async (countTrueAns, countFalseAns) => {
    await $api.post(`${API_SERVER_URL}/api/quiz/save`, {
        trueAns: countTrueAns,
        falseAns: countFalseAns 
    }) 
}

const getQuiz = async () => {
    await $api.get('/api/quiz/find')
    .then(function(response){
        quizData.push(response.data);
    })
    .catch(function(error){
        alert(error.response.data.message);
        console.log(error);
    });
}

getQuiz();

function loadQuiz () {
    diff.innerText = quizData[0][indexObject].difficult;
    questionEl.innerText = quizData[0][indexObject].question;
    a_text.innerText = quizData[0][indexObject].a;                      //просто лол
    b_text.innerText = quizData[0][indexObject].b;
    c_text.innerText = quizData[0][indexObject].c;
    d_text.innerText = quizData[0][indexObject].d;
}

function checkResult() {
    const percent = countTrueAns / (quizData[0].length / 100);     //жеские математические рассчёты

    if (percent > 75) {
        quiz.innerHTML = `<h3 class="result">Поздравляем, вы прошли тест!<br>${countTrueAns} правильных ответов из ${quizData[0].length}</h3>`;
    }
    else {
        quiz.innerHTML = `<h3 class="result">Вы провалили тест!!!<br>${countTrueAns} правильных ответов из ${quizData[0].length}</h3>`;
    }
}

form.addEventListener('submit', startEvent);

function startEvent (event) {
    event.preventDefault();

    loadQuiz();

    const fildText = fildInput.value;
    const currentQuizData = quizData[0][indexObject];
    indexObject++;

    if (indexObject < quizData[0].length) {
        loadQuiz();
        if (fildText === currentQuizData.correct) {
            countTrueAns++;
            console.log(countTrueAns, countFalseAns);
        }
        else {
            countFalseAns++;
            console.log(countTrueAns, countFalseAns);
        }
    }
    else {
        if (fildText === currentQuizData.correct) {
            countTrueAns++;
            console.log(countTrueAns, countFalseAns);
        }
        else {
            countFalseAns++;
            console.log(countTrueAns, countFalseAns);
        }
        checkResult(countTrueAns);
        saveResults(countTrueAns, countFalseAns);
    }

    fildInput.value = "";
}
