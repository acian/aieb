import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PersonCreateWidget.css';

export class PersonCreateWidget extends Component {
  addPerson = () => {
    const nameRef = this.refs.name;
    const surnameRef = this.refs.surname;
    const dniRef = this.refs.dni;
    if (nameRef.value && surnameRef.value && dniRef.value) {
      this.props.addPerson(nameRef.value, surnameRef.value, dniRef.value);
      nameRef.value = surnameRef.value = dniRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPerson ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPerson" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="surname" />
          <input placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="dni" />
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
