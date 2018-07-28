import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PersonList from '../../components/PersonList';
import PersonSearchAndAddForm from '../../components/PersonSearchAndAddForm/PersonSearchAndAddForm';
import Grid from '@material-ui/core/Grid';

// Import Actions
import { addPersonRequest, fetchPeople, deletePersonRequest, searchPeopleRequest, editPersonRequest } from '../../PersonActions';

// Import Selectors
import { getShowAddPerson } from '../../../App/AppReducer';
import { getPeople } from '../../PersonReducer';


class PersonListPage extends Component {
  componentDidMount() {
    this.handleFetchPeople;
  }

  handleFetchPeople = () => {
    this.props.dispatch(fetchPeople());
  };

  handleDeletePerson = idPerson => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deletePersonRequest(idPerson));
    }
  };

  handleEditPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type, id ) => {
      this.props.dispatch(editPersonRequest({ id, name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  };

  handleAddPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type ) => {
    //this.props.dispatch(toggleAddPerson());
    this.props.dispatch(addPersonRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  };

  handleSearchPeople = (query) => {
    this.props.dispatch(searchPeopleRequest(query));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PersonSearchAndAddForm addPerson={this.handleAddPerson} searchPeople={this.handleSearchPeople} fetchPeople={this.handleFetchPeople}/>
          </Grid>
          <Grid item xs={12}>
            <PersonList handleDeletePerson={this.handleDeletePerson} handleEditPerson={this.handleEditPerson} people={this.props.people} />
          </Grid>
        </Grid>
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
  })).isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
