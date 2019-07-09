import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import { getTestContent } from "../../modules/LoadTestContentRedux";
import { TEST_DEFINITION } from "../../testDefinition";
import { LANGUAGES } from "../../modules/LocalizeRedux";

class OrganizationalInformation extends Component {
  static propTypes = {
    // Provided by Redux
    getTestContent: PropTypes.func
  };

  state = {
    markdown_en: "",
    markdown_fr: ""
  };

  // loads the markdown content (english and french versions)
  componentWillMount = () => {
    this.props.getTestContent(TEST_DEFINITION.emib.sampleTest).then(response => {
      // saving the organizational information markdown content in local states
      this.setState({
        markdown_en: response.background.en.background[0].markdown[1].text,
        markdown_fr: response.background.fr.background[0].markdown[1].text
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
      getTestContent
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationalInformation);
