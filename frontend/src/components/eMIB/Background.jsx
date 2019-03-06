import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

const styles = {
  comingSoon: {
    padding: 20
  }
};

// TODO(caleybrock): localize strings once replaced with real content.
class Background extends Component {
  render() {
    return (
      <div>
        <h2 style={styles.comingSoon}>Background coming soon!</h2>
      </div>
    );
  }
}

export default Background;
