import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { injectIntl, intlShape } from 'react-intl';
import 'whatwg-fetch';
import { loginRequest } from '../../LoginActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInUser: '',
      signInPassword: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onTextboxChangeSignInUser = this.onTextboxChangeSignInUser.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
  }

  onTextboxChangeSignInUser(event) {
    this.setState({
      signInUser: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // Grab state
    const {
      signInUser,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    this.props.dispatch(loginRequest(signInUser, signInPassword));
    this.props.history.push('/');

    // Post request to backend
    // fetch('/api/account/signin', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user: signInPassword,
    //     password: signInPassword,
    //   }),
    // }).then(res => res.json())
    //   .then(json => {
    //     console.log('json', json);
    //     if (json.success) {
    //       setInStorage('the_main_app', { token: json.token });
    //       this.setState({
    //         signInError: json.message,
    //         isLoading: false,
    //         signInPassword: '',
    //         signInEmail: '',
    //         token: json.token,
    //       });
    //     } else {
    //       this.setState({
    //         signInError: json.message,
    //         isLoading: false,
    //       });
    //     }
    //   });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>Login</h3>
            <TextField
              name="user"
              inputRef={x => this.user = x}
              label={this.props.intl.messages.user}
              onChange={this.onTextboxChangeSignInUser}
              required={true}
              fullWidth
            />
            <TextField
              name="password"
              inputRef={x => this.password = x}
              label={this.props.intl.messages.password}
              onChange={this.onTextboxChangeSignInPassword}
              required={true}
              fullWidth
            />
            <Button onClick={this.onSignIn} color="primary">
              {this.props.intl.messages.login}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.string,
  password: PropTypes.string,
  intl: intlShape.isRequired,
  dispatch: PropTypes.func,
};

export default withRouter(connect()(injectIntl(LoginPage)));
