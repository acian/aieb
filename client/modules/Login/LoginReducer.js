import { LOGIN } from './LoginActions';

// Initial State
const initialState = { data: [] };

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN :
      return {
        data: [action.user, ...state.data],
      };

    default:
      return state;
  }
};
