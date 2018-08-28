import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {

  if (props.people.size === 0) return null;

  return (
    <div className="listView">
      {
        props.people.map((person, index) => (
          <PersonListItem
            person={person}
            key={index}
            onDelete={() => props.handleDeletePerson(person._id)}
            onEdit={props.handleEditPerson}
          />
        ))
      }
    </div>
  );
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePerson: PropTypes.func.isRequired,
  handleEditPerson: PropTypes.func.isRequired,
};

export default PersonList;
