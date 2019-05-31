import React from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const styles = {
  passing: {
    color: "green"
  },
  failing: {
    color: "red"
  }
};

// This component is intended for internal use only and does not use styles or
// components of public facing CAT system.
class StatusCheck extends React.PureComponent {
  static propTypes = {
    isPassing: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    const { description, isPassing } = this.props;

    return (
      <tr>
        <td>{description}</td>
        <td>
          {isPassing && (
            <div style={styles.passing}>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> {LOCALIZE.commons.passStatus}</span>
            </div>
          )}
          {!isPassing && (
            <div style={styles.failing}>
              <FontAwesomeIcon icon={faTimesCircle} />
              <span> {LOCALIZE.commons.failStatus}</span>
            </div>
          )}
        </td>
      </tr>
    );
  }
}

export default StatusCheck;
