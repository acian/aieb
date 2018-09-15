import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get user
//router.route('/login').post(UserController.login);

// Add a new person
router.route('/user').post(UserController.addUser);

// Log in
router.route('/user/login').post(UserController.login);

//Log out
router.route('/user/logout').get(UserController.logout);

//Is logged in
router.route('/user/is-loggedin').get(UserController.isLoggedIn);

export default router;
