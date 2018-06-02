import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PersonListItem.css';

function PersonListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/people/${props.person.dni}`} >
          {props.person.surname}
        </Link>
      </h3>
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
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePerson" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

PersonListItem.propTypes = {
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
  onDelete: PropTypes.func.isRequired,
};

export default PersonListItem;
