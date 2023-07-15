import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class staticController {

    getMainPage (req, res) {
        res.sendFile(path.resolve(__dirname + '/main', 'mainPage.html'))
    }

    getAdminPage (req, res) {
        res.sendFile(path.resolve(__dirname + '/main/admin-window', 'admin-window.html'))
    }

    getAdminQuizAdd (req, res) {
        res.sendFile(path.resolve(__dirname + '/main/admin-window/addQuiz', 'addQuiz.html'))
    }

    getAdminQuizUpdate (req, res) {
        res.sendFile(path.resolve(__dirname + '/main/admin-window/updateQuiz', 'updateQuiz.html'))
    }

    getAdminQuizDelete (req, res) {
        res.sendFile(path.resolve(__dirname + '/main/admin-window/deleteQuiz', 'deleteQuiz.html'))
    }

    getRegistration (req, res) {
        res.sendFile(path.resolve(__dirname + '/auth/registration', 'registrationPage.html'))
    }

    getLogin (req, res) {
        res.sendFile(path.resolve(__dirname + '/auth/login', 'loginPage.html'))
    }

    getQuiz (req, res) {
        res.sendFile(path.resolve(__dirname + '/quiz/firstQuiz', 'index.html'))
    }

}

export default new staticController();
