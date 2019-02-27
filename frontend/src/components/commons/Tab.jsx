import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  li: { position: "relative", display: "block", float: "left", marginBottom: "-1px" },
  button: {
    position: "relative",
    display: "block",
    padding: "10px 15px",
    backgroundColor: "transparent",
    marginRight: "2px",
    lineHeight: "1.42857143",
    border: "1px solid transparent",
    borderRadius: "4px 4px 0 0"
  },
  active: {
    color: "black",
    backgroundColor: "white",
    border: "1px solid #00565e",
    borderBottomColor: "white"
  }
};

class Tab extends Component {
  static propTypes = {
    tabName: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <span>
        {this.props.selected === false && (
          <li role="presentation" style={styles.li}>
            <button id={this.props.tabName} style={styles.button} role="tab" aria-selected="false">
              {this.props.tabName}
            </button>
          </li>
        )}
        {this.props.selected === true && (
          <li role="presentation" className="active" style={styles.li}>
            <button
              id={this.props.tabName}
              style={{ ...styles.button, ...styles.active }}
              role="tab"
              aria-selected="true"
            >
              {this.props.tabName}
            </button>
          </li>
        )}
      </span>
    );
  }
}

export default Tab;
