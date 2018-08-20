import { ADD_PERSON, ADD_PEOPLE, DELETE_PERSON, EDIT_PERSON } from './PersonActions';

// Initial State
const initialState = { data: [], paging: [] };

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON :
      const dataState = state.data.filter(person => person._id !== state.data[state.data.length - 1]._id);
      return {
        data: [action.data.results, ...dataState],
        paging: action.data.paging,
      };

    case ADD_PEOPLE :
      return {
        data: action.data.results,
        paging: action.data.paging,
      };

    case DELETE_PERSON :
      return {
        data: state.data.filter(person => person._id !== action.id),
      };

    case EDIT_PERSON :
      return {
        data: state.data.map(person => {
          return person._id === action.data.results._id ? action.data.results : person;
        }),
        paging: action.data.paging,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get people
export const getPeople = state => state.people.data;

// Get paging
export const getPaging = state => state.people.paging;

// Get person by dni
export const getPerson = (state, dni) => state.people.data.filter(person => person.dni === dni)[0];

// Export Reducer
export default PersonReducer;
