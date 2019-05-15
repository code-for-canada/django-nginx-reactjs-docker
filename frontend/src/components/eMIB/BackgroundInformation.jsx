import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

class BackgroundInformation extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{LOCALIZE.emibTest.background.backgroundInformation.title}</h2>
          <div>
            <p>{LOCALIZE.emibTest.background.backgroundInformation.paragraph1}</p>
            <p>{LOCALIZE.emibTest.background.backgroundInformation.paragraph2}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BackgroundInformation;
