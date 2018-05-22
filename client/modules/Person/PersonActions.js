import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';

// Export Actions
export function addPerson(person) {
  return {
    type: ADD_PERSON,
    person,
  };
}

export function addPersonRequest(person) {
  return (dispatch) => {
    return callApi('people', 'post', {
      person: {
        name: person.name,
        surname: person.surname,
        dni: person.dni,
      },
    }).then(res => dispatch(addPerson(res.person)));
  };
}

export function addPeople(people) {
  return {
    type: ADD_PEOPLE,
    people,
  };
}

export function fetchPeople() {
  return (dispatch) => {
    return callApi('people').then(res => {
      dispatch(addPeople(res.people));
    });
  };
}

export function fetchPerson(dni) {
  return (dispatch) => {
    return callApi(`people/${dni}`).then(res => dispatch(addPerson(res.person)));
  };
}

export function deletePerson(dni) {
  return {
    type: DELETE_PERSON,
    dni,
  };
}

export function deletePersonRequest(dni) {
  console.log(`dni personActions-> ${dni}`);
  return (dispatch) => {
    return callApi(`people/${dni}`, 'delete').then(() => dispatch(deletePerson(dni)));
  };
}
