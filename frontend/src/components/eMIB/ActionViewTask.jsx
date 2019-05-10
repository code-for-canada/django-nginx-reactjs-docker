import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";
import LOCALIZE from "../../text_resources";
import EditActionDialog from "./EditActionDialog";
import { ACTION_TYPE, EDIT_MODE, actionShape, emailShape } from "./constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteTask } from "../../modules/EmibInboxRedux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import SystemMessage, { MESSAGE_TYPE } from "../commons/SystemMessage";

const styles = {
  taskStyle: {
    marginTop: 18
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

class ActionViewTask extends Component {
  static propTypes = {
    action: actionShape,
    actionId: PropTypes.number.isRequired,
    email: emailShape.isRequired,
    // optional prop to disable the entire component
    disabled: PropTypes.bool,
    // Props from Redux
    deleteTask: PropTypes.func
  };

  state = {
    showTaskDialog: false,
    showDeleteConfirmationDialog: false
  };

  showTaskDialog = () => {
    this.setState({ showTaskDialog: true });
  };

  closeTaskDialog = () => {
    this.setState({ showTaskDialog: false });
  };

  showDeleteConfirmationDialog = () => {
    this.setState({ showDeleteConfirmationDialog: true });
  };

  closeDeleteConfirmationDialog = () => {
    this.setState({ showDeleteConfirmationDialog: false });
  };

  render() {
    const action = this.props.action;
    return (
      <div aria-label={LOCALIZE.ariaLabel.taskDetails}>
        <div>
          <h6 style={styles.taskStyle}>{LOCALIZE.emibTest.inboxPage.taskContent.task}</h6>
          <p style={styles.preWrap}>{action.task}</p>
        </div>
        <hr style={styles.hr} />
        <div>
          <h6>{LOCALIZE.emibTest.inboxPage.emailResponse.reasonsForAction}</h6>
          <p style={styles.preWrap}>{action.reasonsForAction}</p>
        </div>
        {!this.props.disabled && (
          <div>
            <hr style={styles.hr} />
            <div aria-label={LOCALIZE.ariaLabel.taskOptions}>
              <button
                id="unit-test-view-task-edit-button"
                className="btn btn-primary"
                style={styles.editButton}
                onClick={this.showTaskDialog}
              >
                {LOCALIZE.emibTest.inboxPage.emailCommons.editButton}
              </button>
              <button
                id="unit-test-view-task-delete-button"
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
                  this.props.deleteTask(this.props.email.id, this.props.actionId)
                }
                rightButtonType={BUTTON_TYPE.primary}
                rightButtonTitle={LOCALIZE.commons.returnToTest}
              />
            </div>
            <div>
              <EditActionDialog
                email={this.props.email}
                showDialog={this.state.showTaskDialog}
                handleClose={this.closeTaskDialog}
                actionType={ACTION_TYPE.task}
                editMode={EDIT_MODE.update}
                action={action}
                actionId={this.props.actionId}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export { ActionViewTask as UnconnectedActionViewTask };
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteTask
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(ActionViewTask);
