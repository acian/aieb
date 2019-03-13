import Course from '../models/course';
import sanitizeHtml from 'sanitize-html';

/**
 * Get courses
 * @param req
 * @param res
 * @returns void
 */
export function getCourses(req, res) {
  var offset = (req.query.offset) ? parseInt(req.query.offset) : 0
  var limit = (req.query.limit) ? parseInt(req.query.limit) : 5
  var total = 0
  Course.count({active: true}).then((n) => { total = n })
  Course.find({active: true})
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .sort({ dateCreated: -1 })
    .exec((err, courses) => {
      if (err) {
        res.status(500).send(err);
      }
      //TODO VER ERROR
      res.json({paging:{total:total,limit:limit,offset:offset},results: courses});
    });
}

/**
 * Save a course
 * @param req
 * @param res
 * @returns void
 */
export function addCourse(req, res) {
  if (!req.body.course.name) {
    res.status(403).end();
  }

  const newCourse = sanitizeInputs(req.body.course);

  newCourse.save((err, saved) => {
    if (err) {
      console.log(`ADD COURSE EN CONTROLLER ${err}`);
      res.status(500).send(err);
    }
    console.log(`ADD COURSE DESPUES POR GUARDAR ${req.body.course.schedule}`);
    console.log(`ADD COURSE LUNES ${req.body.course.monday}`);
    console.log(`ADD COURSE Martes ${req.body.course.thursday}`);
    console.log(`ADD COURSE miercoles ${req.body.course.wednesday}`);
    console.log(`ADD COURSE jueves ${req.body.course.tuesday}`);
    console.log(`ADD COURSE viernes ${req.body.course.friday}`);
    console.log(`ADD COURSE sabado ${req.body.course.saturday}`);
    console.log(`ADD COURSE status ${req.body.course.status}`);
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
  var offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
  var limit = (req.query.limit) ? parseInt(req.query.limit) : 5;
  var queryRegex = new RegExp(req.params.id, "i");
  var total = 0;
  Course.count({$and: [{active: true},
    {$or: [{name: {$regex: queryRegex}}]
    }],
  }).then((n) => { total = n });
  Course.find({$and: [{active: true},
    {$or: [{name: {$regex: queryRegex}}]
    }],
  })
    .sort({ dateCreated: -1 })
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .exec((err, courses) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({paging:{total:total,limit:limit,offset:offset}, results: courses });
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
    year: editedCourse.year,
    type: editedCourse.type,
    schedule: editedCourse.schedule,
    amount: editedCourse.amount,
    dueCost: editedCourse.dueCost,
    teacher: editedCourse.teacher,
    printCost: editedCourse.printCost,
    monday: editedCourse.monday,
    thursday: editedCourse.thursday,
    wednesday: editedCourse.wednesday,
    tuesday: editedCourse.tuesday,
    friday : editedCourse.friday,
    saturdayRef : editedCourse.saturday,
    active: editedCourse.active,
    dateCreated: editedCourse.dateCreated,
    status: editedCourse.status
  }

  Course.findOne({ _id: req.params.id }).exec((err, course) => {

    console.log(`EDIT COURSE DESPUES POR GUARDAR ${req.body.course.schedule}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.monday}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.thursday}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.wednesday}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.tuesday}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.friday}`);
    console.log(`EDIT COURSE LUNES ${req.body.course.saturday}`);
    console.log(`EDIT COURSE STATUS ${req.body.course.status}`);
    console.log(`EDIT COURSE ID ${req.params.id}`);

    if (err) {
      console.log(`ERROR AL EDITAR ${err}`);
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

/**
 * Get courses to inscript
 * @param req
 * @param res
 * @returns void
 */
export function getCoursesToInscript(req, res) {
  Course.find({active: true, year:req.query.year, status: req.query.status})
    .skip(offset > 0 ? ((offset - 1) * limit) : 0)
    .limit(limit)
    .sort({ dateCreated: -1 })
    .exec((err, courses) => {
      if (err) {
        res.status(500).send(err);
      }
      //TODO VER ERROR
      res.json(courses);
    });
}

const sanitizeInputs = (course) => {
  const newCourse = new Course(course);

  // Let's sanitize inputs
  newCourse.name = sanitizeHtml(newCourse.name);
  newCourse.year = sanitizeHtml(newCourse.year);
  newCourse.type = sanitizeHtml(newCourse.type);
  newCourse.schedule = sanitizeHtml(newCourse.schedule);
  newCourse.amount = sanitizeHtml(newCourse.amount);
  newCourse.dueCost = sanitizeHtml(newCourse.dueCost);
  newCourse.teacher = sanitizeHtml(newCourse.teacher);
  newCourse.printCost = sanitizeHtml(newCourse.printCost);

  return newCourse
} ;
