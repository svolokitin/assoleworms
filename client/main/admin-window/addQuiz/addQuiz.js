import quizController from "./quizController.js";

const diff = document.getElementById('diff');
const question = document.getElementById('question');
const a = document.getElementById('a');
const b = document.getElementById('b');
const c = document.getElementById('c');
const d = document.getElementById('d');
const correct = document.getElementById('correct');
const form = document.getElementById('form');

form.addEventListener('submit', startEvent)

function startEvent (event) {
    event.preventDefault();

    quizController.postQuiz(diff.value, question.value, a.value, b.value, c.value, d.value, correct.value)
}
