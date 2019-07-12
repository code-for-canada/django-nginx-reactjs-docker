import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import {
  loginAction,
  handleAuthResponseAndState,
  updatePageHasErrorState
} from "../../modules/LoginRedux";
import { connect } from "react-redux";
import history from "./history";

const styles = {
  loginContent: {
    padding: "12px 32px 0 32px",
    border: "1px solid #cdcdcd"
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
    marginTop: 12,
    color: "#923534",
    fontWeight: "bold"
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
    handleAuthResponseAndState: PropTypes.func,
    setLoginState: PropTypes.func,
    authenticated: PropTypes.bool,
    updatePageHasErrorState: PropTypes.func
  };

  state = {
    username: "",
    password: "",
    wrongCredentials: false
  };

  // TODO(fnormand): encrypt passwords
  handleSubmit = event => {
    this.props
      .loginAction({ username: this.state.username, password: this.state.password })
      .then(response => {
        // credentials are wrong
        if (response.non_field_errors || typeof response.token === "undefined") {
          this.setState({
            wrongCredentials: true
          });
          this.props.updatePageHasErrorState(true);
          // focus on password field
          document.getElementById("password").focus();
          // right authentication
        } else {
          this.setState({ wrongCredentials: false });
          this.props.handleAuthResponseAndState(
            response,
            this.props.dispatch,
            window.location.pathname,
            history.push
          );
          this.props.updatePageHasErrorState(false);
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
          <div role="form">
            <div style={styles.loginContent}>
              <h2>{LOCALIZE.authentication.login.content.title}</h2>
              <span>{LOCALIZE.authentication.login.content.description}</span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <div style={styles.inputTitles}>
                    <label htmlFor={"username"}>
                      {LOCALIZE.authentication.login.content.inputs.emailTitle}
                    </label>
                  </div>
                  <input
                    aria-required={"true"}
                    type="text"
                    id="username"
                    style={styles.inputs}
                    onChange={this.handleUsernameChange}
                    value={this.state.username}
                  />
                </div>
                <div>
                  <div style={styles.inputTitles}>
                    <label htmlFor={"password"}>
                      {LOCALIZE.authentication.login.content.inputs.passwordTitle}
                    </label>
                  </div>
                  <input
                    aria-label={
                      this.state.wrongCredentials
                        ? LOCALIZE.authentication.login.invalidCredentials +
                          LOCALIZE.authentication.login.passwordFieldSelected
                        : LOCALIZE.authentication.login.content.inputs.passwordTitle
                    }
                    aria-invalid={this.state.wrongCredentials}
                    aria-required={"true"}
                    type="password"
                    id="password"
                    style={styles.inputs}
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                  />
                </div>
                <div>
                  {this.state.wrongCredentials && (
                    <label htmlFor={"password"} style={styles.loginError}>
                      {LOCALIZE.authentication.login.invalidCredentials}
                    </label>
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
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = dispatch => ({
  loginAction: data => dispatch(loginAction(data)),
  handleAuthResponseAndState: (userData, dispatch, location, push) =>
    dispatch(handleAuthResponseAndState(userData, dispatch, location, push)),
  updatePageHasErrorState: bool => dispatch(updatePageHasErrorState(bool)),
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
