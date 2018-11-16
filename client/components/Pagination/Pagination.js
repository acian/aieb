import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Pagination.css';

class Pagination extends React.Component {

  handlePageChange = (event) => {
    this.props.handlePageChange(Number(event.target.id), this.props.paging.limit);
    event.preventDefault();
  };

  handlePageChangeLeft = (event) => {
    this.props.handlePageChange(Number(1), this.props.paging.limit);
    event.preventDefault();
  };

  handlePageChangeRight = (event) => {
    this.props.handlePageChange(Math.round(Number(this.props.paging.total / this.props.paging.limit)), this.props.paging.limit);
    event.preventDefault();
  };

  render() {
    const currentPage = this.props.paging.offset;
    const totalItems = this.props.paging.total;
    const totalPages = (Math.round(totalItems / this.props.paging.limit) > 1) ? Math.round(totalItems / this.props.paging.limit) : 1;

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / this.props.paging.limit); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        (number === currentPage) ?
        <a href="#" id={number} className={styles['isDisabled']} onClick={this.handlePageChange} >{number}</a>
        : (Math.abs(number - currentPage) < 4) ?
        <a href="#" id={number} onClick={this.handlePageChange} >
          {number}
        </a> : ''
      );
    });

    return (
      <Grid className={styles['pagination']} container direction="row" justify="space-between" alignItems="center" spacing={8}>
        <Grid item >
          {
            <span>{" "} <FormattedMessage id="pagina" /> {currentPage} <FormattedMessage id="de" /> {" "} {totalPages}</span>
          }
        </Grid>
        <Grid item>
          {(currentPage > 1) ?
            <a href="#" id={0} onClick={this.handlePageChangeLeft}>&laquo;</a>
            :
            <a href="#" className={styles['isDisabled']} id={0}>&laquo;</a>
          }
          {renderPageNumbers}
          {(currentPage < totalPages) ?
            <a href="#" id={0} onClick={this.handlePageChangeRight}>&raquo;</a>
            :
            <a href="#" className={styles['isDisabled']} id={totalPages + 1} >&raquo;</a>
          }
        </Grid>
        <Grid item>
          <span>{totalItems} {" "} <FormattedMessage id="items" /> </span>
        </Grid>
      </Grid>
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
