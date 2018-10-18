import callApi from '../../util/apiCaller';
import { getFromStorage, setInStorage } from '../../util/storage';
//import history from '../../history';


// Export Constants
export const LOGIN = 'LOGIN';

// Export Actions

export function login(user) {
  return {
    type: LOGIN,
    user,
  };
}

export function loginRequest(user, password) {
  return (dispatch) => {
    return callApi('user/login', 'post', {
      user: {
        user: user,
        password: password,
      }
    }).then(res => {
      if (res.success) {
        dispatch(login({user: user, token: res.token}));
        setInStorage('aei_loggedin_user', { token: res.token });
        //browserHistory.push('/');
      }
      else {

      }
    });
  };
}
