import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const styles = {
  container: {
    width: 300
  },
  timeContainer: {
    float: "left",
    border: "2px solid #00565e",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: 38,
    width: 100,
    padding: 4,
    fontWeight: "bold",
    color: "#00565e",
    fontSize: 18,
    backgroundColor: "#FFFFFF"
  },
  toggleButton: {
    float: "left",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: 38
  },
  label: {
    paddingLeft: 5
  },
  timeOut: {
    color: "#D3080C"
  }
};

class Timer extends Component {
  state = {
    hidden: false
  };

  toggleVisibility = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    const { hidden } = this.state;

    //TODO replace with actual timer calculation
    const isTimeAlmostOut = false;

    return (
      <div style={styles.container}>
        <div style={styles.timeContainer}>
          {hidden && (
            <FontAwesomeIcon style={isTimeAlmostOut ? styles.timeOut : {}} icon={faClock} />
          )}
          {!hidden && (
            <div style={isTimeAlmostOut ? styles.timeOut : {}}>
              <span className="visually-hidden">Time left in test session:</span>
              <span>00:00:00</span>
            </div>
          )}
        </div>
        <Button style={styles.toggleButton} onClick={this.toggleVisibility}>
          <FontAwesomeIcon icon={hidden ? faPlusCircle : faMinusCircle} />
          <span style={styles.label}>
            {hidden
              ? LOCALIZE.emibTest.testFooter.timer.showTimer
              : LOCALIZE.emibTest.testFooter.timer.hideTimer}
          </span>
        </Button>
      </div>
    );
  }
}

export default Timer;
