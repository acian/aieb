import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

// Import Actions
import { toggleAddPerson } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPersonSection = () => {
    this.props.dispatch(toggleAddPerson());
  };

  render() {
    return (
      <div id="outer-container">
        <BurgerMenu outerContainerId={"outer-container"} />
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPerson={this.toggleAddPersonSection}
          />
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
