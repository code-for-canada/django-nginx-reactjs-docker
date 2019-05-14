import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./css/lib/aurora.min.css";
import "./css/cat-theme.css";
import { Helmet } from "react-helmet";
import Status from "./Status";
import Home from "./Home";
import Prototype from "./Prototype";
import Emib from "./components/eMIB/Emib";
import LoginButton from "./components/commons/LoginButton";
import Translation from "./components/commons/Translation";
import LOCALIZE from "./text_resources";
import psc_header from "./images/psc_header.png";

const PATH = {
  home: "/",
  prototype: "/prototype",
  status: "/status",
  emibSampleTest: "/emib-sample"
};

const styles = {
  navBarFull: {
    paddingBottom: 105
  },
  navBarHidden: {
    paddingBottom: 50
  },
  tabs: {
    paddingTop: 68
  },
  pscImage: {
    position: "fixed",
    top: 20,
    left: 20
  },
  loginButton: {
    position: "fixed",
    right: 115,
    top: 15,
    left: "auto"
  },
  languageButton: {
    position: "fixed",
    right: 15,
    top: 15,
    left: "auto"
  }
};

//Check if the home page is selected
const isHomeActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  return pathname === PATH.home;
};

//Check if the Prototype page is selected even when you start the eMIB Sample Test
const isPrototypeActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  if (pathname === PATH.prototype || pathname === PATH.emibSampleTest) {
    return pathname === PATH.prototype || pathname === PATH.emibSampleTest;
  }
};

//Check if the Status page is selected
const isStatusActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  return pathname === PATH.status;
};

class App extends Component {
  static propTypes = {
    // Props from Redux
    loggedIn: PropTypes.bool,
    currentLanguage: PropTypes.string,
    isTestActive: PropTypes.bool.isRequired
  };

  render() {
    const hideNavBar = this.props.isTestActive;
    return (
      <div>
        <Helmet>
          <html lang={this.props.currentLanguage} />
          <title>{LOCALIZE.titles.CAT}</title>
        </Helmet>
        <Router>
          <div>
            <header role="heading" aria-level="1">
              <nav
                aria-label={LOCALIZE.ariaLabel.mainMenu}
                style={hideNavBar ? styles.navBarHidden : styles.navBarFull}
                className="fixed-top bg-white navbar navbar-expand"
                role="dialog"
              >
                <div style={styles.pscImage} id="psc-image">
                  <img style={{ width: 390 }} src={psc_header} alt={LOCALIZE.commons.psc} />
                </div>
                {!hideNavBar && (
                  <div style={styles.tabs} className="fixed-top nav nav-tabs">
                    <ul
                      id="navigation-tabs"
                      className="mx-auto nav-site nav nav-tabs nav-item"
                      role="menubar"
                    >
                      <li className="bg-white" role="menuitem">
                        <NavLink
                          aria-current="page"
                          isActive={isHomeActive}
                          className="nav-link"
                          to={PATH.home}
                        >
                          {LOCALIZE.mainTabs.homeTabTitle}
                        </NavLink>
                      </li>
                      <li className="bg-white" role="menuitem">
                        <NavLink
                          aria-current="page"
                          isActive={isPrototypeActive}
                          className="nav-link"
                          to={PATH.prototype}
                        >
                          {LOCALIZE.mainTabs.prototypeTabTitle}
                        </NavLink>
                      </li>
                      <li className="bg-white" role="menuitem">
                        <NavLink
                          aria-current="page"
                          isActive={isStatusActive}
                          className="nav-link"
                          to={PATH.status}
                        >
                          {LOCALIZE.mainTabs.statusTabTitle}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
                <div aria-label="login-button" className="fixed-top" style={styles.loginButton}>
                  <LoginButton />
                </div>
                <div
                  aria-label={LOCALIZE.ariaLabel.languageToggleBtn}
                  className="fixed-top"
                  style={styles.languageButton}
                >
                  <Translation />
                </div>
              </nav>
            </header>
            <Route exact path={PATH.home} component={Home} />
            <Route path={PATH.prototype} component={Prototype} />
            <Route path={PATH.status} component={Status} />
            <Route path={PATH.emibSampleTest} component={Emib} />
          </div>
        </Router>
      </div>
    );
  }
}
export { PATH };

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.login.loggedIn,
    currentLanguage: state.localize.language,
    isTestActive: state.testStatus.isTestActive
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
