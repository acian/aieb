import React, { Component } from "react";
import PropTypes from 'prop-types';
// import Countries from "countries-api/lib/data/Countries.json";
import "./Pagination.css";

import Pagination from "./Pagination.js";
import PersonListItem from '../../../Person/components/PersonListItem/PersonListItem.js';

class App extends Component {
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
    const totalCountries = allCountries.length;

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
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong>{" "}
                {this.props.title}
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Página <span className="font-weight-bold">{currentPage}</span> de {" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalCountries}
                pageLimit={5}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
              {
                currentCountries.map(person => (
                    <PersonListItem
                      person={person}
                      key={person.dni}
                      onDelete={() => this.componentDidMount}
                    />
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default App;
