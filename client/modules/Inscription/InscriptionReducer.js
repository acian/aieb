import { ADD_INSCRIPTION, GET_INSCRIPTIONS_BY_PERSON } from './InscriptionActions';

// Initial State
const initialState = { data: [] };

const InscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INSCRIPTION:
      return {
        data: [action.data, ...state.data]
      };
    case GET_INSCRIPTIONS_BY_PERSON:
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get Courses
export const getInscriptionsByPerson = state => state.inscription.data;

// Export Reducer
export default InscriptionReducer;
