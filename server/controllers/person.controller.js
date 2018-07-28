import Person from '../models/person';
import sanitizeHtml from 'sanitize-html';


/**
 * Get people
 * @param req
 * @param res
 * @returns void
 */
export function getPeople(req, res) {
  console.log("controller req.params.offset" + req.query.offset)
  console.log("controller req.params.limit" + req.query.limit)
  var offset = (req.query.offset) ? parseInt(req.query.offset) : 0
  var limit = (req.query.limit) ? parseInt(req.query.limit) : 5
  var total = 0
  Person.count().then((n) => { total = n })
  Person.find()
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .sort('-dateAdded')
    .exec((err, people) => {
      if (err) {
        res.status(500).send(err);
      }
      //TODO VER ERROR      
      res.json({paging:{total:total,limit:limit,offset:offset},results:people});
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
  Person.findOne({ dni: req.params.id }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ person });
  });
}

/**
 * Search people
 * @param req
 * @param res
 * @returns void
 */
export function searchPeople(req, res) {
  var queryRegex = new RegExp(req.params.id, "i");
  Person.find({ $or: [{ dni: { $regex: queryRegex } }, { name: { $regex: queryRegex } }, { surname: { $regex: queryRegex } }] }).sort('-dateAdded').exec((err, people) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({paging:{total:people.length,limit:people.length,offset:people.length},results:people});
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
