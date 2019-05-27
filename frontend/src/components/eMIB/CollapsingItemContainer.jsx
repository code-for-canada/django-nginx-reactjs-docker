import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";

const styles = {
  container: {
    position: "relative",
    margin: "16px 0 16px 0"
  },
  button: {
    width: "100%",
    textAlign: "left"
  },
  title: {
    fontSize: 18
  },
  emailAndTaskIcon: {
    marginRight: 8,
    fontSize: 18
  },
  expandIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "8px 24px 0 0",
    pointerEvents: "none",
    fontSize: 24
  },
  contentContainer: {
    margin: 12
  }
};

export const ICON_TYPE = {
  email: "fas fa-envelope",
  task: "fas fa-tasks"
};

class CollapsingItemContainer extends Component {
  static propTypes = {
    iconType: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  };

  state = {
    isCollapsed: false
  };

  expandItem = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    const { iconType, title, body } = this.props;
    const { isCollapsed } = this.state;
    let { buttonClass, iconClass, containerClass } = "";

    if (isCollapsed) {
      buttonClass = "btn btn-secondary";
      iconClass = "fas fa-angle-down blue-expand-icon";
      containerClass = "";
    } else if (!isCollapsed) {
      buttonClass = "btn btn-primary expanded-button-style";
      iconClass = "fas fa-angle-up white-expand-icon";
      containerClass = "expanded-container-style";
    }

    return (
      <div className={`${containerClass} collapsing-item-container`} style={styles.container}>
        <button className={buttonClass} style={styles.button} onClick={this.expandItem}>
          <i className={iconType} style={styles.emailAndTaskIcon} />
          <span style={styles.title}>{title}</span>
        </button>
        <i id="white-expand-icon-on-hover" className={iconClass} style={styles.expandIcon} />
        {!isCollapsed && <div style={styles.contentContainer}>{body}</div>}
      </div>
    );
  }
}

export default CollapsingItemContainer;
