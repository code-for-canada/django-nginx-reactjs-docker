import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import "../../css/inbox.css";
import { emailShape } from "./constants";

const styles = {
  replyAndUser: {
    color: "#00565E"
  },
  preWrap: {
    whiteSpace: "pre-wrap"
  },
  subject: {
    fontSize: 20
  },
  metaData: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottom: "1px solid #96a8b2"
  }
};

class EmailContent extends Component {
  static propTypes = {
    email: emailShape
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <div style={styles.metaData}>
          <div style={styles.subject}>
            {LOCALIZE.emibTest.inboxPage.subject + ": " + email.subject}
          </div>
          <div>
            {LOCALIZE.emibTest.inboxPage.from}:{" "}
            <span style={styles.replyAndUser}>{email.from}</span>
          </div>
          <div>
            {LOCALIZE.emibTest.inboxPage.to}: <span style={styles.replyAndUser}>{email.to}</span>
          </div>
          <div>
            {LOCALIZE.emibTest.inboxPage.date}: {email.date}
          </div>
        </div>
        <div style={styles.preWrap}>{email.body}</div>
      </div>
    );
  }
}

export default EmailContent;
