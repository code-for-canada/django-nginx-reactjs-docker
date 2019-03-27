import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import validateName, { validateEmail, validatePassword } from "../../helpers/regexValidator";
import "../../css/create-account-form.css";

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
    borderRadius: 4
  },
  namesZone: {
    display: "flow-root"
  },
  nameInputs: {
    width: 190,
    padding: "3px 6px 3px 6px",
    borderRadius: 4
  },
  namesValidationError: {
    color: "red",
    //must be the same width of nameInputs
    width: 190
  },
  loginBtn: {
    width: 150,
    display: "block",
    margin: "24px auto"
  },
  validationError: {
    color: "red",
    marginTop: 6
  }
};

let SUBMIT_BTN_DISABLED;

class LoginForm extends Component {
  state = {
    isFirstPasswordLoad: true,
    isValidFirstName: false,
    firstNameClassStyle: "valid-field",
    isValidLastName: false,
    lastNameClassStyle: "valid-field",
    isValidEmail: false,
    emailClassStyle: "valid-field",
    isValidPassword: false,
    passwordClassStyle: "valid-field",
    isValidPasswordConfirmation: false,
    passwordConfirmationClassStyle: "valid-field"
  };

  firstNameValidation = () => {
    const firstName = document.getElementById("first-name").value;
    const isValide = validateName(firstName);
    if (isValide) {
      this.setState({ isValidFirstName: true, firstNameClassStyle: "valid-field" });
    } else {
      this.setState({ isValidFirstName: false, firstNameClassStyle: "invalid-field" });
    }
  };

  lastNameValidation = () => {
    const lastName = document.getElementById("last-name").value;
    const isValide = validateName(lastName);
    if (isValide) {
      this.setState({ isValidLastName: true, lastNameClassStyle: "valid-field" });
    } else {
      this.setState({ isValidLastName: false, lastNameClassStyle: "invalid-field" });
    }
  };

  emailValidation = () => {
    const email = document.getElementById("email").value;
    const isValide = validateEmail(email);
    if (isValide) {
      this.setState({ isValidEmail: true, emailClassStyle: "valid-field" });
    } else {
      this.setState({ isValidEmail: false, emailClassStyle: "invalid-field" });
    }
  };

  passwordValidation = () => {
    this.setState({ isFirstPasswordLoad: false });
    const password = document.getElementById("password").value;
    const isValide = validatePassword(password);
    const passwordConfirmation = document.getElementById("password-confirmation").value;
    //Password valid?
    if (isValide) {
      this.setState({ isValidPassword: true, passwordClassStyle: "valid-field" });
    } else {
      this.setState({ isValidPassword: false, passwordClassStyle: "invalid-field" });
    }
    //Password confirmation is the same?
    if (password === passwordConfirmation) {
      this.setState({
        isValidPasswordConfirmation: true,
        passwordConfirmationClassStyle: "valid-field"
      });
    } else {
      this.setState({
        isValidPasswordConfirmation: false,
        passwordConfirmationClassStyle: "invalid-field"
      });
    }
  };

  areAllFieldsValid = () => {
    const {
      isValidFirstName,
      isValidLastName,
      isValidEmail,
      isValidPassword,
      isValidPasswordConfirmation
    } = this.state;

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      isValidPasswordConfirmation
    ) {
      //did not use state because of maximum update depth exeeded error
      SUBMIT_BTN_DISABLED = false;
    } else {
      SUBMIT_BTN_DISABLED = true;
    }
  };

  render() {
    const {
      isFirstPasswordLoad,
      firstNameClassStyle,
      lastNameClassStyle,
      emailClassStyle,
      isValidPassword,
      passwordClassStyle,
      isValidPasswordConfirmation,
      passwordConfirmationClassStyle
    } = this.state;

    //check if all fields are valid
    this.areAllFieldsValid();
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
                    <span>{LOCALIZE.homePage.createAccount.content.inputs.firstNameTitle}</span>
                  </div>
                  <input
                    className={firstNameClassStyle}
                    type="text"
                    placeholder={
                      LOCALIZE.homePage.createAccount.content.inputs.firstNamePlaceholder
                    }
                    id="first-name"
                    style={styles.nameInputs}
                    onChange={this.firstNameValidation}
                  />
                </div>
                <div className="float-right">
                  <div style={styles.inputTitles}>
                    <span style={styles.inputTitles}>
                      {LOCALIZE.homePage.createAccount.content.inputs.lastNameTitle}
                    </span>
                  </div>
                  <input
                    className={lastNameClassStyle}
                    type="text"
                    placeholder={LOCALIZE.homePage.createAccount.content.inputs.lastNamePlaceholder}
                    id="last-name"
                    style={styles.nameInputs}
                    onChange={this.lastNameValidation}
                  />
                </div>
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>{LOCALIZE.homePage.createAccount.content.inputs.emailTitle}</span>
                </div>
                <input
                  className={emailClassStyle}
                  type="text"
                  placeholder={LOCALIZE.homePage.createAccount.content.inputs.emailPlaceholder}
                  id="email"
                  style={styles.inputs}
                  onChange={this.emailValidation}
                />
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>{LOCALIZE.homePage.createAccount.content.inputs.passwordTitle}</span>
                </div>
                <input
                  className={passwordClassStyle}
                  type="password"
                  placeholder={LOCALIZE.homePage.createAccount.content.inputs.passwordPlaceholder}
                  id="password"
                  style={styles.inputs}
                  onChange={this.passwordValidation}
                />
                {!isValidPassword && !isFirstPasswordLoad && (
                  <ul style={styles.validationError}>
                    <li>{LOCALIZE.homePage.createAccount.content.inputs.passwordErrors.Bullet1}</li>
                    <li>{LOCALIZE.homePage.createAccount.content.inputs.passwordErrors.Bullet2}</li>
                    <li>{LOCALIZE.homePage.createAccount.content.inputs.passwordErrors.Bullet3}</li>
                    <li>{LOCALIZE.homePage.createAccount.content.inputs.passwordErrors.Bullet4}</li>
                    <li>{LOCALIZE.homePage.createAccount.content.inputs.passwordErrors.Bullet5}</li>
                  </ul>
                )}
              </div>
              <div>
                <div style={styles.inputTitles}>
                  <span>
                    {LOCALIZE.homePage.createAccount.content.inputs.passwordConfirmationTitle}
                  </span>
                </div>
                <input
                  className={passwordConfirmationClassStyle}
                  type="password"
                  placeholder={
                    LOCALIZE.homePage.createAccount.content.inputs.passwordConfirmationPlaceholder
                  }
                  id="password-confirmation"
                  style={styles.inputs}
                  onChange={this.passwordValidation}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <p style={styles.validationError}>
                    {LOCALIZE.homePage.createAccount.content.inputs.passwordConfirmationError}
                  </p>
                )}
              </div>
              <button
                disabled={SUBMIT_BTN_DISABLED}
                style={styles.loginBtn}
                className="btn btn-primary"
                type="submit"
              >
                {LOCALIZE.homePage.createAccount.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
