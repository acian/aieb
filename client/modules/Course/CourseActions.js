import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSES = 'ADD_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';

// Export Actions

export function addCourse(course) {
  return {
    type: ADD_COURSE,
    course,
  };
}

export function editCourse(course) {
  return {
    type: EDIT_COURSE,
    course,
  };
}

export function addCourseRequest(course) {
  return (dispatch) => {
    return callApi('courses', 'post', {
      course: {
        name: course.name,
        days: course.days,
        schedule: course.schedule,
        amount: course.amount,
        firstDueDate: course.firstDueDate,
        secondDueDate: course.secondDueDate,
        dueCost: course.dueCost,
        teacher: course.teacher,
        comment: course.comment,
        dateCreated: course.dateCreated
      },
    }).then(res => dispatch(addCourse(res.course)));
  };
}

export function addCourses(courses) {
  return {
    type: ADD_COURSES,
    courses,
  };
}

export function fetchCourses() {
  return (dispatch) => {
    return callApi('courses').then(res => {
      dispatch(addCourses(res.courses));
    });
  };
}

export function fetchCourse(id) {
  return (dispatch) => {
    return callApi(`course/${id}`).then(res => dispatch(addCourse(res.course)));
  };
}

export function searchCoursesRequest(query) {
  return (dispatch) => {
    return callApi(`courses/search/${query}`).then(res => dispatch(addCourse(res.courses)));
  };
}

export function deleteCourse(id) {
  return {
    type: DELETE_COURSE,
    id,
  };
}

export function deleteCourseRequest(id) {
  return (dispatch) => {
    return callApi(`courses/${id}`, 'delete').then(() => dispatch(deleteCourse(id)));
  };
}

export function editCourseRequest(course) {
  return (dispatch) => {
    return callApi(`courses/${course.id}`, 'put', {
      course: {
        name: course.name,
        days: course.days,
        schedule: course.schedule,
        amount: course.amount,
        firstDueDate: course.firstDueDate,
        secondDueDate: course.secondDueDate,
        dueCost: course.dueCost,
        teacher: course.teacher,
        comment: course.comment,
        dateCreated: course.dateCreated,
      },
    }).then(res => dispatch(editCourse(res.editedCourse)));
  };
}
