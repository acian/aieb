import React, { PropTypes } from 'react';

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {
  return (
    <div className="listView">
      {
        props.persons.map(person => (
          <PersonListItem
            person={person}
            key={person.dni}
            onDelete={() => props.handleDeletePerson(person.dni)}
          />
        ))
      }
    </div>
  );
}

PersonList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.number.isRequired,
  })).isRequired,
  handleDeletePerson: PropTypes.func.isRequired,
};

export default PersonList;
