import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "./text_resources";
import ContentContainer from "./components/commons/ContentContainer";
import AuthenticationTabs from "./components/authentication/AuthenticationTabs";
import Dashboard from "./Dashboard";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

class Home extends Component {
  static propTypes = {
    // Props from Redux
    authenticated: PropTypes.bool,
    pageHasError: PropTypes.bool
  };

  render() {
    return (
      <div className="app">
        <Helmet>
          {!this.props.pageHasError && <title>{LOCALIZE.titles.home}</title>}
          {this.props.pageHasError && <title>{LOCALIZE.titles.homeWithError}</title>}
        </Helmet>
        <ContentContainer>
          {!this.props.authenticated && (
            <div role="main" tabIndex={0}>
              <h1>{LOCALIZE.homePage.welcomeMsg}</h1>
              <p>{LOCALIZE.homePage.description}</p>
              <div>
                <AuthenticationTabs />
              </div>
            </div>
          )}
          {this.props.authenticated && (
            <div role="main">
              <Dashboard />
            </div>
          )}
        </ContentContainer>
      </div>
    );
  }
}

export { Home as UnconnectedHome };
const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated,
    pageHasError: state.login.pageHasError
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
