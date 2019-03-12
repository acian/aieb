import callApi from '../../../util/apiCaller';

export function getInscriptionByPersonRequest(idStudent) {
    console.log("getInscriptionByPerson SERVICE: " + idStudent)
    return callApi(`inscriptions/${idStudent}`).then(res => {
        if (res.error) {
            console.log("Get Inscriptions by person error: " + res.error)
            return { error: res.error }
        } else {
            console.log("Get Inscriptions by person inscByPer: " + res.inscByPer)
            return { inscByPer: res.inscByPer }
        }
    });
}