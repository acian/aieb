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
import TextField from '@material-ui/core/TextField';


class InscriptionFormDialog extends Component {
  constructor(props) {
    super();
    this.state = {
      value: null,
      valueDiscountAmountRef: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeDiscountAmount = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  inscriptionAction = () => {
    this.setState({ value: null, valueDiscountAmountRef: 0 });
    this.props.inscriptionAction(this.props.person._id, this.state.value, this.state.valueDiscountAmountRef)
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
          <DialogTitle id="confirmation-dialog-title">Cursos a Inscribir para <strong><u>{this.props.person.name}, {this.props.person.surname}</u></strong></DialogTitle>
          <DialogContent>
            <RadioGroup
              ref="courseId"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.props.courses.map(option => (
                <FormControlLabel value={option._id} key={option._id} control={<Radio />} label={option.name + " " + option.type + " - " + option.year + " - " + option.teacher} />
              ))}
              <TextField
                id="standard-textarea"
                label="Porcentaje de descuento"
                placeholder="Porcentaje de descuento"
                type="number"
                value={this.state.valueDiscountAmountRef}
                margin="normal"
                onChange={this.handleChangeDiscountAmount('valueDiscountAmountRef')}
              />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction}>
              Cancelar
            </Button>
            <Button onClick={this.inscriptionAction} color="primary">
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
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  person: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
  })),
};

export default injectIntl(InscriptionFormDialog);
