import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Status from "./Status";
import Home from "./Home";
import Experiment from "./Experiment";
import Emib from "./components/eMIB/Emib";
import Translation, { WORDING } from "./components/translation/Translation";

class App extends Component {
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
        <div className="App">
          <Router>
            <div>
              <div>
                <Link to="/">Home</Link>
                <Link to="/experiment">Prototype</Link>
                <Link to="/status">Status</Link>
              </div>
              <hr />
              <Route exact path="/" component={Home} />
              <Route path="/experiment" component={Experiment} />
              <Route path="/status" component={Status} />
              <Route path="/emib-sample" component={Emib} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
