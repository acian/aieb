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
import EditIcon from '@material-ui/icons/ModeEdit';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import styles from './CourseFormDialog.css';

class CourseFormDialog extends Component {

  state = {
    open: false,
    status: 10,
    error: {
      name: false,
      type: false,
      year: false,
      schedule: false,
      amount: false,
      dueCost: false,
      teacher: false,
      printCost: false,
    },
    regex: {
      name: /^[a-z||A-Z||\s||\d]{1,50}$/,
      type: /^[a-z||A-Z||\s||\d]{1,10}$/,
      year: /^(\d{4})$/,
      schedule: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      amount: /^(\d{1,10})$/,
      dueCost: /^(\d{1,10})$/,
      teacher: /^[a-z||A-Z||\s]{1,50}$/,
      printCost: /^(\d{1,10})$/,
    }
  };

  submitForm = () => {

    if (this.hasError()) {
      return
    }

    const nameRef = this.name;
    const yearRef = this.year;
    const typeRef = this.type;
    const scheduleRef = this.schedule;
    const amountRef = this.amount;
    const dueCostRef = this.dueCost;
    const teacherRef = this.teacher;
    const printCostRef = this.printCost;
    const mondayRef = this.monday.checked;
    const thursdayRef = this.thursday.checked;
    const wednesdayRef = this.wednesday.checked;
    const tuesdayRef = this.tuesday.checked;
    const fridayRef = this.friday.checked;
    const saturdayRef = this.saturday.checked;
    const statusRef = this.status.node;

    this.props.courseAction(nameRef.value, typeRef.value, yearRef.value, scheduleRef.value,
    amountRef.value, dueCostRef.value, teacherRef.value, printCostRef.value, mondayRef,
    thursdayRef, wednesdayRef, tuesdayRef, fridayRef, saturdayRef, statusRef.value,
    this.props.course ? this.props.course._id : 0);

    //Clean form fields
    nameRef.value = typeRef.value = scheduleRef.value = amountRef.value = '';
    dueCostRef.value = yearRef.value = teacherRef.value = printCostRef.value = '';

    this.monday.checked = this.thursday.checked = this.wednesday.checked = false;
    this.tuesday.checked = this.friday.checked = this.saturday.checked = false;

    this.state.status = 10;

    this.cleanError();
    this.handleClose();
  };

  cleanError = () => {
    this.state.error.name = this.state.error.schedule = false;
    this.state.error.amount = this.state.error.dueCost = this.state.error.teacher = false;
    this.state.error.printCost = this.state.error.type = this.state.error.year = false;
  };

  hasError = () => {
    return this.state.error.name ||
      this.state.error.type ||
      this.state.error.year ||
      this.state.error.schedule ||
      this.state.error.amount ||
      this.state.error.dueCost ||
      this.state.error.teacher ||
      this.state.error.printCost
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

  handleCheckboxChange = event => {
    this.setState({[event.target.name]: event.target.checked});
  };

  validate = event => {

    let inputName = event.target.name;
    let inputValue = event.target.value;

    let statusCopy = Object.assign({}, this.state);
    let regex = statusCopy.regex[inputName];

    statusCopy.error[inputName] = !inputValue.match(regex);

    this.setState(statusCopy);
  };

  componentDidMount = () => {
    this.handleInitialize();
  }

  handleInitialize = () => {
    if (this.props.course) {
      this.setState({monday: this.props.course.monday})
      this.setState({thursday: this.props.course.thursday})
      this.setState({wednesday: this.props.course.wednesday})
      this.setState({tuesday: this.props.course.tuesday})
      this.setState({friday: this.props.course.friday})
      this.setState({saturday: this.props.course.saturday})
      this.setState({status: Number.parseInt(this.props.course.status)})
    }
  }

  render() {
    let button;
    const editMode = this.props.editMode;
    let course = this.props.course;

    if (editMode) {
      button = <Button onClick={this.handleClickOpen} mini variant="fab" color="primary" aria-label="Editar">
        <EditIcon />
      </Button>;
    } else {
      button =
        <Button variant="fab" size="medium" color="primary" aria-label="add" onClick={this.handleClickOpen}> <AddIcon />
        </Button>;
    }

    return (
      <div>
        {button}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            id="form-dialog-title">{editMode ? this.props.intl.messages.editCourse : this.props.intl.messages.addCourse}</DialogTitle>
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
                    <TextField name="type" inputRef={x => this.type = x}
                               defaultValue={course ? course.type : ''}
                               label={this.props.intl.messages.courseType}
                               onBlur={this.validate} error={this.state.error.type}
                               helperText={(this.state.error.type ? this.props.intl.messages.typeValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="year" inputRef={x => this.year = x}
                               defaultValue={course ? course.year : ''}
                               label={this.props.intl.messages.year}
                               onBlur={this.validate} error={this.state.error.year}
                               helperText={(this.state.error.year ? this.props.intl.messages.yearValidation : '')}
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
                  <Grid item xs={6}>
                    <TextField name="amount" inputRef={x => this.amount = x} label={this.props.intl.messages.amount}
                               defaultValue={course ? course.amount : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.amount}
                               helperText={(this.state.error.amount ? this.props.intl.messages.amountValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="dueCost" inputRef={x => this.dueCost = x} label={this.props.intl.messages.dueCost}
                               defaultValue={course ? course.dueCost : ''}
                               onBlur={this.validate} error={this.state.error.dueCost}
                               helperText={(this.state.error.dueCost ? this.props.intl.messages.dueCostValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="printCost" inputRef={x => this.printCost = x}
                               label={this.props.intl.messages.printCost}
                               defaultValue={course ? course.printCost : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.printCost}
                               helperText={(this.state.error.printCost ? this.props.intl.messages.printCostValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.schedule = x}
                               id="time"
                               name="schedule"
                               label={this.props.intl.messages.schedule}
                               defaultValue={course ? course.schedule : "20:30"}
                               type="time"
                               required={true} onBlur={this.validate}
                               error={this.state.error.schedule}
                               helperText={(this.state.error.schedule ? this.props.intl.messages.scheduleValidation : '')}
                               InputLabelProps={{
                                 shrink: true,
                               }}
                               inputProps={{
                                 step: 300 // 5 min
                               }}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                    <label className={styles['title']}>{this.props.intl.messages.days}</label>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-up']}
                      control={
                        <Checkbox
                          name="monday"
                          checked={this.state.monday}
                          inputRef={x => this.monday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.monday}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-up']}
                      control={
                        <Checkbox
                          name="thursday"
                          checked={this.state.thursday}
                          inputRef={x => this.thursday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.thursday}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-up']}
                      control={
                        <Checkbox
                          name="wednesday"
                          checked={this.state.wednesday}
                          inputRef={x => this.wednesday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.wednesday}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-low']}
                      control={
                        <Checkbox
                          name="tuesday"
                          checked={this.state.tuesday}
                          inputRef={x => this.tuesday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.tuesday}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-low']}
                      control={
                        <Checkbox
                          name="friday"
                          checked={this.state.friday}
                          inputRef={x => this.friday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.friday}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      className={styles['days-week-low']}
                      control={
                        <Checkbox
                          name="saturday"
                          checked={this.state.saturday}
                          inputRef={x => this.saturday = x}
                          onChange={this.handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={this.props.intl.messages.saturday}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="type-simple">{this.props.intl.messages.status}</InputLabel>
                      <Select
                        inputRef={x => this.status = x}
                        value= {this.state.status}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'status',
                          id: 'status-simple',
                        }}
                      >
                        <MenuItem value={10}>{this.props.intl.messages.open}</MenuItem>
                        <MenuItem value={20}>{this.props.intl.messages.closed}</MenuItem>
                      </Select>
                    </FormControl>
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
    type: PropTypes.string.isRequired,
    year: PropTypes.number,
    schedule: PropTypes.string,
    amount: PropTypes.number,
    dueCost: PropTypes.number,
    teacher: PropTypes.string,
    printCost: PropTypes.number,
    dateCreated: PropTypes.string,
  }),
};

CourseFormDialog.defaultProps = {
  editMode: false,
};

export default injectIntl(CourseFormDialog);
