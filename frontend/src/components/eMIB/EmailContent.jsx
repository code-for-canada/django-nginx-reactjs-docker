import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import "../../css/inbox.css";
import { emailShape } from "./constants";
import { contactNameFromId, displayStringFromIds } from "../../helpers/transformations";
import { connect } from "react-redux";

const styles = {
  replyAndUser: {
    color: "#00565E"
  },
  dataBodyDivider: {
    borderTop: "1px solid #96a8b2",
    margin: "12px 0 12px 0"
  },
  preWrap: {
    whiteSpace: "pre-wrap"
  },
  subject: {
    fontSize: 20
  }
};

class EmailContent extends Component {
  static propTypes = {
    email: emailShape,
    addressBook: PropTypes.array
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <div style={styles.subject}>
          {LOCALIZE.emibTest.inboxPage.subject + ": " + email.subject}
        </div>
        <div>
          {LOCALIZE.emibTest.inboxPage.from}:{" "}
          <span style={styles.replyAndUser}>
            {contactNameFromId(this.props.addressBook, email.from)}
          </span>
        </div>
        <div>
          {LOCALIZE.emibTest.inboxPage.to}:{" "}
          <span style={styles.replyAndUser}>
            {displayStringFromIds(this.props.addressBook, email.to)}
          </span>
        </div>
        <div>
          {LOCALIZE.emibTest.inboxPage.date}: {email.date}
        </div>
        <hr style={styles.dataBodyDivider} />
        <div style={styles.preWrap}>{email.body}</div>
      </div>
    );
  }
}

export { EmailContent as UnconnectedEmailContent };

const mapStateToProps = (state, ownProps) => {
  return {
    addressBook: state.emibInbox.addressBook
  };
};

export default connect(
  mapStateToProps,
  null
)(EmailContent);
