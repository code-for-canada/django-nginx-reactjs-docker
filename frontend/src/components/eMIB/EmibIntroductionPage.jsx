import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import { updateEmailsEnState, updateEmailsFrState } from "../../modules/EmibInboxRedux";
import { getTestQuestions, updateTestQuestionsState } from "../../modules/LoadTestContentRedux";
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
    getTestQuestions: PropTypes.func,
    updateTestQuestionsState: PropTypes.func
  };

  componentDidMount = () => {
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      this.props.updateEmailsEnState(response.questions.en.email);
      this.props.updateEmailsFrState(response.questions.fr.email);
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

// export EmibIntroductionPage;
const mapStateToProps = (state, ownProps) => {
  return {
    testQuestions: state.loadTestContent.testQuestions,
    emailsEN: state.emibInbox.emailsEN
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateEmailsEnState,
      updateEmailsFrState,
      getTestQuestions,
      updateTestQuestionsState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmibIntroductionPage);
