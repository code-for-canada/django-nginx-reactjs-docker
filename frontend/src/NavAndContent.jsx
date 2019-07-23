import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./css/lib/aurora.min.css";
import "./css/cat-theme.css";
import { Helmet } from "react-helmet";
import LoginButton from "./components/commons/LoginButton";
import Settings from "./components/commons/Settings";
import Translation from "./components/commons/Translation";
import LOCALIZE from "./text_resources";
import psc_logo_en from "./images/psc_logo_en.png";
import psc_logo_fr from "./images/psc_logo_fr.png";
import psc_logo_light_en from "./images/psc_logo_light_en.png";
import psc_logo_light_fr from "./images/psc_logo_light_fr.png";
import canada_logo from "./images/canada_logo.png";
import { Navbar, Nav } from "react-bootstrap";
import QuitTest from "./components/commons/QuitTest";
import { LANGUAGES } from "./modules/LocalizeRedux";

const styles = {
  nav: {
    justifyContent: "space-between"
  }
};

const PATH = {
  login: "/login",
  dashboard: "/dashboard",
  status: "/status",
  emibSampleTest: "/emib-sample",
  test: "/test"
};

class NavAndContent extends Component {
  static propTypes = {
    // Props from Redux
    currentLanguage: PropTypes.string,
    isTestActive: PropTypes.bool.isRequired
  };

  render() {
    const { isTestActive } = this.props;
    return (
      <div>
        <div>
          {!isTestActive && (
            <div role="navigation">
              <Navbar bg="light" variant="light" style={styles.nav}>
                <img
                  alt={LOCALIZE.mainTabs.psc}
                  src={this.props.currentLanguage === LANGUAGES.french ? psc_logo_fr : psc_logo_en}
                  width="370"
                  className="d-inline-block align-top"
                />
                <img
                  alt={LOCALIZE.mainTabs.canada}
                  src={canada_logo}
                  width="120"
                  className="d-inline-block align-top"
                />
              </Navbar>
              <Navbar bg="light" variant="light" style={styles.nav}>
                <Nav>
                  {!this.props.authenticated && (
                    <Nav.Link href={PATH.login}>
                      {LOCALIZE.mainTabs.homeTabTitleUnauthenticated}
                    </Nav.Link>
                  )}
                  {this.props.authenticated && (
                    <Nav.Link href={PATH.dashboard}>
                      {LOCALIZE.mainTabs.homeTabTitleAuthenticated}
                    </Nav.Link>
                  )}
                  <Nav.Link href="/emib-sample">{LOCALIZE.mainTabs.sampleTest}</Nav.Link>
                </Nav>
                <Nav>
                  <LoginButton />
                  <Settings variant="secondary" />
                  <Translation variant="secondary" />
                </Nav>
              </Navbar>
            </div>
          )}
          {isTestActive && (
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand>
                <img
                  alt=""
                  src={
                    this.props.currentLanguage === LANGUAGES.french
                      ? psc_logo_light_fr
                      : psc_logo_light_en
                  }
                  width="370"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Nav className="mr-auto" />
              <QuitTest />
              <Settings variant="outline-light" />
              <Translation variant="outline-light" />
            </Navbar>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language,
    isTestActive: state.testStatus.isTestActive,
    authenticated: state.login.authenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(NavAndContent);
