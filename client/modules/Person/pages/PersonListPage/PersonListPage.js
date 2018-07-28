import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PersonList from '../../components/PersonList';
import PersonSearchAndAddForm from '../../components/PersonSearchAndAddForm/PersonSearchAndAddForm';
import Grid from '@material-ui/core/Grid';

// Import Actions
import { addPersonRequest, fetchPeople, deletePersonRequest, searchPeopleRequest } from '../../PersonActions';
import { toggleAddPerson } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPerson } from '../../../App/AppReducer';
import { getPeople, getPaging } from '../../PersonReducer';

//pagination
import Pagination from "../../../App/components/Pagination/Pagination.js";
import "../../../App/components/Pagination/Pagination.css";


class PersonListPage extends Component {

  handleDeletePerson = person => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deletePersonRequest(person));
    }
  };

  handlePageChange = (currentPage, limit) => {
    this.props.dispatch(fetchPeople(currentPage, limit));
  };

  handleAddPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, dateCreated ) => {
    this.props.dispatch(toggleAddPerson());
    this.props.dispatch(addPersonRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, dateCreated }));
  };

  handleSearchPeople = (query) => {
    this.props.dispatch(searchPeopleRequest(query));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PersonSearchAndAddForm addPerson={this.handleAddPerson} searchPeople={this.handleSearchPeople} />
          </Grid>
          <Grid item xs={12}>
            <PersonList handleDeletePerson={this.handleDeletePerson} people={this.props.people} paging={this.props.paging} />
          </Grid>
          <Pagination paging={this.props.paging} handlePageChange={this.handlePageChange} />
        </Grid>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PersonListPage.need = [() => { return fetchPeople(1,5); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPerson: getShowAddPerson(state),
    people: getPeople(state),
    paging: getPaging(state),
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
  paging: PropTypes.arrayOf(PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  })).isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
