import { Router } from 'express';
import * as InscriptionController from '../controllers/inscription.controller';
const router = new Router();

// Add a new inscription
router.route('/inscription').post(InscriptionController.addInscription);

export default router;
