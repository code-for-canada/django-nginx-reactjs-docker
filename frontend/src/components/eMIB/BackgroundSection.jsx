import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import LOCALIZE from "../../text_resources";
import ImageZoom from "react-medium-image-zoom";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import "../../css/react-medium-image-zoom.css";
import TreeNode from "../commons/TreeNode";
import { processTreeContent } from "../../helpers/transformations";
import emib_sample_test_org_chart_en from "../../images/orgCharts/emibSampleTest/org_chart_en.png";
import emib_sample_test_org_chart_fr from "../../images/orgCharts/emibSampleTest/org_chart_fr.png";
import emib_sample_test_team_chart_en from "../../images/orgCharts/emibSampleTest/team_chart_en.png";
import emib_sample_test_team_chart_fr from "../../images/orgCharts/emibSampleTest/team_chart_fr.png";

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
    currentLanguage: PropTypes.string
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
    const { content, currentLanguage } = this.props;
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
            // Todo(caleybrock) - make this more dynamic in the future.
            let imageSource;
            if (treeType === "organizational_structure_tree_child") {
              if (currentLanguage === "en") {
                imageSource = emib_sample_test_org_chart_en;
              } else {
                imageSource = emib_sample_test_org_chart_fr;
              }
            } else if (treeType === "team_information_tree_child") {
              if (currentLanguage === "en") {
                imageSource = emib_sample_test_team_chart_en;
              } else {
                imageSource = emib_sample_test_team_chart_fr;
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
                  aria-label={
                    LOCALIZE.emibTest.background.organizationalStructure.orgChart.ariaLabel
                  }
                >
                  {LOCALIZE.emibTest.background.organizationalStructure.orgChart.link}
                </button>
                <PopupBox
                  show={this.state.showPopupBox}
                  handleClose={this.closePopup}
                  title={contentItem.title}
                  description={
                    <div>
                      <p>This is a tree view and you can open it</p>
                      <TreeNode nodes={treeView} />
                    </div>
                  }
                  rightButtonType={BUTTON_TYPE.secondary}
                  rightButtonTitle={LOCALIZE.commons.close}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default BackgroundSection;
