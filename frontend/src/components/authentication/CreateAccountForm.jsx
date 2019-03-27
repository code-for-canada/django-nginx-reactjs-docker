import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

const styles = {
  createAccountContent: {
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
  nameInputs: {
    // width: "100%",
    width: 190,
    padding: "3px 6px 3px 6px",
    border: "1px solid #00565E",
    borderRadius: 4
  },
  namesZone: {
    display: "flow-root"
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
  render() {
    return (
      <div>
        <div>
          <div style={styles.createAccountContent}>
            <h3>{LOCALIZE.homePage.createAccount.content.title}</h3>
            <span>{LOCALIZE.homePage.createAccount.content.description}</span>
            <form>
              <div style={styles.namesZone}>
                <div className="float-left">
                  <div style={styles.inputTitles}>
                    <span>{LOCALIZE.homePage.createAccount.content.inputs.inputOneTitle}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={LOCALIZE.homePage.createAccount.content.inputs.inputOnePlaceholder}
                    id="first-name"
                    style={styles.nameInputs}
                  />
                </div>
                <div className="float-right">
                  <div style={styles.inputTitles}>
                    <span style={styles.inputTitles}>
                      {LOCALIZE.homePage.createAccount.content.inputs.inputTwoTitle}
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder={LOCALIZE.homePage.createAccount.content.inputs.inputTwoPlaceholder}
                    id="last-name"
                    style={styles.nameInputs}
                  />
                </div>
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>{LOCALIZE.homePage.createAccount.content.inputs.inputThreeTitle}</span>
                </div>
                <input
                  type="text"
                  placeholder={LOCALIZE.homePage.createAccount.content.inputs.inputThreePlaceholder}
                  id="email"
                  style={styles.inputs}
                />
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>{LOCALIZE.homePage.createAccount.content.inputs.inputFourTitle}</span>
                </div>
                <input
                  type="password"
                  placeholder={LOCALIZE.homePage.createAccount.content.inputs.inputFourPlaceholder}
                  id="password"
                  style={styles.inputs}
                />
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>{LOCALIZE.homePage.createAccount.content.inputs.inputFiveTitle}</span>
                </div>
                <input
                  type="password"
                  placeholder={LOCALIZE.homePage.createAccount.content.inputs.inputFivePlaceholder}
                  id="password-confirmation"
                  style={styles.inputs}
                />
              </div>
              <input
                style={styles.loginBtn}
                className="btn btn-primary"
                type="submit"
                value={LOCALIZE.homePage.createAccount.button}
                onChange={function() {}}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
