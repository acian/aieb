// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_ADD_PERSON } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddPerson: false,
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

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddPerson = state => state.app.showAddPerson;

// Export Reducer
export default AppReducer;
