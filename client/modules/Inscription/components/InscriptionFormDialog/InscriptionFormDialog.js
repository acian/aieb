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
import { injectIntl, intlShape } from 'react-intl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';


class InscriptionFormDialog extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    return (
      <div>
        <Dialog
          open={this.props.openInscription}
          disableBackdropClick
          disableEscapeKeyDown
          keepMounted
        >
          <DialogTitle id="confirmation-dialog-title">Cursos a Inscribir</DialogTitle>
          <DialogContent>
            <RadioGroup
              aria-label="Ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.props.course.map(option => (
                <FormControlLabel value={option.id} key={option.id} control={<Radio/>} label={option.name}/>
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction}>
              Cancelar
            </Button>
            <Button onClick={this.props.inscriptionAction} color="primary">
              Inscribir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

InscriptionFormDialog.propTypes = {
  intl: intlShape.isRequired,
  openInscription: PropTypes.bool.isRequired,
  inscriptionAction: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
  course: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

export default injectIntl(InscriptionFormDialog);
