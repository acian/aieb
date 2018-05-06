// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_PERSON = 'TOGGLE_ADD_PERSON';

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
