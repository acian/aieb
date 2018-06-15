import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PersonListItem/PersonListItem.css';

// Import Actions
import { fetchPerson } from '../../PersonActions';

// Import Selectors
import { getPerson } from '../../PersonReducer';

export function PersonDetailPage(props) {
  return (
    <div>
      <Helmet title={props.person.name} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.person.surname}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.person.name}</p>
        <p className={styles['post-desc']}>{props.person.dni}</p>
        <p className={styles['post-desc']}>{props.person.address}</p>
        <p className={styles['post-desc']}>{props.person.email}</p>
        <p className={styles['post-desc']}>{props.person.telephone}</p>
        <p className={styles['post-desc']}>{props.person.cellphone}</p>
        <p className={styles['post-desc']}>{props.person.birthDate}</p>
        <p className={styles['post-desc']}>{props.person.profession}</p>
        <p className={styles['post-desc']}>{props.person.professionPlace}</p>
        <p className={styles['post-desc']}>{props.person.dateCreated}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
PersonDetailPage.need = [params => {
  return fetchPerson(params.id);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    person: getPerson(state, props.params.id),
  };
}

PersonDetailPage.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    cellphone: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default connect(mapStateToProps)(PersonDetailPage);
