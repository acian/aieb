import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import UserListItem from './UserListItem/UserListItem';

function UserList(props) {
  return (
    <div className="listView">
      {
        props.users.map((user, index) => (
          <UserListItem
            user={user}
            key={index}
            // onDelete={() => props.handleDeletePerson(person._id)}
            onEdit={props.handleEditUser}
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
  handleEditUser: PropTypes.func.isRequired,
};

export default UserList;
