import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



// Import Components
import PersonListItem from './PersonListItem/PersonListItem';

// Import Actions
import { fetchPeople } from '../PersonActions';

function PersonList(props){
  // state = {
  //   allPersons: [],
  //   currentPersons: [],
  //   currentPage: null,
  //   totalPages: null
  // };

  // componentDidMount() {
  //   //this.props.dispatch(fetchPeople(0,5));
  //   // const allPersons = this.props.people
  //   // this.setState({ allPersons });
  // }

  // onPageChanged = data => {
  //   this.props.(fetchPeople(2,5));
  //   //const { allPersons } = this.state;
  //   // const { currentPage, totalPages, pageLimit } = data;

  //   // const offset = (currentPage - 1) * pageLimit;
  //   // const currentPersons = allPersons;

  //   // this.setState({ currentPage, currentPersons, totalPages });
  // };

  const currentPage = props.paging.offset
    const totalPersons = props.paging.total
    const totalPages = totalPersons / props.paging.limit;

    if (totalPersons === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();


  return(
    // const {
    //   allPersons,
    //   currentPersons,
    //   currentPage,
    //   totalPages
    // } = this.state;
    
    //return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              {
                props.people.map(person => (
                    <PersonListItem
                      person={person}
                      key={person.dni}
                      onDelete={() => componentDidMount}
                    />
                  ))
              }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
            <h2 className={headerClass}>
                <strong className="text-secondary">{totalPersons}</strong>{" "}
                Personas
              </h2>
            {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Página <span className="font-weight-bold">{currentPage}</span> de {" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    //);
  //}
  );
};

// Actions required to provide data for this component to render in sever side.
//PersonList.need = [() => { return fetchPeople(0,5); }];

// Retrieve data from store as props
// function mapStateToProps(state) {
//   return {
//     dataPeople: getPeople(state),
//   };
// }

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    cellphone: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
    profession: PropTypes.string.isRequired,
    professionPlace: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date),
    type: PropTypes.string.isRequired,
  })).isRequired,
  paging: PropTypes.arrayOf(PropTypes.shape({
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
  })).isRequired,
  handlePageChange: PropTypes.func.isRequired,
  //dispatch: PropTypes.func.isRequired,
  handleDeletePerson: PropTypes.func.isRequired,
};

export default PersonList;
