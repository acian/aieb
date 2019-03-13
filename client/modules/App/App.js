import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

// Import Actions
import { toggleAddPerson } from './AppActions';
import { toggleAddCourse } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false, loading: true};
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    setTimeout(() => this.setState({ loading: false }), 100); // simulates an async action, and hides the spinner
  }

  toggleAddPersonSection = () => {
    this.props.dispatch(toggleAddPerson());
  };

  toggleAddCourseSection = () => {
    this.props.dispatch(toggleAddCourse());
  };

  render() {
    const { loading } = this.state;

    if (loading) { // if your component doesn't have to wait for an async action, remove this block
      return (
        <div>
          <CircularProgress style={{marginLeft: '50%', color: purple[500] }} thickness={7} />
        </div>
      );
    }

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
