// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_PERSON, TOGGLE_ADD_COURSE } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddPerson: false,
  showAddCourse: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case TOGGLE_ADD_PERSON:
      return {
        showAddPerson: !state.showAddPerson,
      };
    case TOGGLE_ADD_COURSE:
      return {
        showAddCourse: !state.showAddCourse,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddPerson = state => state.app.showAddPerson;
export const getShowAddCourse = state => state.app.showAddCourse;

// Export Reducer
export default AppReducer;
