import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
import { getTestQuestions } from "../../modules/LoadTestContentRedux";
import { TEST_DEFINITION } from "../../testDefinition";

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
    getTestQuestions: PropTypes.func
  };

  state = {
    showPopupBox: false,
    isLoadingComplete: false,
    markdown_section1_en: "",
    markdown_section1_fr: "",
    markdown_section2_en: "",
    markdown_section2_fr: "",
    popupMarkdownTitle_en: "",
    popupMarkdownTitle_fr: "",
    popupMarkdownDescription_en: "",
    popupMarkdownDescription_fr: "",
    treeViewContent_en: [],
    treeViewContent_fr: []
  };

  openPopup = () => {
    this.setState({ showPopupBox: true });
  };

  closePopup = () => {
    this.setState({ showPopupBox: false });
  };

  // populates the tree view array with people names
  populateTreeArray = response => {
    const responsePrefixEn =
      response.background.en.background[0].tree_view[1].team_information_tree_child;
    const responsePrefixFr =
      response.background.fr.background[0].tree_view[1].team_information_tree_child;
    // populating names in English
    for (let i = 0; i < responsePrefixEn.length; i++) {
      this.setState({ treeViewContent_en: responsePrefixEn[i] });
    }
    // populating names in French
    for (let i = 0; i < responsePrefixFr.length; i++) {
      this.setState({ treeViewContent_fr: responsePrefixFr[i] });
    }
  };

  // loads the markdown content (english and french versions)
  componentWillMount = () => {
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      this.populateTreeArray(response);
      // saving the team information markdown content in local states
      this.setState({
        markdown_section1_en: response.background.en.background[0].markdown[3].text,
        markdown_section1_fr: response.background.fr.background[0].markdown[3].text,
        markdown_section2_en: response.background.en.background[0].markdown[4].text,
        markdown_section2_fr: response.background.fr.background[0].markdown[4].text,
        popupMarkdownTitle_en: response.background.en.background[0].markdown[7].text,
        popupMarkdownTitle_fr: response.background.fr.background[0].markdown[7].text,
        popupMarkdownDescription_en: response.background.en.background[0].markdown[8].text,
        popupMarkdownDescription_fr: response.background.fr.background[0].markdown[8].text,
        isLoadingComplete: true
      });
    });
  };

  render() {
    const { currentLanguage } = this.props;
    const { treeViewContent_en, treeViewContent_fr } = this.state;
    let treeView = [];
    // waiting for tree view content data loading
    if (this.state.isLoadingComplete) {
      treeView = [
        {
          id: 0,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.text
              : treeViewContent_fr.text
          }`,
          groups: [1, 2, 3, 4, 5, 6],
          level: 1
        },
        {
          id: 1,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[0].text
              : treeViewContent_fr.team_information_tree_child[0].text
          }`,
          parent: 0,
          level: 2
        },

        {
          id: 2,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[1].text
              : treeViewContent_fr.team_information_tree_child[1].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 3,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[2].text
              : treeViewContent_fr.team_information_tree_child[2].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 4,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[3].text
              : treeViewContent_fr.team_information_tree_child[3].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 5,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[4].text
              : treeViewContent_fr.team_information_tree_child[4].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 6,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.team_information_tree_child[5].text
              : treeViewContent_fr.team_information_tree_child[5].text
          }`,
          parent: 0,
          level: 2
        }
      ];
    }

    return (
      <div>
        <PopupBox
          show={this.state.showPopupBox}
          handleClose={this.closePopup}
          // only using the states here (without markdown), since the title must be a string
          title={
            this.props.currentLanguage === LANGUAGES.english
              ? this.state.popupMarkdownTitle_en
              : this.state.popupMarkdownTitle_fr
          }
          description={
            <div>
              {this.props.currentLanguage === LANGUAGES.english && (
                <ReactMarkdown source={this.state.popupMarkdownDescription_en} />
              )}
              {this.props.currentLanguage === LANGUAGES.french && (
                <ReactMarkdown source={this.state.popupMarkdownDescription_fr} />
              )}
              <TreeNode nodes={treeView} />
            </div>
          }
          rightButtonType={BUTTON_TYPE.secondary}
          rightButtonTitle={LOCALIZE.commons.close}
        />
        <div>
          {this.props.currentLanguage === LANGUAGES.english && (
            <ReactMarkdown source={this.state.markdown_section1_en} />
          )}
          {this.props.currentLanguage === LANGUAGES.french && (
            <ReactMarkdown source={this.state.markdown_section1_fr} />
          )}
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
            >
              {LOCALIZE.emibTest.background.teamInformation.teamChart.link}
            </button>
          </div>
          <div>
            {this.props.currentLanguage === LANGUAGES.english && (
              <ReactMarkdown source={this.state.markdown_section2_en} />
            )}
            {this.props.currentLanguage === LANGUAGES.french && (
              <ReactMarkdown source={this.state.markdown_section2_fr} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language
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
)(TeamInformation);
