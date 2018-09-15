import Course from '../models/course';
import sanitizeHtml from 'sanitize-html';

/**
 * Get course
 * @param req
 * @param res
 * @returns void
 */
export function getCourses(req, res) {
  Course.find({active: true}).sort('-dateCreated').exec((err, courses) => {
    console.log(`GET COURSES EN CONTROLLER`);
    if (err) {
      console.log(`GET COURSES ERROR ${err}`);
      res.status(500).send(err);
    }
    console.log(`GET COURSES OK ${courses[0]}`);
    res.json({ courses });
  });
}

/**
 * Save a course
 * @param req
 * @param res
 * @returns void
 */
export function addCourse(req, res) {
  if (!req.body.person.name) {
    res.status(403).end();
  }

  const newCourse = sanitizeInputs(req.body.course);

  newCourse.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ course: saved });
  });
}

/**
 * Get a single course
 * @param req
 * @param res
 * @returns void
 */
export function getCourse(req, res) {
  Course.findOne({ _id: req.params.id }).exec((err, course) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ course });
  });
}

/**
 * Search courses
 * @param req
 * @param res
 * @returns void
 */
export function searchCourse(req, res) {
  var queryRegex = new RegExp(req.params.id, "i");
  Course.find({$and: [{active: true},
    {$or: [{dni: {$regex: queryRegex}}, {name: {$regex: queryRegex}}, {surname: {$regex: queryRegex}}]
    }]
  }).sort('-dateAdded').exec((err, courses) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ people });
  });
}

/**
 * Delete a course
 * @param req
 * @param res
 * @returns void
 */
export function deleteCourse(req, res) {
  Course.findOne({ _id: req.params.id }).exec((err, course) => {
    if (err) {
      res.status(500).send(err);
    }

    const inactive = { active: false }

    course.update(inactive, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).end();
    });

  });
}

/**
 * Edit course
 * @param req
 * @param res
 * @returns void
 */
export function editCourse(req, res) {
  if (!req.body.course.name) {
    res.status(403).end();
  }

  const editedCourse = sanitizeInputs(req.body.course);
  editedCourse._id = req.params.id;

  const newData = { name: editedCourse.name,
    days: editedCourse.days,
    schedule: editedCourse.schedule,
    amount: editedCourse.amount,
    firstDueDate: editedCourse.firstDueDate,
    secondDueDate: editedCourse.secondDueDate,
    dueCost: editedCourse.dueCost,
    teacher: editedCourse.teacher,
    comment: editedCourse.comment,
    active: editedCourse.active,
    dateCreated: editedCourse.dateCreated
  }

  Course.findOne({ _id: req.params.id }).exec((err, course) => {
    if (err) {
      res.status(500).send(err);
    }

    course.update(newData, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ editedCourse });
    });
  });

}

const sanitizeInputs = (course) => {
  const newCourse = new Course(course);

  // Let's sanitize inputs
  newCourse.name = sanitizeHtml(newCourse.name);
  newCourse.days = sanitizeHtml(newCourse.days);
  newCourse.schedule = sanitizeHtml(newCourse.schedule);
  newCourse.amount = sanitizeHtml(newCourse.amount);
  newCourse.firstDueDate = sanitizeHtml(newCourse.firstDueDate);
  newCourse.secondDueDate = sanitizeHtml(newCourse.secondDueDate);
  newCourse.dueCost = sanitizeHtml(newCourse.dueCost);
  newCourse.teacher = sanitizeHtml(newCourse.teacher);
  newCourse.comment = sanitizeHtml(newCourse.comment);

  return newCourse
} ;
