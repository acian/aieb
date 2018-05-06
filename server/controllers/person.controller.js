import person from '../models/person';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all persons
 * @param req
 * @param res
 * @returns void
 */
export function getPersons(req, res) {
  person.find().sort('-dateAdded').exec((err, persons) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ persons });
  });
}

/**
 * Save a person
 * @param req
 * @param res
 * @returns void
 */
export function addPerson(req, res) {
  if (!req.body.person.name || !req.body.person.surname || !req.body.person.dni) {
    res.status(403).end();
  }

  const newPerson = new person(req.body.person);

  // Let's sanitize inputs
  newPerson.surname = sanitizeHtml(newPerson.surname);
  newPerson.name = sanitizeHtml(newPerson.name);
  newPerson.dni = sanitizeHtml(newPerson.dni);

  newPerson.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ person: saved });
  });
}

/**
 * Get a single person
 * @param req
 * @param res
 * @returns void
 */
export function getPerson(req, res) {
  person.findOne({ dni: req.params.dni }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ person });
  });
}

/**
 * Delete a person
 * @param req
 * @param res
 * @returns void
 */
export function deletePerson(req, res) {
  person.findOne({ dni: req.params.dni }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }

    person.remove(() => {
      res.status(200).end();
    });
  });
}
