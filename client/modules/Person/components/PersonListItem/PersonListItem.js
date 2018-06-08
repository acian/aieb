import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/ModeEdit';

// Import Style
import styles from './PersonListItem.css';

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function PersonListItem(props) {
  return (
    <div>
      <Paper elevation={9} className={styles['paper-description']} >
        <div className={styles['actions-right']}>
          <Button onClick={handleClick} mini variant="fab" color="primary" aria-label="Editar">
            <EditIcon />
          </Button>
          <Button onClick={handleClick} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon />
          </Button>
        </div>
        <Typography variant="headline" component="h6">
          {props.person.surname}, {props.person.name}
        </Typography>
        <Typography component="p">
          {props.person.email} / {props.person.cellphone} / {props.person.address}
        </Typography>
      </Paper>
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
