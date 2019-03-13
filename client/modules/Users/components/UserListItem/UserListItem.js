import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import AddForm from '../UserAddForm/UserAddForm';
import {injectIntl, intlShape} from 'react-intl';
import UserIcon from '@material-ui/icons/PermIdentity';
import TypeIcon from '@material-ui/icons/VpnKey';
import ActiveIcon from '@material-ui/icons/Check';
import InactiveIcon from '@material-ui/icons/Close';



// Import Style
import styles from './UserListItem.css';

function UserListItem(props) {
  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <div className={styles['primary-heading']}>
                <UserIcon/> <div className={styles['detail-item']}><strong>{props.user.user}</strong></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles['secondary-heading']}>
                <TypeIcon/> <div className={styles['detail-item']}>{props.user.type === "admin" ? props.intl.messages.admin : props.intl.messages.operator}</div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={props.user.active === true ? styles['active'] : styles['inactive']}>
                {(props.user.active && <ActiveIcon/>) || (!props.user.active && <InactiveIcon/>)} <div className={styles['detail-item']}>{props.user.active ? props.intl.messages.active : props.intl.messages.inactive}</div>
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
          <AddForm userAction={props.onEdit} editMode={true} user={props.user} />
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
    active: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  intl: intlShape,
};

export default injectIntl(UserListItem);
