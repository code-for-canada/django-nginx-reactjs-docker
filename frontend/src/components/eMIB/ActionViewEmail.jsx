import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";
import LOCALIZE from "../../text_resources";
import EditActionDialog from "./EditActionDialog";
import { ACTION_TYPE, EDIT_MODE, EMAIL_TYPE, actionShape, emailShape } from "./constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteEmail } from "../../modules/EmibInboxRedux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import SystemMessage, { MESSAGE_TYPE } from "../commons/SystemMessage";
import { contactShape } from "./constants";
import { contactNameFromId } from "../../helpers/transformations";

const styles = {
  responseType: {
    description: {
      float: "left",
      margin: "4px 0 0 0"
    },
    icon: {
      color: "white",
      margin: "0 8px",
      padding: 3,
      backgroundColor: "#00565E",
      border: "3px solid #009FAE",
      borderRadius: 4
    },
    attribute: {
      color: "#00565E",
      textDecoration: "underline"
    }
  },
  header: {
    zone: {
      minHeight: 95
    },
    elementHeight: {
      minHeight: 24
    },
    toAndCcTitle: {
      float: "left",
      width: 32,
      height: 32,
      margin: "2px 0 0 0"
    },
    toFieldMargin: {
      margin: "9px 0 12px 0"
    }
  },
  hr: {
    margin: "16px 0 16px 0"
  },
  editButton: {
    float: "right"
  },
  preWrap: {
    whiteSpace: "pre-wrap"
  }
};

class ActionViewEmail extends Component {
  static propTypes = {
    action: actionShape,
    actionId: PropTypes.number.isRequired,
    email: emailShape,
    // optional prop to disable the entire component
    disabled: PropTypes.bool,
    // Props from Redux
    addressBook: PropTypes.arrayOf(contactShape),
    deleteEmail: PropTypes.func
  };

  state = {
    showEmailDialog: false,
    showDeleteConfirmationDialog: false
  };

  showEmailDialog = () => {
    this.setState({ showEmailDialog: true });
  };

  closeEmailDialog = () => {
    this.setState({ showEmailDialog: false });
  };

  showDeleteConfirmationDialog = () => {
    this.setState({ showDeleteConfirmationDialog: true });
  };

  closeDeleteConfirmationDialog = () => {
    this.setState({ showDeleteConfirmationDialog: false });
  };

  // generate a string of contacts and their roles for display purposes
  // (namely in the To/CC fields)
  // contactIdList is a list of ids that need to be looked up in the address book
  // and transformed into a string that will be displayed to the candidate
  // the return is a string in the following format:
  //  "<name 1> (<role 1>), <name 2> (<role 2>), ...""
  generateEmailNameList(contactIdList) {
    let visibleContactNames = [];
    for (let id of contactIdList) {
      visibleContactNames.push(contactNameFromId(this.props.addressBook, id));
    }
    return visibleContactNames.join(", ");
  }

  render() {
    const action = this.props.action;
    const visibleToNames = this.generateEmailNameList(action.emailTo);
    const visibleCcNames = this.generateEmailNameList(action.emailCc);
    return (
      <div aria-label={LOCALIZE.ariaLabel.responseDetails}>
        <div style={styles.header.zone}>
          <div style={styles.header.elementHeight}>
            <h6 style={styles.responseType.description}>
              {LOCALIZE.emibTest.inboxPage.emailResponse.description}
            </h6>
            {action.emailType === EMAIL_TYPE.reply && (
              <>
                <i className="fas fa-reply" style={styles.responseType.icon} />
                <span style={styles.responseType.attribute}>
                  {LOCALIZE.emibTest.inboxPage.emailCommons.reply}
                </span>
              </>
            )}
            {action.emailType === EMAIL_TYPE.replyAll && (
              <>
                <i className="fas fa-reply-all" style={styles.responseType.icon} />
                <span style={styles.responseType.attribute}>
                  {LOCALIZE.emibTest.inboxPage.emailCommons.replyAll}
                </span>
              </>
            )}
            {action.emailType === EMAIL_TYPE.forward && (
              <>
                <i className="fas fa-share-square" style={styles.responseType.icon} />
                <span style={styles.responseType.attribute}>
                  {LOCALIZE.emibTest.inboxPage.emailCommons.forward}
                </span>
              </>
            )}
          </div>
          <div style={{ ...styles.header.toFieldMargin, ...styles.header.elementHeight }}>
            <h6 style={styles.header.toAndCcTitle}>
              {LOCALIZE.emibTest.inboxPage.emailCommons.to}
            </h6>
            <span>{visibleToNames}</span>
          </div>
          <div style={styles.header.elementHeight}>
            <h6 style={styles.header.toAndCcTitle}>
              {LOCALIZE.emibTest.inboxPage.emailCommons.cc}
            </h6>
            <span>{visibleCcNames}</span>
          </div>
        </div>
        <hr style={styles.hr} />
        <div>
          <h6>{LOCALIZE.emibTest.inboxPage.emailResponse.response}</h6>
          <p style={styles.preWrap}>{action.emailBody}</p>
        </div>
        <hr style={styles.hr} />
        <div>
          <h6>{LOCALIZE.emibTest.inboxPage.emailResponse.reasonsForAction}</h6>
          <p style={styles.preWrap}>{action.reasonsForAction}</p>
        </div>
        {!this.props.disabled && (
          <div>
            <hr style={styles.hr} />
            <div aria-label={LOCALIZE.ariaLabel.emailOptions}>
              <button
                id="unit-test-view-email-edit-button"
                className="btn btn-primary"
                style={styles.editButton}
                onClick={this.showEmailDialog}
              >
                {LOCALIZE.emibTest.inboxPage.emailCommons.editButton}
              </button>
              <button
                id="unit-test-view-email-delete-button"
                className="btn btn-danger"
                onClick={this.showDeleteConfirmationDialog}
              >
                {LOCALIZE.emibTest.inboxPage.emailCommons.deleteButton}
              </button>
              <PopupBox
                show={this.state.showDeleteConfirmationDialog}
                handleClose={this.closeDeleteConfirmationDialog}
                title={LOCALIZE.emibTest.inboxPage.deleteResponseConfirmation.title}
                description={
                  <div>
                    <div>
                      <SystemMessage
                        messageType={MESSAGE_TYPE.error}
                        title={
                          LOCALIZE.emibTest.inboxPage.deleteResponseConfirmation.systemMessageTitle
                        }
                        message={
                          LOCALIZE.emibTest.inboxPage.deleteResponseConfirmation
                            .systemMessageDescription
                        }
                      />
                    </div>
                    <div>{LOCALIZE.emibTest.inboxPage.deleteResponseConfirmation.description}</div>
                  </div>
                }
                leftButtonType={BUTTON_TYPE.danger}
                leftButtonTitle={LOCALIZE.emibTest.inboxPage.emailCommons.deleteButton}
                leftButtonAction={() =>
                  this.props.deleteEmail(this.props.email.id, this.props.actionId)
                }
                rightButtonType={BUTTON_TYPE.primary}
                rightButtonTitle={LOCALIZE.commons.returnToTest}
              />
            </div>
            <EditActionDialog
              email={this.props.email}
              showDialog={this.state.showEmailDialog}
              handleClose={this.closeEmailDialog}
              actionType={ACTION_TYPE.email}
              editMode={EDIT_MODE.update}
              action={action}
              actionId={this.props.actionId}
            />
          </div>
        )}
      </div>
    );
  }
}

export { ActionViewEmail as UnconnectedActionViewEmail };

const mapStateToProps = (state, ownProps) => {
  return {
    addressBook: state.emibInbox.addressBook
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteEmail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionViewEmail);
