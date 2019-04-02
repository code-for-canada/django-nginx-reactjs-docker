import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";
import LOCALIZE from "../../text_resources";

const styles = {
  responseTypeIcon: {
    color: "white",
    margin: "0 8px",
    padding: 3,
    backgroundColor: "#00565E"
  },
  responseType: {
    color: "#00565E",
    textDecoration: "underline",
    fontWeight: "bold"
  },
  deleteButton: {
    float: "right"
  },
  editButton: {
    float: "left"
  }
};

export const RESPONSE_TYPE = {
  reply: "reply",
  replyAll: "reply all",
  forward: "forward"
};

class CollapsingItem extends Component {
  static propTypes = {
    responseType: PropTypes.string.isRequired,
    response: PropTypes.string.isRequired,
    reasonsForAction: PropTypes.string.isRequired
  };

  render() {
    const { responseType, response, reasonsForAction } = this.props;
    return (
      <div>
        <div>
          <p>
            {LOCALIZE.emibTest.inboxPage.emailResponse.description}
            {responseType === RESPONSE_TYPE.reply && (
              <>
                <span className="fas fa-reply" style={styles.responseTypeIcon} />
                <span style={styles.responseType}>
                  {LOCALIZE.emibTest.inboxPage.emailResponse.responseType.reply}
                </span>
              </>
            )}
            {responseType === RESPONSE_TYPE.replyAll && (
              <>
                <span className="fas fa-reply-all" style={styles.responseTypeIcon} />
                <span style={styles.responseType}>
                  {LOCALIZE.emibTest.inboxPage.emailResponse.responseType.replyAll}
                </span>
              </>
            )}
            {responseType === RESPONSE_TYPE.forward && (
              <>
                <span className="fas fa-share-square" style={styles.responseTypeIcon} />
                <span style={styles.responseType}>
                  {LOCALIZE.emibTest.inboxPage.emailResponse.responseType.forward}
                </span>
              </>
            )}
          </p>
          <p>{LOCALIZE.emibTest.inboxPage.emailResponse.to}</p>
          <p>{LOCALIZE.emibTest.inboxPage.emailResponse.cc}</p>
        </div>
        <hr />
        <div>
          <p>{LOCALIZE.emibTest.inboxPage.emailResponse.response}</p>
          <p>{response}</p>
        </div>
        <hr />
        <div>
          <p>{LOCALIZE.emibTest.inboxPage.emailResponse.reasonsForAction}</p>
          <p>{reasonsForAction}</p>
        </div>
        <hr />
        <div>
          <button className="btn btn-primary" style={styles.de}>
            {LOCALIZE.emibTest.inboxPage.emailResponse.editButton}
          </button>
          <button className="btn btn-danger" style={styles.deleteButton}>
            {LOCALIZE.emibTest.inboxPage.emailResponse.deleteButton}
          </button>
        </div>
      </div>
    );
  }
}

export default CollapsingItem;
