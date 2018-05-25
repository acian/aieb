import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PersonCreateWidget.css';

export class PersonCreateWidget extends Component {
  addPerson = () => {
    const nameRef = this.refs.name;
    const surnameRef = this.refs.surname;
    const dniRef = this.refs.dni;
    const addressRef = this.refs.address;
    if (nameRef.value && surnameRef.value && dniRef.value && addressRef.value) {
      this.props.addPerson(nameRef.value, surnameRef.value, dniRef.value, addressRef.value);
      nameRef.value = surnameRef.value = dniRef.value = addressRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPerson ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPerson" /></h2>
          <input placeholder={"name"} className={styles['form-field']} ref="name" />
          <input placeholder={"surname"} className={styles['form-field']} ref="surname" />
          <input placeholder={"dni"} className={styles['form-field']} ref="dni" />
          <input placeholder={"address"} className={styles['form-field']} ref="address" />
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
