import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PersonListItem from './UserListItem/UserListItem';

function UserList(props) {
  return (
    <div className="listView">
      {
        props.users.map((user, index) => (
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

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  })).isRequired,
  //handleDeletePerson: PropTypes.func.isRequired,
  //handleEditPerson: PropTypes.func.isRequired,
};

export default UserList;
