import { ADD_PERSON, ADD_PEOPLE, DELETE_PERSON, EDIT_PERSON } from './PersonActions';

// Initial State
const initialState = { data: [] };

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON :
      return {
        data: [action.person, ...state.data],
      };

    case ADD_PEOPLE :
      return {
        data: action.people,
      };

    case DELETE_PERSON :
      return {
        data: state.data.filter(person => person._id !== action.id),
      };

    case EDIT_PERSON :
      return {
        data: state.data.map(person => {
          return person._id === action.person._id ? action.person : person;
        }),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get people
export const getPeople = state => state.people.data;

// Get person by dni
export const getPerson = (state, dni) => state.people.data.filter(person => person.dni === dni)[0];

// Export Reducer
export default PersonReducer;
