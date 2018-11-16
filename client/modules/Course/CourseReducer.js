import { ADD_COURSE, ADD_COURSES, DELETE_COURSE, EDIT_COURSE } from './CourseActions';

// Initial State
const initialState = { data: [], paging: [] };

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE :
      return {
        data: [action.data.results, ...state.data.filter(course => course._id !== state.data[state.data.length - 1]._id)],
        paging: action.data.paging,
      };

    case ADD_COURSES :
      return {
        data: action.data.results,
        paging: action.data.paging,
      };

    case DELETE_COURSE :
      return {
        data: state.data.filter(course => course._id !== action.data.results),
        paging: action.data.paging,
      };

    case EDIT_COURSE :
      return {
        data: state.data.map(course => {
          return course._id === action.data.results._id ? action.data.results : course;
        }),
        paging: action.data.paging,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get paging
export const getPaging = state => state.courses.paging;

// Get Courses
export const getCourses = state => state.courses.data;

// Export Reducer
export default CourseReducer;
