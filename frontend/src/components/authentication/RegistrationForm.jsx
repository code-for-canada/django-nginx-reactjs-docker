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
import { registerAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

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
    padding: 0,
    marginLeft: 6
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
    cursor: "pointer"
  }
};

const MANDATORY_MARK = " *";

class RegistrationForm extends Component {
  static propTypes = {
    // Props from Redux
    registerAction: PropTypes.func
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
    showCreatedAccountDialog: false,
    showPrivacyNoticeDialog: false,

    // API Errors Handler States
    accountExistsError: false
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
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
        LOCALIZE.ariaLabel.dobMonthField
      );
    } else {
      // returns the DOB field title, the DOB error and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
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
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
        LOCALIZE.ariaLabel.dobYearField
      );
    } else {
      // returns the DOB field title, the DOB error and the field selected
      return (
        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
        LOCALIZE.authentication.createAccount.content.inputs.dobError +
        LOCALIZE.ariaLabel.dobYearField
      );
    }
  };

  // screen reader will read specific content depending on the following field conditions
  privacyNoticeAriaLabelCondition = () => {
    // Privacy Notice field is valid OR this is the first page load
    if (this.state.isValidPrivacyNotice || this.state.isFirstLoad) {
      // returns privacy notice description and link
      return (
        LOCALIZE.authentication.createAccount.privacyNotice +
        LOCALIZE.authentication.createAccount.privacyNoticeLink
      );
    } else {
      // returns privacy notice error, description and link
      return (
        LOCALIZE.authentication.createAccount.privacyNoticeError +
        LOCALIZE.authentication.createAccount.privacyNotice +
        LOCALIZE.authentication.createAccount.privacyNoticeLink
      );
    }
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

  redirectToLoginPage = () => {
    // refresh the page in order to show the login form
    window.location.reload();
    // close dialog
    this.setState({ showCreatedAccountDialog: false });
  };

  handleSubmit = event => {
    const validForm = this.isFormValid();
    // if all fields are valid, execute API errors validation
    if (validForm) {
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
            this.setState({ showCreatedAccountDialog: true, accountExistsError: false });
          }
        });
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
                    <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  </div>
                  {isValidFirstName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}

                  <input
                    className={
                      isValidFirstName || isFirstLoad ? validFieldClass : invalidFieldClass
                    }
                    aria-invalid={!this.state.isValidFirstName && !isFirstLoad}
                    aria-required={"true"}
                    id="first-name-field"
                    type="text"
                    value={firstNameContent}
                    style={styles.inputForNames}
                    onChange={this.getFirstNameContent}
                  />
                  {!isValidFirstName && !isFirstLoad && (
                    <label htmlFor={"first-name-field"} style={styles.errorMessage}>
                      {LOCALIZE.authentication.createAccount.content.inputs.firstNameError}
                    </label>
                  )}
                </div>
                <div className="names-grid-last-name">
                  <div style={styles.inputTitle}>
                    <label htmlFor={"last-name-field"}>
                      {LOCALIZE.authentication.createAccount.content.inputs.lastNameTitle}
                    </label>
                    <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                  </div>
                  {isValidLastName && (
                    <FontAwesomeIcon style={styles.iconForNames} icon={faCheckCircle} />
                  )}
                  <input
                    className={isValidLastName || isFirstLoad ? validFieldClass : invalidFieldClass}
                    aria-invalid={!this.state.isValidLastName && !isFirstLoad}
                    aria-required={"true"}
                    id="last-name-field"
                    type="text"
                    value={lastNameContent}
                    style={styles.inputForNames}
                    onChange={this.getLastNameContent}
                  />
                  {!isValidLastName && !isFirstLoad && (
                    <label htmlFor={"last-name-field"} style={styles.errorMessage}>
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
                    trigger="focus"
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
                      aria-label={
                        LOCALIZE.authentication.createAccount.content.inputs.dobDayTitle +
                        LOCALIZE.authentication.createAccount.content.inputs.dobTooltip
                      }
                      style={styles.tooltipButton}
                      variant="link"
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
                  <label htmlFor={"email-address-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.emailTitle}
                  </label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                </div>
                {isValidEmail && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={isValidEmail || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-invalid={!this.state.isValidEmail && !isFirstLoad}
                  aria-required={"true"}
                  id="email-address-field"
                  type="text"
                  value={emailContent}
                  style={styles.inputs}
                  onChange={this.getEmailContent}
                />
                {!isValidEmail && !isFirstLoad && (
                  <label htmlFor={"email-address-field"} style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.content.inputs.emailError}
                  </label>
                )}
              </div>
              {accountExistsError && (
                <label htmlFor={"email-address-field"} style={styles.errorMessage}>
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
                  <label htmlFor={"password-field"}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordTitle}
                  </label>
                  <span style={styles.mandatoryMark}>{MANDATORY_MARK}</span>
                </div>
                {isValidPassword && (
                  <FontAwesomeIcon style={styles.iconForOtherFields} icon={faCheckCircle} />
                )}
                <input
                  className={isValidPassword || isFirstLoad ? validFieldClass : invalidFieldClass}
                  aria-live="polite"
                  aria-invalid={!isValidPassword && !isFirstLoad}
                  aria-required={"true"}
                  id="password-field"
                  type="password"
                  value={passwordContent}
                  style={styles.inputs}
                  onChange={this.getPasswordContent}
                />
                {!isValidPassword && !isFirstPasswordLoad && (
                  <label htmlFor={"password-field"}>
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
              </div>
              <div>
                <div style={styles.inputTitle}>
                  <label htmlFor={"password-confirmation-field"}>
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
                  id="password-confirmation-field"
                  type="password"
                  value={passwordConfirmationContent}
                  style={styles.inputs}
                  onChange={this.getPasswordConfirmationContent}
                />
                {!isValidPasswordConfirmation && !isFirstPasswordLoad && (
                  <label htmlFor={"password-confirmation-field"} style={styles.errorMessage}>
                    {LOCALIZE.authentication.createAccount.content.inputs.passwordConfirmationError}
                  </label>
                )}
              </div>
              <div className="privacy-notice-grid" style={styles.privacyNoticeZone}>
                <div className="privacy-notice-grid-checkbox">
                  <input
                    aria-invalid={!isValidPrivacyNotice && !isFirstLoad}
                    aria-label={this.privacyNoticeAriaLabelCondition()}
                    id="privacy-notice-checkbox"
                    type="checkbox"
                    style={styles.checkbox}
                    onChange={this.changeCheckboxStatus}
                  />
                </div>
                <div className="privacy-notice-grid-description">
                  <label htmlFor="privacy-notice-checkbox">
                    {LOCALIZE.authentication.createAccount.privacyNotice}
                    <span
                      tabIndex="0"
                      onClick={this.showPrivacyNoticePopup}
                      style={styles.privacyNoticeLink}
                    >
                      {LOCALIZE.authentication.createAccount.privacyNoticeLink}
                    </span>
                    .
                  </label>
                </div>
              </div>
              {!isValidPrivacyNotice && !isFirstLoad && (
                <label htmlFor={"privacy-notice-checkbox"} style={styles.errorMessage}>
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
          title={"TITLE HERE (TODO)"}
          description={
            <div>
              <p>DESCRIPTION HERE (TODO)</p>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.commons.ok}
          rightButtonAction={this.closePrivacyNoticePopup}
        />
        <PopupBox
          isCloseButtonVisible={false}
          isBackdropStatic={true}
          show={this.state.showCreatedAccountDialog}
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
