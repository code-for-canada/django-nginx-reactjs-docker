import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { loginAction, authenticateAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const styles = {
  loginContent: {
    padding: "12px 32px 0 32px"
  },
  inputTitles: {
    padding: "12px 0 6px 0",
    fontWeight: "bold"
  },
  inputs: {
    width: "100%",
    padding: "3px 6px 3px 6px",
    border: "1px solid #00565E",
    borderRadius: 4
  },
  loginBtn: {
    width: 150,
    display: "block",
    margin: "24px auto"
  },
  loginError: {
    color: "red"
  },
  validationError: {
    color: "red",
    paddingTop: 8
  }
};

class LoginForm extends Component {
  static propTypes = {
    // Props from Redux
    loginAction: PropTypes.func,
    authenticateAction: PropTypes.func,
    setLoginState: PropTypes.func,
    loggedIn: PropTypes.bool,
    authenticated: PropTypes.bool
  };

  state = {
    username: "",
    password: "",
    isAuthenticated: false,
    wrongCredentials: false
  };

  handleSubmit = event => {
    this.props
      .loginAction({ username: this.state.username, password: this.state.password })
      .then(response => {
        if (response.non_field_errors || typeof response.token === "undefined") {
          this.setState({ wrongCredentials: true });
        } else {
          this.setState({ isAuthenticated: true, wrongCredentials: false });
          this.props.authenticateAction(true);
        }
      });
    event.preventDefault();
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        {!this.props.authenticated && (
          <div>
            <div style={styles.loginContent}>
              <h3>{LOCALIZE.authentication.login.content.title}</h3>
              <span>{LOCALIZE.authentication.login.content.description}</span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <div style={styles.inputTitles}>
                    <span>{LOCALIZE.authentication.login.content.inputs.emailTitle}</span>
                  </div>
                  <input
                    aria-label={LOCALIZE.authentication.login.content.inputs.emailTitle}
                    type="text"
                    placeholder={LOCALIZE.authentication.login.content.inputs.emailPlaceholder}
                    id="username"
                    style={styles.inputs}
                    onChange={this.handleUsernameChange}
                    value={this.state.username}
                  />
                </div>
                <div>
                  <div style={styles.inputTitles}>
                    <span>{LOCALIZE.authentication.login.content.inputs.passwordTitle}</span>
                  </div>
                  <input
                    aria-label={LOCALIZE.authentication.login.content.inputs.passwordTitle}
                    type="password"
                    placeholder={LOCALIZE.authentication.login.content.inputs.passwordPlaceholder}
                    id="password"
                    style={styles.inputs}
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                  />
                </div>
                <div>
                  {this.state.wrongCredentials && (
                    <p style={styles.loginError}>
                      {LOCALIZE.authentication.login.invalidCredentials}
                    </p>
                  )}
                </div>
                <input
                  style={styles.loginBtn}
                  className="btn btn-primary"
                  type="submit"
                  value={LOCALIZE.authentication.login.button}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.login.loggedIn,
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginAction,
      authenticateAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
