import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faEnvelope, faTasks } from "@fortawesome/free-solid-svg-icons";

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
  email: faEnvelope,
  task: faTasks
};

class CollapsingItemContainer extends Component {
  static propTypes = {
    iconType: PropTypes.object,
    title: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  };

  state = {
    isCollapsed: true
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
      iconClass = faAngleDown;
      containerClass = "";
    } else if (!isCollapsed) {
      buttonClass = "btn btn-primary expanded-button-style";
      iconClass = faAngleUp;
      containerClass = "expanded-container-style";
    }

    return (
      <div className={`${containerClass} collapsing-item-container`} style={styles.container}>
        <button
          className={buttonClass}
          style={styles.button}
          onClick={this.expandItem}
          aria-expanded={!this.state.isCollapsed}
        >
          <FontAwesomeIcon icon={iconType} style={styles.emailAndTaskIcon} />
          <span style={styles.title}>{title}</span>
        </button>
        <FontAwesomeIcon
          id="white-expand-icon-on-hover"
          icon={iconClass}
          style={styles.expandIcon}
          aria-hidden="true"
          focusable="false"
        />
        {!isCollapsed && <div style={styles.contentContainer}>{body}</div>}
      </div>
    );
  }
}

export default CollapsingItemContainer;
