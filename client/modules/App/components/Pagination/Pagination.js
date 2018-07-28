import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Actions
import { fetchPeople } from '../../../Person/PersonActions';

class Pagination extends React.Component {

  handlePageChange = (event) => {
    this.props.handlePageChange(Number(event.target.id),this.props.paging.limit);
    event.preventDefault();
  }

  render() {

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.paging.total / this.props.paging.limit); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
        key={number}        
        className={`page-item`}
      >
        <a
          className="page-link"
          href="#"
          id={number}
          onClick={this.handlePageChange}
        >
          {number}
        </a>
      </li>
      );
    });

    return (
      <div>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  paging: PropTypes.arrayOf(PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  })).isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
