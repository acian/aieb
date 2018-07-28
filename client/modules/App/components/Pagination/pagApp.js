import React, { Component } from "react";
import PropTypes from 'prop-types';
// import Countries from "countries-api/lib/data/Countries.json";
import "./Pagination.css";

import Pagination from "./Pagination.js";
import PersonListItem from '../../../Person/components/PersonListItem/PersonListItem.js';

class App extends Component {
  state = {
    allPersons: [],
    currentPersons: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    const allPersons = this.props.people;
    this.setState({ allPersons });
  }

  onPageChanged = data => {
    const { allPersons } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentPersons = allPersons.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPersons, totalPages });
  };

  render() {
    const {
      allPersons,
      currentPersons,
      currentPage,
      totalPages
    } = this.state;
    const totalPersons = this.props.total;

    if (totalPersons === 0) return null;

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
              {
                currentPersons.map(person => (
                    <PersonListItem
                      person={person}
                      key={person.dni}
                      onDelete={() => this.componentDidMount}
                    />
                  ))
              }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
            <h2 className={headerClass}>
                <strong className="text-secondary">{totalPersons}</strong>{" "}
                {this.props.title}
              </h2>
            {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Página <span className="font-weight-bold">{currentPage}</span> de {" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
              <Pagination
                totalRecords={totalPersons}
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

App.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  total:PropTypes.number.isRequired,
};

export default App;
