import { Router } from 'express';
import * as PersonController from '../controllers/person.controller';
const router = new Router();

// Get people
router.route('/people').get(PersonController.getPeople);

// Get one person by id
router.route('/people/:id').get(PersonController.getPerson);

// Add a new person
router.route('/people').post(PersonController.addPerson);

// Delete person by id
router.route('/people/:id').delete(PersonController.deletePerson);

export default router;
