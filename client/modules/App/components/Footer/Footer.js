import React from 'react';
import { Well } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export function Footer() {
  return (
    <Well bsSize="small" className="text-center" ><FormattedMessage id="footer" /></Well>
  );
}

export default Footer;
