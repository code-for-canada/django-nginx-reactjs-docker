import React, { Component } from "react";
import PropTypes from "prop-types";
import { setLanguage, LANGUAGES } from "../../modules/LocalizeRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

class Translation extends Component {
  static propTypes = {
    variant: PropTypes.string,
    // Props from Redux
    setLanguage: PropTypes.func,
    currentLanguage: PropTypes.string
  };

  toggleLanguage = () => {
    if (this.props.currentLanguage === LANGUAGES.english) {
      this.props.setLanguage(LANGUAGES.french);
    } else {
      this.props.setLanguage(LANGUAGES.english);
    }
  };

  render() {
    const languageString =
      this.props.currentLanguage === LANGUAGES.english ? "Français" : "English";
    const htmlLang =
      this.props.currentLanguage === LANGUAGES.english ? LANGUAGES.french : LANGUAGES.english;
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

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLanguage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Translation);
