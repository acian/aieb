import Person from '../models/person';
import sanitizeHtml from 'sanitize-html';

/**
 * Get people
 * @param req
 * @param res
 * @returns void
 */
export function getPeople(req, res) {
  var offset = (req.query.offset) ? parseInt(req.query.offset) : 0
  var limit = (req.query.limit) ? parseInt(req.query.limit) : 5
  var total = 0
  Person.count({active: true}).then((n) => { total = n })
  Person.find({active: true})
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .sort({ dateCreated: -1 })
    .exec((err, people) => {
      if (err) {
        res.status(500).send(err);
      }
      //TODO VER ERROR
      res.json({paging:{total:total,limit:limit,offset:offset},results: people});
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

  const newPerson = sanitizeInputs(req.body.person);

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
  Person.findOne({ _id: req.params.id }).exec((err, person) => {
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
  var offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
  var limit = (req.query.limit) ? parseInt(req.query.limit) : 5;
  var queryRegex = new RegExp(req.params.id, "i");
  var total = 0;
  Person.count({$and: [{active: true},
      {$or: [{dni: {$regex: queryRegex}}, {name: {$regex: queryRegex}}, {surname: {$regex: queryRegex}}]
      }],
  }).then((n) => { total = n });
  Person.find({$and: [{active: true},
                      {$or: [{dni: {$regex: queryRegex}}, {name: {$regex: queryRegex}}, {surname: {$regex: queryRegex}}]
                      }],
              })
    .sort({ dateCreated: -1 })
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .exec((err, people) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({paging:{total:total,limit:limit,offset:offset}, results: people });
  });
}

/**
 * Delete a person
 * @param req
 * @param res
 * @returns void
 */
export function deletePerson(req, res) {
  Person.findOne({ _id: req.params.id }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }

    const inactive = { active: false }

    person.update(inactive, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ deletedPerson: result });
    });
  });
}

/**
 * Edit person
 * @param req
 * @param res
 * @returns void
 */
export function editPerson(req, res) {
  if (!req.body.person.name || !req.body.person.surname || !req.body.person.dni) {
    res.status(403).end();
  }

  const editedPerson = sanitizeInputs(req.body.person);
  editedPerson._id = req.params.id;

  const newData = { name: editedPerson.name,
                    surname: editedPerson.surname,
                    dni: editedPerson.dni,
                    address: editedPerson.address,
                    email: editedPerson.email,
                    telephone: editedPerson.telephone,
                    cellphone: editedPerson.cellphone,
                    profession: editedPerson.profession,
                    professionPlace: editedPerson.professionPlace,
                    birthPlace: editedPerson.birthPlace,
                    type: editedPerson.type }

  Person.findOne({ _id: req.params.id }).exec((err, person) => {
    if (err) {
      res.status(500).send(err);
    }

    person.update(newData, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ editedPerson });
    });
  });

}

const sanitizeInputs = (person) => {
  const newPerson = new Person(person);

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
  newPerson.birthPlace = sanitizeHtml(newPerson.birthPlace);
  newPerson.type = sanitizeHtml(newPerson.type);

  return newPerson
} ;
