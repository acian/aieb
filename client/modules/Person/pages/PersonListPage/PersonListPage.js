import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PersonList from '../../components/PersonList';
import PersonFormDialog from '../../components/PersonFormDialog/PersonFormDialog';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Import Actions
import { addPersonRequest, fetchPeople, deletePersonRequest, searchPeopleRequest } from '../../PersonActions';
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

  handleAddPerson = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, dateCreated ) => {
    this.props.dispatch(toggleAddPerson());
    this.props.dispatch(addPersonRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, dateCreated }));
  };

  handleSearchPeople = () => {
    const queryRef = this.query;
    this.props.dispatch(searchPeopleRequest(queryRef.value));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <TextField
              label="Search people"
              inputRef={x => this.query = x}
              fullWidth
              type="search"
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="fab" size="medium" color="default" aria-label="search" onClick={this.handleSearchPeople}> <SearchIcon /> </Button>
          </Grid>
          <Grid item xs={1}>
            <PersonFormDialog addPerson={this.handleAddPerson}/>
          </Grid>
          <Grid item xs={12}>
            <PersonList handleDeletePerson={this.handleDeletePerson} people={this.props.people} />
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
  })).isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
