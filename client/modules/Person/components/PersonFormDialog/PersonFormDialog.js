/**
 * Created by ext_acian on 10/06/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { injectIntl, intlShape} from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Import Style
import styles from './PersonFormDialog.css';

class PersonFormDialog extends Component {

  state = {
    open: false,
    type: 10,
    nameText: '',
    nameError: false,
    error: { name : false,
             surname : false},
    regex : { name : /^[a-z||A-Z]*$/,
              surname : /^[a-z||A-Z]*$/ }
  };

  addPerson = () => {
    const nameRef = this.name;
    const surnameRef = this.surname;
    const dniRef = this.dni;
    const addressRef = this.address;
    const emailRef = this.email;
    const telephoneRef = this.telephone;
    const cellphoneRef = this.cellphone;
    const birthDateRef = this.birthDate;
    const professionRef = this.profession;
    const professionPlaceRef = this.professionPlace;
    const typeRef = this.type.node;
    if (nameRef.value && surnameRef.value && dniRef.value && addressRef.value) {
      this.props.addPerson(nameRef.value, surnameRef.value, dniRef.value, addressRef.value,
        emailRef.value, telephoneRef.value, cellphoneRef.value, birthDateRef.value,
        professionRef.value, professionPlaceRef.value, typeRef.value);
      nameRef.value = surnameRef.value = dniRef.value = addressRef.value = '';
      emailRef.value = telephoneRef.value = cellphoneRef.value = professionRef.value = professionPlaceRef.value = this.state.type = 10;
      birthDateRef.value = null;
    }
    this.handleClose();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    return (
      <div>
        <Button variant="fab" size="medium" color="primary" aria-label="add" onClick={this.handleClickOpen}> <AddIcon /> </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.intl.messages.addPerson}</DialogTitle>
          <DialogContent>
            <div>
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField name="name" inputRef={x => this.name = x} label={this.props.intl.messages.name} required={true} onChange={this.validate} error={this.state.error.name} helperText={(this.state.error.name ? this.props.intl.messages.nameValidation : '')} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="surname" inputRef={x => this.surname = x} label={this.props.intl.messages.surname} required={true} onChange={this.validate} error={this.state.error.surname} helperText={(this.state.error.surname ? this.props.intl.messages.nameValidation : '')} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.dni = x} label={this.props.intl.messages.dni} fullWidth />
                  </Grid>
                  <Grid item xs={6}>

                    <TextField
                      label={this.props.intl.messages.birthDate}
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      inputRef={x => this.birthDate = x}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <TextField inputRef={x => this.address = x} label={this.props.intl.messages.address} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.cellphone = x} label={this.props.intl.messages.cellphone} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.telephone = x} label={this.props.intl.messages.telephone} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField inputRef={x => this.email = x} label={this.props.intl.messages.email} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.profession = x} label={this.props.intl.messages.profession} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField inputRef={x => this.professionPlace = x} label={this.props.intl.messages.place} fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="type-simple">{this.props.intl.messages.type}</InputLabel>
                      <Select
                        inputRef={x => this.type = x}
                        value={this.state.type}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'type',
                          id: 'type-simple',
                        }}
                      >
                        <MenuItem value={10}>{this.props.intl.messages.student}</MenuItem>
                        <MenuItem value={20}>{this.props.intl.messages.teacher}</MenuItem>
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
            <Button onClick={this.addPerson} color="primary">
              {this.props.intl.messages.accept}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PersonFormDialog.propTypes = {
  addPerson: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonFormDialog);
