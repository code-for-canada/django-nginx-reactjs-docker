import React, { Component } from "react";
import LOCALIZE from "./text_resources";

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
  render() {
    return (
      <div>
        <div>
          <h1 className="green-divider">
            {LOCALIZE.formatString(
              LOCALIZE.dashboard.title,
              localStorage.first_name,
              localStorage.last_name
            )}
          </h1>
          <p>{LOCALIZE.dashboard.description}</p>
        </div>
        <div>
          <table style={styles.table}>
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
                <td style={{ ...styles.td, ...styles.borderRight }}>e-MIB test</td>
                <td style={{ ...styles.td, ...styles.borderRight }}>May 20, 2019</td>
                <td style={{ ...styles.td, ...styles.centerText }}>
                  <button className="btn btn-primary" style={styles.viewButton}>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
