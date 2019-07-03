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
    markdown_en: "",
    markdown_fr: "",
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
  componentWillMount = () => {
    this.props.getTestQuestions(TEST_DEFINITION.emib.sampleTest).then(response => {
      // saving the organizational structure markdown and tree view content in local states
      this.setState({
        markdown_en: response.background.en.background[0].markdown[2].text,
        markdown_fr: response.background.fr.background[0].markdown[2].text
      });
      this.populateTreeArray(response);
    });
  };

  render() {
    const { currentLanguage } = this.props;
    const treeView = [
      {
        id: 0,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.president,
        groups: [1, 5, 6, 7],
        level: 1
      },
      {
        id: 1,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.corpDirector,
        parent: 0,
        groups: [2, 3, 4],
        level: 2
      },
      {
        id: 2,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.hr,
        parent: 1,
        level: 3
      },
      {
        id: 3,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.finance,
        parent: 1,
        level: 3
      },
      {
        id: 4,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.it,
        parent: 1,
        level: 3
      },
      {
        id: 5,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.research,
        parent: 0,
        level: 2
      },
      {
        id: 6,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.programDev,
        parent: 0,
        level: 2
      },
      {
        id: 7,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.communications,
        parent: 0,
        groups: [8, 9, 10, 11],
        level: 2
      },
      {
        id: 8,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.qa,
        parent: 7,
        level: 3
      },
      {
        id: 9,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.services,
        parent: 7,
        level: 3
      },
      {
        id: 10,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.audits,
        parent: 7,
        level: 3
      },
      {
        id: 11,
        name: LOCALIZE.emibTest.background.organizationalStructure.dialog.training,
        parent: 7,
        level: 3
      }
    ];

    return (
      <div>
        <PopupBox
          show={this.state.showPopupBox}
          handleClose={this.closePopup}
          title={LOCALIZE.emibTest.background.organizationalStructure.dialog.title}
          description={
            <div>
              <p>{LOCALIZE.emibTest.background.orgChartInstructions}</p>
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
