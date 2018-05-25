import Person from '../models/person';
import sanitizeHtml from 'sanitize-html';

/**
 * Get people
 * @param req
 * @param res
 * @returns void
 */
export function getPeople(req, res) {
  Person.find().sort('-dateAdded').exec((err, people) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ people });
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

  const newPerson = new Person(req.body.person);

  // Let's sanitize inputs
  newPerson.surname = sanitizeHtml(newPerson.surname);
  newPerson.name = sanitizeHtml(newPerson.name);
  newPerson.dni = sanitizeHtml(newPerson.dni);
  newPerson.address = sanitizeHtml(newPerson.address);
  newPerson.email = sanitizeHtml(newPerson.email);
  newPerson.telephone = sanitizeHtml(newPerson.telephone);
  newPerson.cellphone = sanitizeHtml(newPerson.cellphone);
  newPerson.profession = sanitizeHtml(newPerson.profession);
  newPerson.professionPlace = sanitizeHtml(newPerson.professionPlace);

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
  Person.findOne({ dni: req.params.dni }).exec((err, person) => {
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
  Person.findOne({ dni: req.params.id }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }

    person.remove(() => {
      res.status(200).end();
    });
  });
}
