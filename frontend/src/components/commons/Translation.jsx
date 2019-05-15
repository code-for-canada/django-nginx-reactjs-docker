import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { setLanguage } from "../../modules/LocalizeRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const LANGUAGES = {
  english: "en",
  french: "fr"
};

class Translation extends Component {
  state = {
    currentLanguage: LANGUAGES.english
  };

  static propTypes = {
    // Props from Redux
    setLanguage: PropTypes.func,
    variant: PropTypes.string
  };

  toggleLanguage = () => {
    if (this.state.currentLanguage === LANGUAGES.english) {
      LOCALIZE.setLanguage(LANGUAGES.french);
      this.setState({ currentLanguage: LANGUAGES.french });
      this.props.setLanguage(LANGUAGES.french);
    } else {
      LOCALIZE.setLanguage(LANGUAGES.english);
      this.setState({ currentLanguage: LANGUAGES.english });
      this.props.setLanguage(LANGUAGES.english);
    }
  };

  render() {
    const languageString =
      this.state.currentLanguage === LANGUAGES.english ? "Français" : "English";
    const htmlLang =
      this.state.currentLanguage === LANGUAGES.english ? LANGUAGES.french : LANGUAGES.english;
    return (
      <div>
        <Button variant={this.props.variant} onClick={this.toggleLanguage} lang={htmlLang}>
          {languageString}
        </Button>
      </div>
    );
  }
}

export { LANGUAGES };
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLanguage
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Translation);
