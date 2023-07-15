import quizController from "../addQuiz/quizController.js";

const deleteQuiz = document.getElementById('deleteQuiz');
const form = document.getElementById('form');

function startEvent (event) {
    event.preventDefault();

    console.log(deleteQuiz.value);
    quizController.deleteQuize(deleteQuiz.value);
}

form.addEventListener('submit', startEvent);

