import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';

// Import Style
import styles from './PersonCreateWidget.css';

export class PersonCreateWidget extends Component {
  addPerson = () => {
    const nameRef = this.name;
    const surnameRef = this.surname;
    const dniRef = this.refs.dni;
    const addressRef = this.refs.address;
    const emailRef = this.refs.email;
    const telephoneRef = this.refs.telephone;
    const cellphoneRef = this.refs.cellphone;
    const birthDateRef = this.refs.birthDate;
    const professionRef = this.refs.profession;
    const professionPlaceRef = this.refs.professionPlace;
    const dateCreatedRef = this.refs.dateCreated;
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
          <TextField inputRef={x => this.name = x} label="Name" margin="normal" />
          <TextField inputRef={x => this.surname = x} label="Surname" margin="normal" />
          <input placeholder={"dni"} className={styles['form-field']} ref="dni" />
          <input placeholder={"address"} className={styles['form-field']} ref="address" />
          <input placeholder={"email"} className={styles['form-field']} ref="email" />
          <input placeholder={"telephone"} className={styles['form-field']} ref="telephone" />
          <input placeholder={"cellphone"} className={styles['form-field']} ref="cellphone" />
          <input placeholder={"dd/mm/yyyy"} type="date" className={styles['form-field']} ref="birthDate" />
          <input placeholder={"profession"} className={styles['form-field']} ref="profession" />
          <input placeholder={"professionPlace"} className={styles['form-field']} ref="professionPlace" />
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
