import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import PopupBox, { BUTTON_TYPE, BUTTON_STATE } from "../commons/PopupBox";
import SystemMessage, { MESSAGE_TYPE } from "../commons/SystemMessage";
import LOCALIZE from "../../text_resources";
import { deactivateTest } from "../../modules/TestStatusRedux";

const styles = {
  button: {
    marginRight: 15
  },
  hr: {
    width: "100%",
    borderTop: "2px solid #96a8b2",
    margin: "16px 0 16px 0"
  },
  checkboxZone: {
    paddingTop: 8
  },
  startTestBtn: {
    textAlign: "center",
    marginTop: 32
  }
};

const quitConditions = () => {
  return [
    { text: LOCALIZE.emibTest.testFooter.quitTestPopupBox.checkboxOne, checked: false },
    { text: LOCALIZE.emibTest.testFooter.quitTestPopupBox.checkboxTwo, checked: false },
    { text: LOCALIZE.emibTest.testFooter.quitTestPopupBox.checkboxThree, checked: false }
  ];
};

class QuitTest extends Component {
  static propTypes = {
    // Provided by Redux
    deactivateTest: PropTypes.func.isRequired,
    isTestActive: PropTypes.bool
  };

  state = {
    showQuitPopup: false,
    quitConditions: quitConditions()
  };

  closePopup = () => {
    this.setState({ showQuitPopup: false });
    //reset all checkbox states on close
    this.resetCheckboxStates();
  };

  openQuitPopup = () => {
    this.setState({ showQuitPopup: true });
  };

  resetCheckboxStates = () => {
    this.setState({ quitConditions: quitConditions() });
  };

  toggleCheckbox = id => {
    let updatedQuitConditions = Array.from(this.state.quitConditions);
    updatedQuitConditions[id].checked = !updatedQuitConditions[id].checked;
    this.setState({ quitConditions: updatedQuitConditions });
  };

  isChecked = currentCheckbox => {
    return currentCheckbox.checked;
  };

  render() {
    const { quitConditions } = this.state;
    const allChecked = quitConditions.every(this.isChecked);

    const submitButtonState = allChecked ? BUTTON_STATE.enabled : BUTTON_STATE.disabled;
    return (
      <div>
        {this.props.isTestActive && (
          <div>
            <Button
              style={styles.button}
              variant="outline-light"
              onClick={this.openQuitPopup}
              aria-label={LOCALIZE.emibTest.testFooter.quitTestPopupBox.title}
            >
              <i className="fas fa-eject" />
            </Button>
            <PopupBox
              show={this.state.showQuitPopup}
              handleClose={this.closePopup}
              title={LOCALIZE.emibTest.testFooter.quitTestPopupBox.title}
              description={
                <div>
                  <div>
                    <SystemMessage
                      messageType={MESSAGE_TYPE.error}
                      title={LOCALIZE.emibTest.testFooter.quitTestPopupBox.warning.title}
                      message={LOCALIZE.emibTest.testFooter.quitTestPopupBox.warning.message}
                    />
                  </div>
                  <p className="font-weight-bold">
                    {LOCALIZE.emibTest.testFooter.quitTestPopupBox.descriptionPart1}
                  </p>
                  <div>
                    {this.state.quitConditions.map((condition, id) => {
                      return (
                        <div
                          key={id}
                          className="custom-control custom-checkbox"
                          style={styles.checkboxZone}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={id}
                            checked={condition.checked}
                            onChange={() => this.toggleCheckbox(id)}
                          />
                          <label className="custom-control-label" htmlFor={id}>
                            {condition.text}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <hr style={styles.hr} />
                  <p className="font-weight-bold">
                    {LOCALIZE.emibTest.testFooter.quitTestPopupBox.descriptionPart2}
                  </p>
                  <p className="font-weight-bold">
                    {LOCALIZE.emibTest.testFooter.quitTestPopupBox.descriptionPart3}
                  </p>
                </div>
              }
              leftButtonType={BUTTON_TYPE.danger}
              leftButtonTitle={LOCALIZE.commons.quitTest}
              leftButtonAction={this.props.deactivateTest}
              leftButtonState={submitButtonState}
              rightButtonType={BUTTON_TYPE.primary}
              rightButtonTitle={LOCALIZE.commons.returnToTest}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isTestActive: state.testStatus.isTestActive
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deactivateTest
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuitTest);
