import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideNavigation from "./SideNavigation";
import { getBackgroundInCurrentLanguage } from "../../modules/LoadTestContentRedux";
import BackgroundSection from "./BackgroundSection";

class Background extends Component {
  static propTypes = {
    testBackground: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        sectionContent: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string.isRequired, // markdown or tree_view
            text: PropTypes.string, // markdown only
            organizational_structure_tree_child: PropTypes.array,
            team_information_tree_child: PropTypes.array
          })
        ),
        title: PropTypes.string
      })
    )
  };

  render() {
    const sections = this.props.testBackground;
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
    testBackground: getBackgroundInCurrentLanguage(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(Background);
