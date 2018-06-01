import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import BootstrapTable from 'react-bootstrap-table-next';

// Import Style
// import styles from './PersonListItem.css';

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

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Personas</h3>;

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

function PersonListItem(props) {
  return (
    <BootstrapTable keyField="id" data={products} wrapperClasses="boo" caption={<CaptionElement />} columns={columns} noDataIndication={indication} striped hover condensed />
  );
}

PersonListItem.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PersonListItem;
