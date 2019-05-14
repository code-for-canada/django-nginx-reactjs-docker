import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LOCALIZE from "../../text_resources";
import { LANGUAGES } from "../commons/Translation";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import emib_sample_test_example_org_chart_en from "../../images/emib_sample_test_example_org_chart_en.png";
import emib_sample_test_example_org_chart_en_zoomed from "../../images/emib_sample_test_example_org_chart_en.png";
import emib_sample_test_example_org_chart_fr from "../../images/emib_sample_test_example_org_chart_fr.png";
import emib_sample_test_example_org_chart_fr_zoomed from "../../images/emib_sample_test_example_org_chart_fr.png";
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

class OrganizationalStructure extends Component {
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
          description={<TreeNode nodes={treeView} />}
          rightButtonType={BUTTON_TYPE.secondary}
          rightButtonTitle={LOCALIZE.commons.close}
        />
        <div>
          <h2>{LOCALIZE.emibTest.background.organizationalStructure.title}</h2>
          <div>
            <p>{LOCALIZE.emibTest.background.organizationalStructure.description}</p>
            <p>
              <span className="font-weight-bold">
                {LOCALIZE.emibTest.background.organizationalStructure.para1Title}
              </span>
              {LOCALIZE.emibTest.background.organizationalStructure.para1}
            </p>
            <p>
              <span className="font-weight-bold">
                {LOCALIZE.emibTest.background.organizationalStructure.para2Title}
              </span>
              {LOCALIZE.emibTest.background.organizationalStructure.para2}
            </p>
            <p>
              <span className="font-weight-bold">
                {LOCALIZE.emibTest.background.organizationalStructure.para3Title}
              </span>
              {LOCALIZE.emibTest.background.organizationalStructure.para3}
            </p>
            <p>
              <span className="font-weight-bold">
                {LOCALIZE.emibTest.background.organizationalStructure.para4Title}
              </span>
              {LOCALIZE.emibTest.background.organizationalStructure.para4}
            </p>
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

export default connect(
  mapStateToProps,
  null
)(OrganizationalStructure);
