import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

const styles = {
  comingSoon: {
    padding: 20
  }
};

// TODO(caleybrock): localize strings once replaced with real content.
class Inbox extends Component {
  render() {
    return (
      <div>
        <h2 style={styles.comingSoon}>Inbox coming soon!</h2>
      </div>
    );
  }
}

export default Inbox;
