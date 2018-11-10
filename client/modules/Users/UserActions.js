import callApi from '../../util/apiCaller';

//Export Constants
export const ADD_USERS = 'ADD_USERS';
export const ADD_USER = 'ADD_USER';


export function addUsers(users) {
  return {
    type: ADD_USERS,
    users,
  };
}

export function fetchUsers() {
  return (dispatch) => {
    return callApi('users').then(res => {
      dispatch(addUsers(res.users));
    });
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('user', 'post', {
      user: {
        name: user.name,
        surname: user.surname,
        user: user.user,
        password: user.password,
        type: user.type,
        status: user.status,
      },
    }).then(res => dispatch(addUser(res.user)));
  };
}
