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

// Import Style
import styles from './UserAddForm.css';

class UserAddForm extends Component {

  state = {
    open: false,
    type: 'operator',
    status: 'active',
    nameText: '',
    nameError: false,
    error: {
      name: false,
      surname: false,
      user: false,
      password: false,
    },
    regex: {
      name: /^[a-z||A-Z||\s]{1,30}$/,
      surname: /^[a-z||A-Z||\s]{1,30}$/,
      user: /^[a-z||A-Z||\s]{4,10}$/,
      password: /^[a-z||A-Z||\s||\d]{4,10}$/,
    }
  };

  submitForm = () => {

    if (this.hasError()) {
      return
    }

    const name = this.name;
    const surname = this.surname;
    const user = this.user;
    const password = this.password;
    const type = this.type.node;
    const status = this.status.node;

    if (name.value && surname.value && user.value && ((this.props.editMode) || (!this.props.editMode && password.value))) {
      this.props.userAction(name.value, surname.value, user.value, password.value,
        type.value, status.value, this.props.editMode ? this.props.user._id : 0);
      name.value = surname.value = user.value = password.value = '';
      this.cleanError();
    }
    this.handleClose();
  };

  cleanError = () => {
    this.state.error.name = this.state.error.surname = this.state.error.user = this.state.error.password = false;
  };

  hasError = () => {
    return this.state.error.name ||
      this.state.error.surname ||
      this.state.error.user ||
      this.state.error.password
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

  componentDidMount = () => {
    this.handleInitialize();
  };

  handleInitialize = () => {
    if (this.props.user) {
      this.setState({type: this.props.user.type});
      this.setState({status: this.props.user.active ? 'active' : 'inactive'})
    }
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
    let user = this.props.user;

    if (editMode) {
      button = <Button onClick={this.handleClickOpen} mini variant="fab" color="primary" aria-label="Editar">
                <EditIcon />
               </Button>;
    } else {
      button = <Button className={styles['actions-right']} variant="fab" size="medium" color="primary" aria-label="add" onClick={this.handleClickOpen}> <AddIcon /> </Button>;
    }

    return (
      <div>
        {button}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{editMode ? this.props.intl.messages.editUser : this.props.intl.messages.addUser}</DialogTitle>
          <DialogContent>
            <div>
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <TextField name="name" inputRef={x => this.name = x} label={this.props.intl.messages.name}
                               defaultValue={user ? user.name : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.name}
                               helperText={(this.state.error.name ? this.props.intl.messages.nameValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="surname" inputRef={x => this.surname = x} label={this.props.intl.messages.surname}
                               defaultValue={user ? user.surname : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.surname}
                               helperText={(this.state.error.surname ? this.props.intl.messages.nameValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="user" inputRef={x => this.user = x} label={this.props.intl.messages.user}
                               defaultValue={user ? user.user : ''}
                               required={true} onBlur={this.validate}
                               error={this.state.error.user}
                               disabled={editMode}
                               helperText={(this.state.error.user ? this.props.intl.messages.userValidation : '')}
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="password" inputRef={x => this.password = x} label={this.props.intl.messages.password}
                               required={true} onBlur={this.validate}
                               error={this.state.error.password}
                               helperText={(this.state.error.password ? this.props.intl.messages.passwordValidation : '')}
                               type="password"
                               fullWidth/>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="type-simple">{this.props.intl.messages.profile}</InputLabel>
                      <Select
                        inputRef={x => this.type = x}
                        value= {this.state.type}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'type',
                          id: 'type-simple',
                        }}
                      >
                        <MenuItem value={'operator'}>{this.props.intl.messages.operator}</MenuItem>
                        <MenuItem value={'admin'}>{this.props.intl.messages.admin}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="status-simple">{this.props.intl.messages.status}</InputLabel>
                      <Select
                        inputRef={x => this.status = x}
                        value= {this.state.status}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'status',
                          id: 'status-simple',
                        }}
                      >
                        <MenuItem value={'active'}>{this.props.intl.messages.active}</MenuItem>
                        <MenuItem value={'inactive'}>{this.props.intl.messages.inactive}</MenuItem>
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

UserAddForm.propTypes = {
  userAction: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  intl: intlShape.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    user: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    active: PropTypes.bool,
  }),
};

UserAddForm.defaultProps = {
  editMode: false,
};

export default injectIntl(UserAddForm);
