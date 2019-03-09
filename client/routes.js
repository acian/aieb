/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
//import { browserHistory } from 'react-router';
import App from './modules/App/App';
import callApi from './util/apiCaller';
import { getFromStorage } from './util/storage';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Person/pages/PersonListPage/PersonListPage');
  require('./modules/Person/pages/PersonDetailPage/PersonDetailPage');
}

function loggedIn() {
  // callApi (`user/is-loggedin?token=${getFromStorage('aei_loggedin_session')}`).then(res => {
  //   return res.success
  // });
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      onEnter={requireAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Person/pages/PersonListPage/PersonListPage').default);

        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Login/pages/LoginPage/LoginPage').default);
        });
      }}
    />
    <Route
      path="/users"
      onEnter={requireAuth}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Users/pages/UserListPage/UserListPage').default);
        });
      }}
    />
  </Route>
);

