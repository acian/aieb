import { ADD_PERSON, ADD_PEOPLE, DELETE_PERSON, EDIT_PERSON } from './PersonActions';

// Initial State
const initialState = { data: [], paging: [], server_side: true };

const PersonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON :
      return {
        data: [action.data.results, ...state.data.filter(person => person._id !== state.data[state.data.length - 1]._id)],
        paging: action.data.paging,
        server_side: true,
      };

    case ADD_PEOPLE :
      return {
        data: action.data.results,
        paging: action.data.paging,
        server_side: action.data.server_side,
      };

    case DELETE_PERSON :
      return {
        data: state.data.filter(person => person._id !== action.data.results),
        paging: action.data.paging,
        server_side: true,
      };

    case EDIT_PERSON :
      return {
        data: state.data.map(person => {
          return person._id === action.data.results._id ? action.data.results : person;
        }),
        paging: action.data.paging,
        server_side: true,
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

// Get server_side
export const getServerSide = state => state.people.server_side;

// Get person by dni
export const getPerson = (state, dni) => state.people.data.filter(person => person.dni === dni)[0];

// Export Reducer
export default PersonReducer;
