// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_PERSON = 'TOGGLE_ADD_PERSON';
export const TOGGLE_ADD_COURSE = 'TOGGLE_ADD_COURSE';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddPerson() {
  return {
    type: TOGGLE_ADD_PERSON,
  };
}

export function toggleAddCourse() {
  return {
    type: TOGGLE_ADD_COURSE,
  };
}
