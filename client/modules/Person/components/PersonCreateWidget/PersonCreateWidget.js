import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../../../../components/datePicker/datePicker';

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
    const dateCreatedRef = this.dateCreated;
    if (nameRef.value && surnameRef.value && dniRef.value && addressRef.value) {
      this.props.addPerson(nameRef.value, surnameRef.value, dniRef.value, addressRef.value,
                           emailRef.value, telephoneRef.value, cellphoneRef.value, birthDateRef.value,
                           professionRef.value, professionPlaceRef.value, dateCreatedRef.value);
      nameRef.value = surnameRef.value = dniRef.value = addressRef.value = '';
      emailRef.value = telephoneRef.value = cellphoneRef.value = professionRef.value = professionPlaceRef.value = '';
      birthDateRef.value = dateCreatedRef.value = null;
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPerson ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="createNewPerson" /></h2>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField inputRef={x => this.name = x} label="Name" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField inputRef={x => this.surname = x} label="Surname" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField inputRef={x => this.dni = x} label="DNI" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <DatePicker
                  inputRef={x => this.birthDate = x}
                  label="Birth Date"
                  defaultDate="2017-05-24"
                  id="birthday"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField inputRef={x => this.address = x} label="Address" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField inputRef={x => this.cellphone = x} label="Cellphone" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField inputRef={x => this.telephone = x} label="Telephone" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField inputRef={x => this.email = x} label="Email" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField inputRef={x => this.profession = x} label="Profession" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField inputRef={x => this.professionPlace = x} label="Place" margin="normal" fullWidth />
            </Grid>
          </Grid>
          {/* <input placeholder={"dd/mm/yyyy"} type="date" className={styles['form-field']} ref="birthDate" />
          <input placeholder={"dni"} className={styles['form-field']} ref="dni" />
          <input placeholder={"address"} className={styles['form-field']} ref="address" />
          <input placeholder={"email"} className={styles['form-field']} ref="email" />
          <input placeholder={"telephone"} className={styles['form-field']} ref="telephone" />
          <input placeholder={"cellphone"} className={styles['form-field']} ref="cellphone" />

          <input placeholder={"profession"} className={styles['form-field']} ref="profession" />
          <input placeholder={"professionPlace"} className={styles['form-field']} ref="professionPlace" /> */}
          <input placeholder={"dd/mm/yyyy"} type="date" className={styles['form-field']} ref="dateCreated" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPerson}><FormattedMessage id="submit" /></a>
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
