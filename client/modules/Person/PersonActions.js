import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PERSONS = 'ADD_PERSONS';
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
    return callApi('persons', 'person', {
      person: {
        name: person.name,
        surname: person.surname,
        dni: person.dni,
      },
    }).then(res => dispatch(addPerson(res.person)));
  };
}

export function addPersons(persons) {
  return {
    type: ADD_PERSONS,
    persons,
  };
}

export function fetchPersons() {
  return (dispatch) => {
    return callApi('persons').then(res => {
      dispatch(addPersons(res.persons));
    });
  };
}

export function fetchPerson(dni) {
  return (dispatch) => {
    return callApi(`persons/${id}`).then(res => dispatch(addPerson(res.person)));
  };
}

export function deletePerson(dni) {
  return {
    type: DELETE_PERSON,
    dni,
  };
}

export function deletePersonRequest(dni) {
  return (dispatch) => {
    return callApi(`persons/${dni}`, 'delete').then(() => dispatch(deletePerson(dni)));
  };
}
