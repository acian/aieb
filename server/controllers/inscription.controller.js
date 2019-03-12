import Inscription from '../models/inscription';
import sanitizeHtml from 'sanitize-html';

/**
 * Save inscription
 * @param req
 * @param res
 * @returns void
 */
export function addInscription(req, res) {
  console.log("studen: " + req.body.inscription.studentId);
  console.log("course: " + req.body.inscription.courseId);
  console.log("amount: " + req.body.inscription.discountAmount);
  if (!req.body.inscription.studentId || !req.body.inscription.courseId) {
    return res.json({status: 403, error: "Faltan datos del studen id: "+ req.body.inscription.studentId + " o course id: " + req.body.inscription.courseId});
  }

  const newInscription = sanitizeInputs(req.body.inscription);

  newInscription.save((err, saved) => {
    if (err) {
      console.log("error: " + err);
      return res.json({status: 500, error: "Internal Server Error - Saved Inscription"});
    }else{
      res.json({ inscriptedPerson: saved });
    }
  });
}

/**
 * Get inscriptions by person
 * @param req
 * @param res
 * @returns list of inscriptions
 */
export function getInscriptionsByPerson(req, res) {
  console.log("getInscriptionsByPerson2: " + req.params.idStudent);
  Inscription.find({studentId: req.params.idStudent, status:"Inscripto"})
.sort({ dateCreated: -1 }).exec((err, inscriptions) => {
    if (err) {
      console.log("error: " + err);
      return res.json({status: 500, error: "Internal Server Error - Get Inscription by person"});
    }else{
      res.json({ inscByPer: inscriptions });
    }
  });
}


const sanitizeInputs = (inscription) => {
  const newInscription = new Inscription(inscription);

  // Let's sanitize inputs
  newInscription.studentId = sanitizeHtml(newInscription.studentId);
  newInscription.courseId = sanitizeHtml(newInscription.courseId);

  return newInscription;
};
