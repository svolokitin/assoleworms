import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import staticController from './controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const app = express();

app.use(express.json());

app.use('/main', express.static(path.join(__dirname + '/main')));
app.use('/auth', express.static(path.join(__dirname + '/auth')));
app.use('/quiz', express.static(path.join(__dirname + '/quiz')));

app.get('/main', staticController.getMainPage)
app.get('/main/admin-window', staticController.getAdminPage)
app.get('/main/admin-window/addQuiz', staticController.getAdminQuizAdd)
app.get('/main/admin-window/updateQuiz', staticController.getAdminQuizUpdate)
app.get('/main/admin-window/deleteQuiz', staticController.getAdminQuizDelete)
app.get('/auth/registration', staticController.getRegistration)
app.get('/auth/login', staticController.getLogin)
app.get('/quiz/firstQuiz', staticController.getQuiz)

app.listen(PORT,  () => {
    console.log('SERVER IS RUNING ON localhost:' + PORT);
})

