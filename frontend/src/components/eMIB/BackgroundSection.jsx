import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

class BackgroundSection extends Component {
  static propTypes = {
    content: PropTypes.array
  };

  render() {
    const { content } = this.props;
    return <div>this is a section</div>;
  }
}

export default BackgroundSection;
