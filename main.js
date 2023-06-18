const quizData = [
    {
        difficult: 'Сложность: как два пальца',
        question: 'Какая команда отвечает за меню банды?',
        a: '/bmenu',
        b: '/fmenu',
        c: '/qmenu',
        d: '/dmenu',
        correct: '/fmenu'
    }, {
        difficult: 'Сложность: как два пальца',
        question: 'Какая команда отвечает за колово часов?',
        a: '/c 60',
        b: '/b 60',
        c: '/c 50',
        d: '/d 99',
        correct: '/c 60'
    }, {
        difficult: 'Сложность: как два пальца',
        question: 'Какая команда отвечает за меню машины?',
        a: '/auto',
        b: '/mobile',
        c: '/car',
        d: '/jopa',
        correct: '/car'
    }, {
        difficult: 'Сложность: как два пальца',
        question: 'Какая команда отвечает за чат банды?',
        a: '/fm',
        b: '/rr',
        c: '/fc',
        d: '/bm',
        correct: '/fm'
    }, {
        difficult: 'Сложность: как два пальца',
        question: 'Какая команда отвечает за передачу предмета другому игроку?',
        a: '/drop_item',
        b: '/give_item',
        c: '/take_item',
        d: '/give_jopa',
        correct: '/give_item'
    }, {
        difficult: 'Сложность: что-то знаешь',
        question: 'Сколько максимум игроков может быть на захвате бизака?',
        a: 'Формат ответа: число',
        b: '',
        c: '',
        d: '',
        correct: '10'
    }, {
        difficult: 'Сложность: что-то знаешь',
        question: 'До какой минуты нельзя стрелять при капте?',
        a: 'Формат ответа: число',
        b: '',
        c: '',
        d: '',
        correct: '5'
    }
]

const diff = document.getElementById('diff');
const quiz = document.getElementById('quizContainer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const form = document.querySelector('#form');
const fildInput = document.querySelector('#fild');
const quizContainer = document.querySelector('#quizContainer');

let currentQuiz = 0;
let countTrueAns = 0;
let countFalseAns = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    diff.innerText = currentQuizData.difficult;
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function checkResult() {
    const percent = countTrueAns / (quizData.length / 100);

    if (percent > 75) {
        quiz.innerHTML = `<h3 class="result">Поздравляем, вы прошли тест!<br>${countTrueAns} правильных ответов из ${quizData.length}</h3>`;
    }
    else {
        quiz.innerHTML = `<h3 class="result">Вы провалили тест!!!<br>${countTrueAns} правильных ответов из ${quizData.length}</h3>`;
    }
}

form.addEventListener('submit', addQuiz);

function addQuiz(event) {
    //отмена отправки формы
    event.preventDefault();
    const fildText = fildInput.value;
    const currentQuizData = quizData[currentQuiz];
    currentQuiz++;

    if (currentQuiz < quizData.length) {
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
    }

    fildInput.value = "";
}

