import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import markdown_section1_en from "./sample_test_markdown/TeamInformation_section1_en.md";
import markdown_section1_fr from "./sample_test_markdown/TeamInformation_section1_fr.md";
import markdown_section2_en from "./sample_test_markdown/TeamInformation_section2_en.md";
import markdown_section2_fr from "./sample_test_markdown/TeamInformation_section2_fr.md";
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
    currentLanguage: PropTypes.string
  };

  state = {
    showPopupBox: false,
    markdown_section1_en: "",
    markdown_section1_fr: "",
    markdown_section2_en: "",
    markdown_section2_fr: ""
  };

  openPopup = () => {
    this.setState({ showPopupBox: true });
  };

  closePopup = () => {
    this.setState({ showPopupBox: false });
  };

  // loads the markdown files (english and french versions)
  componentWillMount = () => {
    fetch(markdown_section1_en)
      .then(response => response.text())
      .then(text => this.setState({ markdown_section1_en: text }));
    fetch(markdown_section1_fr)
      .then(response => response.text())
      .then(text => this.setState({ markdown_section1_fr: text }));
    fetch(markdown_section2_en)
      .then(response => response.text())
      .then(text => this.setState({ markdown_section2_en: text }));
    fetch(markdown_section2_fr)
      .then(response => response.text())
      .then(text => this.setState({ markdown_section2_fr: text }));
  };

  render() {
    const { currentLanguage } = this.props;
    const treeView = [
      {
        id: 0,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.manager,
        groups: [1, 2, 3, 4, 5, 6],
        level: 1
      },
      {
        id: 1,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst1,
        parent: 0,
        level: 2
      },

      {
        id: 2,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst2,
        parent: 0,
        level: 2
      },
      {
        id: 3,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst3,
        parent: 0,
        level: 2
      },
      {
        id: 4,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst4,
        parent: 0,
        level: 2
      },
      {
        id: 5,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst5,
        parent: 0,
        level: 2
      },
      {
        id: 6,
        name: LOCALIZE.emibTest.background.teamInformation.dialog.analyst6,
        parent: 0,
        level: 2
      }
    ];

    return (
      <div>
        <PopupBox
          show={this.state.showPopupBox}
          handleClose={this.closePopup}
          title={LOCALIZE.emibTest.background.teamInformation.dialog.title}
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

export default connect(
  mapStateToProps,
  null
)(TeamInformation);
