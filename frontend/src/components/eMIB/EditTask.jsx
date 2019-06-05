import React, { Component } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import LOCALIZE from "../../text_resources";
import { actionShape } from "./constants";
import "../../css/inbox.css";

// These two consts limit the number of characters
// that can be entered into two text areas
// and are used to display <x>/<MAX>
// under the text areas
const MAX_TASK = "650";
const MAX_REASON = "650";

const styles = {
  tooltipButton: {
    padding: 0
  },
  header: {
    color: "#00565E",
    paddingTop: 12
  },
  textCounter: {
    width: "100%",
    textAlign: "right",
    paddingRight: 12
  },
  hrOne: {
    margin: "12px 12px 12px 0",
    borderColor: "#00565E"
  },
  hrTwo: {
    margin: "12px 12px 12px 0"
  },
  tasks: {
    title: {
      float: "left",
      marginRight: 6
    },
    icon: {
      color: "#00565E",
      marginTop: "4px",
      width: 15,
      cursor: "pointer"
    },
    textArea: {
      padding: "6px 12px",
      border: "1px solid #00565E",
      borderRadius: 4,
      width: "100%",
      height: 125,
      resize: "none"
    }
  },
  reasonsForAction: {
    title: {
      float: "left",
      marginRight: 6
    },
    icon: {
      color: "#00565E",
      marginTop: "4px",
      cursor: "pointer"
    },
    textArea: {
      padding: "6px 12px",
      border: "1px solid #00565E",
      borderRadius: 4,
      width: "100%",
      height: 100,
      resize: "none"
    }
  }
};

class EditTask extends Component {
  state = {
    task: !this.props.action ? "" : this.props.action.task,
    reasonsForAction: !this.props.action ? "" : this.props.action.reasonsForAction
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    action: actionShape
  };

  onTaskContentChange = event => {
    const newTaskContent = event.target.value;
    this.setState({ task: newTaskContent });
    this.props.onChange({ ...this.state, task: newTaskContent });
  };

  onReasonsForActionChange = event => {
    const newReasonForAction = event.target.value;
    this.setState({ reasonsForAction: newReasonForAction });
    this.props.onChange({ ...this.state, reasonsForAction: newReasonForAction });
  };

  render() {
    const { task, reasonsForAction } = this.state;

    return (
      <div style={styles.container}>
        <form>
          <hr style={styles.hrOne} />
          <div>
            <div className="font-weight-bold form-group">
              <label htmlFor="your-tasks-text-area" style={styles.tasks.title}>
                {LOCALIZE.emibTest.inboxPage.addEmailTask.task}
              </label>
              <OverlayTrigger
                trigger="focus"
                placement="right"
                overlay={
                  <Popover>
                    <div>
                      <p>{LOCALIZE.emibTest.inboxPage.taskContent.taskTooltipPart1}</p>
                      <p>{LOCALIZE.emibTest.inboxPage.taskContent.taskTooltipPart2}</p>
                    </div>
                  </Popover>
                }
              >
                <Button
                  aria-label={LOCALIZE.ariaLabel.taskTooltip}
                  style={styles.tooltipButton}
                  variant="link"
                >
                  ?
                </Button>
              </OverlayTrigger>
              <div>
                <textarea
                  id="your-tasks-text-area"
                  maxLength={MAX_TASK}
                  style={styles.tasks.textArea}
                  value={task}
                  onChange={this.onTaskContentChange}
                />
              </div>
              <div style={styles.textCounter} id="unit-test-task-response">
                {this.state.task === undefined ? 0 : this.state.task.length}/{MAX_TASK}
              </div>
            </div>
          </div>
          <hr style={styles.hrTwo} />
          <div>
            <div className="font-weight-bold form-group">
              <label htmlFor="reasons-for-action-text-area" style={styles.reasonsForAction.title}>
                {LOCALIZE.emibTest.inboxPage.addEmailTask.reasonsForAction}
              </label>
              <OverlayTrigger
                trigger="focus"
                placement="right"
                overlay={
                  <Popover id="reasons-for-action-tooltip">
                    <div>
                      <p>{LOCALIZE.emibTest.inboxPage.taskContent.reasonsForActionTooltip}</p>
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
              <div style={styles.textCounter} id="unit-test-task-rfa">
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
export default EditTask;
