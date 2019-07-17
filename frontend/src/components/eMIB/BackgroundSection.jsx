import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import LOCALIZE from "../../text_resources";
import ImageZoom from "react-medium-image-zoom";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import "../../css/react-medium-image-zoom.css";
import TreeNode from "../commons/TreeNode";
import { processTreeContent } from "../../helpers/transformations";
import { LANGUAGES } from "../../modules/LocalizeRedux";

const styles = {
  testImage: {
    width: "100%",
    maxWidth: 600
  },
  button: {
    marginLeft: 5
  }
};

class BackgroundSection extends Component {
  static propTypes = {
    content: PropTypes.array,
    currentLanguage: PropTypes.string,
    testNameId: PropTypes.string.isRequired
  };

  state = {
    showPopupBox: false
  };

  openPopup = () => {
    this.setState({ showPopupBox: true });
  };

  closePopup = () => {
    this.setState({ showPopupBox: false });
  };

  render() {
    const { content, currentLanguage, testNameId } = this.props;
    return (
      <div>
        {content.map((contentItem, id) => {
          if (contentItem.type === "markdown") {
            // Markdown sections are rendered using ReactMarkdown.
            return <ReactMarkdown key={id} source={contentItem.text} />;
          } else if (contentItem.type === "tree_view") {
            // Process the tree content.
            let treeType = contentItem.organizational_structure_tree_child
              ? "organizational_structure_tree_child"
              : "team_information_tree_child";
            const treeView = processTreeContent(contentItem[treeType], treeType);

            // Determine what image to use.
            // TODO(caleybrock) - move these images to a secure file server like S3.
            // They are currently stored in the public folder which means
            // you don't need to have any authentication to access org chart images.
            let imageSource = `/orgCharts/${testNameId}/`;
            if (treeType === "organizational_structure_tree_child") {
              if (currentLanguage === LANGUAGES.english) {
                imageSource = imageSource + "org_chart_en.png";
              } else {
                imageSource = imageSource + "org_chart_fr.png";
              }
            } else if (treeType === "team_information_tree_child") {
              if (currentLanguage === LANGUAGES.english) {
                imageSource = imageSource + "team_chart_en.png";
              } else {
                imageSource = imageSource + "team_chart_fr.png";
              }
            }

            // Tree Views are org charts and require
            // - a title
            // - an image, that's expandable
            // - an image description button
            // - a tree view image description
            return (
              <div key={id}>
                <ImageZoom
                  image={{
                    src: imageSource,
                    alt: contentItem.title,
                    style: styles.testImage,
                    className: "ie-zoom-cursor"
                  }}
                  zoomImage={{
                    src: imageSource,
                    alt: contentItem.title,
                    className: "ie-zoom-cursor"
                  }}
                />
                <button
                  id="org-image-description"
                  onClick={this.openPopup}
                  className="btn btn-secondary"
                  style={styles.button}
                  aria-label={LOCALIZE.emibTest.background.orgCharts.ariaLabel}
                >
                  {LOCALIZE.emibTest.background.orgCharts.link}
                </button>
                <PopupBox
                  show={this.state.showPopupBox}
                  handleClose={this.closePopup}
                  title={contentItem.title}
                  description={
                    <div>
                      <p>{LOCALIZE.emibTest.background.orgCharts.treeViewInstructions}</p>
                      <TreeNode nodes={treeView} />
                    </div>
                  }
                  rightButtonType={BUTTON_TYPE.secondary}
                  rightButtonTitle={LOCALIZE.commons.close}
                />
              </div>
            );
          } else {
            // Unknown content type.
            return <div />;
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language,
    testNameId: state.loadTestContent.testMetaData.test_internal_name
  };
};

export default connect(
  mapStateToProps,
  null
)(BackgroundSection);
