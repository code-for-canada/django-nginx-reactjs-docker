import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { Navbar } from "react-bootstrap";

const styles = {
  footer: {
    borderTop: "1px solid #96a8b2",
    zIndex: -1,
    backgroundColor: "#D5DEE0"
  },
  content: {
    width: 1400,
    margin: "0 auto",
    padding: "0px 20px"
  },
  button: {
    float: "right"
  }
};

class TestFooter extends Component {
  static propTypes = {
    startTest: PropTypes.func,
    submitTest: PropTypes.func,
    testIsStarted: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <Navbar fixed="bottom" style={styles.footer}>
          <div style={styles.content}>
            {!this.props.testIsStarted && (
              <div style={styles.button}>
                <button
                  id="unit-test-start-btn"
                  type="button"
                  className="btn btn-success"
                  onClick={this.props.startTest}
                >
                  {LOCALIZE.commons.startTest}
                </button>
              </div>
            )}
            {this.props.testIsStarted && (
              <div style={styles.button}>
                <button
                  id="unit-test-submit-btn"
                  type="button"
                  className="btn btn-success"
                  onClick={this.props.submitTest}
                >
                  {LOCALIZE.commons.submitTestButton}
                </button>
              </div>
            )}
          </div>
        </Navbar>
      </div>
    );
  }
}

export default TestFooter;
