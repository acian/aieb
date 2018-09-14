import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
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
import FaceIcon from '@material-ui/icons/Face';


// Import Style
import styles from './PersonListItem.css';

function PersonListItem(props) {
  let descriptionPerson = '';
  descriptionPerson += props.person.email ? `${props.person.email}  /  ` : '';
  descriptionPerson += props.person.cellphone ? `${props.person.cellphone}  ` : '';

  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <div className={styles['primiry-heading']}>
                <FaceIcon/> <div className={styles['detail-item']}><strong>{props.person.surname} , {props.person.name}</strong></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles['secondary-heading']}>
                <EmailIcon/> <div className={styles['detail-item']}>{props.person.email}</div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles['secondary-heading']}>
                <CallIcon/> <div className={styles['detail-item']}>{props.person.cellphone}</div>
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container justify={props.sorted}>
            {Object.keys(props.person)
              .map(function (key) {
                if ((props.person[key].length > 0)) {
                  switch (key) {
                    case 'dni':
                      return <Chip key={key} label={props.intl.messages.dni.toUpperCase() + ': ' + props.person[key]}/>;
                    case 'address':
                      return <Chip key={key} label={props.intl.messages.address.toUpperCase() + ': ' + props.person[key]}/>;
                    case 'telephone':
                      return <Chip key={key} label={props.intl.messages.telephone.toUpperCase() + ': ' + props.person[key]}/>;
                    case 'birthDate':
                      return <Chip key={key} label={props.intl.messages.birthDate.toUpperCase() + ': ' + props.person[key].substr(0, 10)}/>;
                    case 'profession':
                      return <Chip key={key} label={props.intl.messages.profession.toUpperCase() + ': ' + props.person[key]}/>;
                    case 'professionPlace':
                      return <Chip key={key} label={props.intl.messages.professionPlace.toUpperCase() + ': ' + props.person[key]}/>;
                    default:
                      return null;
                  }
                } else {
                  return null;
                }
              })}
          </Grid>
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions>
          <PersonFormDialog personAction={props.onEdit} editMode={true} person={props.person}/>
          <Button onClick={props.onDelete} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon/>
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
  sorted: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonListItem);
