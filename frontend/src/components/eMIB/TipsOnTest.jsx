import React, { Component } from "react";
import "../../css/lib/aurora.min.css";
import LOCALIZE from "../../text_resources";
import "../../css/cat-theme.css";

class TipsOnTest extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{LOCALIZE.emibTest.howToPage.tipsOnTest.title}</h2>
          <p>{LOCALIZE.emibTest.howToPage.tipsOnTest.part1.description}</p>
          <ul>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part1.bullet1}</li>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part1.bullet2}</li>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part1.bullet3}</li>
          </ul>
        </div>
        <h4>{LOCALIZE.emibTest.howToPage.tipsOnTest.part2.title}</h4>
        <div>
          <ul>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part2.bullet1}</li>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part2.bullet2}</li>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part2.bullet3}</li>
            <li>{LOCALIZE.emibTest.howToPage.tipsOnTest.part2.bullet4}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TipsOnTest;
