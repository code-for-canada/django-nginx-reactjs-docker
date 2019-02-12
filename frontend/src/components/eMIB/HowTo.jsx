import React, { Component } from "react";
import { WORDING } from "../translation/Translation";

class HowTo extends Component {
  render() {
    return (
      <div>
        <h2>{WORDING.howToPageTitle}</h2>
        <h3>{WORDING.emailInstructions}</h3>
        <h3>{WORDING.taskInstructions}</h3>
      </div>
    );
  }
}

export default HowTo;
