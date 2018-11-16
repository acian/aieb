import { ADD_INSCRIPTION } from './InscriptionActions';

// Initial State
const initialState = { data: [], paging: [] };

const InscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INSCRIPTION :
      return {
        data: [action.data.results, ...state.data.filter(inscription => inscription._id !== state.data[state.data.length - 1]._id)],
        paging: action.data.paging,
      };
    default:
      return state;
  }
};

/* Selectors */

// Export Reducer
export default InscriptionReducer;
