import { Router } from 'express';
import * as PersonController from '../controllers/person.controller';
const router = new Router();

// Get all Posts
router.route('/persons').get(PersonController.getPersons);

// Get one post by id
router.route('/persons/:dni').get(PersonController.getPerson);

// Add a new Post
router.route('/persons').post(PersonController.addPerson);

// Delete a post by id
router.route('/persons/:dni').delete(PersonController.deletePerson);

export default router;
