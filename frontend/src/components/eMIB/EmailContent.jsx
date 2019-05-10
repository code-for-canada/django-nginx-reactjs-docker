import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import "../../css/inbox.css";
import { emailShape } from "./constants";

const styles = {
  replyAndUser: {
    color: "#00565E"
  },
  dataBodyDivider: {
    width: "100%",
    borderTop: "1px solid #96a8b2",
    margin: "12px 0 12px 0"
  },
  preWrap: {
    whiteSpace: "pre-wrap"
  },
  subject: {
    marginTop: 0
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
        <h3 style={styles.subject}>{email.subject}</h3>
        <div>
          {LOCALIZE.emibTest.inboxPage.from}: <span style={styles.replyAndUser}>{email.from}</span>
        </div>
        <div>
          {LOCALIZE.emibTest.inboxPage.to}: <span style={styles.replyAndUser}>{email.to}</span>
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

export default EmailContent;
