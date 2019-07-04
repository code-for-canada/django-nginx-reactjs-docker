import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";

class ConfirmStartTest extends Component {
  static propTypes = {
    showDialog: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    startTest: PropTypes.func.isRequired
  };

  render() {
    //TODO: replace `timeUnlimited` with dynamic real time value to complete the test.
    return (
      <div>
        <PopupBox
          show={this.props.showDialog}
          handleClose={this.props.handleClose}
          title={LOCALIZE.commons.confirmStartTest.aboutToStart}
          description={
            <div>
              <p>
                {LOCALIZE.formatString(
                  LOCALIZE.commons.confirmStartTest.timerWarning,
                  LOCALIZE.commons.confirmStartTest.timeUnlimited
                )}
              </p>
              <p>{LOCALIZE.commons.confirmStartTest.instructionsAccess}</p>
            </div>
          }
          leftButtonType={BUTTON_TYPE.secondary}
          leftButtonTitle={LOCALIZE.commons.cancel}
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.commons.startTest}
          rightButtonAction={this.props.startTest}
        />
      </div>
    );
  }
}
export default ConfirmStartTest;
