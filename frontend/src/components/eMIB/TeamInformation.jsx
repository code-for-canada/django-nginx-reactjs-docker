import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LOCALIZE from "../../text_resources";
import { LANGUAGES } from "../commons/Translation";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import emib_sample_test_example_team_chart_en from "../../images/emib_sample_test_example_team_chart_en.png";
import emib_sample_test_example_team_chart_en_zoomed from "../../images/emib_sample_test_example_team_chart_en.png";
import emib_sample_test_example_team_chart_fr from "../../images/emib_sample_test_example_team_chart_fr.png";
import emib_sample_test_example_team_chart_fr_zoomed from "../../images/emib_sample_test_example_team_chart_fr.png";
import ImageZoom from "react-medium-image-zoom";
import "../../css/react-medium-image-zoom.css";

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
    showPopupBox: false
  };

  openPopup = () => {
    this.setState({ showPopupBox: true });
  };

  closePopup = () => {
    this.setState({ showPopupBox: false });
  };

  render() {
    const { currentLanguage } = this.props;
    return (
      <div>
        <PopupBox
          show={this.state.showPopupBox}
          handleClose={this.closePopup}
          title={LOCALIZE.emibTest.background.teamInformation.dialog.title}
          description={<div>{LOCALIZE.emibTest.background.teamInformation.dialog.description}</div>}
          rightButtonType={BUTTON_TYPE.secondary}
          rightButtonTitle={LOCALIZE.commons.close}
        />
        <div>
          <h2>{LOCALIZE.emibTest.background.teamInformation.title}</h2>
          <div>
            <h3>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.title}</h3>
            <div>
              <h4>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para1Title}</h4>
              <p>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para1}</p>
              <h4>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para2Title}</h4>
              <p>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para2}</p>
              <h4>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para3Title}</h4>
              <p>{LOCALIZE.emibTest.background.teamInformation.teamMembersSection.para3}</p>
            </div>
          </div>
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
            <h3>{LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.title}</h3>
            <div>
              <div>
                <p>
                  {
                    LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection
                      .listDescription
                  }
                </p>
                <ol>
                  <li>
                    <span className="font-weight-bold">
                      {
                        LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection
                          .item1Title
                      }
                    </span>
                    {LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.item1}
                  </li>
                  <li>
                    <span className="font-weight-bold">
                      {
                        LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection
                          .item2Title
                      }
                    </span>
                    {LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.item2}
                  </li>
                  <li>
                    <span className="font-weight-bold">
                      {
                        LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection
                          .item3Title
                      }
                    </span>
                    {LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.item3}
                  </li>
                </ol>
                <h4>
                  {LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.para1Title}
                </h4>
                <p>{LOCALIZE.emibTest.background.teamInformation.responsibilitiesSection.para1}</p>
              </div>
            </div>
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
