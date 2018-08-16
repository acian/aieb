import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {

  if (props.people.size === 0) return null;

  return (
    <div>
      {
        props.people.map(person => (
          <PersonListItem
            person={person}
            key={person.dni}
            onDelete={() => componentDidMount}
          />
        ))
      }
    </div>
  );
};

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    cellphone: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date),
    type: PropTypes.string.isRequired,
  })).isRequired
};

export default PersonList;
