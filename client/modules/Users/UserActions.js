import callApi from '../../util/apiCaller';

//Export Constants
export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';

//Export Actions
export function addUser(user) {
    return {
      type: ADD_USER,
      user,
    };
  }

  export function getUser(user) {
    return {
      type: GET_USER,
      user,
    };
  }