import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Cancel from '@material-ui/icons/Cancel';
import DialogContentText from '@material-ui/core/DialogContentText';

function DeleteDialog(props) {

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={props.closeAction}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Eliminando...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desea eliminar: {props.text}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeAction} color="primary">
            <Cancel/>
            Cancelar
          </Button>
          <Button onClick={props.deleteAction} color="secondary">
            <DeleteIcon/>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialog.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  openDialog: PropTypes.bool.isRequired,
  deleteAction: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
};

export default DeleteDialog;
