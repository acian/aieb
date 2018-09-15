import { ADD_COURSE, ADD_COURSES, DELETE_COURSE, EDIT_COURSE } from './CourseActions';

// Initial State
const initialState = { data: [] };

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE :
      return {
        data: [action.course, ...state.data],
      };

    case ADD_COURSES :
      return {
        data: action.courses,
      };

    case DELETE_COURSE :
      return {
        data: state.data.filter(course => course._id !== action.id),
      };

    case EDIT_COURSE :
      return {
        data: state.data.map(course => {
          return course._id === action.course._id ? action.course : course;
        }),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get Courses
export const getCourses = state => state.courses.data;

// Export Reducer
export default CourseReducer;
