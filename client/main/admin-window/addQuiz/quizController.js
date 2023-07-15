import $api from "../../../auth/instanceAxios.js";


class quizController  {

    async postQuiz (difficult, question, a, b, c, d, correct)  {
        try {
            await $api.post('/api/quiz/create', {
                difficult: difficult,
                question: question,
                a: a,
                b: b,
                c: c,
                d: d,
                correct: correct
            })
            .then(function(response) {
                if (response.status == 200) {
                    alert('Вопрос добавлен!')
                }
            })
            .catch(function(error) {
                alert(error.message)
            })
        } catch (err) {
            alert(err.message);
        }
    }

    async updateQuize (id, difficult, question, a, b, c, d, correct) {
        try {
            await $api.post(`/api/quiz/update/${id}`, {
                difficult: difficult,
                question: question,
                a: a,
                b: b,
                c: c,
                d: d,
                correct: correct
            })
            .then(function(response) {
                if (response.status == 200) {
                    alert('Вопрос успешно обновлен!')
                }
            })
            .catch(function(error) {
                alert('Что-то пошло не так(');
            })
        } catch (err) {
            alert(err.message);
        }
    }

    async deleteQuize (id) {
        try {
            await $api.delete(`/api/quiz/delete/${id}`, {
            })
            .then(function(response) {
                if (response.status == 200) {
                    alert('Вопрос удален успешно');
                }
            })
            .catch(function(error) {
                alert('Проблемка...')
            })
        } catch (err) {
            return err.message;
        }
    }

}

export default new quizController();
