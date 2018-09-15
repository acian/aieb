import callApi from '../../util/apiCaller';

// Export Constants
export const LOGIN = 'LOGIN';

// Export Actions

export function login(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function loginRequest(user) {
  return (dispatch) => {
    return callApi('/user/login', 'post', {
      user: {
        name: user.user,
        surname: user.password,
      },
    }).then(res => dispatch(login(res.user)));
  };
}
