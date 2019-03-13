import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSES = 'ADD_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';

// Export Actions

export function addCourse(data) {
  return {
    type: ADD_COURSE,
    data,
  };
}

export function editCourse(data) {
  return {
    type: EDIT_COURSE,
    data,
  };
}

export function addCourseRequest(course) {
  return (dispatch) => {
    return callApi('course', 'post', {
      course: {
        name: course.name,
        type: course.type,
        year: course.year,
        schedule: course.schedule,
        amount: course.amount,
        dueCost: course.dueCost,
        teacher: course.teacher,
        printCost: course.printCost,
        dateCreated: course.dateCreated,
        monday: course.monday,
        thursday: course.thursday,
        wednesday: course.wednesday,
        tuesday: course.tuesday,
        friday: course.friday,
        saturday: course.saturday,
        status: course.status
      },
    }).then(res => dispatch(addCourse({ paging: { total: paging.total + 1, limit: paging.limit, offset: 1 }, results: res.course })));
  };
}

export function addCourses(data) {
  return {
    type: ADD_COURSES,
    data,
  };
}

export function fetchCourses(offset = 0, limit= 2) {
  return (dispatch) => {
    return callApi(`courses?offset=${offset}&limit=${limit}`).then(res => {
      dispatch(addCourses(res));
    });
  };
}

export function fetchCourse(id) {
  return (dispatch) => {
    return callApi(`course/${id}`).then(res => dispatch(addCourse(res.course)));
  };
}

export function searchCoursesRequest(query, offset, limit) {
  return (dispatch) => {
    return callApi(`courses/search/${query}?offset=${offset}&limit=${limit}`).then(res => dispatch(addCourses(res)));
  };
}

export function deleteCourse(data) {
  return {
    type: DELETE_COURSE,
    data,
  };
}

export function deleteCourseRequest(id) {
  return (dispatch) => {
    return callApi(`course/${id}`, 'delete').then();
  };
}

export function editCourseRequest(course, paging) {
  return (dispatch) => {
    return callApi(`course/${course.id}`, 'put', {
      course: {
        name: course.name,
        type: course.type,
        year: course.year,
        schedule: course.schedule,
        amount: course.amount,
        dueCost: course.dueCost,
        teacher: course.teacher,
        printCost: course.printCost,
        dateCreated: course.dateCreated,
        monday: course.monday,
        thursday: course.thursday,
        wednesday: course.wednesday,
        tuesday: course.tuesday,
        friday: course.friday,
        saturday: course.saturday,
        status: course.status
      },
    }).then(res => dispatch(editCourse({ paging: { total: paging.total, limit: paging.limit, offset: paging.offset }, results: res.editedCourse })));
  };
}
