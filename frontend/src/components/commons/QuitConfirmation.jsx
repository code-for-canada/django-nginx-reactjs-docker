import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

class QuitConfirmation extends Component {
  render() {
    return (
      <div>
        <h1 className="green-divider">{LOCALIZE.emibTest.quitConfirmationPage.title}</h1>
        <p>{LOCALIZE.emibTest.quitConfirmationPage.instructionsRaiseHand}</p>
        <p>
          {LOCALIZE.formatString(
            LOCALIZE.emibTest.quitConfirmationPage.instructionsEmail,
            <a href="mailto:cfp.cpp-ppc.psc@canada.ca">cfp.cpp-ppc.psc@canada.ca</a>
          )}
        </p>
      </div>
    );
  }
}

export default QuitConfirmation;
