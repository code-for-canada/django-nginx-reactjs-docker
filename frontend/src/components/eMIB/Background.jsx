import React, { Component } from "react";
import { WORDING } from "../translation/Translation";

class Background extends Component {
  render() {
    return (
      <div>
        <h2>{WORDING.backgroundPageTitle}</h2>
        <h3>{WORDING.orgChart}</h3>
        <h3>{WORDING.Scenarios}</h3>
      </div>
    );
  }
}

export default Background;
