import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import { getTestMetaData } from "../../modules/LoadTestContentRedux";
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
    nextPage: PropTypes.func.isRequired,
    // Provided by Redux
    getTestMetaData: PropTypes.func
  };

  state = {
    test_name_en: "",
    test_name_fr: "",
    markdown_en: "",
    markdown_fr: ""
  };

  // loads the markdown content (english and french versions)
  componentWillMount = () => {
    this.props.getTestMetaData(TEST_DEFINITION.emib.sampleTest).then(response => {
      // saving the test name and overview information markdown content in local states
      this.setState({
        test_name_en: response.test_en_name,
        test_name_fr: response.test_fr_name,
        markdown_en: response.meta_text.en.overview[0],
        markdown_fr: response.meta_text.fr.overview[0]
      });
    });
  };

  render() {
    return (
      <div>
        {this.props.language === LANGUAGES.english && (
          <div>
            <h1 className="green-divider">{this.state.test_name_en}</h1>
            <ReactMarkdown source={this.state.markdown_en} />
          </div>
        )}
        {this.props.language === LANGUAGES.french && (
          <div>
            <h1 className="green-divider">{this.state.test_name_fr}</h1>
            <ReactMarkdown source={this.state.markdown_fr} />
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
    language: state.localize.language
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTestMetaData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmibIntroductionPage);
