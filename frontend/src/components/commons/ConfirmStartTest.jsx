import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { getTotalTestTime } from "../../modules/LoadTestContentRedux";

class ConfirmStartTest extends Component {
  static propTypes = {
    showDialog: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    startTest: PropTypes.func.isRequired,
    // Provided by Redux
    testTimeInMinutes: PropTypes.number
  };

  render() {
    const timePhrase = this.props.testTimeInMinutes
      ? LOCALIZE.formatString(
          LOCALIZE.commons.confirmStartTest.numberMinutes,
          this.props.testTimeInMinutes
        )
      : LOCALIZE.commons.confirmStartTest.timeUnlimited;
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
                  <b>{timePhrase}</b>
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

const mapStateToProps = (state, ownProps) => {
  return {
    testTimeInMinutes: getTotalTestTime(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(ConfirmStartTest);
