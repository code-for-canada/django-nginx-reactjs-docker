import React, { Component } from "react";
import { WORDING } from "../translation/Translation";

class Inbox extends Component {
  render() {
    return (
      <div>
        <h2>{WORDING.inboxPageTitle}</h2>
        <h3>{WORDING.taskList}</h3>
        <h3>{WORDING.notePad}</h3>
        <h3>{WORDING.textTools}</h3>
        <h3>{WORDING.emailFeatures}</h3>
        <h3>{WORDING.progressSaved}</h3>
        <h3>{WORDING.timer}</h3>
      </div>
    );
  }
}

export default Inbox;
