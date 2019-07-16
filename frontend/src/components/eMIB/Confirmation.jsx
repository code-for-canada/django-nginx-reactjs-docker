import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

class Confirmation extends Component {
  componentDidMount = () => {
    // focusing on your test has been submitted content section on page load
    document.getElementById("test-submission-content").focus();
  };
  // TODO add survey link.
  render() {
    return (
      <section aria-labelledby="test-submission-content">
        <div id="test-submission-content" tabIndex={0}>
          <h1 className="green-divider">
            {LOCALIZE.emibTest.confirmationPage.submissionConfirmedTitle}
          </h1>
          <p style={{ fontSize: 24 }}>
            {LOCALIZE.formatString(
              LOCALIZE.emibTest.confirmationPage.feedbackSurvey,
              <a href="https://www.canada.ca/home.html" target="_blank" rel="noopener noreferrer">
                {LOCALIZE.emibTest.confirmationPage.optionalSurvey}
              </a>
            )}
          </p>
          <p>
            {LOCALIZE.formatString(
              LOCALIZE.emibTest.confirmationPage.logout,
              <a href="mailto:cfp.cpp-ppc.psc@canada.ca">cfp.cpp-ppc.psc@canada.ca</a>
            )}
          </p>
          <p>{LOCALIZE.emibTest.confirmationPage.thankYou}</p>
        </div>
      </section>
    );
  }
}

export default Confirmation;
