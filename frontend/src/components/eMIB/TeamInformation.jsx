import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import LOCALIZE from "../../text_resources";
import { LANGUAGES } from "../../modules/LocalizeRedux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import emib_sample_test_example_team_chart_en from "../../images/emib_sample_test_example_team_chart_en.png";
import emib_sample_test_example_team_chart_en_zoomed from "../../images/emib_sample_test_example_team_chart_en.png";
import emib_sample_test_example_team_chart_fr from "../../images/emib_sample_test_example_team_chart_fr.png";
import emib_sample_test_example_team_chart_fr_zoomed from "../../images/emib_sample_test_example_team_chart_fr.png";
import ImageZoom from "react-medium-image-zoom";
import "../../css/react-medium-image-zoom.css";
import TreeNode from "../commons/TreeNode";
import { processTreeContent } from "../../helpers/transformations";

const styles = {
  testImage: {
    width: "100%",
    maxWidth: 600
  },
  button: {
    marginLeft: 5
  }
};

class TeamInformation extends Component {
  static propTypes = {
    // Props from Redux
    currentLanguage: PropTypes.string,
    testBackground: PropTypes.object
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
    const { currentLanguage, testBackground } = this.props;

    const markdown_section1_en = testBackground.en.background[0].markdown[3].text;
    const markdown_section1_fr = testBackground.fr.background[0].markdown[3].text;
    const markdown_section2_en = testBackground.en.background[0].markdown[4].text;
    const markdown_section2_fr = testBackground.fr.background[0].markdown[4].text;
    const popupMarkdownTitle_en = testBackground.en.background[0].markdown[7].text;
    const popupMarkdownTitle_fr = testBackground.fr.background[0].markdown[7].text;
    const popupMarkdownDescription_en = testBackground.en.background[0].markdown[8].text;
    const popupMarkdownDescription_fr = testBackground.fr.background[0].markdown[8].text;
    const treeViewContent_en =
      testBackground.en.background[0].tree_view[1].team_information_tree_child;
    const treeViewContent_fr =
      testBackground.fr.background[0].tree_view[1].team_information_tree_child;

    const treeView = processTreeContent(
      currentLanguage,
      treeViewContent_en,
      treeViewContent_fr,
      "team_information_tree_child"
    );

    return (
      <div>
        <PopupBox
          show={this.state.showPopupBox}
          handleClose={this.closePopup}
          // only using the states here (without markdown), since the title must be a string
          title={
            currentLanguage === LANGUAGES.english ? popupMarkdownTitle_en : popupMarkdownTitle_fr
          }
          description={
            <div>
              {currentLanguage === LANGUAGES.english && (
                <ReactMarkdown source={popupMarkdownDescription_en} />
              )}
              {currentLanguage === LANGUAGES.french && (
                <ReactMarkdown source={popupMarkdownDescription_fr} />
              )}
              <TreeNode nodes={treeView} />
            </div>
          }
          rightButtonType={BUTTON_TYPE.secondary}
          rightButtonTitle={LOCALIZE.commons.close}
        />
        <div>
          {currentLanguage === LANGUAGES.english && <ReactMarkdown source={markdown_section1_en} />}
          {currentLanguage === LANGUAGES.french && <ReactMarkdown source={markdown_section1_fr} />}
          <div>
            <p>
              {currentLanguage === LANGUAGES.english && (
                <ImageZoom
                  longdesc="#team-image-description"
                  image={{
                    src: emib_sample_test_example_team_chart_en,
                    alt: LOCALIZE.emibTest.background.teamInformation.teamChart.desciption,
                    style: styles.testImage,
                    className: "ie-zoom-cursor"
                  }}
                  zoomImage={{
                    src: emib_sample_test_example_team_chart_en_zoomed,
                    alt: LOCALIZE.emibTest.background.teamInformation.teamChart.desciption,
                    className: "ie-zoom-cursor"
                  }}
                />
              )}
              {currentLanguage === LANGUAGES.french && (
                <ImageZoom
                  longdesc="#team-image-description"
                  image={{
                    src: emib_sample_test_example_team_chart_fr,
                    alt: LOCALIZE.emibTest.background.teamInformation.teamChart.desciption,
                    style: styles.testImage,
                    className: "ie-zoom-cursor"
                  }}
                  zoomImage={{
                    src: emib_sample_test_example_team_chart_fr_zoomed,
                    alt: LOCALIZE.emibTest.background.teamInformation.teamChart.desciption,
                    className: "ie-zoom-cursor"
                  }}
                />
              )}
            </p>
            <button
              id="team-image-description"
              onClick={this.openPopup}
              className="btn btn-secondary"
              style={styles.button}
              aria-label={LOCALIZE.emibTest.background.teamInformation.teamChart.ariaLabel}
            >
              {LOCALIZE.emibTest.background.teamInformation.teamChart.link}
            </button>
          </div>
          <div>
            {currentLanguage === LANGUAGES.english && (
              <ReactMarkdown source={markdown_section2_en} />
            )}
            {currentLanguage === LANGUAGES.french && (
              <ReactMarkdown source={markdown_section2_fr} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language,
    testBackground: state.loadTestContent.testBackground
  };
};

export default connect(
  mapStateToProps,
  null
)(TeamInformation);
