import Inscription from '../models/inscription';
import sanitizeHtml from 'sanitize-html';

/**
 * Save inscription
 * @param req
 * @param res
 * @returns void
 */
export function addInscription(req, res) {
  if (!req.body.inscription.studentId || !req.body.inscription.courseId) {
    res.status(403).end();
  }

  const newInscription = sanitizeInputs(req.body.inscription);

  newInscription.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ inscription: saved });
  });
}


const sanitizeInputs = (inscription) => {
  const newInscription = new Inscription(inscription);

  // Let's sanitize inputs
  newInscription.studentId = sanitizeHtml(newInscription.studentId);
  newInscription.courseId = sanitizeHtml(newInscription.courseId);

  return newInscription;
};
