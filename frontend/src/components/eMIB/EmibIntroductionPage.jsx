import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";

const styles = {
  startTestBtn: {
    textAlign: "center",
    marginTop: 32
  }
};

class EmibIntroductionPage extends Component {
  static propTypes = {
    nextPage: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <h1 className="green-divider">{LOCALIZE.emibTest.homePage.testTitle}</h1>
        <section aria-labelledby="emib-overview">
          <h2 id="emib-overview">{LOCALIZE.emibTest.howToPage.introductionPage.title}</h2>
          <p>{LOCALIZE.emibTest.howToPage.introductionPage.description1}</p>
          <p>{LOCALIZE.emibTest.howToPage.introductionPage.description2}</p>
          <ul>
            <li>{LOCALIZE.emibTest.howToPage.introductionPage.bullet1}</li>
            <li>{LOCALIZE.emibTest.howToPage.introductionPage.bullet2}</li>
            <li>{LOCALIZE.emibTest.howToPage.introductionPage.bullet3}</li>
          </ul>
        </section>
        <section aria-labelledby="emib-differences">
          <h2 id="emib-differences">
            {LOCALIZE.emibTest.howToPage.introductionPage.differencesTitle}
          </h2>
          <ul>
            <li>{LOCALIZE.emibTest.howToPage.introductionPage.differencesBullet1}</li>
            <li>{LOCALIZE.emibTest.howToPage.introductionPage.differencesBullet2}</li>
          </ul>
        </section>
        <div style={styles.startTestBtn}>
          <button type="button" className="btn btn-primary btn-wide" onClick={this.props.nextPage}>
            {LOCALIZE.commons.enterEmib}
          </button>
        </div>
      </div>
    );
  }
}

export default EmibIntroductionPage;
