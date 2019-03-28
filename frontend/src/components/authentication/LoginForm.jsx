import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";

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
  validationError: {
    color: "red",
    paddingTop: 8
  }
};

class LoginForm extends Component {
  //TODO(fnormand): Remove this part when implementing login functionality in the backend
  //===========================================
  static propTypes = {
    authentification: PropTypes.func
  };

  state = {
    isAuthenticated: false
  };

  handleSubmit = () => {
    this.setState({ isAuthenticated: true });
    this.props.authentification();
  };
  //===========================================

  render() {
    return (
      <div>
        {!this.state.isAuthenticated && (
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
                  />
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

export default LoginForm;
