import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';
export const EDIT_PERSON = 'EDIT_PERSON';

// Export Actions

export function addPerson(person) {
  return {
    type: ADD_PERSON,
    person,
  };
}

export function editPerson(person) {
  return {
    type: EDIT_PERSON,
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
        address: person.address,
        email: person.email,
        telephone: person.telephone,
        cellphone: person.cellphone,
        birthDate: person.birthDate,
        profession: person.profession,
        professionPlace: person.professionPlace,
        type: person.type,
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

export function fetchPerson(id) {
  return (dispatch) => {
    return callApi(`people/${id}`).then(res => dispatch(addPerson(res.person)));
  };
}

export function searchPeopleRequest(query) {
  return (dispatch) => {
    return callApi(`people/search/${query}`).then(res => dispatch(addPeople(res.people)));
  };
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON,
    id,
  };
}

export function deletePersonRequest(id) {
  return (dispatch) => {
    return callApi(`people/${id}`, 'delete').then(() => dispatch(deletePerson(id)));
  };
}

export function editPersonRequest(person) {
  return (dispatch) => {
    return callApi(`people/${person.id}`, 'put', {
      person: {
        name: person.name,
        surname: person.surname,
        dni: person.dni,
        address: person.address,
        email: person.email,
        telephone: person.telephone,
        cellphone: person.cellphone,
        birthDate: person.birthDate,
        profession: person.profession,
        professionPlace: person.professionPlace,
        type: person.type,
      },
    }).then(res => dispatch(editPerson(res.editedPerson)));
  };
}
