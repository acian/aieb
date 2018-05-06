import { ADD_PERSON, ADD_PERSONS, DELETE_PERSON } from './PersonActions';

// Initial State
const initialState = { data: [] };

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON :
      return {
        data: [action.person, ...state.data],
      };

    case ADD_PERSON :
      return {
        data: action.persons,
      };

    case DELETE_PERSON :
      return {
        data: state.data.filter(person => person.dni !== action.dni),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all persons
export const getPersons = state => state.persons.data;

// Get person by dni
export const getPerson = (state, dni) => state.persons.data.filter(person => person.dni === dni)[0];

// Export Reducer
export default PersonReducer;
