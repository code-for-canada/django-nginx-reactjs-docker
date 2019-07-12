import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import validateName, {
  validateEmail,
  validatePassword,
  validatePriOrMilitaryNbr,
  PASSWORD_REQUIREMENTS
} from "../../helpers/regexValidator";
import "../../css/registration-form.css";
import {
  registerAction,
  handleAuthResponseAndState,
  loginAction,
  updatePageHasErrorState
} from "../../modules/LoginRedux";
import { connect } from "react-redux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import history from "./history";

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
    width: 240,
    padding: "3px 6px 3px 6px",
    borderRadius: 4
  },
  dobFields: {
    width: 40,
    padding: "3px 6px 3px 6px",
    borderRadius: 4,
    textAlign: "center",
    marginRight: 12
  },
  tooltipButton: {
    padding: 8
  },
  iconForNames: {
    color: "#278400",
    position: "absolute",
    margin: "8px 0 0 220px"
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
  passwordRequirementsError: {
    color: "#923534",
    marginTop: 6,
    fontWeight: "bold"
  },
  passwordRequirementsForScreenReader: {
    display: "none"
  },
  errorMessage: {
    color: "#923534",
    fontWeight: "bold",
    padding: 0,
    marginTop: 6
  },
  mandatoryMark: {
    color: "#923534"
  },
  privacyNoticeZone: {
    marginTop: 24
  },
  checkbox: {
    width: 18,
    height: 18,
    marginTop: 3
  },
  privacyNoticeLink: {
    textDecoration: "underline",
    color: "#0278A4",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    padding: 0
  }
};

const MANDATORY_MARK = " *";

class RegistrationForm extends Component {
  static propTypes = {
    // Props from Redux
    registerAction: PropTypes.func,
    handleAuthResponseAndState: PropTypes.func,
    loginAction: PropTypes.func,
    updatePageHasErrorState: PropTypes.func
  };

  state = {
    // Ensures no errors are shown on page load
    isFirstLoad: true,

    // Field Content States
    firstNameContent: "",
    lastNameContent: "",
    dobDayContent: "",
    dobMonthContent: "",
    dobYearContent: "",
    emailContent: "",
    priOrMilitaryNbrContent: "",
    passwordContent: "",
    passwordConfirmationContent: "",

    // Field Validation States
    isValidFirstName: false,
    isValidLastName: false,
    isValidDobDay: false,
    isValidDobMonth: false,
    isValidDobYear: false,
    isValidEmail: false,
    isValidPriOrMilitaryNbr: false,
    isValidPassword: false,
    isFirstPasswordLoad: true,
    isValidPasswordConfirmation: false,
    isCheckboxChecked: false,
    isValidPrivacyNotice: false,

    // Password Requirements States
    atLeastOneUppercase: false,
    atLeastOneLowercase: false,
    atLeastOneDigit: false,
    atLeastOneSpecialChar: false,
    betweenMinAndMaxChar: false,

    // PopupBox States
    showPrivacyNoticeDialog: false,

    // API Errors Handler States
    accountExistsError: false,
    passwordTooCommonError: false,
    passwordTooSimilarToUsernameError: false
  };

  getFirstNameContent = event => {
    const firstNameContent = event.target.value;
    this.setState({
      firstNameContent: firstNameContent
    });
  };

  getLastNameContent = event => {
    const lastNameContent = event.target.value;
    this.setState({
      lastNameContent: lastNameContent
    });
  };

  getDobDayContent = event => {
    const dobDayContent = event.target.value;
    // only 1 to 31 can be inserted into this field
    const regex = /^(3[01]|[12][0-9]|[1-9])$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      this.setState({
        dobDayContent: dobDayContent
      });
    }
  };

  getDobMonthContent = event => {
    const dobMonthContent = event.target.value;
    // only 1 to 12 can be inserted into this field
    const regex = /^(1[0-2]|[1-9])$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      this.setState({
        dobMonthContent: dobMonthContent
      });
    }
  };

  getDobYearContent = event => {
    const dobYearContent = event.target.value;
    // only 0 to 9 can be inserted into this field
    const regex = /^[0-9]$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      this.setState({
        dobYearContent: dobYearContent
      });
    }
  };

  getEmailContent = event => {
    const emailContent = event.target.value;
    this.setState({ emailContent: emailContent });
  };

  getPriOrMilitaryNbrContent = event => {
    const priOrMilitaryNbrContent = event.target.value;
    /* only the following can be inserted into this field:
          - 1 letter followed by 0 to 6 numbers
          - 0 to 9 numbers
    */
    const regex = /^(([A-Za-z]{1})([0-9]{0,6}))$|^([0-9]{0,9})$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      this.setState({
        priOrMilitaryNbrContent: priOrMilitaryNbrContent
      });
    }
  };

  getPasswordContent = event => {
    const passwordContent = event.target.value;
    this.setState({
      passwordContent: passwordContent
    });
  };

  getPasswordConfirmationContent = event => {
    const passwordConfirmationContent = event.target.value;
    this.setState({
      passwordConfirmationContent: passwordConfirmationContent
    });
  };

  // screen reader will read specific content depending on the following field conditions
  dobDayAriaLabelCondition = () => {
    if (this.state.isValidDobDay || this.state.isFirstLoad) {
      // returns the DOB field title and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
        LOCALIZE.ariaLabel.dobDayField
      );
    } else {
      // returns the DOB field title, the DOB error and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
        LOCALIZE.authentication.createAccount.content.inputs.dobError +
        LOCALIZE.ariaLabel.dobDayField
      );
    }
  };

  // screen reader will read specific content depending on the following field conditions
  dobMonthAriaLabelCondition = () => {
    // DOB Day field is valid OR this is the first page load
    if (this.state.isValidDobDay || this.state.isFirstLoad) {
      // returns the DOB field title and the field selected
      return LOCALIZE.ariaLabel.dobMonthField;
    } else {
      // returns the DOB field title, the DOB error and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobError +
        LOCALIZE.ariaLabel.dobMonthField
      );
    }
  };

  // screen reader will read specific content depending on the following field conditions
  dobYearAriaLabelCondition = () => {
    // DOB Month field is valid OR this is the first page load
    if (this.state.isValidDobDay || this.state.isFirstLoad) {
      // returns the DOB field title and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobTooltip +
        LOCALIZE.ariaLabel.dobYearField
      );
    } else {
      // returns the DOB field title, the DOB error and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobError +
        LOCALIZE.authentication.createAccount.content.inputs.dobTooltip +
        LOCALIZE.ariaLabel.dobYearField
      );
    }
  };

  // triggers DOB tooltip button click in order to show/hide the tooltip window
  triggerDobTooltipClick = () => {
    document.getElementById("dob-tooltip-button").click();
  };

  // returns password requirements on password field selection for the screen reader users
  getPasswordRequirements = () => {
    // only on first load, since the dynamic password requirements are handling that after the first page load
    if (this.state.isFirstLoad) {
      return (
        <span id="password-requirements" style={styles.passwordRequirementsForScreenReader}>
          {LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.description +
            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.upperCase +
            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.lowerCase +
            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.digit +
            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.specialCharacter +
            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors.length}
        </span>
      );
    }
  };

  handleAccountAlreadyExistsError = response => {
    if (response.username[0] === "A user with that username already exists.") {
      this.setState({ accountExistsError: true });
      // focus on email address field
      document.getElementById("email-address-field").focus();
    }
  };

  handlePasswordErrors = response => {
    const passwordTooCommonIndex = response.password.indexOf("This password is too common.");
    const passwordTooSimilarToUsernameIndex = response.password.indexOf(
      "The password is too similar to the username."
    );

    // password too common error
    if (passwordTooCommonIndex >= 0) {
      this.setState({ passwordTooCommonError: true });
    }

    // password too similar to username error
    if (passwordTooSimilarToUsernameIndex >= 0) {
      this.setState({ passwordTooSimilarToUsernameError: true });
    }
    // focus on password field
    document.getElementById("password-field").focus();
  };

  validateForm = () => {
    this.resetPasswordRequirementsStates();
    const isValidFirstName = validateName(this.state.firstNameContent);
    const isValidLastName = validateName(this.state.lastNameContent);
    const isValidDobDay = this.state.dobDayContent.length > 0;
    const isValidDobMonth = this.state.dobMonthContent.length > 0;
    const isValidDobYear = this.state.dobYearContent.length > 0;
    const isValidEmail = validateEmail(this.state.emailContent);
    const isValidPriOrMilitaryNbr = validatePriOrMilitaryNbr(this.state.priOrMilitaryNbrContent);
    const passwordContent = this.state.passwordContent;
    const passwordConfirmationContent = this.state.passwordConfirmationContent;
    const isValidPrivacyNotice = this.state.isCheckboxChecked;
    const passwordErrorsArray = validatePassword(this.state.passwordContent);
    let isValidPassword = false;

    // checking the password validity
    if (passwordErrorsArray.length === 0) {
      isValidPassword = true;
    } else {
      this.findMissingPasswordRequirements(passwordErrorsArray);
      isValidPassword = false;
    }

    this.setState({
      isFirstLoad: false,
      isFirstPasswordLoad: false,
      accountExistsError: false,
      passwordTooCommonError: false,
      passwordTooSimilarToUsernameError: false,
      isValidFirstName: isValidFirstName,
      isValidLastName: isValidLastName,
      isValidDobDay: isValidDobDay,
      isValidDobMonth: isValidDobMonth,
      isValidDobYear: isValidDobYear,
      isValidEmail: isValidEmail,
      isValidPriOrMilitaryNbr: isValidPriOrMilitaryNbr,
      isValidPassword: isValidPassword,
      isValidPasswordConfirmation: passwordContent === passwordConfirmationContent,
      isValidPrivacyNotice: isValidPrivacyNotice
    });
  };

  // resetting all password requirements states to true
  resetPasswordRequirementsStates = () => {
    this.setState({
      atLeastOneUppercase: true,
      atLeastOneLowercase: true,
      atLeastOneDigit: true,
      atLeastOneSpecialChar: true,
      betweenMinAndMaxChar: true
    });
  };

  // checking password requirements that are not satisfied
  findMissingPasswordRequirements = passwordErrorsArray => {
    // using indexOf instead of includes, since IE is not compatible with it
    const indexOfUppercase = passwordErrorsArray.indexOf(PASSWORD_REQUIREMENTS.UPPERCASE);
    if (indexOfUppercase >= 0) {
      this.setState({ atLeastOneUppercase: false });
    }
    const indexOfLowercase = passwordErrorsArray.indexOf(PASSWORD_REQUIREMENTS.LOWERCASE);
    if (indexOfLowercase >= 0) {
      this.setState({ atLeastOneLowercase: false });
    }
    const indexOfDigit = passwordErrorsArray.indexOf(PASSWORD_REQUIREMENTS.DIGIT);
    if (indexOfDigit >= 0) {
      this.setState({ atLeastOneDigit: false });
    }
    const indexOfSpecialChar = passwordErrorsArray.indexOf(PASSWORD_REQUIREMENTS.SPECIAL_CHARS);
    if (indexOfSpecialChar >= 0) {
      this.setState({ atLeastOneSpecialChar: false });
    }
    const indexOfNumberOfChars = passwordErrorsArray.indexOf(PASSWORD_REQUIREMENTS.NUMBER_OF_CHARS);
    if (indexOfNumberOfChars >= 0) {
      this.setState({ betweenMinAndMaxChar: false });
    }
  };

  // checks if all fields are valid
  isFormValid = () => {
    return (
      this.state.isValidFirstName &&
      this.state.isValidLastName &&
      this.state.isValidDobDay &&
      this.state.isValidDobMonth &&
      this.state.isValidDobYear &&
      this.state.isValidEmail &&
      this.state.isValidPriOrMilitaryNbr &&
      this.state.isValidPassword &&
      this.state.isValidPasswordConfirmation &&
      this.state.isValidPrivacyNotice
    );
  };

  // analyses field by field and focus on the highest error field
  focusOnHighestErrorField = () => {
    if (!this.state.isValidFirstName) {
      document.getElementById("first-name-field").focus();
    } else if (!this.state.isValidLastName) {
      document.getElementById("last-name-field").focus();
    } else if (!this.state.isValidDobDay) {
      document.getElementById("dob-day-field").focus();
    } else if (!this.state.isValidDobMonth) {
      document.getElementById("dob-month-field").focus();
    } else if (!this.state.isValidDobYear) {
      document.getElementById("dob-year-field").focus();
    } else if (!this.state.isValidEmail) {
      document.getElementById("email-address-field").focus();
    } else if (!this.state.isValidPriOrMilitaryNbr) {
      document.getElementById("pri-or-military-nbr-field").focus();
    } else if (!this.state.isValidPassword) {
      document.getElementById("password-field").focus();
    } else if (!this.state.isValidPasswordConfirmation) {
      document.getElementById("password-confirmation-field").focus();
    } else if (!this.state.isValidPrivacyNotice) {
      document.getElementById("privacy-notice-checkbox").focus();
    }
  };

  handleSubmit = event => {
    const validForm = this.isFormValid();
    // if all fields are valid, execute API errors validation
    if (validForm) {
      this.props
        .registerAction({
          first_name: this.state.firstNameContent,
          last_name: this.state.lastNameContent,
          birth_date: `${this.state.dobDayContent}/${this.state.dobMonthContent}/---${this.state.dobYearContent}`,
          email: this.state.emailContent,
          pri_or_military_nbr: this.state.priOrMilitaryNbrContent,
          password: this.state.passwordContent,
          username: this.state.emailContent
        })
        // API errors validation
        .then(response => {
          // response returns email and username
          if (
            response.first_name === this.state.firstNameContent &&
            response.last_name === this.state.lastNameContent &&
            response.birth_date.length > 0 &&
            response.email === this.state.emailContent &&
            response.username === this.state.emailContent
          ) {
            // account successfully created
            this.setState({ accountExistsError: false });
            // login the user by using its credentials
            this.props
              .loginAction({
                username: this.state.emailContent,
                password: this.state.passwordContent
              })
              .then(response => {
                this.props.handleAuthResponseAndState(
                  response,
                  this.props.dispatch,
                  window.location.pathname,
                  history.push
                );
              });
            this.props.updatePageHasErrorState(false);
          } else {
            this.props.updatePageHasErrorState(true);
          }
          // response gets username error(s)
          if (typeof response.username !== "undefined") {
            // account already exists error
            this.handleAccountAlreadyExistsError(response);
          }
          // response gets password error(s)
          if (typeof response.password !== "undefined") {
            // password too common error
            this.handlePasswordErrors(response);
          }
        });
    } else {
      this.props.updatePageHasErrorState(true);
      this.focusOnHighestErrorField();
    }
    event.preventDefault();
  };

  /* 
    we need that 'event' to avoid checkbox status updates if clicking on
    the link in the privacy notice description
  */
  showPrivacyNoticePopup = event => {
    this.setState({ showPrivacyNoticeDialog: true });
    event.preventDefault();
  };

  closePrivacyNoticePopup = () => {
    this.setState({ showPrivacyNoticeDialog: false });
  };

  changeCheckboxStatus = () => {
    this.setState({ isCheckboxChecked: !this.state.isCheckboxChecked });
  };

  render() {
    const {
      isFirstLoad,
      firstNameContent,
      lastNameContent,
      dobDayContent,
      dobMonthContent,
      dobYearContent,
      emailContent,
      priOrMilitaryNbrContent,
      passwordContent,
      passwordConfirmationContent,
      isValidFirstName,
      isValidLastName,
      isValidDobDay,
      isValidDobMonth,
      isValidDobYear,
      isValidEmail,
      isValidPriOrMilitaryNbr,
      isValidPassword,
      isFirstPasswordLoad,
      isValidPasswordConfirmation,
      isValidPrivacyNotice,
      atLeastOneUppercase,
      atLeastOneLowercase,
      atLeastOneDigit,
      atLeastOneSpecialChar,
      betweenMinAndMaxChar,
      accountExistsError,
      passwordTooCommonError,
      passwordTooSimilarToUsernameError
    } = this.state;

    const validFieldClass = "valid-field";
    const invalidFieldClass = "invalid-field";

    return (
      <div>
        <div role="form">
          <div style={styles.createAccountContent}>
            <h2>{LOCALIZE.authentication.createAccount.content.title}</h2>
            <span>{LOCALIZE.authentication.createAccount.content.description}</span>
            <form onSubmit={this.handleSubmit}>
              <div className="names-grid">
                <div className="names-grid-first-name">
                  <div style={styles.inputTitle}>
                    <label id="first-name-title">
                      {LOCALIZE.authentication.createAccount.content.inputs.firstNameTitle}
                    </label>
                    <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  </div>
                  {isValidFirstName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}

                  <input
                    className={
                      isValidFirstName || isFirstLoad ? validFieldClass : invalidFieldClass
                    }
                    aria-labelledby={"first-name-title first-name-error"}
                    aria-invalid={!this.state.isValidFirstName && !isFirstLoad}
                    aria-required={"true"}
                    id="first-name-field"
                    type="text"
                    value={firstNameContent}
                    style={styles.inputForNames}
                    onChange={this.getFirstNameContent}
                  />
                  {!isValidFirstName && !isFirstLoad && (
                    <label id="first-name-error" style={styles.errorMessage}>
                      {LOCALIZE.authentication.createAccount.content.inputs.firstNameError}
                    </label>
                  )}
                </div>
                <div className="names-grid-last-name">
                  <div style={styles.inputTitle}>
                    <label id="last-name-title">
                      {LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    </label>
                    <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  </div>
                  {isValidLastName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}
                  <input
                    className={isValidLastName || isFirstLoad ? validFieldClass : invalidFieldClass}
                    aria-labelledby={"last-name-title last-name-error"}
                    aria-invalid={!this.state.isValidLastName && !isFirstLoad}
                    aria-required={"true"}
                    id="last-name-field"
                    type="text"
                    value={lastNameContent}
                    style={styles.inputForNames}
                    onChange={this.getLastNameContent}
                  />
                  {!isValidLastName && !isFirstLoad && (
                    <label id="last-name-error" style={styles.errorMessage}>
                      {LOCALIZE.authentication.createAccount.content.inputs.lastNameError}
                    </label>
                  )}
                </div>
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label>{LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle}</label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={
                      <Popover>
                        <div>
                          <p>{LOCALIZE.authentication.createAccount.content.inputs.dobTooltip}</p>
                        </div>
                      </Popover>
                    }
                  >
                    <Button
                      id="dob-tooltip-button"
                      tabIndex="-1"
                      style={styles.tooltipButton}
                      variant="link"
                      onBlur={this.triggerDobTooltipClick}
                    >
                      ?
                    </Button>
                  </OverlayTrigger>
                </div>
                <input
                  aria-label={this.dobDayAriaLabelCondition()}
                  aria-invalid={!this.state.isValidDobDay && !isFirstLoad}
                  className={isValidDobDay || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-required={"true"}
                  id="dob-day-field"
                  value={dobDayContent}
                  style={styles.dobFields}
                  onChange={this.getDobDayContent}
                />
                <input
                  aria-label={this.dobMonthAriaLabelCondition()}
                  aria-invalid={!this.state.isValidDobMonth && !isFirstLoad}
                  className={isValidDobMonth || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-required={"true"}
                  id="dob-month-field"
                  value={dobMonthContent}
                  style={styles.dobFields}
                  onChange={this.getDobMonthContent}
                />
                <input
                  aria-label={this.dobYearAriaLabelCondition()}
                  aria-invalid={!this.state.isValidDobYear && !isFirstLoad}
                  className={isValidDobYear || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-required={"true"}
                  id="dob-year-field"
                  value={dobYearContent}
                  style={styles.dobFields}
                  onChange={this.getDobYearContent}
                  onFocus={this.triggerDobTooltipClick}
                  onBlur={this.triggerDobTooltipClick}
                />
                {!(isValidDobDay && isValidDobMonth && isValidDobYear) && !isFirstLoad && (
                  <div>
                    <label
                      htmlFor={
                        !isValidDobDay
                          ? "dob-day-field"
                          : !isValidDobMonth
                          ? "dob-month-field"
                          : !isValidDobYear
                          ? "dob-year-field"
                          : ""
                      }
                      style={styles.errorMessage}
                    >
                      {LOCALIZE.authentication.createAccount.content.inputs.dobError}
                    </label>
                  </div>
                )}
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label id="email-address-title">
                    {LOCALIZE.authentication.createAccount.content.inputs.emailTitle}
                  </label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                </div>
                {isValidEmail && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={isValidEmail || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-labelledby={
                    "email-address-title email-address-error email-address-account-exists-error"
                  }
                  aria-invalid={!this.state.isValidEmail && !isFirstLoad}
                  aria-required={"true"}
                  id="email-address-field"
                  type="text"
                  value={emailContent}
                  style={styles.inputs}
                  onChange={this.getEmailContent}
                />
                {!isValidEmail && !isFirstLoad && (
                  <label id="email-address-error" style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.content.inputs.emailError}
                  </label>
                )}
              </div>
              {accountExistsError && (
                <label id="email-address-account-exists-error" style={styles.errorMessage}>
                  {LOCALIZE.authentication.createAccount.accountAlreadyExistsError}
                </label>
              )}
              <div>
                <div style={styles.inputTitle}>
                  <label htmlFor={"pri-or-military-nbr-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.priOrMilitaryNbrTitle}
                  </label>
                </div>
                {isValidPriOrMilitaryNbr && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={
                    isValidPriOrMilitaryNbr || isFirstLoad ? validFieldClass : invalidFieldClass
                  }
                  aria-invalid={!this.state.isValidPriOrMilitaryNbr && !isFirstLoad}
                  aria-required={"false"}
                  id="pri-or-military-nbr-field"
                  type="text"
                  value={priOrMilitaryNbrContent}
                  style={styles.inputs}
                  onChange={this.getPriOrMilitaryNbrContent}
                />
                {!isValidPriOrMilitaryNbr && !isFirstLoad && (
                  <label htmlFor={"pri-or-military-nbr-field"} style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.content.inputs.priOrMilitaryNbrError}
                  </label>
                )}
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label id="password-title">
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordTitle}
                  </label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  <OverlayTrigger
                    trigger="focus"
                    placement="right"
                    overlay={
                      <Popover>
                        <div>
                          <p>
                            {
                              LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                                .description
                            }
                          </p>
                          <ul>
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
                              {
                                LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                                  .digit
                              }
                            </li>

                            <li>
                              {
                                LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                                  .specialCharacter
                              }
                            </li>

                            <li>
                              {
                                LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                                  .length
                              }
                            </li>
                          </ul>
                        </div>
                      </Popover>
                    }
                  >
                    <Button tabIndex="-1" style={styles.tooltipButton} variant="link">
                      ?
                    </Button>
                  </OverlayTrigger>
                </div>
                {isValidPassword && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={isValidPassword || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-live="polite"
                  aria-labelledby={
                    "password-title password-errors password-too-common-error password-too-similar-to-username"
                  }
                  aria-invalid={!isValidPassword && !isFirstLoad}
                  aria-required={"true"}
                  id="password-field"
                  type="password"
                  value={passwordContent}
                  style={styles.inputs}
                  onChange={this.getPasswordContent}
                />
                {this.getPasswordRequirements()}
                {!isValidPassword && !isFirstPasswordLoad && (
                  <label id="password-errors">
                    <p style={styles.errorMessage}>
                      {
                        LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                          .description
                      }
                    </p>
                    <ul style={styles.passwordRequirementsError}>
                      {!atLeastOneUppercase && (
                        <li>
                          {
                            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                              .upperCase
                          }
                        </li>
                      )}
                      {!atLeastOneLowercase && (
                        <li>
                          {
                            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                              .lowerCase
                          }
                        </li>
                      )}
                      {!atLeastOneDigit && (
                        <li>
                          {
                            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                              .digit
                          }
                        </li>
                      )}
                      {!atLeastOneSpecialChar && (
                        <li>
                          {
                            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                              .specialCharacter
                          }
                        </li>
                      )}
                      {!betweenMinAndMaxChar && (
                        <li>
                          {
                            LOCALIZE.authentication.createAccount.content.inputs.passwordErrors
                              .length
                          }
                        </li>
                      )}
                    </ul>
                  </label>
                )}
                {passwordTooCommonError && (
                  <label id="password-too-common-error" style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.passwordTooCommonError}
                  </label>
                )}
                {passwordTooSimilarToUsernameError && (
                  <label id="password-too-similar-to-username" style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.passwordTooSimilarToUsernameError}
                  </label>
                )}
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label id="password-confirmation-title">
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationTitle}
                  </label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                </div>
                {isValidPasswordConfirmation && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={
                    isValidPasswordConfirmation || isFirstLoad ? validFieldClass : invalidFieldClass
                  }
                  aria-invalid={!isValidPasswordConfirmation && !isFirstLoad}
                  aria-required={"true"}
                  aria-labelledby={"password-confirmation-title password-confirmation-error"}
                  id="password-confirmation-field"
                  type="password"
                  value={passwordConfirmationContent}
                  style={styles.inputs}
                  onChange={this.getPasswordConfirmationContent}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <label id="password-confirmation-error" style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationError}
                  </label>
                )}
              </div>
              <div className="privacy-notice-grid" style={styles.privacyNoticeZone}>
                <div className="privacy-notice-grid-checkbox">
                  <input
                    aria-invalid={!isValidPrivacyNotice && !isFirstLoad}
                    aria-labelledby={"privacy-notice-error privacy-notice-description"}
                    id="privacy-notice-checkbox"
                    type="checkbox"
                    style={styles.checkbox}
                    onChange={this.changeCheckboxStatus}
                  />
                </div>
                <div className="privacy-notice-grid-description">
                  <label id="privacy-notice-description">
                    {LOCALIZE.formatString(
                      LOCALIZE.authentication.createAccount.privacyNotice,
                      <button
                        aria-label={LOCALIZE.authentication.createAccount.privacyNoticeLink}
                        tabIndex="0"
                        onClick={this.showPrivacyNoticePopup}
                        style={styles.privacyNoticeLink}
                      >
                        {LOCALIZE.authentication.createAccount.privacyNoticeLink}
                      </button>
                    )}
                  </label>
                </div>
              </div>
              {!isValidPrivacyNotice && !isFirstLoad && (
                <label id="privacy-notice-error" style={styles.errorMessage}>
                  {LOCALIZE.authentication.createAccount.privacyNoticeError}
                </label>
              )}
              <button
                style={styles.loginBtn}
                className="btn btn-primary"
                type="submit"
                onClick={this.validateForm}
              >
                {LOCALIZE.authentication.createAccount.button}
              </button>
            </form>
          </div>
        </div>
        <PopupBox
          isCloseButtonVisible={false}
          isBackdropStatic={true}
          show={this.state.showPrivacyNoticeDialog}
          handleClose={this.closePrivacyNoticePopup}
          title={LOCALIZE.authentication.createAccount.privacyNoticeDialog.title}
          description={
            <div>
              <section aria-labelledby="privacy-notice-statement">
                <h2 id="privacy-notice-statement">
                  {LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyNoticeStatement}
                </h2>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph1,
                    <a
                      href="https://laws-lois.justice.gc.ca/eng/acts/p-33.01/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        LOCALIZE.authentication.createAccount.privacyNoticeDialog
                          .publicServiceEmploymentActLink
                      }
                    </a>,
                    <a
                      href="https://laws-lois.justice.gc.ca/eng/acts/P-21/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyActLink}
                    </a>
                  )}
                </p>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph2,
                    <a href="https://www.priv.gc.ca/en/" target="_blank" rel="noopener noreferrer">
                      {
                        LOCALIZE.authentication.createAccount.privacyNoticeDialog
                          .privacyCommissionerLink
                      }
                    </a>
                  )}
                </p>
                <p>{LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph3}</p>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph4,
                    <a
                      href="https://laws-lois.justice.gc.ca/eng/acts/P-21/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyActLink}
                    </a>
                  )}
                </p>
                <p>{LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph5}</p>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph6,
                    <a
                      href="https://www.canada.ca/en/public-service-commission/corporate/about-us/access-information-privacy-office.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        LOCALIZE.authentication.createAccount.privacyNoticeDialog
                          .accessToInformationLink
                      }
                    </a>
                  )}
                </p>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph7,
                    <a
                      href="https://www.canada.ca/en/public-service-commission/corporate/about-us/access-information-privacy-office/info-source-sources-federal-government-employee-information.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        LOCALIZE.authentication.createAccount.privacyNoticeDialog
                          .infoSourceChapterLink
                      }
                    </a>
                  )}
                </p>
                <p>
                  {LOCALIZE.formatString(
                    LOCALIZE.authentication.createAccount.privacyNoticeDialog.privacyParagraph8,
                    <a href="https://www.priv.gc.ca/en/" target="_blank" rel="noopener noreferrer">
                      {
                        LOCALIZE.authentication.createAccount.privacyNoticeDialog
                          .privacyCommissionerLink
                      }
                    </a>
                  )}
                </p>
              </section>
              <section aria-labelledby="reproduction-notice">
                <h2 id="reproduction-notice">
                  {LOCALIZE.authentication.createAccount.privacyNoticeDialog.reproductionTitle}
                </h2>
                <p>
                  {LOCALIZE.authentication.createAccount.privacyNoticeDialog.reproductionWarning}
                </p>
              </section>
              <section aria-labelledby="cheating-notice">
                <h2 id="cheating-notice">
                  {LOCALIZE.authentication.createAccount.privacyNoticeDialog.cheatingTitle}
                </h2>
                <p>{LOCALIZE.authentication.createAccount.privacyNoticeDialog.cheatingWarning}</p>
              </section>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.commons.close}
          rightButtonAction={this.closePrivacyNoticePopup}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  registerAction: data => dispatch(registerAction(data)),
  loginAction: data => dispatch(loginAction(data)),
  handleAuthResponseAndState: (userData, dispatch, location, push) =>
    dispatch(handleAuthResponseAndState(userData, dispatch, location, push)),
  updatePageHasErrorState: bool => dispatch(updatePageHasErrorState(bool)),
  dispatch
});

export default connect(
  null,
  mapDispatchToProps
)(RegistrationForm);
