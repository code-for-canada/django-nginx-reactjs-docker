import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import { EMAIL_TYPE, actionShape } from "./constants";
import ReactResponsiveSelect from "react-responsive-select";
import { transformAddressBook } from "../../helpers/transformations";
import { contactShape } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faReplyAll, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

// These two consts limit the number of characters
// that can be entered into two text areas
// and are used to display <x>/<MAX>
// under the text areas
const MAX_RESPONSE = "3000";
const MAX_REASON = "650";

const styles = {
  header: {
    responseTypeIcons: {
      marginRight: 10,
      padding: 6,
      border: "1px solid #00565E",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 24
    },
    responseTypeIconsSelected: {
      backgroundColor: "#00565E",
      color: "white"
    },
    radioButtonZone: {
      marginBottom: 12
    },
    responseTypeRadio: {
      all: "unset",
      color: "#00565E",
      cursor: "pointer"
    },
    radioPadding: {
      marginBottom: 16
    },
    radioTextUnselected: {
      fontWeight: "normal",
      cursor: "pointer",
      paddingRight: 20,
      color: "#00565E"
    },
    radioTextSelected: {
      fontWeight: "bold",
      textDecoration: "underline",
      cursor: "pointer",
      paddingRight: 20,
      color: "#00565E"
    },
    fieldsetLegend: {
      fontSize: 16,
      marginBottom: 12,
      marginTop: 12,
      paddingTop: 12
    },
    titleStyle: {
      float: "left",
      width: 28,
      height: 32,
      lineHeight: "2.1em",
      paddingRight: 4,
      marginTop: 5,
      marginBottom: 18
    }
  },
  response: {
    textArea: {
      padding: "6px 12px",
      border: "1px solid #00565E",
      borderRadius: 4,
      width: "100%",
      height: 225,
      resize: "none"
    }
  },
  textCounter: {
    width: "100%",
    textAlign: "right",
    paddingRight: 12
  },
  hr: {
    margin: "12px 0px"
  },
  reasonsForAction: {
    textArea: {
      padding: "6px 12px",
      border: "1px solid #00565E",
      borderRadius: 4,
      width: "100%",
      height: 150,
      resize: "none"
    }
  },
  tooltipButton: {
    float: "right",
    textDecoration: "underline"
  }
};

class EditEmail extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    action: actionShape
  };

  state = {
    emailType: !this.props.action ? EMAIL_TYPE.reply : this.props.action.emailType,
    emailTo: !this.props.action ? [] : this.props.action.emailTo,
    emailCc: !this.props.action ? [] : this.props.action.emailCc,
    emailBody: !this.props.action ? "" : this.props.action.emailBody,
    reasonsForAction: !this.props.action ? "" : this.props.action.reasonsForAction,
    // Provided by redux
    addressBook: PropTypes.arrayOf(contactShape)
  };

  onEmailTypeChange = event => {
    const newEmailType = event.target.value;
    this.setState({ emailType: newEmailType });
    this.props.onChange({ ...this.state, emailType: newEmailType });
  };

  // Extract just the value
  // This is all that is needed for saving and loading
  getOptionValues(options) {
    return Array.from(options, opt => opt.value);
  }

  onEmailToChange = event => {
    // If the value has not changed, return
    // can prevent infinite render loop
    if (!event.altered) {
      return;
    }
    const newEmailTo = this.getOptionValues(event.options);
    this.setState({ emailTo: newEmailTo });
    this.props.onChange({ ...this.state, emailTo: newEmailTo });
  };

  onEmailCcChange = event => {
    // If the value has not changed, return
    // can prevent infinite render loop
    if (!event.altered) {
      return;
    }
    const newEmailCc = this.getOptionValues(event.options);
    this.setState({ emailCc: newEmailCc });
    this.props.onChange({ ...this.state, emailCc: newEmailCc });
  };

  onEmailBodyChange = event => {
    const newEmailBody = event.target.value;
    this.setState({ emailBody: newEmailBody });
    this.props.onChange({ ...this.state, emailBody: newEmailBody });
  };

  onReasonsForActionChange = event => {
    const newreasonsForAction = event.target.value;
    this.setState({ reasonsForAction: newreasonsForAction });
    this.props.onChange({ ...this.state, reasonsForAction: newreasonsForAction });
  };

  render() {
    const { emailTo, emailCc, emailBody, reasonsForAction } = this.state;
    const replyChecked = this.state.emailType === EMAIL_TYPE.reply;
    const replyAllChecked = this.state.emailType === EMAIL_TYPE.replyAll;
    const forwardChecked = this.state.emailType === EMAIL_TYPE.forward;
    const options = transformAddressBook(this.props.addressBook);

    return (
      <div style={styles.container}>
        <form>
          <div>
            <fieldset>
              <legend className="font-weight-bold" style={styles.header.fieldsetLegend}>
                {LOCALIZE.emibTest.inboxPage.addEmailResponse.selectResponseType}
              </legend>
              <div style={styles.header.radioButtonZone} className="radio-button-hover">
                <input
                  id="reply-radio"
                  type="radio"
                  name="responseTypeRadio"
                  style={{ ...styles.header.radioPadding, ...styles.header.responseTypeRadio }}
                  onChange={this.onEmailTypeChange}
                  value={EMAIL_TYPE.reply}
                  checked={replyChecked}
                  className="visually-hidden"
                />
                <label
                  htmlFor="reply-radio"
                  style={
                    replyChecked
                      ? styles.header.radioTextSelected
                      : styles.header.radioTextUnselected
                  }
                >
                  <FontAwesomeIcon
                    icon={faReply}
                    style={{
                      ...styles.header.responseTypeIcons,
                      ...(replyChecked ? styles.header.responseTypeIconsSelected : {})
                    }}
                  />
                  {LOCALIZE.emibTest.inboxPage.emailCommons.reply}
                </label>
                <input
                  id="reply-all-radio"
                  type="radio"
                  name="responseTypeRadio"
                  style={{ ...styles.header.radioPadding, ...styles.header.responseTypeRadio }}
                  onChange={this.onEmailTypeChange}
                  value={EMAIL_TYPE.replyAll}
                  checked={replyAllChecked}
                  className="visually-hidden"
                />
                <label
                  htmlFor="reply-all-radio"
                  style={
                    replyAllChecked
                      ? styles.header.radioTextSelected
                      : styles.header.radioTextUnselected
                  }
                >
                  <FontAwesomeIcon
                    icon={faReplyAll}
                    style={{
                      ...styles.header.responseTypeIcons,
                      ...(replyAllChecked ? styles.header.responseTypeIconsSelected : {})
                    }}
                  />
                  {LOCALIZE.emibTest.inboxPage.emailCommons.replyAll}
                </label>
                <input
                  id="forward-radio"
                  type="radio"
                  name="responseTypeRadio"
                  style={{ ...styles.header.radioPadding, ...styles.header.responseTypeRadio }}
                  onChange={this.onEmailTypeChange}
                  value={EMAIL_TYPE.forward}
                  checked={forwardChecked}
                  className="visually-hidden"
                />
                <label
                  htmlFor="forward-radio"
                  style={
                    forwardChecked
                      ? styles.header.radioTextSelected
                      : styles.header.radioTextUnselected
                  }
                >
                  <FontAwesomeIcon
                    icon={faShareSquare}
                    style={{
                      ...styles.header.responseTypeIcons,
                      ...(forwardChecked ? styles.header.responseTypeIconsSelected : {})
                    }}
                  />
                  {LOCALIZE.emibTest.inboxPage.emailCommons.forward}
                </label>
              </div>
            </fieldset>
          </div>
          <div>
            <div className="font-weight-bold form-group" style={styles.header.toAndCcFieldPadding}>
              <label htmlFor="to-field" style={styles.header.titleStyle}>
                {LOCALIZE.emibTest.inboxPage.emailCommons.to}
              </label>
              <span>
                <ReactResponsiveSelect
                  id="to-field"
                  multiselect
                  name="to"
                  options={options}
                  selectedValues={emailTo}
                  onChange={this.onEmailToChange}
                />
              </span>
            </div>
          </div>
          <div>
            <div className="font-weight-bold form-group" style={styles.header.toAndCcFieldPadding}>
              <label htmlFor="cc-field" style={styles.header.titleStyle}>
                {LOCALIZE.emibTest.inboxPage.emailCommons.cc}
              </label>
              <span>
                <ReactResponsiveSelect
                  id="cc-field"
                  multiselect
                  name="cc"
                  options={options}
                  selectedValues={emailCc}
                  onChange={this.onEmailCcChange}
                />
              </span>
            </div>
          </div>
          <div>
            <div className="font-weight-bold form-group">
              <label htmlFor="your-response-text-area">
                {LOCALIZE.formatString(
                  LOCALIZE.emibTest.inboxPage.addEmailResponse.response,
                  MAX_RESPONSE
                )}
              </label>
              <OverlayTrigger
                trigger="focus"
                placement="right"
                overlay={
                  <Popover id="reasons-for-action-tooltip">
                    <div>
                      <p>{LOCALIZE.emibTest.inboxPage.addEmailResponse.emailResponseTooltip}</p>
                    </div>
                  </Popover>
                }
              >
                <Button
                  aria-label={LOCALIZE.ariaLabel.emailResponseTooltip}
                  style={styles.tooltipButton}
                  variant="link"
                >
                  ?
                </Button>
              </OverlayTrigger>
              <div>
                <textarea
                  id="your-response-text-area"
                  maxLength={MAX_RESPONSE}
                  style={styles.response.textArea}
                  value={emailBody}
                  onChange={this.onEmailBodyChange}
                />
              </div>
              {this.state.emailBody.length >= MAX_RESPONSE && (
                <p
                  class="visually-hidden"
                  aria-live="assertive"
                  role="alert"
                >{`Limit reached. You can only use ${MAX_RESPONSE} characters in this field.`}</p>
              )}
              <div style={styles.textCounter}>
                {this.state.emailBody === undefined ? 0 : this.state.emailBody.length}/
                {MAX_RESPONSE}
              </div>
            </div>
          </div>
          <hr style={styles.hr} />
          <div>
            <div className="font-weight-bold form-group">
              <label htmlFor="reasons-for-action-text-area">
                {LOCALIZE.formatString(
                  LOCALIZE.emibTest.inboxPage.addEmailResponse.reasonsForAction,
                  MAX_REASON
                )}
              </label>
              <OverlayTrigger
                trigger="focus"
                placement="right"
                overlay={
                  <Popover id="reasons-for-action-tooltip">
                    <div>
                      <p>{LOCALIZE.emibTest.inboxPage.addEmailResponse.reasonsForActionTooltip}</p>
                    </div>
                  </Popover>
                }
              >
                <Button
                  aria-label={LOCALIZE.ariaLabel.reasonsForActionTooltip}
                  style={styles.tooltipButton}
                  variant="link"
                >
                  ?
                </Button>
              </OverlayTrigger>
              <div>
                <textarea
                  id="reasons-for-action-text-area"
                  maxLength={MAX_REASON}
                  style={styles.reasonsForAction.textArea}
                  value={reasonsForAction}
                  onChange={this.onReasonsForActionChange}
                />
              </div>
              {this.state.reasonsForAction.length >= MAX_REASON && (
                <p
                  class="visually-hidden"
                  aria-live="assertive"
                  role="alert"
                >{`Limit reached. You can only use ${MAX_REASON} characters in this field.`}</p>
              )}
              <div style={styles.textCounter}>
                {this.state.reasonsForAction === undefined ? 0 : this.state.reasonsForAction.length}
                /{MAX_REASON}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export { EditEmail as UnconnectedEditEmail };

const mapStateToProps = (state, ownProps) => {
  return {
    addressBook: state.emibInbox.addressBook
  };
};

export default connect(
  mapStateToProps,
  null
)(EditEmail);
