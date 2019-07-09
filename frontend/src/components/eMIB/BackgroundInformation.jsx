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
    return (
      <div>
        {this.props.language === LANGUAGES.english && (
          <ReactMarkdown source={this.props.testBackground.en.background[0].markdown[0].text} />
        )}
        {this.props.language === LANGUAGES.french && (
          <ReactMarkdown source={this.props.testBackground.fr.background[0].markdown[0].text} />
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
