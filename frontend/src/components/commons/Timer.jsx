import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
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
    padding: 6,
    fontWeight: "bold",
    color: "#00565e"
  },
  toggleButton: {
    float: "left",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: 38
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
    return (
      <div style={styles.container}>
        <div style={styles.timeContainer}>
          {hidden && <FontAwesomeIcon icon={faClock} />}
          {!hidden && <div>00:00:00</div>}
        </div>
        <Button style={styles.toggleButton} onClick={this.toggleVisibility}>
          {hidden ? "Show timer" : "Hide timer"}
        </Button>
      </div>
    );
  }
}

export default Timer;
