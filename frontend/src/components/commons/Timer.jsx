import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMinusCircle,
  faPlusCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { getTotalTestTime } from "../../modules/LoadTestContentRedux";
import Countdown from "react-countdown-now";

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
  },
  timeOutIcon: {
    paddingRight: 5
  }
};

class Timer extends Component {
  static propTypes = {
    // Provided by Redux
    testTimeInMinutes: PropTypes.number
  };

  componentDidMount = () => {};

  state = {
    hidden: false
  };

  toggleVisibility = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  // Renderer callback with condition
  timeRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // TODO(caleybrock) - call function to submit the test.
    }
    if (hours === 0 && minutes === 30 && seconds === 0) {
      // TODO(caleybrock) - call a function to show a warning dialog.
    }

    if (hours === 0 && minutes < 30) {
      // Less than 30 minutes remaining.
      return (
        <div>
          <span className="visually-hidden">{LOCALIZE.emibTest.testFooter.timer.timeLeft}</span>
          <span style={styles.timeOut}>
            <FontAwesomeIcon style={styles.timeOutIcon} icon={faExclamationCircle} />
            {hours}:{minutes}:{seconds}
          </span>
        </div>
      );
    } else {
      // Still plenty of time. Render the timer.
      return (
        <div>
          <span className="visually-hidden">{LOCALIZE.emibTest.testFooter.timer.timeLeft}</span>
          <span>
            {hours}:{minutes}:{seconds}
          </span>
        </div>
      );
    }
  };

  render() {
    const { hidden, isTimeAlmostOut } = this.state;
    let { testTimeInMinutes } = this.props;
    testTimeInMinutes = 30.25;

    return (
      <div style={styles.container}>
        <div style={styles.timeContainer}>
          {hidden && (
            <span>
              <span className="visually-hidden">
                {LOCALIZE.emibTest.testFooter.timer.timerHidden}
              </span>
              <FontAwesomeIcon style={isTimeAlmostOut ? styles.timeOut : {}} icon={faClock} />
            </span>
          )}
          {!hidden && (
            <Countdown date={Date.now() + testTimeInMinutes * 60000} renderer={this.timeRenderer} />
          )}
        </div>
        <Button
          id="unit-test-toggle-timer"
          style={styles.toggleButton}
          onClick={this.toggleVisibility}
        >
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

const mapStateToProps = (state, ownProps) => {
  return {
    testTimeInMinutes: getTotalTestTime(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Timer);
