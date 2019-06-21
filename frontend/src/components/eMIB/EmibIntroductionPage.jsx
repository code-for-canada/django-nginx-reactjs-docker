import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import {
  updateEmailsEnState,
  updateEmailsFrState,
  updateEmailsState
} from "../../modules/EmibInboxRedux";
import { getTestQuestions } from "../../modules/LoadTestContentRedux";
import { bindActionCreators } from "redux";
import { TEST_DEFINITION } from "../../testDefinition";

const styles = {
  startTestBtn: {
    textAlign: "center",
    marginTop: 32
  }
};

class EmibIntroductionPage extends Component {
  static propTypes = {
    nextPage: PropTypes.func.isRequired,
    // Props from Redux
    updateEmailsEnState: PropTypes.func,
    updateEmailsFrState: PropTypes.func,
    updateEmailsState: PropTypes.func,
    getTestQuestions: PropTypes.func
  };

  componentDidMount = () => {
    // getting questions of the sample test from the api
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      // saving questions content in emails, emailsEN and emailsFR states
      this.props.updateEmailsEnState(response.questions.en.email);
      this.props.updateEmailsFrState(response.questions.fr.email);
      // TODO: default language is English for now, but we'll need to put the landing page selected language here instead
      this.props.updateEmailsState(response.questions.en.email);
    });
  };

  render() {
    return (
      <div>
        <h1 className="green-divider">{LOCALIZE.emibTest.homePage.testTitle}</h1>
        <section aria-labelledby="emib-overview">
          <h2 id="emib-overview">{LOCALIZE.emibTest.howToPage.introductionPage.title}</h2>
          <p>{LOCALIZE.emibTest.howToPage.introductionPage.description1}</p>
          <p>{LOCALIZE.emibTest.howToPage.introductionPage.description2}</p>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateEmailsEnState,
      updateEmailsFrState,
      updateEmailsState,
      getTestQuestions
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(EmibIntroductionPage);
