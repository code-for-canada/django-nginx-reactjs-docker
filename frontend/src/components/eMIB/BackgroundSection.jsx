import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

class BackgroundSection extends Component {
  static propTypes = {
    content: PropTypes.array
  };

  render() {
    const { content } = this.props;
    return (
      <div>
        {content.map((contentItem, id) => {
          if (contentItem.type === "markdown") {
            return <ReactMarkdown key={id} source={contentItem.text} />;
          } else if (contentItem.type == "tree_view") {
            return <div key={id}>It's a tree</div>;
          }
        })}
      </div>
    );
  }
}

export default BackgroundSection;
