import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, Navbar } from 'react-bootstrap';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <Button bsStyle="info" key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</Button>
  );

  return (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><FormattedMessage id="siteTitle" /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            Usuario: <Navbar.Link href="#">Mark Otto</Navbar.Link>
          </Navbar.Text>
          {/* <Navbar.Text className={styles['language-switcher']}>
            <FormattedMessage id="switchLanguage" />
            <ButtonGroup>
              {languageNodes}
            </ButtonGroup>
          </Navbar.Text> */}
        </Navbar.Collapse>
      </Navbar>
      <div>
        {
          context.router.isActive('/', true)
            ? <Button onClick={props.toggleAddPerson}><FormattedMessage id="addPerson" /></Button>
            : null
        }
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPerson: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
