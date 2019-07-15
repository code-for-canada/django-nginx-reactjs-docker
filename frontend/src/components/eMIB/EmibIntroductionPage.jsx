import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import { getTestMetaData, updateTestMetaDataState } from "../../modules/LoadTestContentRedux";
import { TEST_DEFINITION } from "../../testDefinition";
import { LANGUAGES } from "../../modules/LocalizeRedux";

const styles = {
  startTestBtn: {
    textAlign: "center",
    marginTop: 32
  }
};

class EmibIntroductionPage extends Component {
  static propTypes = {
    testNameId: PropTypes.string,
    nextPage: PropTypes.func.isRequired,
    // Provided by Redux
    getTestMetaData: PropTypes.func.isRequired,
    updateTestMetaDataState: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    testMetaData: PropTypes.object,
    isMetaLoading: PropTypes.bool
  };

  // Load current test markdown content.
  componentWillMount = () => {
    const testNameId = this.props.testNameId
      ? this.props.testNameId
      : TEST_DEFINITION.emib.sampleTest;
    this.props.getTestMetaData(testNameId).then(response => {
      this.props.updateTestMetaDataState(response);
    });
  };

  render() {
    if (this.props.isMetaLoading) {
      return <div />;
    }

    const { language, testMetaData } = this.props;
    const test_name_en = testMetaData.test_en_name;
    const test_name_fr = testMetaData.test_fr_name;
    const markdown_en = testMetaData.meta_text.en.overview[0];
    const markdown_fr = testMetaData.meta_text.fr.overview[0];

    return (
      <div>
        {language === LANGUAGES.english && (
          <div>
            <h1 className="green-divider">{test_name_en}</h1>
            <ReactMarkdown source={markdown_en} />
          </div>
        )}
        {language === LANGUAGES.french && (
          <div>
            <h1 className="green-divider">{test_name_fr}</h1>
            <ReactMarkdown source={markdown_fr} />
          </div>
        )}
        <div style={styles.startTestBtn}>
          <button type="button" className="btn btn-primary btn-wide" onClick={this.props.nextPage}>
            {LOCALIZE.commons.enterEmib}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.localize.language,
    testMetaData: state.loadTestContent.testMetaData,
    isMetaLoading: state.loadTestContent.isMetaLoading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTestMetaData,
      updateTestMetaDataState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmibIntroductionPage);
