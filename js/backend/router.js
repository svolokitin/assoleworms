import Router from 'express';
import userController from './userController.js';
import userAuth from './userAuth.js';
import { check } from 'express-validator';

const router = new Router();

router.post('/registration', [
    check('full_name', 'Invalid full_name').notEmpty(),
    check('email', 'Invalid email').notEmpty(),
    check('password', 'Must be great than 4 and less then 10').isLength({min:4, max:10})
], userAuth.userRegistration)
router.post('/login', userAuth.userLogin)
router.get('/find', userController.getUsers)
router.get('/find/:id', userController.getUserById)
router.put('/update', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

export default router;
