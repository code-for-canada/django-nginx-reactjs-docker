import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { LANGUAGES } from "../../modules/LocalizeRedux";

class BackgroundInformation extends Component {
  static propTypes = {
    // Provided by Redux
    testBackground: PropTypes.object,
    language: PropTypes.string
  };

  render() {
    const { testBackground, language } = this.props;
    return (
      <div>
        {language === LANGUAGES.english && (
          <ReactMarkdown source={testBackground.en.background[0].markdown[0].text} />
        )}
        {language === LANGUAGES.french && (
          <ReactMarkdown source={testBackground.fr.background[0].markdown[0].text} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.localize.language,
    testBackground: state.loadTestContent.testBackground
  };
};

export default connect(
  mapStateToProps,
  null
)(BackgroundInformation);
