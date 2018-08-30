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
import { getPeople, getPaging } from '../../PersonReducer';

//pagination
import Pagination from '../../components/Pagination/Pagination.js';

class PersonListPage extends Component {
  componentDidMount() {
    this.handleFetchPeople;
    var querySearch = '';
  }

  handleFetchPeople = () => {
    this.props.dispatch(fetchPeople());
  };

  handleDeletePerson = idPerson => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deletePersonRequest(idPerson));
      this.props.dispatch(fetchPeople(1, 2));
    }
  };

  handlePageChange = (currentPage, limit) => {
    this.querySearch ? this.handleSearchPeople(this.querySearch, currentPage, limit) : this.props.dispatch(fetchPeople(currentPage, limit));
  };

  handleAddPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type) => {
    this.props.dispatch(addPersonRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }, this.props.paging));
  };

  handleEditPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type, id ) => {
      this.props.dispatch(editPersonRequest({ id, name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }, this.props.paging));
  };

  handleSearchPeople = (query, currentPage, limit) => {
    var offset = currentPage ? currentPage : 1;
    var lim = limit ? limit : 2;
    this.querySearch = query;
    if (query) {
      this.props.dispatch(searchPeopleRequest(this.querySearch, offset, lim));
    } else {
      this.props.dispatch(fetchPeople(1, 2));
    }
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
        <Pagination paging={this.props.paging} handlePageChange={this.handlePageChange} />
      </div>
    );
  }
};

// Actions required to provide data for this component to render in sever side.
PersonListPage.need = [() => { return fetchPeople(1, 2); }];

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
    birthDate: PropTypes.string,
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.string,
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
