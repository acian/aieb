import {Router} from 'express';
import * as CourseController from '../controllers/course.controller';
const router = new Router();

// Get course
router.route('/courses').get(CourseController.getCourses);

// Get one course by id
router.route('/course/:id').get(CourseController.getCourse);

// Add a new course
router.route('/course').post(CourseController.addCourse);

// Delete course by id
router.route('/course/:id').delete(CourseController.deleteCourse);

// Edit course by id
router.route('/course/:id').put(CourseController.editCourse);

// Search people by name or dni
router.route('/courses/search/:id').get(CourseController.searchCourse);

export default router;
