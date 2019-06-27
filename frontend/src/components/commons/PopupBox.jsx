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
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F5FAFB",
    padding: 0
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
};

const styles = {
  contentPadding: {
    padding: "10px 15px",
    overflow: "auto",
    maxHeight: "calc(100vh - 300px)",
    borderBottom: "1px solid #CECECE",
    borderTop: "1px solid #CECECE"
  },
  headerPadding: {
    padding: "15px 15px 5px 15px"
  },
  footerPadding: {
    padding: 15,
    height: 70
  },
  rightButton: {
    float: "right"
  },
  hr: {
    margin: 0
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

    // If a root node exists, the app is being served, otherwise it's a unit test.
    let ariaHideApp = true;
    if (document.getElementById("#root")) {
      Modal.setAppElement("#root");
    } else {
      // Unit tests do not consider outside of the dialog.
      ariaHideApp = false;
    }
    return (
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel={title}
        shouldCloseOnOverlayClick={!this.props.isBackdropStatic}
        aria={{
          labelledby: "modal-heading",
          describedby: "modal-description"
        }}
        ariaHideApp={ariaHideApp}
      >
        <div style={styles.headerPadding}>
          <h2 id="modal-heading">{title}</h2>
        </div>

        <div id="modal-description" style={styles.contentPadding}>
          {description}
        </div>

        <div style={styles.footerPadding}>
          {leftButtonTitle && leftButtonType && (
            <button
              className={leftButtonType}
              onClick={this.leftButtonCloseAndAction}
              disabled={leftButtonState}
              id="unit-test-left-btn"
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
              id="unit-test-right-btn"
            >
              {rightButtonTitle}
            </button>
          )}
        </div>
      </Modal>
    );
  }
}

export default PopupBox;
