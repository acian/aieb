import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PersonList from '../../components/PersonList';
import PersonFormDialog from '../../components/PersonFormDialog/PersonFormDialog';

// Import Actions
import { addPersonRequest, fetchPeople, deletePersonRequest } from '../../PersonActions';
import { toggleAddPerson } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPerson } from '../../../App/AppReducer';
import { getPeople } from '../../PersonReducer';

class PersonListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPeople());
  }

  handleDeletePerson = person => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deletePersonRequest(person));
    }
  };

  handleAddPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type ) => {
    this.props.dispatch(toggleAddPerson());
    this.props.dispatch(addPersonRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  };

  render() {
    return (
      <div>
        <PersonFormDialog addPerson={this.handleAddPerson}/>
        <PersonList handleDeletePerson={this.handleDeletePerson} people={this.props.people} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PersonListPage.need = [() => { return fetchPeople(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPerson: getShowAddPerson(state),
    people: getPeople(state),
  };
}

PersonListPage.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
