import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CourseListItem from './CourseListItem/CourseListItem';

function CourseList(props) {

  if (props.courses.size === 0) return null;

  return (
    <div>
      {
        props.courses.map((course, i) => (
          <CourseListItem
            course={course}
            key={course.id}
            onDelete={() => props.handleDeleteCourse(course._id)}
            onEdit={props.handleEditCourse}
            sorted={(i % 2 === 0 || i === 0) ? 'flex-start' : 'flex-end'}
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
