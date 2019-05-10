import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

class Evaluation extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{LOCALIZE.emibTest.howToPage.evaluation.title}</h2>
          <p>{LOCALIZE.emibTest.howToPage.evaluation.description}</p>
          <div id="keyLeadershipCompetencies">
            <h3>{LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.title}</h3>
            <div>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para1Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para1}
              </p>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para2Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para2}
              </p>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para3Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para3}
              </p>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para4Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para4}
              </p>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para5Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para5}
              </p>
              <p>
                <span className="font-weight-bold">
                  {
                    LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection
                      .para6Title
                  }
                </span>
                {LOCALIZE.emibTest.howToPage.evaluation.keyLeadershipCompetenciesSection.para6}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Evaluation;
