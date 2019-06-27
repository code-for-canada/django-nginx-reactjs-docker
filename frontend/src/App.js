import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticateAction, logoutAction } from "./modules/LoginRedux";
import { bindActionCreators } from "redux";
import { Router, Route } from "react-router-dom";
import "./css/lib/aurora.min.css";
import "./css/cat-theme.css";
import { Helmet } from "react-helmet";
import Status from "./Status";
import Home from "./Home";
import Emib from "./components/eMIB/Emib";
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
import history from "./components/authentication/history";
import SelectLanguage from "./SelectLanguage";
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
  emibSampleTest: "/emib-sample"
};

class App extends Component {
  static propTypes = {
    // Props from Redux
    currentLanguage: PropTypes.string,
    isTestActive: PropTypes.bool.isRequired,
    authenticateAction: PropTypes.func,
    logoutAction: PropTypes.func
  };

  componentDidMount = () => {
    // getting the authentication token from the local storage
    const auth_token = localStorage.auth_token;

    // checks if the token is still valid
    fetch("/api/auth/jwt/verify_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: auth_token })
    }).then(response => {
      // if valid, update the authenticated redux state to true
      if (response.status === 200) {
        this.props.authenticateAction(true);
      }
      // if not a valid url (part of the PATH object) or login path, redirect to dashboard page
      const pathValues = Object.keys(PATH).map(function(e) {
        return PATH[e];
      });
      if (
        pathValues.indexOf(window.location.pathname) < 0 ||
        window.location.pathname === PATH.login
      ) {
        history.push(PATH.dashboard);
      }
      // if not valid and not the eMIB sample url, logout and redirect to login page
      if (
        response.status !== 200 &&
        window.location.pathname !== PATH.emibSampleTest &&
        window.location.pathname !== PATH.status
      ) {
        this.props.authenticateAction(false);
        this.props.logoutAction();
        history.push(PATH.login);
      }
    });
  };

  render() {
    const { isTestActive } = this.props;
    // Determine if user has already selected a language.
    const isLanguageSelected = this.props.currentLanguage !== "";
    return (
      <div>
        {!isLanguageSelected && <SelectLanguage />}
        {isLanguageSelected && (
          <div>
            <Helmet>
              <html lang={this.props.currentLanguage} />
              <title>{LOCALIZE.titles.CAT}</title>
            </Helmet>
            <Router history={history}>
              <div>
                {!isTestActive && (
                  <div role="navigation">
                    <Navbar bg="light" variant="light" style={styles.nav}>
                      <img
                        alt={LOCALIZE.mainTabs.psc}
                        src={psc_logo_en}
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
                        src={psc_logo_light_en}
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
                <Route exact path={PATH.login} component={Home} />
                {this.props.authenticated && <Route path={PATH.dashboard} component={Home} />}
                <Route path={PATH.status} component={Status} />
                <Route path={PATH.emibSampleTest} component={Emib} />
              </div>
            </Router>
          </div>
        )}
      </div>
    );
  }
}
export { PATH };

const mapStateToProps = (state, ownProps) => {
  return {
    currentLanguage: state.localize.language,
    isTestActive: state.testStatus.isTestActive,
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticateAction,
      logoutAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
