import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

function DatePicker(props) {
  const { classes, id, label, defaultDate } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="date"
        defaultValue={defaultDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
    </form>
  );
}

DatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultDate: PropTypes.string.isRequired,
};

export default withStyles(styles)(DatePicker);