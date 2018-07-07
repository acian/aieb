import React from 'react';
import PropTypes from 'prop-types';
import PagApp from "../../App/components/Pagination/pagApp.js";

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

function PersonList(props) {
  return (
    <div className="listView">
      <PagApp people={props.people} title="Personas" total={props.totalPeople} />
    </div>
  );
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePerson: PropTypes.func.isRequired,
  totalPeople: PropTypes.number.isRequired,
};

export default PersonList;
