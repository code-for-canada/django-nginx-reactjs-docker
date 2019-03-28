import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import validateName, { validateEmail, validatePassword } from "../../helpers/regexValidator";
import "../../css/create-account-form.css";

const styles = {
  createAccountContent: {
    padding: "12px 32px 0 32px"
  },
  inputTitle: {
    padding: "12px 0 6px 0",
    fontWeight: "bold"
  },
  inputs: {
    width: "100%",
    padding: "3px 6px 3px 6px",
    borderRadius: 4
  },
  zoneForNames: {
    display: "flow-root"
  },
  inputForNames: {
    width: 190,
    padding: "3px 6px 3px 6px",
    borderRadius: 4
  },
  iconForNames: {
    color: "#278400",
    position: "absolute",
    margin: "8px 0 0 170px"
  },
  iconForOtherFields: {
    color: "#278400",
    position: "absolute",
    margin: "8px 0 0 370px"
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

class CreateAccountForm extends Component {
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
      isValidFirstName,
      isValidLastName,
      isValidEmail,
      isValidPassword,
      isFirstPasswordLoad,
      firstNameClassStyle,
      lastNameClassStyle,
      emailClassStyle,
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
            <h3>{LOCALIZE.authentication.createAccount.content.title}</h3>
            <span>{LOCALIZE.authentication.createAccount.content.description}</span>
            <form>
              <div style={styles.zoneForNames}>
                <div className="float-left">
                  <div style={styles.inputTitle}>
                    <span>
                      {LOCALIZE.authentication.createAccount.content.inputs.firstNameTitle}
                    </span>
                  </div>
                  {isValidFirstName && (
                    <span className="far fa-check-circle" style={styles.iconForNames} />
                  )}

                  <input
                    aria-label={LOCALIZE.authentication.createAccount.content.inputs.firstNameTitle}
                    className={firstNameClassStyle}
                    type="text"
                    placeholder={
                      LOCALIZE.authentication.createAccount.content.inputs.firstNamePlaceholder
                    }
                    id="first-name"
                    style={styles.inputForNames}
                    onChange={this.firstNameValidation}
                  />
                </div>
                <div className="float-right">
                  <div style={styles.inputTitle}>
                    <span style={styles.inputTitle}>
                      {LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    </span>
                  </div>
                  {isValidLastName && (
                    <span className="far fa-check-circle" style={styles.iconForNames} />
                  )}
                  <input
                    aria-label={LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    className={lastNameClassStyle}
                    type="text"
                    placeholder={
                      LOCALIZE.authentication.createAccount.content.inputs.lastNamePlaceholder
                    }
                    id="last-name"
                    style={styles.inputForNames}
                    onChange={this.lastNameValidation}
                  />
                </div>
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <span>{LOCALIZE.authentication.createAccount.content.inputs.emailTitle}</span>
                </div>
                {isValidEmail && (
                  <span className="far fa-check-circle" style={styles.iconForOtherFields} />
                )}
                <input
                  aria-label={LOCALIZE.authentication.createAccount.content.inputs.emailTitle}
                  className={emailClassStyle}
                  type="text"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs.emailPlaceholder
                  }
                  id="email"
                  style={styles.inputs}
                  onChange={this.emailValidation}
                />
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <span>{LOCALIZE.authentication.createAccount.content.inputs.passwordTitle}</span>
                </div>
                {isValidPassword && (
                  <span className="far fa-check-circle" style={styles.iconForOtherFields} />
                )}
                <input
                  aria-label={LOCALIZE.authentication.createAccount.content.inputs.passwordTitle}
                  className={passwordClassStyle}
                  type="password"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs.passwordPlaceholder
                  }
                  id="password"
                  style={styles.inputs}
                  onChange={this.passwordValidation}
                />
                {!isValidPassword && !isFirstPasswordLoad && (
                  <div>
                    <p style={styles.validationError}>
                      {
                        LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                          .description
                      }
                    </p>
                    <ul style={styles.validationError}>
                      <li>
                        {
                          LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                            .upperCase
                        }
                      </li>
                      <li>
                        {
                          LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                            .lowerCase
                        }
                      </li>
                      <li>
                        {LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.digit}
                      </li>
                      <li>
                        {
                          LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                            .specialCharacter
                        }
                      </li>
                      <li>
                        {LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.length}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <span>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationTitle}
                  </span>
                </div>
                {isValidPasswordConfirmation && (
                  <span className="far fa-check-circle" style={styles.iconForOtherFields} />
                )}
                <input
                  aria-label={
                    LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationTitle
                  }
                  className={passwordConfirmationClassStyle}
                  type="password"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs
                      .passwordConfirmationPlaceholder
                  }
                  id="password-confirmation"
                  style={styles.inputs}
                  onChange={this.passwordValidation}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <p style={styles.validationError}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationError}
                  </p>
                )}
              </div>
              <button
                disabled={SUBMIT_BTN_DISABLED}
                style={styles.loginBtn}
                className="btn btn-primary"
                type="submit"
              >
                {LOCALIZE.authentication.createAccount.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccountForm;
