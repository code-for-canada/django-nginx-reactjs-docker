import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import { Navbar, Nav } from "react-bootstrap";
import QuitTest from "./components/commons/QuitTest";

const PATH = {
  home: "/",
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
        <Router>
          <div>
            {!isTestActive && (
              <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                  <img alt="" src={psc_logo} width="370" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/">{LOCALIZE.mainTabs.homeTabTitle}</Nav.Link>
                  <Nav.Link href="/emib-sample">{LOCALIZE.mainTabs.sampleTest}</Nav.Link>
                </Nav>
                <LoginButton />
                <Settings variant="secondary" />
                <Translation variant="secondary" />
              </Navbar>
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
            <Route exact path={PATH.home} component={Home} />
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
    isTestActive: state.testStatus.isTestActive
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
