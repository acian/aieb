/**
 * Created by ext_acian on 10/06/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {injectIntl, intlShape} from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/ModeEdit';

class CourseFormDialog extends Component {

  state = {
    open: false,
    type: 10,
    nameText: '',
    nameError: false,
    error: {
      name: false,
      days: false,
      schedule: false,
      amount: false,
      dueCost: false,
      teacher: false,
      comment: false,
    },
    regex: {
      name: /^[a-z||A-Z||\s]{1,30}$/,
      days: /^[a-z||A-Z||\s]{1,30}$/,
      schedule: /^[a-z||A-Z||\s]{1,30}$/,
      amount: /^(\d{1,10})$/,
      dueCost: /^(\d{1,10})$/,
      teacher: /^[a-z||A-Z||\s||\d]{0,50}$/,
      comment: /^[a-z||A-Z||\s]{0,30}$/,
    }
  };

  submitForm = () => {

    if (this.hasError()) {
      return
    }

    const nameRef = this.name;
    const daysRef = this.days;
    const scheduleRef = this.schedule;
    const amountRef = this.amount;
    const dueCostRef = this.dueCost;
    const teacherRef = this.teacher;
    const commentRef = this.comment;
    const firstDueDateRef = this.firstDueDate;
    const secondDueDateRef = this.secondDueDate;

    this.props.courseAction(nameRef.value, daysRef.value, scheduleRef.value, amountRef.value,
    dueCostRef.value, teacherRef.value, commentRef.value, firstDueDateRef.value,
    secondDueDateRef.value, this.props.course ? this.props.course._id : 0);
    nameRef.value = daysRef.value = scheduleRef.value = amountRef.value = '';
    dueCostRef.value = teacherRef.value = commentRef.value = firstDueDateRef.value = secondDueDateRef.value = '';

    this.cleanError();
    this.handleClose();
  };

  cleanError = () => {
    this.state.error.name = this.state.error.days = this.state.error.schedule = false;
    this.state.error.amount = this.state.error.dueCost = this.state.error.teacher = false;
    this.state.error.comment = false;
  };

  hasError = () => {
    return this.state.error.name ||
      this.state.error.days ||
      this.state.error.schedule ||
      this.state.error.amount ||
      this.state.error.dueCost ||
      this.state.error.teacher ||
      this.state.error.comment
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.cleanError();
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  validate = event => {

    let inputName = event.target.name;
    let inputValue = event.target.value;

    let statusCopy = Object.assign({}, this.state);
    let regex = statusCopy.regex[inputName];

    statusCopy.error[inputName] = !inputValue.match(regex);

    this.setState(statusCopy);
  };


  render() {
    let button;
    const editMode = this.props.editMode;
    let course = this.props.course;

    if (editMode) {
      button = <Button onClick={this.handleClickOpen} mini variant="fab" color="primary" aria-label="Editar">
        <EditIcon />
      </Button>;
    } else {
      button = <Button variant="fab" size="medium" color="primary" aria-label="add" onClick={this.handleClickOpen}> <AddIcon /> </Button>;
    }

    return (
      <div>
        {button}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{editMode ? this.props.intl.messages.editCourse : this.props.intl.messages.addCourse}</DialogTitle>
          <DialogContent>
            <div>
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField name="name" inputRef={x => this.name = x} label={this.props.intl.messages.name}
                               defaultValue={course ? course.name : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.name}
                               helperText={(this.state.error.name ? this.props.intl.messages.nameValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="days" inputRef={x => this.days = x} label={this.props.intl.messages.days}
                               defaultValue={course ? course.days : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.days}
                               helperText={(this.state.error.days ? this.props.intl.messages.daysValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="schedule" inputRef={x => this.schedule = x} label={this.props.intl.messages.schedule}
                               defaultValue={course ? course.schedule : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.schedule}
                               helperText={(this.state.error.schedule ? this.props.intl.messages.scheduleValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="amount" inputRef={x => this.amount = x} label={this.props.intl.messages.amount}
                               defaultValue={course ? course.amount : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.amount}
                               helperText={(this.state.error.amount ? this.props.intl.messages.amountValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="dueCost" inputRef={x => this.dueCost = x}
                               defaultValue={course ? course.dueCost : ''}
                               label={this.props.intl.messages.dueCost}
                               onBlur={this.validate} error={this.state.error.dueCost}
                               helperText={(this.state.error.dueCost ? this.props.intl.messages.dueCostValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="teacher" inputRef={x => this.teacher = x}
                               defaultValue={course ? course.teacher : ''}
                               label={this.props.intl.messages.teacher}
                               onBlur={this.validate} error={this.state.error.teacher}
                               helperText={(this.state.error.teacher ? this.props.intl.messages.teacherValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="comment" inputRef={x => this.comment = x} label={this.props.intl.messages.comment}
                               defaultValue={course ? course.comment : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.comment}
                               helperText={(this.state.error.comment ? this.props.intl.messages.commentValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={this.props.intl.messages.firstDueDate}
                      type="date"
                      defaultValue={course ? course.firstDueDate.substr(0, 10) : '2012-01-01'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      inputProps={{
                        name: 'date',
                      }}
                      inputRef={x => this.firstDueDate = x}
                    />
                    <Grid item xs={6}>
                      <TextField
                        label={this.props.intl.messages.secondDueDate}
                        type="date"
                        defaultValue={course ? course.secondDueDate.substr(0, 10) : '2012-01-01'}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        inputProps={{
                          name: 'date',
                        }}
                        inputRef={x => this.secondDueDate = x}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.intl.messages.cancel}
            </Button>
            <Button onClick={this.submitForm} color="primary">
              {this.props.intl.messages.accept}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CourseFormDialog.propTypes = {
  courseAction: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  intl: intlShape.isRequired,
  course: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    amount: PropTypes.number,
    firstDueDate: PropTypes.string,
    secondDueDate: PropTypes.string,
    dueCost: PropTypes.number,
    teacher: PropTypes.string,
    comment: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
};

CourseFormDialog.defaultProps = {
  editMode: false,
};

export default injectIntl(CourseFormDialog);
