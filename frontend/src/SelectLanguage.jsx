import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "./text_resources";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import psc_logo from "./images/psc_logo.png";
import canada_logo from "./images/canada_logo.png";
import { setLanguage } from "./modules/LocalizeRedux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = {
  logo: {
    padding: "10px 20px"
  },
  selectorContainer: {
    width: 600,
    height: 300,
    backgroundColor: "#FFFFFF",
    padding: 20,
    border: "1px solid #00565e",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto"
  },
  imageContainer: {
    margin: "10px 0px"
  },
  buttonsContainer: {
    margin: "10px 0px"
  },
  langButton: {
    margin: 10
  }
};

class SelectLanguage extends Component {
  static propTypes = {
    // Props from Redux
    setLanguage: PropTypes.func.isRequired
  };

  setLanguageToEnglish = () => {
    this.props.setLanguage("en");
  };

  setLanguageToFrench = () => {
    this.props.setLanguage("fr");
  };

  render() {
    return (
      <div className="app">
        <Helmet>
          <title>{LOCALIZE.titles.CAT}</title>
        </Helmet>
        <div>
          <div style={styles.selectorContainer}>
            <div style={styles.imageContainer}>
              <img
                alt={LOCALIZE.mainTabs.psc}
                src={psc_logo}
                width="370"
                className="d-inline-block align-top"
                style={styles.logo}
              />
              <img
                alt={LOCALIZE.mainTabs.canada}
                src={canada_logo}
                width="120"
                className="d-inline-block align-top"
                style={styles.logo}
              />
            </div>
            <h2>Competency Assessment Tool</h2>
            <hr />
            <h2 lang={"fr"}>Outil d'évaluation des compétences</h2>
            <div style={styles.buttonsContainer}>
              <Button onClick={this.setLanguageToEnglish} style={styles.langButton}>
                English
              </Button>
              <Button lang={"fr"} onClick={this.setLanguageToFrench} style={styles.langButton}>
                Français
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
)(SelectLanguage);
