import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import CourseList from '../../components/CourseList';
import CourseSearchAndAddForm from '../../components/CourseSearchAndAddForm/CourseSearchAndAddForm';
import Grid from '@material-ui/core/Grid';

// Import Actions
import { addCourseRequest, fetchCourses, deleteCourseRequest, searchCoursesRequest, editCourseRequest } from '../../CourseActions';

// Import Selectors
import { getShowAddCourse } from '../../../App/AppReducer';
import { getCourses } from '../../CourseReducer';


class CourseListPage extends Component {
  componentDidMount() {
    this.handleFetchCourses;
  }

  handleFetchCourses = () => {
    this.props.dispatch(fetchCourses());
  };

  handleDeleteCourse = idCourse => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deleteCourseRequest(idCourse));
    }
  };

  handleEditCourse = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type, id ) => {
    this.props.dispatch(editCourseRequest({ id, name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  };

  handleAddCourse = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type ) => {
    //this.props.dispatch(toggleAddCourse());
    this.props.dispatch(addCourseRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }));
  };

  handleSearchCourses = (query) => {
    this.props.dispatch(searchCoursesRequest(query));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <CourseSearchAndAddForm addCourse={this.handleAddCourse} searchCourses={this.handleSearchCourses} fetchCourses={this.handleFetchCourses}/>
          </Grid>
          <Grid item xs={12}>
            <CourseList handleDeleteCourse={this.handleDeleteCourse} handleEditCourse={this.handleEditCourse} courses={this.props.courses} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CourseListPage.need = [() => { return fetchCourses(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddCourse: getShowAddCourse(state),
    courses: getCourses(state),
  };
}

CourseListPage.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    firstDueDate: PropTypes.string,
    secondDueDate: PropTypes.string,
    dueCost: PropTypes.number,
    teacher: PropTypes.string,
    comment: PropTypes.string,
    dateCreated: PropTypes.string,
  })).isRequired,
  showAddCourse: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CourseListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CourseListPage);
