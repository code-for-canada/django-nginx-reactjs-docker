import React, { Component } from "react";
import LOCALIZE from "./text_resources";
import ContentContainer from "./components/commons/ContentContainer";
import LoginTabs from "./components/login/LoginTabs";

class Home extends Component {
  //TODO(fnormand): Remove this part when implementing login functionality in the backend
  //===========================================
  state = {
    isAuthenticated: false
  };

  authentification = () => {
    this.setState({ isAuthenticated: true });
  };
  //===========================================

  render() {
    return (
      <div className="app">
        <ContentContainer>
          <h1>{LOCALIZE.homePage.title}</h1>
          <p>{LOCALIZE.homePage.description}</p>
          <div>
            <LoginTabs authentification={this.authentification} />
          </div>
          {this.state.isAuthenticated && (
            <div>
              <h3>Welcome!</h3>
              <p>You've just logged in.</p>
            </div>
          )}
        </ContentContainer>
      </div>
    );
  }
}

export default Home;
