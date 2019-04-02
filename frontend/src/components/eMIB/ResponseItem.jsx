import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/collapsing-item.css";
import LOCALIZE from "../../text_resources";

const styles = {
  EditButton: {
    float: "right"
  }
};

class CollapsingItem extends Component {
  static propTypes = {
    response: PropTypes.string.isRequired,
    reasonsForAction: PropTypes.string.isRequired
  };

  render() {
    const { response, reasonsForAction } = this.props;
    return (
      <div>
        <div>
          <p>{LOCALIZE.emibTest.inboxPage.emailResponse.description}</p>
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
          <button className="btn btn-danger" style={styles.EditButton}>
            {LOCALIZE.emibTest.inboxPage.emailResponse.deleteButton}
          </button>
          <button className="btn btn-primary">
            {LOCALIZE.emibTest.inboxPage.emailResponse.editButton}
          </button>
        </div>
      </div>
    );
  }
}

export default CollapsingItem;
