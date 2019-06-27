import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import { LANGUAGES } from "../commons/Translation";
import { getTestQuestions } from "../../modules/LoadTestContentRedux";
import { TEST_DEFINITION } from "../../testDefinition";

class BackgroundInformation extends Component {
  static propTypes = {
    // Provided by Redux
    getTestQuestions: PropTypes.func
  };

  state = {
    markdown_en: "",
    markdown_fr: ""
  };

  // loads the markdown content (english and french versions)
  componentWillMount = () => {
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      // saving the background information markdown content in local states
      this.setState({
        markdown_en: response.background.en.background[0].markdown[0].text,
        markdown_fr: response.background.fr.background[0].markdown[0].text
      });
    });
  };

  render() {
    return (
      <div>
        {this.props.language === LANGUAGES.english && (
          <ReactMarkdown source={this.state.markdown_en} />
        )}
        {this.props.language === LANGUAGES.french && (
          <ReactMarkdown source={this.state.markdown_fr} />
        )}
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
      getTestQuestions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundInformation);
