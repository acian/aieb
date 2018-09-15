import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CourseFormDialog from '../../components/CourseFormDialog/CourseFormDialog';
import Button from '@material-ui/core/Button';


class CourseSearchAndAddForm extends Component {

  searchCourses = () => {
    const queryRef = this.query;
    if (queryRef.value) {
      this.props.searchCourses(queryRef.value);
    } else {
      this.props.fetchCourses();
    }
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={10}>
          <TextField
            label={this.props.intl.messages.searchCourses}
            inputRef={x => this.query = x}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                this.searchCourses()
                ev.preventDefault();
              }
            }}
            fullWidth
            type="search"
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="fab" size="medium" color="default" aria-label="search" onClick={this.searchCourses}>
            <SearchIcon /> </Button>
        </Grid>
        <Grid item xs={1}>
          <CourseFormDialog courseAction={this.props.addCourse}/>
        </Grid>
      </Grid>
    );
  }
}

CourseSearchAndAddForm.propTypes = {
  addCourse: PropTypes.func.isRequired,
  searchCourses: PropTypes.func.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CourseSearchAndAddForm);
