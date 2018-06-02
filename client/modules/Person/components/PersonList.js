import React, { PropTypes } from 'react';

// Import Components
import BootstrapTable from 'react-bootstrap-table-next';


const products = [{
  id: 1,
  name: 'Product1',
  price: 120,
}, {
  id: 2,
  name: 'Product2',
  price: 80,
}];

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true,
}, {
  dataField: 'price',
  text: 'Product Price',
  sort: true,
  formatter: priceFormatter,
}];

function indication() {
  return 'Sin datos.';
}

const CaptionElement = () => <h3 style={{ borderRadius: '0.55em', textAlign: 'center', color: 'blue', border: '2px solid blue', padding: '5px' }}>Personas</h3>;

function priceFormatter(cell, row) {
  if (row.onSale) {
    return (
      <span>
        <strong style={{ color: 'red' }}>$ {cell} </strong>
      </span>
    );
  }

  return (
    <span>$ {cell} NTD</span>
  );
}

function PersonList() {
  return (
    <BootstrapTable keyField="id" data={products} wrapperClasses="boo" caption={<CaptionElement />} columns={columns} noDataIndication={indication} striped hover condensed />
  );
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePerson: PropTypes.func.isRequired,
};

export default PersonList;
