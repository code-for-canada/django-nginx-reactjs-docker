import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { Navbar, Nav } from "react-bootstrap";

const styles = {
  footer: {
    borderTop: "1px solid #96a8b2"
  }
};

class TestFooter extends Component {
  static propTypes = {
    startTest: PropTypes.func,
    submitTest: PropTypes.func,
    quitTest: PropTypes.func,
    testIsStarted: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <Navbar bg="light" fixed="bottom" style={styles.footer}>
          <Nav className="mr-auto">
            {this.props.testIsStarted && (
              <Navbar.Text>
                <button
                  id="unit-test-quit-btn"
                  type="button"
                  className="btn btn-danger"
                  onClick={this.props.quitTest}
                >
                  {LOCALIZE.commons.quitTest}
                </button>
              </Navbar.Text>
            )}
          </Nav>
          {!this.props.testIsStarted && (
            <Navbar.Text className="justify-content-end">
              <button
                id="unit-test-start-btn"
                type="button"
                className="btn btn-primary"
                onClick={this.props.startTest}
              >
                {LOCALIZE.commons.startTest}
              </button>
            </Navbar.Text>
          )}
          {this.props.testIsStarted && (
            <Navbar.Text className="justify-content-end">
              <button
                id="unit-test-submit-btn"
                type="button"
                className="btn btn-primary"
                onClick={this.props.submitTest}
              >
                {LOCALIZE.commons.submitTestButton}
              </button>
            </Navbar.Text>
          )}
        </Navbar>
      </div>
    );
  }
}

export default TestFooter;
