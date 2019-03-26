import React, { Component } from "react";
import PropTypes from "prop-types";
import TabNavigation from "../commons/TabNavigation";
import LoginForm from "./LoginForm";
import LOCALIZE from "../../text_resources";

const customStyles = {
  container: {
    width: 500,
    margin: "0px auto",
    paddingTop: 24,
    paddingRight: 20,
    paddingLeft: 20
  }
};

class LoginTabs extends Component {
  static propTypes = {
    authentification: PropTypes.func
  };

  state = {
    isAuthenticated: false
  };

  authentification = () => {
    this.setState({ isAuthenticated: true });
    this.props.authentification();
  };

  render() {
    const TABS = [
      {
        id: 0,
        tabName: LOCALIZE.homePage.login.title,
        body: <LoginForm authentification={this.authentification} />
      },
      {
        id: 1,
        tabName: "CREATE AN ACCOUNT",
        body: "Coming Soon!"
      }
    ];
    return (
      <div>
        {!this.state.isAuthenticated && (
          <div style={customStyles.container}>
            <TabNavigation
              tabSpecs={TABS}
              currentTab={0}
              menuName="Login Menu"
              style={{
                height: "100%",
                backgroundColor: "white",
                borderWidth: "1px 1px 1px 1px",
                borderStyle: "solid",
                borderColor: "#00565e",
                borderTopColor: "white"
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default LoginTabs;
