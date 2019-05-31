import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const MESSAGE_TYPE = {
  warning: "warning",
  error: "error"
};

export let CLASS_NAME = {
  alert: "",
  icon: ""
};

export const styles = {
  boxPadding: {
    paddingTop: 0
  },
  logoZone: {
    minWidth: 75
  },
  logo: {
    fontSize: "40px"
  },
  textBox: {
    textAlign: "left",
    paddingLeft: 24,
    paddingRight: 24
  },
  h5: {
    fontWeight: "bold",
    paddingTop: 12,
    paddingBottom: 4
  }
};

class SystemMessage extends Component {
  static propTypes = {
    messageType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  };

  render() {
    const { title, message, messageType } = this.props;
    if (messageType === MESSAGE_TYPE.error) {
      CLASS_NAME.alert = "alert-icon alert-danger";
      CLASS_NAME.icon = faTimesCircle;
    } else {
      CLASS_NAME.alert = "alert-icon alert-warning";
      CLASS_NAME.icon = faExclamationCircle;
    }

    return (
      <div style={styles.boxPadding}>
        <div className={CLASS_NAME.alert} role="alert">
          <div className="icon" aria-hidden="true" style={styles.logoZone}>
            <FontAwesomeIcon icon={CLASS_NAME.icon} style={styles.logo} />
          </div>
          <div style={styles.textBox}>
            <h5 style={styles.h5}>{title}</h5>
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SystemMessage;
