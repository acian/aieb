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
import CourseFormDialog from '../CourseFormDialog/CourseFormDialog';
import Grid from '@material-ui/core/Grid';

import styles from './CourseListItem.css';

function CourseListItem(props) {

  return (
    <div>
      <ExpansionPanel className={styles['paper-description']}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <div className={styles['primiry-heading']}>
                <strong>{props.course.name} , {props.course.name}</strong>
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Object.keys(props.course).map(function (key) {
            if (props.course[key].length > 0) {
              return <Chip key={key} label={props.course[key]} />;
            }
          })}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <CourseFormDialog courseAction={props.onEdit} editMode={true} course={props.course}/>
          <Button onClick={props.onDelete} mini variant="fab" color="secondary" aria-label="delete">
            <DeleteIcon />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

CourseListItem.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    dueCost: PropTypes.number.isRequired,
    teacher: PropTypes.string.isRequired,
    printCost: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CourseListItem);
