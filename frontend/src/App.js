import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
import psc_logo from "./images/psc_logo.png";
import psc_logo_light from "./images/psc_logo_light.png";
import canada_logo from "./images/canada_logo.png";
import { Navbar, Nav } from "react-bootstrap";
import QuitTest from "./components/commons/QuitTest";
import history from "./components/authentication/history";

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
    isTestActive: PropTypes.bool.isRequired
  };

  render() {
    const { isTestActive } = this.props;
    return (
      <div>
        <Helmet>
          <html lang={this.props.currentLanguage} />
          <title>{LOCALIZE.titles.CAT}</title>
        </Helmet>
        <Router history={history}>
          <div>
            {!isTestActive && (
              <div>
                <Navbar bg="light" variant="light" style={styles.nav}>
                  <img
                    alt={LOCALIZE.mainTabs.psc}
                    src={psc_logo}
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
                    <Nav.Link href="/login">{LOCALIZE.mainTabs.homeTabTitle}</Nav.Link>
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
                    src={psc_logo_light}
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

export default connect(
  mapStateToProps,
  null
)(App);
