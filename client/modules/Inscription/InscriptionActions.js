import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_INSCRIPTION = 'ADD_INSCRIPTION';
export const GET_INSCRIPTIONS_BY_PERSON = 'GET_INSCRIPTIONS_BY_PERSON';

// Export Actions
export function addInscription(data) {
  return {
    type: ADD_INSCRIPTION,
    data,
  };
}

export function getInscriptionByPerson(data) {
  return {
    type: GET_INSCRIPTIONS_BY_PERSON,
    data,
  };
}

export function addInscriptionRequest(idStudent, idCourse, discountAmount) {
  console.log("addInscriptionRequest: " + idStudent + " - " + idCourse + " - " + discountAmount)
  return (dispatch) => {
    return callApi('inscription', 'post', {
      inscription: {
        studentId: idStudent,
        courseId: idCourse,
        discountAmount: discountAmount
      },
    }).then(res => {
      if (res.error) {
        console.log("Inscription error: " + res.error)
        dispatch(addInscription(res.error))
      } else {
        dispatch(addInscription(res.inscriptedPerson))
      }});
  };
}

export function getInscriptionByPersonRequest(idStudent) {
  console.log("getInscriptionByPerson: " + idStudent)
  return (dispatch) => {
    return callApi(`inscriptions/${idStudent}`).then(res => {
      if (res.error) {
        console.log("Get Inscriptions by person error: " + res.error)
        dispatch(getInscriptionByPerson(res.error))
      } else {
        console.log("Get Inscriptions by person inscByPer: " + res.inscByPer)
        dispatch(getInscriptionByPerson(res.inscByPer))
      }});
  };
}
