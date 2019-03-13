import { ADD_USERS, ADD_USER, GET_USER, EDIT_USER } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERS :
          return {
            data: action.users,
          };

        case ADD_USER:
          return {
            data: [action.user, ...state.data],
            };

        case EDIT_USER:
          return {
            data: state.data.map(user => {
              return user._id === action.data._id ? action.data : user;
            }),
          };

        default:
          return state;
    }
}

/* Selectors */

// Get users
export const getUsers = state => state.users.data;

// Export Reducer
export default UserReducer;
