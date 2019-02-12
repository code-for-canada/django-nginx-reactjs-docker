import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import Translation, { WORDING } from "./components/translation/Translation";

class Home extends Component {
  state = {
    language: "en"
  };

  updateLanguage = () => {
    this.setState({ language: "fr" });
  };

  render() {
    return (
      <div>
        <Translation updateLangOnPage={this.updateLanguage} />
        <div>
          <h2>Home</h2>
          <p>{WORDING.testHome}</p>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}
export default Home;
