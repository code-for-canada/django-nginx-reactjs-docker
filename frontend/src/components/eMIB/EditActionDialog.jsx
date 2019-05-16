import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LOCALIZE from "../../text_resources";
import EditEmail from "./EditEmail";
import EditTask from "./EditTask";
import { ACTION_TYPE, EDIT_MODE, actionShape, emailShape } from "./constants";
import EmailContent from "./EmailContent";
import {
  addEmail,
  addTask,
  updateEmail,
  updateTask,
  readEmail
} from "../../modules/EmibInboxRedux";
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
      <Modal isOpen={showDialog} onRequestClose={this.handleClose} style={customStyles}>
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
