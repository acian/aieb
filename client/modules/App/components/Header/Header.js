import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          context.router.isActive('/', true)
            ?
            <Button className={styles['add-post-button']} variant="fab" color="primary" aria-label="add" href="#" onClick={props.toggleAddPerson}>
              <AddIcon />
            </Button>
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
