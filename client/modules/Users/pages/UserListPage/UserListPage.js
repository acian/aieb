import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import UserList from '../../components/UserList';
import AddForm from '../../components/UserAddForm/UserAddForm';
import Grid from '@material-ui/core/Grid';

// Import Actions
import { fetchUsers, addUserRequest } from '../../UserActions';

// Import Selectors
import { getShowAddUser } from '../../../App/AppReducer';
import { getUsers } from '../../UserReducer';


class UserListPage extends Component {
  componentDidMount() {
    this.handleFetchUsers;
  }

  handleFetchUsers = () => {
    this.props.dispatch(fetchUsers());
  };

  //Disable USER
  // handleDeletePerson = idPerson => {
  //   if (confirm('Do you want to delete this person')) { // eslint-disable-line
  //     this.props.dispatch(deletePersonRequest(idPerson));
  //   }
  // };

  //Reset PASSWORD
  // handleEditPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type, id ) => {
  //   this.props.dispatch(editPersonRequest({ id, name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  // };

  handleAddUser = (name, surname, user, password, type ) => {
    this.props.dispatch(addUserRequest({ name, surname, user, password, type }));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AddForm userAction={this.handleAddUser}/>
          </Grid>
          <Grid item xs={12}>
            <UserList users={this.props.users} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserListPage.need = [() => { return fetchUsers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPerson: getShowAddUser(state),
    users: getUsers(state),
  };
}

UserListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  //showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

UserListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(UserListPage);
