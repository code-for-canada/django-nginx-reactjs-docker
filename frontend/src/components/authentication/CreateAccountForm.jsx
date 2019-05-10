import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import validateName, { validateEmail, validatePassword } from "../../helpers/regexValidator";
import "../../css/create-account-form.css";

const styles = {
  createAccountContent: {
    padding: "12px 32px 0 32px",
    border: "1px solid #cdcdcd"
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

class CreateAccountForm extends Component {
  state = {
    // Ensures no errors are shown on page load
    isFirstLoad: true,
    // Form content and validation
    firstNameContent: "",
    isValidFirstName: false,
    lastNameContent: "",
    isValidLastName: false,
    emailContent: "",
    isValidEmail: false,
    passwordContent: "",
    isValidPassword: false,
    passwordConfirmationContent: "",
    isFirstPasswordLoad: true,
    isValidPasswordConfirmation: false
  };

  firstNameValidation = event => {
    const updatedFirstNameValue = event.target.value;
    const isValid = validateName(updatedFirstNameValue);
    this.setState({
      isFirstLoad: false,
      firstNameContent: updatedFirstNameValue,
      isValidFirstName: isValid
    });
  };

  lastNameValidation = event => {
    const updatedLastNameValue = event.target.value;
    const isValid = validateName(updatedLastNameValue);
    this.setState({
      isFirstLoad: false,
      lastNameContent: updatedLastNameValue,
      isValidLastName: isValid
    });
  };

  emailValidation = event => {
    const updatedEmailValue = event.target.value;
    const isValid = validateEmail(updatedEmailValue);
    this.setState({ isFirstLoad: false, emailContent: updatedEmailValue, isValidEmail: isValid });
  };

  passwordValidation = event => {
    const updatedPasswordValue = event.target.value;
    const passwordConfirmationValue = this.state.passwordConfirmationContent;
    const isValid = validatePassword(updatedPasswordValue);
    this.setState({
      isFirstLoad: false,
      isFirstPasswordLoad: false,
      passwordContent: updatedPasswordValue,
      isValidPassword: isValid,
      isValidPasswordConfirmation: updatedPasswordValue === passwordConfirmationValue
    });
  };

  passwordConfirmationValidation = event => {
    const updatedPasswordConfirmationValue = event.target.value;
    const passwordValue = this.state.passwordContent;
    this.setState({
      isFirstLoad: false,
      passwordConfirmationContent: updatedPasswordConfirmationValue,
      isValidPasswordConfirmation: updatedPasswordConfirmationValue === passwordValue
    });
  };

  render() {
    const {
      isFirstLoad,
      firstNameContent,
      isValidFirstName,
      lastNameContent,
      isValidLastName,
      emailContent,
      isValidEmail,
      passwordContent,
      isValidPassword,
      isFirstPasswordLoad,
      passwordConfirmationContent,
      isValidPasswordConfirmation
    } = this.state;

    const validFieldClass = "valid-field";
    const invalidFieldClass = "invalid-field";

    const submitButtonEnabled =
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword &&
      isValidPasswordConfirmation;
    return (
      <div>
        <div>
          <div style={styles.createAccountContent}>
            <h3>{LOCALIZE.authentication.createAccount.content.title}</h3>
            <span>{LOCALIZE.authentication.createAccount.content.description}</span>
            <form>
              <div className="names-grid">
                <div className="names-grid-first-name">
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
                    className={
                      isValidFirstName || isFirstLoad ? validFieldClass : invalidFieldClass
                    }
                    type="text"
                    placeholder={
                      LOCALIZE.authentication.createAccount.content.inputs.firstNamePlaceholder
                    }
                    value={firstNameContent}
                    style={styles.inputForNames}
                    onChange={this.firstNameValidation}
                  />
                </div>
                <div className="names-grid-last-name">
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
                    className={isValidLastName || isFirstLoad ? validFieldClass : invalidFieldClass}
                    type="text"
                    placeholder={
                      LOCALIZE.authentication.createAccount.content.inputs.lastNamePlaceholder
                    }
                    value={lastNameContent}
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
                  className={isValidEmail || isFirstLoad ? validFieldClass : invalidFieldClass}
                  type="text"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs.emailPlaceholder
                  }
                  value={emailContent}
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
                  className={isValidPassword || isFirstLoad ? validFieldClass : invalidFieldClass}
                  type="password"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs.passwordPlaceholder
                  }
                  value={passwordContent}
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
                  className={
                    isValidPasswordConfirmation || isFirstLoad ? validFieldClass : invalidFieldClass
                  }
                  type="password"
                  placeholder={
                    LOCALIZE.authentication.createAccount.content.inputs
                      .passwordConfirmationPlaceholder
                  }
                  value={passwordConfirmationContent}
                  style={styles.inputs}
                  onChange={this.passwordConfirmationValidation}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <p style={styles.validationError}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationError}
                  </p>
                )}
              </div>
              <button
                disabled={!submitButtonEnabled}
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
