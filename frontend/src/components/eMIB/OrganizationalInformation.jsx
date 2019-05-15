import React, { Component } from "react";
import LOCALIZE from "../../text_resources";

class OrganizationalInformation extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{LOCALIZE.emibTest.background.organizationalInformation.title}</h2>
          <div>
            <p>{LOCALIZE.emibTest.background.organizationalInformation.description}</p>
          </div>
          <div>
            <h3>
              {LOCALIZE.emibTest.background.organizationalInformation.prioritiesSection.title}
            </h3>
            <ul>
              <li>
                {LOCALIZE.emibTest.background.organizationalInformation.prioritiesSection.bullet1}
              </li>
              <li>
                {LOCALIZE.emibTest.background.organizationalInformation.prioritiesSection.bullet2}
              </li>
              <li>
                {LOCALIZE.emibTest.background.organizationalInformation.prioritiesSection.bullet3}
              </li>
              <li>
                {LOCALIZE.emibTest.background.organizationalInformation.prioritiesSection.bullet4}
              </li>
            </ul>
          </div>
          <div>
            <h3>{LOCALIZE.emibTest.background.organizationalInformation.risksSection.title}</h3>
            <ul>
              <li>{LOCALIZE.emibTest.background.organizationalInformation.risksSection.bullet1}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default OrganizationalInformation;
