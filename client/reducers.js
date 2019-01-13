/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import people from './modules/Person/PersonReducer';
import courses from './modules/Course/CourseReducer';
import inscription from './modules/Inscription/InscriptionReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  people,
  courses,
  inscription
});
