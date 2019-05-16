import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LOCALIZE from "../../text_resources";
import EditEmail from "./EditEmail";
import EditTask from "./EditTask";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import SystemMessage, { MESSAGE_TYPE } from "../commons/SystemMessage";
import { ACTION_TYPE, EDIT_MODE, actionShape, emailShape } from "./constants";
import EmailContent from "./EmailContent";
import {
  addEmail,
  addTask,
  updateEmail,
  updateTask,
  readEmail
} from "../../modules/EmibInboxRedux";
import isEmailFormEmpty, {
  isTaskFormEmpty,
  isTaskFormEdited,
  isEmailFormEdited
} from "../../helpers/editActionDialogHelper";
import Modal from "react-modal";

const customStyles = {
  content: {
    maxWidth: 900,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const styles = {
  container: {
    maxHeight: "calc(100vh - 300px)",
    overflow: "auto",
    width: 700,
    paddingBottom: 12
  },
  originalEmail: {
    padding: 12,
    marginRight: 12,
    border: "1px #00565E solid",
    borderRadius: 4
  },
  icon: {
    float: "left",
    marginTop: 14,
    marginRight: 8,
    fontSize: 24
  }
};

class EditActionDialog extends Component {
  static propTypes = {
    email: emailShape,
    showDialog: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actionType: PropTypes.oneOf(Object.keys(ACTION_TYPE)).isRequired,
    editMode: PropTypes.oneOf(Object.keys(EDIT_MODE)).isRequired,
    // Provided from Redux.
    addEmail: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    readEmail: PropTypes.func.isRequired,
    // Only needed when updating an existing one
    action: actionShape,
    actionId: PropTypes.number
  };

  state = {
    action: { ...this.props.action },
    showCancelConfirmationDialog: false
  };

  handleSave = () => {
    this.props.handleClose();
    if (this.props.actionType === ACTION_TYPE.email && this.props.editMode === EDIT_MODE.create) {
      this.props.addEmail(this.props.email.id, this.state.action);
      this.props.readEmail(this.props.email.id);
    } else if (
      this.props.actionType === ACTION_TYPE.task &&
      this.props.editMode === EDIT_MODE.create
    ) {
      this.props.addTask(this.props.email.id, this.state.action);
      this.props.readEmail(this.props.email.id);
    } else if (
      this.props.actionType === ACTION_TYPE.email &&
      this.props.editMode === EDIT_MODE.update
    ) {
      this.props.updateEmail(this.props.email.id, this.props.actionId, this.state.action);
    } else if (
      this.props.actionType === ACTION_TYPE.task &&
      this.props.editMode === EDIT_MODE.update
    ) {
      this.props.updateTask(this.props.email.id, this.props.actionId, this.state.action);
    }
    this.setState({ action: {} });
  };

  // updatedAction is the PropType shape actionShape and represents a single action a candidate takes on an email
  editAction = updatedAction => {
    this.setState({ action: updatedAction });
  };

  /* 
  this handles the display of the cancel confirmation message: Are you sure you want to cancel this response?
  when creating a new email/task and trying to exit the form, if it's empty, don't display any warning message
  when creating a new email/task and trying to exit the form, if there is any change to at lest one of the fields, display the cancel warning message
  when editing an email/task and trying to exit the form, if there is no changes, don't display any warning messsage
  when editing an email/task and trying to exit the form, if there is any change to at lest one of the fields, display the cancel warning message
  */
  handleCancelConfirmationDisplay = () => {
    const { actionType, editMode, handleClose, action } = this.props;

    // ======================================== VARIABLES ========================================
    // setting initial email and task forms variables to empty strings
    let {
      initialEmailType,
      initialEmailTo,
      initialEmailCc,
      initialEmailResponse,
      initialTaskContent,
      initialReasonsForActionContent
    } = "";

    // current email form variables
    const emailType = this.state.action.emailType;
    const emailTo = this.state.action.emailTo;
    const emailCc = this.state.action.emailCc;
    const emailResponse = this.state.action.emailBody;

    // current task form variables
    const taskContent = this.state.action.task;
    const reasonsForActionContent = this.state.action.reasonsForAction;
    // =============================================================================================

    // no content has been added in the concerned form (Email Response Form or Task Form)
    if (
      // when creating a new task and the form is empty
      (actionType === ACTION_TYPE.task &&
        editMode === EDIT_MODE.create &&
        // getting a 'true' if the form is empty
        isTaskFormEmpty(taskContent, reasonsForActionContent)) ||
      // when creating a new email and the form is empty
      (actionType === ACTION_TYPE.email &&
        editMode === EDIT_MODE.create &&
        // getting a 'true' if the form is empty
        isEmailFormEmpty(emailType, emailTo, emailCc, emailResponse, reasonsForActionContent))
    ) {
      // close the dialog without any confirmation message
      handleClose();

      // content may have changed
    } else {
      // get initial variables if we are in edit mode
      if (editMode === EDIT_MODE.update) {
        initialEmailType = action.emailType;
        initialEmailTo = action.emailTo;
        initialEmailCc = action.emailCc;
        initialEmailResponse = action.emailBody;
        initialReasonsForActionContent = action.reasonsForAction;
        initialTaskContent = action.task;
      }
      // verify if the email form has been edited
      if (actionType === ACTION_TYPE.email) {
        // returns true if at least one of the fields has been edited
        const emailEdited = isEmailFormEdited(
          initialEmailType,
          emailType,
          initialEmailTo,
          emailTo,
          initialEmailCc,
          emailCc,
          initialEmailResponse,
          emailResponse,
          initialReasonsForActionContent,
          reasonsForActionContent
        );
        // there are changes in at least one of the fields of the email form
        if (emailEdited) {
          // display the cancel confirmation message
          this.setState({ showCancelConfirmationDialog: true });
        } else {
          // close the dialog without any confirmation message
          handleClose();
        }

        // verify if the task form has been edited
      } else if (actionType === ACTION_TYPE.task) {
        // returns true if at least one of the fields has been edited
        const taskEdited = isTaskFormEdited(
          initialTaskContent,
          taskContent,
          initialReasonsForActionContent,
          reasonsForActionContent
        );
        // there are changes in at least one of the fields of the task form
        if (taskEdited) {
          // display the cancel confirmation message
          this.setState({ showCancelConfirmationDialog: true });
        } else {
          // close the dialog without any confirmation message
          handleClose();
        }
      }
    }
  };

  closeCancelConfirmationDialog = () => {
    this.setState({ showCancelConfirmationDialog: false });
  };

  // this function is called when 'Cancel response' button is selected from the cancel confirmation message dialog
  handleClose = () => {
    // resetting all current form variables at their original values from the props
    this.setState({ action: { ...this.props.action } });
    // closing response action dialog
    this.props.handleClose();
  };

  render() {
    const { showDialog, actionType, editMode } = this.props;
    return (
      <div>
        <Modal
          isOpen={showDialog}
          onRequestClose={this.handleCancelConfirmationDisplay}
          style={customStyles}
        >
          <div>
            <div>
              {actionType === ACTION_TYPE.email && (
                <div>
                  <i style={styles.icon} className="fas fa-envelope" />
                  <h2>
                    {editMode === EDIT_MODE.create &&
                      LOCALIZE.emibTest.inboxPage.editActionDialog.addEmail}
                    {editMode === EDIT_MODE.update &&
                      LOCALIZE.emibTest.inboxPage.editActionDialog.editEmail}
                  </h2>
                </div>
              )}
              {actionType === ACTION_TYPE.task && (
                <div>
                  <i style={styles.icon} className="fas fa-tasks" />
                  <h2>
                    {editMode === EDIT_MODE.create &&
                      LOCALIZE.emibTest.inboxPage.editActionDialog.addTask}
                    {editMode === EDIT_MODE.update &&
                      LOCALIZE.emibTest.inboxPage.editActionDialog.editTask}
                  </h2>
                </div>
              )}
            </div>
            <div style={styles.container}>
              <h4>{LOCALIZE.emibTest.inboxPage.emailCommons.yourResponse}</h4>
              {actionType === ACTION_TYPE.email && (
                <EditEmail
                  onChange={this.editAction}
                  action={editMode === EDIT_MODE.update ? this.props.action : null}
                />
              )}
              {actionType === ACTION_TYPE.task && (
                <EditTask
                  emailNumber={this.props.email.id}
                  emailSubject={this.props.email.subject}
                  onChange={this.editAction}
                  action={editMode === EDIT_MODE.update ? this.props.action : null}
                />
              )}
              <h4>{LOCALIZE.emibTest.inboxPage.emailCommons.originalEmail}</h4>
              <div style={styles.originalEmail}>
                <EmailContent email={this.props.email} />
              </div>
            </div>
            <div style={{ paddingTop: 10 }}>
              <button className={"btn btn-danger"} onClick={this.handleClose}>
                Cancel
              </button>
              <button
                style={{ float: "right" }}
                id="unit-test-email-response-button"
                type="button"
                className="btn btn-primary"
                onClick={this.handleSave}
              >
                {LOCALIZE.emibTest.inboxPage.editActionDialog.save}
              </button>
            </div>
          </div>
        </Modal>
        {this.state.showCancelConfirmationDialog && (
          <PopupBox
            show={this.state.showCancelConfirmationDialog}
            handleClose={this.closeCancelConfirmationDialog}
            title={LOCALIZE.emibTest.inboxPage.cancelResponseConfirmation.title}
            description={
              <div>
                <div>
                  <SystemMessage
                    messageType={MESSAGE_TYPE.error}
                    title={
                      LOCALIZE.emibTest.inboxPage.cancelResponseConfirmation.systemMessageTitle
                    }
                    message={
                      LOCALIZE.emibTest.inboxPage.cancelResponseConfirmation
                        .systemMessageDescription
                    }
                  />
                </div>
                <div>{LOCALIZE.emibTest.inboxPage.cancelResponseConfirmation.description}</div>
              </div>
            }
            leftButtonType={BUTTON_TYPE.danger}
            leftButtonTitle={LOCALIZE.commons.cancelResponse}
            leftButtonAction={this.handleClose}
            rightButtonType={BUTTON_TYPE.primary}
            rightButtonTitle={LOCALIZE.commons.returnToResponse}
          />
        )}
      </div>
    );
  }
}

export { EditActionDialog as UnconnectedEditActionDialog };

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addEmail,
      addTask,
      updateEmail,
      updateTask,
      readEmail
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(EditActionDialog);
