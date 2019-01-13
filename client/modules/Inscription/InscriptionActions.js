import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_INSCRIPTION = 'ADD_INSCRIPTION';

// Export Actions

export function addInscription(data) {
  return {
    type: ADD_INSCRIPTION,
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
