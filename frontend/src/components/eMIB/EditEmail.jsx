import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import { EMAIL_TYPE, actionShape } from "./constants";
import { transformAddressBook, optionsFromIds } from "../../helpers/transformations";
import { addressBookContactShape } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faReplyAll, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import ReactSuperSelect from "react-super-select";
import "../../css/lib/react-super-select.css";

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
      width: 28,
      height: 32,
      lineHeight: "2.1em",
      paddingRight: 4,
      marginTop: 5,
      marginBottom: 5
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
    emailBody: !this.props.action
      ? ""
      : !this.props.action.emailBody
      ? ""
      : this.props.action.emailBody,
    emailTo: !this.props.action ? [] : this.props.action.emailTo,
    emailCc: !this.props.action ? [] : this.props.action.emailCc,
    reasonsForAction: !this.props.action
      ? ""
      : !this.props.action.reasonsForAction
      ? ""
      : this.props.action.reasonsForAction,
    // Provided by redux
    addressBook: PropTypes.arrayOf(addressBookContactShape)
  };

  onEmailTypeChange = event => {
    const newEmailType = event.target.value;
    this.setState({ emailType: newEmailType });
    this.props.onChange({ ...this.state, emailType: newEmailType });
  };

  onEmailToChange = options => {
    // Convert options to an array of indexes
    options = options || [];
    const idsArray = options.map(option => {
      return option.id;
    });
    this.setState({ emailTo: idsArray });
    this.props.onChange({ ...this.state, emailTo: idsArray });
  };

  onEmailCcChange = options => {
    // onvert options to an array of indexes
    options = options || [];
    const idsArray = options.map(option => {
      return option.id;
    });
    this.setState({ emailCc: idsArray });
    this.props.onChange({ ...this.state, emailCc: idsArray });
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
    let { emailTo, emailCc, emailBody, reasonsForAction } = this.state;
    const replyChecked = this.state.emailType === EMAIL_TYPE.reply;
    const replyAllChecked = this.state.emailType === EMAIL_TYPE.replyAll;
    const forwardChecked = this.state.emailType === EMAIL_TYPE.forward;

    // Get localized to/cc options from the address book.
    const options = transformAddressBook(this.props.addressBook);

    // Convert emailTo and emailCC from array of indexes to options.
    emailTo = optionsFromIds(this.props.addressBook, emailTo);
    emailCc = optionsFromIds(this.props.addressBook, emailCc);
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
          <div className="font-weight-bold" style={styles.header.toAndCcFieldPadding}>
            <label htmlFor="to-field" style={styles.header.titleStyle}>
              {LOCALIZE.emibTest.inboxPage.emailCommons.to}
            </label>
            <ReactSuperSelect
              placeholder="Select from address book"
              controlId="to-field"
              multiple={true}
              name="to"
              initialValue={emailTo}
              dataSource={options}
              onChange={this.onEmailToChange}
              keepOpenOnSelection={true}
              tags={true}
            />
          </div>
          <hr />
          <div className="font-weight-bold" style={styles.header.toAndCcFieldPadding}>
            <label htmlFor="cc-field" style={styles.header.titleStyle}>
              {LOCALIZE.emibTest.inboxPage.emailCommons.cc}
            </label>
            <ReactSuperSelect
              placeholder="Select from address book"
              controlId="cc-field"
              multiple={true}
              name="cc"
              initialValue={emailCc}
              dataSource={options}
              onChange={this.onEmailCcChange}
              keepOpenOnSelection={true}
              tags={true}
            />
          </div>
          <hr />
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
                <p className="visually-hidden" aria-live="assertive" role="alert">
                  {LOCALIZE.formatString(
                    LOCALIZE.emibTest.inboxPage.characterLimitReached,
                    MAX_RESPONSE
                  )}
                </p>
              )}
              <div style={styles.textCounter}>
                {this.state.emailBody === undefined ? 0 : this.state.emailBody.length}/
                {MAX_RESPONSE}
              </div>
            </div>
          </div>
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
                <p className="visually-hidden" aria-live="assertive" role="alert">
                  {LOCALIZE.formatString(
                    LOCALIZE.emibTest.inboxPage.characterLimitReached,
                    MAX_REASON
                  )}
                </p>
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
