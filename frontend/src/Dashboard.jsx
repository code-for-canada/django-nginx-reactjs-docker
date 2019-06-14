import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "./text_resources";
import { connect } from "react-redux";
import { getUserInformation } from "./modules/LoginRedux";
import { bindActionCreators } from "redux";

class Dashboard extends Component {
  static propTypes = {
    // Props from Redux
    getUserInformation: PropTypes.func
  };

  state = {
    first_name: "",
    last_name: ""
  };

  // calling the getUserInformation on page load to get the first name and last name and save them in local states
  componentDidMount = () => {
    this.props.getUserInformation(localStorage.auth_token).then(response => {
      this.setState({ first_name: response.first_name, last_name: response.last_name });
    });
  };

  render() {
    return (
      <div>
        <h1 className="green-divider">
          {LOCALIZE.formatString(
            LOCALIZE.dashboard.title,
            this.state.first_name,
            this.state.last_name
          )}
        </h1>
        <p>{LOCALIZE.dashboard.description}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserInformation
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
