import React, { Component } from "react";
import { WORDING } from "../translation/Translation";

class Confirmation extends Component {
  render() {
    return (
      <div>
        <p>{WORDING.submissionConfirmed}</p>
        <a style={{ color: "blue" }} href="/experiment">
          {WORDING.exitTest}
        </a>
      </div>
    );
  }
}

export default Confirmation;
