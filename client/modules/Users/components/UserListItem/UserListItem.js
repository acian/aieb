import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';

//import PersonFormDialog from '../PersonFormDialog/PersonFormDialog';


// Import Style
import styles from './UserListItem.css';

function UserListItem(props) {
  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <div className={styles['primiry-heading']}>
                <strong>{props.user.user}</strong>
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Object.keys(props.user).map(function (key) {
            if ((['name', 'surname'].indexOf(key) >= 0) && (props.user[key].length > 0)) {
              return <Chip key={key} label={props.user[key]} />;
            }
          })}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          {/*<PersonFormDialog personAction={props.onEdit} editMode={true} person={props.person}/>*/}
          <Button onClick={props.onDelete} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  //onDelete: PropTypes.func.isRequired,
  //onEdit: PropTypes.func.isRequired,
};

export default UserListItem;
