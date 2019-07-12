import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideNavigation from "./SideNavigation";
import { getBackgroundInCurrentLanguage } from "../../modules/LoadTestContentRedux";
import BackgroundSection from "./BackgroundSection";

class Background extends Component {
  static propTypes = {
    language: PropTypes.string,
    testBackground: PropTypes.object
  };

  render() {
    const sections = this.props.testBackground.sections[0].section;
    console.log(sections);
    return (
      <SideNavigation
        specs={sections.map(section => {
          return {
            menuString: section.title,
            body: <BackgroundSection content={section.section_content} />
          };
        })}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.localize.language,
    testBackground: getBackgroundInCurrentLanguage(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Background);
