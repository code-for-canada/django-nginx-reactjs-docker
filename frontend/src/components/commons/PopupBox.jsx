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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
};

const styles = {
  rightButton: {
    float: "right"
  },
  description: {
    padding: "16px 0px"
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
      isBackdropStatic: PropTypes.bool
    };
    // click away or esc to close
    PopupBox.defaultProps = {
      isBackdropStatic: false
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
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel={title}
        shouldCloseOnOverlayClick={!this.props.isBackdropStatic}
        aria={{
          labelledby: "heading",
          describedby: "full_description"
        }}
      >
        <h2 id="heading">{title}</h2>
        <div id="full_description" style={styles.description}>
          {description}
        </div>
        {leftButtonTitle && leftButtonType && (
          <button
            className={leftButtonType}
            onClick={this.leftButtonCloseAndAction}
            disabled={leftButtonState}
          >
            {leftButtonTitle}
          </button>
        )}
        {rightButtonTitle && rightButtonType && (
          <button
            style={styles.rightButton}
            className={rightButtonType}
            onClick={this.rightButtonCloseAndAction}
            disabled={rightButtonState}
          >
            {rightButtonTitle}
          </button>
        )}
      </Modal>
    );
  }
}

Modal.setAppElement("#root");

export default PopupBox;
