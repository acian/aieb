import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Import Style
import styles from './PersonCreateWidget.css';

export class PersonCreateWidget extends Component {
  addPerson = () => {
    const nameRef = this.name;
    const surnameRef = this.surname;
    const dniRef = this.dni;
    const addressRef = this.address;
    const emailRef = this.email;
    const telephoneRef = this.telephone;
    const cellphoneRef = this.cellphone;
    const birthDateRef = this.birthDate;
    const professionRef = this.profession;
    const professionPlaceRef = this.professionPlace;
    if (nameRef.value && surnameRef.value && dniRef.value && addressRef.value) {
      this.props.addPerson(nameRef.value, surnameRef.value, dniRef.value, addressRef.value,
                           emailRef.value, telephoneRef.value, cellphoneRef.value, birthDateRef.value,
                           professionRef.value, professionPlaceRef.value);
      nameRef.value = surnameRef.value = dniRef.value = addressRef.value = '';
      emailRef.value = telephoneRef.value = cellphoneRef.value = professionRef.value = professionPlaceRef.value = '';
      birthDateRef.value = null;
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPerson ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="newPerson" /></h2>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField inputRef={x => this.name = x} label={this.props.intl.messages.name} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.surname = x} label={this.props.intl.messages.surname} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.dni = x} label={this.props.intl.messages.dni} fullWidth />
            </Grid>
            <Grid item xs={6}>

              <TextField
                label={this.props.intl.messages.birthDate}
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                inputRef={x => this.birthDate = x}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField inputRef={x => this.address = x} label={this.props.intl.messages.address} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.cellphone = x} label={this.props.intl.messages.cellphone} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.telephone = x} label={this.props.intl.messages.telephone} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField inputRef={x => this.email = x} label={this.props.intl.messages.email} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.profession = x} label={this.props.intl.messages.profession} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.professionPlace = x} label={this.props.intl.messages.place} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Button variant="raised" color="primary" onClick={this.addPerson}>
                {this.props.intl.messages.submit}
              </Button>
              {/* <a className={styles['post-submit-button']} href="#"><FormattedMessage id="submit" /></a> */}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

PersonCreateWidget.propTypes = {
  addPerson: PropTypes.func.isRequired,
  showAddPerson: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonCreateWidget);
