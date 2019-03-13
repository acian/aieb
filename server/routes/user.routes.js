import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get users
router.route('/users').get(UserController.getUsers);

// Add a new person
router.route('/user').post(UserController.addUser);

// Edit person
router.route('/user/:id').put(UserController.editUser);

// Log in
router.route('/user/login').post(UserController.login);

//Log out
router.route('/user/logout').get(UserController.logout);

//Is logged in
router.route('/user/is-loggedin').get(UserController.isLoggedIn);

export default router;
