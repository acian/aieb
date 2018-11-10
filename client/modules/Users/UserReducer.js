import { ADD_USERS, ADD_USER, GET_USER } from './UserActions';

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

        default:
            return state;
    }
}

/* Selectors */

// Get users
export const getUsers = state => state.users.data;

// Export Reducer
export default UserReducer;
