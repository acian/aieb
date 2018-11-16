import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_PERSON = 'ADD_PERSON';
export const ADD_PEOPLE = 'ADD_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';
export const EDIT_PERSON = 'EDIT_PERSON';

// Export Actions

export function addPerson(data) {
  return {
    type: ADD_PERSON,
    data,
  };
}

export function editPerson(data) {
  return {
    type: EDIT_PERSON,
    data,
  };
}

export function addPersonRequest(person, paging) {
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
        birthPlace: person.birthPlace,
        type: person.type,
      },
    }).then(res => dispatch(addPerson({ paging: { total: paging.total + 1, limit: paging.limit, offset: 1 }, results: res.person })));
  };
}

export function addPeople(data) {
  return {
    type: ADD_PEOPLE,
    data,
  };
}

export function fetchPeople(offset = 0, limit= 2) {
  return (dispatch) => {
    return callApi(`people?offset=${offset}&limit=${limit}`).then(res => {
      dispatch(addPeople(res));
    });
  };
}

export function fetchPerson(id) {
  return (dispatch) => {
    return callApi(`people/${id}`).then(res => dispatch(addPerson(res.person)));
  };
}

export function searchPeopleRequest(query, offset, limit) {
  return (dispatch) => {
    return callApi(`people/search/${query}?offset=${offset}&limit=${limit}`).then(res => dispatch(addPeople(res)));
  };
}

export function deletePerson(data) {
  return {
    type: DELETE_PERSON,
    data,
  };
}

export function deletePersonRequest(id, paging) {
  return (dispatch) => {
    return callApi(`people/${id}`, 'delete').then(res => dispatch(deletePerson({ paging: { total: paging.total, limit: paging.limit, offset: paging.offset }, results: res.deletedPerson })));
  };
}

export function editPersonRequest(person, paging) {
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
        birthPlace: person.birthPlace,
        type: person.type,
      },
    }).then(res => dispatch(editPerson({ paging: { total: paging.total, limit: paging.limit, offset: paging.offset }, results: res.editedPerson })));
  };
}

export function inscriptionPersonRequest(person, paging) {
  return (dispatch) => {
    return callApi(`people/${person.id}`, 'put', {
      person: {
        studentId: person.name,
        courseId: person.surname,
        status: person.dni,
        address: person.address,
        email: person.email,
        telephone: person.telephone,
        cellphone: person.cellphone,
        birthDate: person.birthDate,
        profession: person.profession,
        professionPlace: person.professionPlace,
        birthPlace: person.birthPlace,
        type: person.type,
      },
    }).then(res => dispatch(editPerson({ paging: { total: paging.total, limit: paging.limit, offset: paging.offset }, results: res.editedPerson })));
  };
}
