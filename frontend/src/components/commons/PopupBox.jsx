import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export const BUTTON_TYPE = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  danger: "btn btn-danger"
};

export const BUTTON_STATE = {
  disabled: true,
  enabled: false
};

const styles = {
  boxshape: {
    borderWidth: "1px 1px 0 1px",
    borderStyle: "solid",
    borderColor: "#00565e",
    borderRadius: "5px 5px 5px 5px"
  },
  boxContent: {
    padding: 12
  },
  modelTitle: {
    fontSize: "28px",
    margin: 0
  },
  buttonsZone: {
    width: "100%"
  },
  leftBtnLocation: {
    float: "left"
  },
  rightBtnLocation: {
    float: "right"
  },
  buttonSize: {
    minWidth: 125
  }
};

/*
To make the buttons appear, you need to specify the button type, the button title and if needed the button action (button action is not mandatory).
By default, all buttons close the popup box, even if no action has been assigned.
This component can provide a popup box that contains 0 to 2 buttons: none, leftButton and rightButton
Example with one button (1 action): <PopupBox rightButtonType={BUTTON_TYPE.secondary} rightButtonTitle={"Ok"} rightButtonAction={() => someFunction()} />
Example with two buttons (no action): <PopupBox rightButtonType={BUTTON_TYPE.primary} rightButtonTitle={"Cancel"} leftButtonType={BUTTON_TYPE.secondary} leftButtonTitle={"Ok"} />
*/
class PopupBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.PropTypes = {
      show: PropTypes.bool,
      handleClose: PropTypes.func,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      leftButtonType: PropTypes.string,
      leftButtonTitle: PropTypes.string,
      leftButtonState: PropTypes.string,
      leftButtonAction: PropTypes.func,
      rightButtonType: PropTypes.string,
      rightButtonTitle: PropTypes.string,
      rightButtonAction: PropTypes.func,
      rightButtonState: PropTypes.string
    };
  }

  leftButtonCloseAndAction = () => {
    if (this.props.leftButtonAction) {
      this.props.leftButtonAction();
    }
    this.props.handleClose();
  };

  rightButtonCloseAndAction = () => {
    if (this.props.rightButtonAction) {
      this.props.rightButtonAction();
    }
    this.props.handleClose();
  };

  render() {
    const {
      show,
      handleClose,
      title,
      description,
      leftButtonType,
      leftButtonTitle,
      leftButtonState,
      rightButtonType,
      rightButtonTitle,
      rightButtonState
    } = this.props;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        autoFocus={true}
        enforceFocus={true}
        aria-hidden={false}
      >
        <div style={styles.boxContent}>
          <Modal.Header closeButton style={styles.modalHeader}>
            <Modal.Title id="unit-test-popup-box-title" style={styles.modelTitle}>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="unit-test-popup-box-description">{description}</Modal.Body>
          <Modal.Footer>
            <div style={styles.buttonsZone}>
              {leftButtonType && leftButtonTitle && (
                <div style={styles.leftBtnLocation}>
                  <button
                    disabled={leftButtonState}
                    id="unit-test-left-btn-title"
                    type="button"
                    className={leftButtonType}
                    style={styles.buttonSize}
                    onClick={this.leftButtonCloseAndAction}
                  >
                    {leftButtonTitle}
                  </button>
                </div>
              )}

              {rightButtonType && rightButtonTitle && (
                <div style={styles.rightBtnLocation}>
                  <button
                    disabled={rightButtonState}
                    id="unit-test-right-btn-title"
                    type="button"
                    className={rightButtonType}
                    style={styles.buttonSize}
                    onClick={this.rightButtonCloseAndAction}
                  >
                    {rightButtonTitle}
                  </button>
                </div>
              )}
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

export default PopupBox;
