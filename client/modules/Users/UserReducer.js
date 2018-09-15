import { ADD_USER, GET_USER } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                
            };

        case GET_USER:
            return {
                data: action.user,
            };
        
        default:
            return state;
    }
}

// Export Reducer
export default UserReducer;