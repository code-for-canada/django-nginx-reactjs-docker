import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";

const styles = {
  container: {
    position: "relative",
    cursor: "pointer"
  },
  button: {
    width: "100%",
    textAlign: "left"
  },
  collapsingIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "11px 24px 0 0",
    color: "#00565E",
    pointerEvents: "none"
  },
  contentContainer: {
    margin: 12
  }
};

class CollapsingItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.object
  };

  state = {
    isHidden: true,
    buttonClass: "btn btn-secondary",
    iconClass: "fas fa-angle-down expand-icon",
    containerClass: "collapsing-item-container"
  };

  expandItem = () => {
    if (this.state.isHidden) {
      this.setState({
        isHidden: false,
        buttonClass: "btn btn-primary expanded-button-style",
        iconClass: "fas fa-angle-up expanded-icon-style expand-icon",
        containerClass: "collapsing-item-container expanded-container-style"
      });
    } else {
      this.setState({
        isHidden: true,
        buttonClass: "btn btn-secondary",
        iconClass: "fas fa-angle-down expand-icon",
        containerClass: "collapsing-item-container"
      });
    }
  };

  render() {
    const { title, body } = this.props;
    const { isHidden, buttonClass, iconClass, containerClass } = this.state;
    return (
      <div className={containerClass} style={styles.container}>
        <button className={buttonClass} style={styles.button} onClick={this.expandItem}>
          {title}
        </button>
        <span className={iconClass} style={styles.collapsingIcon} />
        {!isHidden && <div style={styles.contentContainer}>{body}</div>}
      </div>
    );
  }
}

export default CollapsingItem;
