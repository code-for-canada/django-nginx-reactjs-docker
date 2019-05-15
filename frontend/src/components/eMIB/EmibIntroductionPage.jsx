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
        <h2>{LOCALIZE.emibTest.howToPage.introductionPage.title}</h2>
        <p>{LOCALIZE.emibTest.howToPage.introductionPage.description1}</p>
        <p>{LOCALIZE.emibTest.howToPage.introductionPage.description2}</p>
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
