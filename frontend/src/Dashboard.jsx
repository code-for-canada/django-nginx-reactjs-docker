import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "./text_resources";
import { connect } from "react-redux";
import { getUserInformation } from "./modules/LoginRedux";
import { bindActionCreators } from "redux";

const styles = {
  table: {
    width: "100%",
    marginTop: 24,
    border: "2px solid #00565e"
  },
  th: {
    paddingLeft: 24,
    height: 60,
    backgroundColor: "#00565e",
    color: "white",
    width: "33.33%"
  },
  borderRight: {
    borderRight: "1px solid #cdcdcd"
  },
  topLeftBorderRadius: {
    borderTopLeftRadius: 4
  },
  topRightBorderRadius: {
    borderTopRightRadius: 4
  },
  td: {
    padding: "12px 0 12px 24px"
  },
  centerText: {
    textAlign: "center"
  },
  viewButton: {
    width: 175
  }
};

class Dashboard extends Component {
  static propTypes = {
    // Props from Redux
    getUserInformation: PropTypes.func
  };

  state = {
    first_name: "",
    last_name: ""
  };

  // calling getUserInformation on page load to get the first name and last name
  componentDidMount = () => {
    // focusing on welcome message
    window.location.hash = "#user-welcome-message-div";
    // should always be defined, except for unit tests
    if (typeof this.props.getUserInformation !== "undefined") {
      this.props.getUserInformation(localStorage.auth_token).then(response => {
        this.setState({ first_name: response.first_name, last_name: response.last_name });
      });
    }
  };

  render() {
    return (
      <div>
        <div id="user-welcome-message-div" role="region" aria-labelledby="user-welcome-message">
          <h1 id="user-welcome-message" className="green-divider">
            {LOCALIZE.formatString(
              LOCALIZE.dashboard.title,
              this.state.first_name,
              this.state.last_name
            )}
          </h1>
          <p>{LOCALIZE.dashboard.description}</p>
        </div>
        <div role="region" aria-labelledby="test-assignment-table">
          <table id="test-assignment-table" style={styles.table}>
            <tbody>
              <tr>
                <th style={{ ...styles.th, ...styles.borderRight, ...styles.topLeftBorderRadius }}>
                  {LOCALIZE.dashboard.table.columnOne}
                </th>
                <th style={{ ...styles.th, ...styles.borderRight }}>
                  {LOCALIZE.dashboard.table.columnTwo}
                </th>
                <th style={{ ...styles.th, ...styles.topRightBorderRadius }}>
                  {LOCALIZE.dashboard.table.columnThree}
                </th>
              </tr>
              {/* temporary - to be removed in the future when we'll get assign test functionalities */}
              <tr>
                <td style={{ ...styles.td, ...styles.borderRight }}>e-MIB Pizza Test</td>
                <td style={{ ...styles.td, ...styles.borderRight }}>
                  {new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, "/")}
                </td>
                <td style={{ ...styles.td, ...styles.centerText }}>
                  <a href="/test" className="btn btn-primary" style={styles.viewButton}>
                    View
                  </a>
                </td>
              </tr>
              {/* ==================================================================================== */}
            </tbody>
          </table>
          {/* temporary - to be removed in the future when we'll get assign test functionalities */}
          <p>* This is a temporary row. It is just to show the global view of this page</p>
          {/* ==================================================================================== */}
        </div>
      </div>
    );
  }
}

export { Dashboard as UnconnectedDashboard };

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
