import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import markdown_en from "./sample_test_markdown/OrganizationalInformation_en.md";
import markdown_fr from "./sample_test_markdown/OrganizationalInformation_fr.md";
import { LANGUAGES } from "../commons/Translation";

class OrganizationalInformation extends Component {
  state = {
    markdown_en: "",
    markdown_fr: ""
  };

  // loads the markdown files (english and french versions)
  componentWillMount = () => {
    fetch(markdown_en)
      .then(response => response.text())
      .then(text => this.setState({ markdown_en: text }));
    fetch(markdown_fr)
      .then(response => response.text())
      .then(text => this.setState({ markdown_fr: text }));
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

export default connect(
  mapStateToProps,
  null
)(OrganizationalInformation);
