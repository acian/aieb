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

export function addInscriptionRequest(inscription, paging) {
  return (dispatch) => {
    return callApi('inscription', 'post', {
      inscription: {
        studentId: inscription.studentId,
        courseId: inscription.courseId,
      },
    }).then(res => dispatch(addInscription({ paging: { total: paging.total + 1, limit: paging.limit, offset: 1 }, results: res.person })));
  };
}
