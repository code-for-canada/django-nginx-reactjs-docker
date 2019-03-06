import React, { Component } from "react";

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
