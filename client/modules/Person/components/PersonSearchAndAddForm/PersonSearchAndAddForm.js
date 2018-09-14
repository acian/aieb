import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import PersonFormDialog from '../../components/PersonFormDialog/PersonFormDialog';
import Button from '@material-ui/core/Button';


class PersonSearchAndAddForm extends Component {

  searchPeople = () => {
    const queryRef = this.query;
    const escapeRE = new RegExp(/([.*+?^=!:$(){}|[\]\/\\])/g);
    this.props.searchPeople(queryRef.value.replace(escapeRE, ''));
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={10}>
          <TextField
            label={this.props.intl.messages.searchPeople}
            inputRef={x => this.query = x}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.searchPeople()
                ev.preventDefault();
              }
            }}
            fullWidth
            type="search"
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="fab" size="medium" color="default" aria-label="search" onClick={this.searchPeople}>
          <SearchIcon /> </Button>
        </Grid>
        <Grid item xs={1}>
          <PersonFormDialog personAction={this.props.addPerson}/>
        </Grid>
      </Grid>
    );
  }
}

PersonSearchAndAddForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
  searchPeople: PropTypes.func.isRequired,
  fetchPeople: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonSearchAndAddForm);
