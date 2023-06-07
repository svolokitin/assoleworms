const quizData = [
    {
        question: 'Какая команда отвечает за меню банды?',
        a: '/bmenu',
        b: '/fmenu',
        c: '/pmenu',
        d: '/dmenu',
        correct: '/fmenu'
    }, {
        question: 'Какая команда отвечает за колово часов?',
        a: '/c 60',
        b: '/b 60',
        c: '/c 50',
        d: '/d 50',
        correct: '/c 60'
    }, {
        question: 'Какая команда отвечает за меню машины?',
        a: '/auto',
        b: '/mobile',
        c: '/car',
        d: '/jopa',
        correct: '/car'
    }
]

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
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

form.addEventListener('submit', addQuiz);

function addQuiz(event) {
    //отмена отправки формы
    event.preventDefault();
    const fildText = fildInput.value;
    const currentQuizData = quizData[currentQuiz];
    currentQuiz++;

    if (currentQuiz <= quizData.length) {
        if (fildText == currentQuizData.correct) {
            try {
                loadQuiz();
                countTrueAns++;
            }
            catch (err) {
                alert('Finish');
                countTrueAns++;
            }    
        }
        else {
            try {
                loadQuiz();
                countFalseAns++;
            }
            catch (err) {
                alert('Finish');
                countFalseAns++;
            }
        }
    } 
    else {
        alert('Finish');
    }

    fildInput.value = "";

}

