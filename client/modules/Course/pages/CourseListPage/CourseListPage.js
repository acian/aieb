import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import CourseList from '../../components/CourseList';
import CourseSearchAndAddForm from '../../components/CourseSearchAndAddForm/CourseSearchAndAddForm';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

// pagination
import Pagination from '../../../../components/Pagination/Pagination.js';

// Import Actions
import { addCourseRequest, fetchCourses, deleteCourseRequest, searchCoursesRequest, editCourseRequest } from '../../CourseActions';

// Import Selectors
import { getShowAddCourse } from '../../../App/AppReducer';
import { getCourses, getPaging } from '../../CourseReducer';

class CourseListPage extends Component {

  state = {
    loading: true,
  };

  // constantes para el paginado, limit y offset de cada consulta server side - ver tambien en PersonListPage.need, deben ser iguales
  defaultLimit = 1
  defaultOffset = 2

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 500);
    this.handleFetchCourses;
  }

  handleFetchCourses = () => {
    this.props.dispatch(fetchCourses(this.defaultLimit, this.defaultOffset));
  };

  handleDeleteCourse = idCourse => {
    if (confirm('Do you want to delete this person')) { // eslint-disable-line
      this.props.dispatch(deleteCourseRequest(idCourse));
      this.props.dispatch(fetchCourse(this.defaultLimit, this.defaultOffset));
    }
  };

  handleEditCourse = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type, id ) => {
    this.props.dispatch(editCourseRequest({ id, name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }, this.props.paging));
  };

  handleAddCourse = (name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type ) => {
    this.props.dispatch(addCourseRequest({ name, surname, dni, address, email, telephone, cellphone, birthDate, profession, professionPlace, type }, this.props.paging));
  };

  handleSearchCourses = (query, currentPage, limit) => {
    var offset = currentPage ? currentPage : 1;
    var lim = limit ? limit : 2;
    this.querySearch = query;
    if (query) {
      this.props.dispatch(searchCoursesRequest(this.querySearch, offset, lim));
    } else {
      this.props.dispatch(fetchCourse(this.defaultLimit, this.defaultOffset));
    }
  };

  handlePageChange = (currentPage, limit) => {
    this.querySearch ? this.handleSearchCourses(this.querySearch, currentPage, limit) : this.props.dispatch(fetchCourses(currentPage, limit));
  };

  render() {
    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block
      return (
        <div>
          <LinearProgress />
          <br />
          <LinearProgress color="secondary" />
        </div>
      );
    }

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
        <Pagination paging={this.props.paging} handlePageChange={this.handlePageChange} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CourseListPage.need = [() => {
  const defaultLimit = 1
  const defaultOffset = 2
  return fetchCourses(defaultLimit, defaultOffset);
  }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddCourse: getShowAddCourse(state),
    courses: getCourses(state),
    paging: getPaging(state),
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
  paging: PropTypes.arrayOf(PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  })).isRequired,
  showAddCourse: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CourseListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(CourseListPage);
