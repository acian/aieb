import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CourseListItem from './CourseListItem/CourseListItem';

function CourseList(props) {
  return (
    <div className="listView">
      {
        props.courses.map((course, index) => (
          <CourseListItem
            course={course}
            key={index}
            onDelete={() => props.handleDeleteCourse(course._id)}
            onEdit={props.handleEditCourse}
          />
        ))
      }
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
  handleEditCourse: PropTypes.func.isRequired,
};

export default CourseList;
