import React, { Component } from 'react';
import PropTypes from 'prop-types';

//pagination
import Pagination from "../../App/components/Pagination/Pagination.js";
import "../../App/components/Pagination/Pagination.css";

// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

class PersonList extends Component {
  state = {
    allCountries: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    const allCountries = this.props.people;
    this.setState({ allCountries });
  }

  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    const totalCountries = this.props.totalPeople;

    if (totalCountries === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row py-4 align-items-center">
              {
                currentCountries.map(person => (
                  <PersonListItem
                    person={person}
                    key={person.dni}
                    onDelete={() => this.componentDidMount}
                  />
                ))
              }
              <div className="d-flex flex-row align-items-center">
                <h2 className={headerClass}>
                  <strong className="text-secondary">{totalCountries}</strong>{" "}
                  Personas
              </h2>
                {currentPage && (
                  <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                    Página <span className="font-weight-bold">{currentPage}</span> de {" "}
                    <span className="font-weight-bold">{totalPages}</span>
                  </span>
                )}
              </div>
              <Pagination
                totalRecords={totalCountries}
                pageLimit={5}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
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
