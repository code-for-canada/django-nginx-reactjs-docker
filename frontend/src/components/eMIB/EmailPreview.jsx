import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { emailShape } from "./constants";
import "../../css/inbox.css";

const styles = {
  //buttons
  button: {
    width: 202,
    textAlign: "left",
    padding: 8,
    borderWidth: "0 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "#00565E",
    cursor: "pointer",
    fontSize: 14
  },
  buttonSelectedBackground: {
    backgroundColor: "#00565E"
  },
  buttonReadBackground: {
    backgroundColor: "#F5F5F5"
  },
  buttonUnreadBackground: {
    backgroundColor: "white"
  },
  buttonSelectedText: {
    color: "#D3FCFF"
  },
  buttonUnselectedText: {
    color: "black"
  },
  buttonUnselectedSymbol: {
    color: "#00565E"
  },
  //li
  li: {
    listStyleType: "none"
  },
  //subject line
  subjectGeneral: {
    fontSize: 16
  },
  subjectSelected: {
    color: "white"
  },
  subjectUnselected: {
    color: "#00565E"
  },
  subjectRead: {
    fontWeight: "normal"
  },
  subjectUnread: {
    fontWeight: "bold"
  },
  truncated: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

class EmailPreview extends Component {
  static propTypes = {
    email: emailShape,
    selectEmail: PropTypes.func.isRequired,
    isRead: PropTypes.bool.isRequired,
    isRepliedTo: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    //READ/UNREAD CHECK
    //defaults, or if unread
    let buttonBackgroundColor = styles.buttonUnreadBackground;
    let subjectIsRead = styles.subjectUnread;
    if (this.props.isRead) {
      //if it is read
      buttonBackgroundColor = styles.buttonReadBackground;
      subjectIsRead = styles.subjectRead;
    }

    //SELECTED/UNSELECTED CHECK
    //defaults, or unselected
    let buttonTextColor = styles.buttonUnselectedText;
    let subjectIsSelected = styles.subjectUnselected;
    let imageStyle = styles.buttonUnselectedSymbol;
    if (this.props.isSelected) {
      //if it is selected
      buttonBackgroundColor = styles.buttonSelectedBackground;
      buttonTextColor = styles.buttonSelectedText;
      subjectIsSelected = styles.subjectSelected;
      imageStyle = styles.buttonSelectedText;
    }

    let buttonStyle = { ...styles.button, ...buttonTextColor, ...buttonBackgroundColor };
    let subject = {
      ...styles.subjectGeneral,
      ...subjectIsRead,
      ...subjectIsSelected,
      ...styles.truncated
    };
    const email = this.props.email;
    return (
      <li
        id={
          this.props.isSelected
            ? "unit-test-selected-email-preview"
            : "unit-test-unselected-email-preview"
        }
        style={styles.li}
        aria-current={this.props.isSelected ? "page" : ""}
        role="menuitem"
      >
        <button
          className={this.props.isSelected ? "" : "email-preview-button"}
          style={buttonStyle}
          onClick={() => this.props.selectEmail(email.id)}
        >
          <div id={this.props.isRead ? "read-email-preview" : "unread-email-preview"}>
            {this.props.isRead ? (
              <i className="far fa-envelope-open" style={imageStyle} />
            ) : (
              <i className="fas fa-envelope" style={imageStyle} />
            )}
            &nbsp;
            {LOCALIZE.emibTest.inboxPage.emailId}
            {email.id + 1}
            {this.props.isRepliedTo && (
              <i className="fas fa-sign-out-alt" style={{ float: "right", ...imageStyle }} />
            )}
          </div>
          <div style={subject}>{email.subject}</div>
          <div style={styles.truncated}>{email.from}</div>
        </button>
      </li>
    );
  }
}

export default EmailPreview;
