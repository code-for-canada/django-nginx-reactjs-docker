import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

export const BUTTON_TYPE = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  danger: "btn btn-danger"
};

export const BUTTON_STATE = {
  disabled: true,
  enabled: false
};

const customStyles = {
  content: {
    maxWidth: 700,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

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
      rightButtonState: PropTypes.string,
      isBackdropStatic: PropTypes.bool,
      isCloseButtonVisible: PropTypes.bool
    };
    // display 'close button' by default
    PopupBox.defaultProps = {
      isCloseButtonVisible: true
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
      <Modal isOpen={show} onRequestClose={handleClose} style={customStyles} contentLabel={title}>
        <h2>{title}</h2>
        <div>{description}</div>
        {leftButtonTitle && leftButtonType && (
          <button className={leftButtonType} onClick={this.leftButtonCloseAndAction}>
            {leftButtonTitle}
          </button>
        )}
        {rightButtonTitle && rightButtonType && (
          <button
            style={{ float: "right" }}
            className={rightButtonType}
            onClick={this.rightButtonCloseAndAction}
          >
            {rightButtonTitle}
          </button>
        )}
      </Modal>
    );
  }
}

export default PopupBox;
