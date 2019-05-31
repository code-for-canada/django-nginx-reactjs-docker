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
class SystemCheck extends React.PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
    isPassing: PropTypes.bool.isRequired,
    currentSettingsDetails: PropTypes.string.isRequired
  };

  render() {
    const { description, isPassing, currentSettingsDetails } = this.props;

    return (
      <tr>
        <td>{description}</td>
        <td>
          {isPassing && (
            <div style={styles.passing}>
              <FontAwesomeIcon style={styles.glyphicon} icon={faCheckCircle} />
              <span> {LOCALIZE.commons.passStatus}</span>
              <span style={styles.currentSpecs}> {currentSettingsDetails}</span>
            </div>
          )}
          {!isPassing && (
            <div style={styles.failing}>
              <FontAwesomeIcon style={styles.glyphicon} icon={faTimesCircle} />
              <span> {LOCALIZE.commons.failStatus}</span>
              <span style={styles.currentSpecs}> {currentSettingsDetails}</span>
            </div>
          )}
        </td>
      </tr>
    );
  }
}

export default SystemCheck;
