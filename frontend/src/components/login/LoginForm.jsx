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

  render() {
    return (
      <div>
        {!this.state.isAuthenticated && (
          <div>
            <div style={styles.loginContent}>
              <h3>{LOCALIZE.homePage.login.content.title}</h3>
              <span>{LOCALIZE.homePage.login.content.description}</span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <div style={styles.inputTitles}>
                    <span>{LOCALIZE.homePage.login.content.inputs.inputOneTitle}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={LOCALIZE.homePage.login.content.inputs.inputOnePlaceholder}
                    id="username"
                    style={styles.inputs}
                  />
                  <br />
                </div>
                <div>
                  <div style={styles.inputTitles}>
                    <span>{LOCALIZE.homePage.login.content.inputs.inputTwoTitle}</span>
                  </div>
                  <input
                    type="password"
                    placeholder={LOCALIZE.homePage.login.content.inputs.inputTwoPlaceholder}
                    id="password"
                    style={styles.inputs}
                  />
                </div>
                <input
                  style={styles.loginBtn}
                  className="btn btn-primary"
                  type="submit"
                  value={LOCALIZE.homePage.login.button}
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
