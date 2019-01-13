import { ADD_INSCRIPTION } from './InscriptionActions';

// Initial State
const initialState = { data: []};

const InscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INSCRIPTION :
      return {
        data: [action.data, ...state.data]
      };
    default:
      return state;
  }
};

/* Selectors */

// Export Reducer
export default InscriptionReducer;
