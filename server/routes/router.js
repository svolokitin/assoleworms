import Router from 'express';
import quizController from '../controllers/quizController.js';
import memberController from '../controllers/memberController.js';
import { checkRolesUser } from '../middleware/rolesMiddleware.js';
import { checkAuthUser } from '../middleware/userMiddleware.js';
import { check } from 'express-validator';

const router = new Router();

router.post('/registration', [
    check('full_name', 'Name cant be empty!').notEmpty(),
    check('full_name', 'Must be great than 4 and less then 16 symbols').isLength({min:4, max:16}),
    check('email', 'Invalid email').notEmpty(),
    check('password', 'Must be great than 4 and less then 10').isLength({min:4, max:10})
], memberController.memberRegistration)
router.post('/login', memberController.memberLogin)
router.post('/logout', memberController.memberLogout)
// router.get('/activate/:link', memberController.activate)
router.get('/refresh', memberController.memberRefresh)
router.get('/find', memberController.getMembers)
router.get('/find/:id', checkAuthUser, memberController.getMemberById)
router.get('/getname', memberController.getMember)
router.put('/update', memberController.updateMember)
router.delete('/delete/:id', memberController.deleteMember)

router.get('/quiz/find/:id', quizController.getQuiz)
router.get('/quiz/find', checkAuthUser, quizController.getQuizes)
router.post('/quiz/create', checkRolesUser(['ADMIN']), quizController.createQuizes)
router.post('/quiz/update/:id', checkRolesUser(['ADMIN']), quizController.updateQuize)
router.post('/quiz/save', quizController.saveResults)
router.delete('/quiz/delete/:id', checkRolesUser(['ADMIN']), quizController.deleteQuiz)
router.delete('/quiz/resultDel/:id', quizController.deleteResults)

export default router;
