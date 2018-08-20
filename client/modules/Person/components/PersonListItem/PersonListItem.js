import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import PersonFormDialog from '../PersonFormDialog/PersonFormDialog';
import Grid from '@material-ui/core/Grid';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';


// Import Style
import styles from './PersonListItem.css';

function PersonListItem(props) {
  let descriptionPerson = '';
  descriptionPerson += props.person.email ? `${props.person.email}  /  ` : '';
  descriptionPerson += props.person.cellphone ? `${props.person.cellphone}  ` : '';

  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <div className={styles['primiry-heading']}>
                <strong>{props.person.surname} , {props.person.name}</strong>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles['secondary-heading']}>
                <EmailIcon/>  {props.person.email}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles['secondary-heading']}>
                <CallIcon/>  {props.person.cellphone}
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Object.keys(props.person).map(function (key) {
            if ((['birthDate', 'profession', 'professionPlace', 'address'].indexOf(key) >= 0) && (props.person[key].length > 0)) {
              if (key === 'birthDate') {
                return <Chip key={key} label={props.person[key].substr(0, 10)} />;
              }
              return <Chip key={key} label={props.person[key]} />;
            }
          })}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <PersonFormDialog personAction={props.onEdit} editMode={true} person={props.person}/>
          <Button onClick={props.onDelete} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

PersonListItem.propTypes = {
  person: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    cellphone: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default PersonListItem;
