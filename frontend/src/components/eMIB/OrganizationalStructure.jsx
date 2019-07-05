import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactMarkdown from "react-markdown";
import LOCALIZE from "../../text_resources";
import { LANGUAGES } from "../../modules/LocalizeRedux";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import emib_sample_test_example_org_chart_en from "../../images/emib_sample_test_example_org_chart_en.png";
import emib_sample_test_example_org_chart_en_zoomed from "../../images/emib_sample_test_example_org_chart_en.png";
import emib_sample_test_example_org_chart_fr from "../../images/emib_sample_test_example_org_chart_fr.png";
import emib_sample_test_example_org_chart_fr_zoomed from "../../images/emib_sample_test_example_org_chart_fr.png";
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

class OrganizationalStructure extends Component {
  static propTypes = {
    // Props from Redux
    currentLanguage: PropTypes.string,
    getTestQuestions: PropTypes.func
  };

  state = {
    showPopupBox: false,
    isLoadingComplete: false,
    markdown_en: "",
    markdown_fr: "",
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
      response.background.en.background[0].tree_view[0].organizational_structure_tree_child;
    const responsePrefixFr =
      response.background.fr.background[0].tree_view[0].organizational_structure_tree_child;
    // populating names in English
    for (let i = 0; i < responsePrefixEn.length; i++) {
      this.setState({ treeViewContent_en: responsePrefixEn[i] });
      for (let j = 0; j < responsePrefixEn[i]; j++) {
        this.setState({
          treeViewContent_en: responsePrefixEn[i].organizational_structure_tree_child[j]
        });
      }
    }
    // populating names in French
    for (let i = 0; i < responsePrefixFr.length; i++) {
      this.setState({ treeViewContent_fr: responsePrefixFr[i] });
      for (let j = 0; j < responsePrefixFr[i]; j++) {
        this.setState({
          treeViewContent_fr: responsePrefixFr[i].organizational_structure_tree_child[j]
        });
      }
    }
  };

  // loads the markdown and tree view content (english and french versions)
  componentDidMount = () => {
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      this.populateTreeArray(response);
      // saving the organizational structure markdown and tree view content in local states
      this.setState({
        markdown_en: response.background.en.background[0].markdown[2].text,
        markdown_fr: response.background.fr.background[0].markdown[2].text,
        popupMarkdownTitle_en: response.background.en.background[0].markdown[5].text,
        popupMarkdownTitle_fr: response.background.fr.background[0].markdown[5].text,
        popupMarkdownDescription_en: response.background.en.background[0].markdown[6].text,
        popupMarkdownDescription_fr: response.background.fr.background[0].markdown[6].text,
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
          groups: [1, 5, 6, 7],
          level: 1
        },
        {
          id: 1,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[0].text
              : treeViewContent_fr.organizational_structure_tree_child[0].text
          }`,
          parent: 0,
          groups: [2, 3, 4],
          level: 2
        },
        {
          id: 2,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[0].text
              : treeViewContent_fr.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[0].text
          }`,
          parent: 1,
          level: 3
        },
        {
          id: 3,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[1].text
              : treeViewContent_fr.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[1].text
          }`,
          parent: 1,
          level: 3
        },
        {
          id: 4,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[2].text
              : treeViewContent_fr.organizational_structure_tree_child[0]
                  .organizational_structure_tree_child[2].text
          }`,
          parent: 1,
          level: 3
        },
        {
          id: 5,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[1].text
              : treeViewContent_fr.organizational_structure_tree_child[1].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 6,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[2].text
              : treeViewContent_fr.organizational_structure_tree_child[2].text
          }`,
          parent: 0,
          level: 2
        },
        {
          id: 7,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[3].text
              : treeViewContent_fr.organizational_structure_tree_child[3].text
          }`,
          parent: 0,
          groups: [8, 9, 10, 11],
          level: 2
        },
        {
          id: 8,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[0].text
              : treeViewContent_fr.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[0].text
          }`,
          parent: 7,
          level: 3
        },
        {
          id: 9,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[1].text
              : treeViewContent_fr.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[1].text
          }`,
          parent: 7,
          level: 3
        },
        {
          id: 10,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[2].text
              : treeViewContent_fr.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[2].text
          }`,
          parent: 7,
          level: 3
        },
        {
          id: 11,
          name: `${
            currentLanguage === LANGUAGES.english
              ? treeViewContent_en.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[3].text
              : treeViewContent_fr.organizational_structure_tree_child[3]
                  .organizational_structure_tree_child[3].text
          }`,
          parent: 7,
          level: 3
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
          <div>
            {this.props.currentLanguage === LANGUAGES.english && (
              <ReactMarkdown source={this.state.markdown_en} />
            )}
            {this.props.currentLanguage === LANGUAGES.french && (
              <ReactMarkdown source={this.state.markdown_fr} />
            )}
            <p>
              {currentLanguage === LANGUAGES.english && (
                <ImageZoom
                  image={{
                    src: emib_sample_test_example_org_chart_en,
                    alt: LOCALIZE.emibTest.background.organizationalStructure.orgChart.desciption,
                    style: styles.testImage,
                    className: "ie-zoom-cursor"
                  }}
                  zoomImage={{
                    src: emib_sample_test_example_org_chart_en_zoomed,
                    alt: LOCALIZE.emibTest.background.organizationalStructure.orgChart.desciption,
                    className: "ie-zoom-cursor"
                  }}
                />
              )}
              {currentLanguage === LANGUAGES.french && (
                <ImageZoom
                  image={{
                    src: emib_sample_test_example_org_chart_fr,
                    alt: LOCALIZE.emibTest.background.organizationalStructure.orgChart.desciption,
                    style: styles.testImage,
                    className: "ie-zoom-cursor"
                  }}
                  zoomImage={{
                    src: emib_sample_test_example_org_chart_fr_zoomed,
                    alt: LOCALIZE.emibTest.background.organizationalStructure.orgChart.desciption,
                    className: "ie-zoom-cursor"
                  }}
                />
              )}
            </p>
            <button
              id="org-image-description"
              onClick={this.openPopup}
              className="btn btn-secondary"
              style={styles.button}
              aria-label={LOCALIZE.emibTest.background.organizationalStructure.orgChart.ariaLabel}
            >
              {LOCALIZE.emibTest.background.organizationalStructure.orgChart.link}
            </button>
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
)(OrganizationalStructure);
