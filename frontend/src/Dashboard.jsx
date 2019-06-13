import React, { Component } from "react";
import LOCALIZE from "./text_resources";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="green-divider">
          {LOCALIZE.formatString(LOCALIZE.dashboard.title, "Current User Name Here")}
        </h1>
        <p>{LOCALIZE.dashboard.description}</p>
      </div>
    );
  }
}

export default Dashboard;
