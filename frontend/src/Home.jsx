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
    authenticated: PropTypes.bool
  };

  render() {
    return (
      <div className="app">
        <Helmet>
          <title>{LOCALIZE.titles.home}</title>
        </Helmet>
        <ContentContainer>
          {!this.props.authenticated && (
            <div>
              <h1>{LOCALIZE.homePage.title}</h1>
              <p>{LOCALIZE.homePage.description}</p>
              <div>
                <AuthenticationTabs />
              </div>
            </div>
          )}
          {this.props.authenticated && <Dashboard />}
        </ContentContainer>
      </div>
    );
  }
}

export { Home as UnconnectedHome };
const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
