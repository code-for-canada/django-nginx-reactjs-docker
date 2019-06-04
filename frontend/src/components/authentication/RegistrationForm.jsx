import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import validateName, { validateEmail, validatePassword } from "../../helpers/regexValidator";
import "../../css/registration-form.css";
import { registerAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
    margin: "8px 0 0 484px"
  },
  loginBtn: {
    width: 150,
    display: "block",
    margin: "24px auto"
  },
  validationError: {
    color: "#923534",
    marginTop: 6
  },
  errorMessage: {
    color: "#923534",
    fontWeight: "bold",
    padding: 0,
    marginTop: 12
  }
};

class RegistrationForm extends Component {
  static propTypes = {
    // Props from Redux
    registerAction: PropTypes.func
  };

  state = {
    // Ensures no errors are shown on page load
    isFirstLoad: true,
    // Form content and validation
    isValidFirstName: false,
    isValidLastName: false,
    isValidEmail: false,
    isValidPassword: false,
    isFirstPasswordLoad: true,
    isValidPasswordConfirmation: false,
    // PopupBox
    showDialog: false,
    // handle errors
    accountExistsError: false
  };

  firstNameValidation = () => {
    const firstNameContent = document.getElementById("first-name-field").value;
    const isValid = validateName(firstNameContent);
    this.setState({
      isFirstLoad: false,
      firstNameContent: firstNameContent,
      isValidFirstName: isValid
    });
  };

  lastNameValidation = () => {
    const lastNameContent = document.getElementById("last-name-field").value;
    const isValid = validateName(lastNameContent);
    this.setState({
      isFirstLoad: false,
      lastNameContent: lastNameContent,
      isValidLastName: isValid
    });
  };

  emailValidation = () => {
    const emailContent = document.getElementById("email-address-field").value;
    const isValid = validateEmail(emailContent);
    this.setState({ isFirstLoad: false, emailContent: emailContent, isValidEmail: isValid });
  };

  passwordValidation = () => {
    const passwordContent = document.getElementById("password-field").value;
    const passwordConfirmationContent = document.getElementById("password-confirmation-field")
      .value;
    const isValid = validatePassword(passwordContent);
    this.setState({
      isFirstLoad: false,
      isFirstPasswordLoad: false,
      passwordContent: passwordContent,
      isValidPassword: isValid,
      isValidPasswordConfirmation: passwordContent === passwordConfirmationContent
    });
  };

  passwordConfirmationValidation = () => {
    const passwordConfirmationContent = document.getElementById("password-confirmation-field")
      .value;
    const passwordValue = document.getElementById("password-field").value;
    this.setState({
      isFirstLoad: false,
      passwordConfirmationContent: passwordConfirmationContent,
      isValidPasswordConfirmation: passwordConfirmationContent === passwordValue
    });
  };

  redirectToLoginPage = () => {
    // refresh the page in order to show the login form
    window.location.reload();
    // close dialog
    this.setState({ showDialog: false });
  };

  areAllFieldsValid = () => {
    // running all fields validation
    this.firstNameValidation();
    this.lastNameValidation();
    this.emailValidation();
    this.passwordValidation();
    this.passwordConfirmationValidation();
    // if all fields are valid
    if (
      this.state.isValidFirstName &&
      this.state.isValidLastName &&
      this.state.isValidEmail &&
      this.state.isValidPassword &&
      this.state.isValidPasswordConfirmation
    ) {
      return true;
      // one or more fields are invalid
    } else {
      return false;
    }
  };

  handleSubmit = event => {
    // if all fields are valid, execute API errors validation
    if (this.areAllFieldsValid()) {
      this.props
        .registerAction({
          username: this.state.emailContent,
          email: this.state.emailContent,
          password: this.state.passwordContent
        })
        // API errors validation
        .then(response => {
          // account already exists
          if (response.username[0] === "A user with that username already exists.") {
            this.setState({ accountExistsError: true });
            // focus on email address field
            document.getElementById("email-address-field").focus();
            // account successfully created
          } else {
            this.setState({ showDialog: true, accountExistsError: false });
          }
        });
    }
    event.preventDefault();
  };

  render() {
    const {
      isFirstLoad,
      isValidFirstName,
      isValidLastName,
      isValidEmail,
      isValidPassword,
      isFirstPasswordLoad,
      isValidPasswordConfirmation,
      accountExistsError
    } = this.state;

    const validFieldClass = "valid-field";
    const invalidFieldClass = "invalid-field";

    return (
      <div>
        <div>
          <div style={styles.createAccountContent}>
            <h3>{LOCALIZE.authentication.createAccount.content.title}</h3>
            <span>{LOCALIZE.authentication.createAccount.content.description}</span>
            <form onSubmit={this.handleSubmit}>
              <div className="names-grid">
                <div className="names-grid-first-name">
                  <div style={styles.inputTitle}>
                    <label htmlFor={"first-name-field"}>
                      {LOCALIZE.authentication.createAccount.content.inputs.firstNameTitle}
                    </label>
                  </div>
                  {isValidFirstName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}

                  <input
                    aria-label={LOCALIZE.authentication.createAccount.content.inputs.firstNameTitle}
                    className={
                      isValidFirstName || isFirstLoad ? validFieldClass : invalidFieldClass
                    }
                    aria-invalid={!this.state.isValidFirstName}
                    aria-required={"true"}
                    id="first-name-field"
                    type="text"
                    style={styles.inputForNames}
                  />
                </div>
                <div className="names-grid-last-name">
                  <div style={styles.inputTitle}>
                    <label htmlFor={"last-name-field"}>
                      {LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    </label>
                  </div>
                  {isValidLastName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}
                  <input
                    aria-label={LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    className={isValidLastName || isFirstLoad ? validFieldClass : invalidFieldClass}
                    aria-invalid={!this.state.isValidLastName}
                    aria-required={"true"}
                    id="last-name-field"
                    type="text"
                    style={styles.inputForNames}
                  />
                </div>
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label htmlFor={"email-address-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.emailTitle}
                  </label>
                </div>
                {isValidEmail && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  aria-label={
                    accountExistsError
                      ? LOCALIZE.authentication.createAccount.content.inputs.emailTitle +
                        LOCALIZE.authentication.createAccount.accountAlreadyExistsError
                      : LOCALIZE.authentication.createAccount.content.inputs.emailTitle
                  }
                  className={isValidEmail || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-invalid={!this.state.isValidEmail}
                  aria-required={"true"}
                  id="email-address-field"
                  type="text"
                  style={styles.inputs}
                />
              </div>
              {this.state.accountExistsError && (
                <p style={styles.errorMessage}>
                  {LOCALIZE.authentication.createAccount.accountAlreadyExistsError}
                </p>
              )}
              <div>
                <div style={styles.inputTitle}>
                  <label htmlFor={"password-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordTitle}
                  </label>
                </div>
                {isValidPassword && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  aria-label={
                    isValidPassword
                      ? LOCALIZE.authentication.createAccount.content.inputs.passwordTitle
                      : LOCALIZE.ariaLabel.passwordCreationRequirements
                  }
                  className={isValidPassword || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-invalid={!this.state.isValidPassword}
                  aria-required={"true"}
                  id="password-field"
                  type="password"
                  style={styles.inputs}
                />
                {!isValidPassword && !isFirstPasswordLoad && (
                  <label htmlFor={"password-field"}>
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
                  </label>
                )}
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label htmlFor={"password-confirmation-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationTitle}
                  </label>
                </div>
                {isValidPasswordConfirmation && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  aria-label={
                    isValidPasswordConfirmation
                      ? LOCALIZE.authentication.createAccount.content.inputs
                          .passwordConfirmationTitle
                      : LOCALIZE.authentication.createAccount.content.inputs
                          .passwordConfirmationTitle +
                        LOCALIZE.ariaLabel.passwordConfirmationRequirements
                  }
                  className={
                    isValidPasswordConfirmation || isFirstLoad ? validFieldClass : invalidFieldClass
                  }
                  aria-invalid={!this.state.isValidPasswordConfirmation}
                  aria-required={"true"}
                  id="password-confirmation-field"
                  type="password"
                  style={styles.inputs}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <label htmlFor={"password-confirmation-field"} style={styles.validationError}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationError}
                  </label>
                )}
              </div>
              <button style={styles.loginBtn} className="btn btn-primary" type="submit">
                {LOCALIZE.authentication.createAccount.button}
              </button>
            </form>
          </div>
        </div>
        <PopupBox
          isCloseButtonVisible={false}
          isBackdropStatic={true}
          show={this.state.showDialog}
          handleClose={this.redirectToLoginPage}
          title={LOCALIZE.authentication.createAccount.popupBox.title}
          description={
            <div>
              <p>{LOCALIZE.authentication.createAccount.popupBox.description}</p>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.commons.ok}
          rightButtonAction={this.redirectToLoginPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerAction
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(RegistrationForm);
