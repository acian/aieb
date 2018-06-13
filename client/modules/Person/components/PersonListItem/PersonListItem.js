import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/ModeEdit';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';


// Import Style
import styles from './PersonListItem.css';

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function PersonListItem(props) {
  let descriptionPerson = '';
  descriptionPerson += props.person.email ? `${props.person.email}  /  ` : '';
  descriptionPerson += props.person.cellphone ? `${props.person.cellphone}  ` : '';

  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={styles['primiry-heading']}>
            <strong>{props.person.surname} , {props.person.name}</strong>
          </div>
          <div className={styles['secondary-heading']}>
            <p >{descriptionPerson}</p>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Object.keys(props.person).map(function (key) {
            if ((['birthDate', 'profession', 'professionPlace', 'address'].indexOf(key) >= 0) && (props.person[key].length > 0)) {
              if (key === 'birthDate') {
                return <Chip label={props.person[key].substr(0, 10)} />;
              }
              return <Chip label={props.person[key]} />;
            }
          })}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button onClick={handleClick} mini variant="fab" color="primary" aria-label="Editar">
            <EditIcon />
          </Button>
          <Button onClick={handleClick} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
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
