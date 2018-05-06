import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import PersonList from '../../components/PersonList';
import PersonCreateWidget from '../../components/PersonCreateWidget/PersonCreateWidget';

// Import Actions
import { addPersonRequest, fetchPersons, deletePersonRequest } from '../../PersonActions';
import { toggleAddPerson } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPerson } from '../../../App/AppReducer';
import { getPersons } from '../../PersonReducer';

class PersonListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPersons());
  }

  handleDeletePerson = person => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deletepersonRequest(person));
    }
  };

  handleAddPerson = (name, surname, dni) => {
    this.props.dispatch(toggleAddPerson());
    this.props.dispatch(addPersonRequest({ name, surname, dni }));
  };

  render() {
    return (
      <div>
        <PersonCreateWidget addPerson={this.handleAddPerson} showAddPerson={this.props.showAddPerson} />
        <PersonList handleDeletePerson={this.handleDeletePerson} persons={this.props.persons} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PersonListPage.need = [() => { return fetchPersons(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPerson: getShowAddPerson(state),
    persons: getPersons(state),
  };
}

PersonListPage.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.number.isRequired,
  })).isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PersonListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PersonListPage);
