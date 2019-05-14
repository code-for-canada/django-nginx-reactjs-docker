import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { logoutAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { PATH } from "../../App";

const styles = {
  button: {
    width: 136
  },
  navlink: {
    all: "unset"
  }
};

class LoginButton extends Component {
  static propTypes = {
    // Props from Redux
    authenticated: PropTypes.bool,
    logoutAction: PropTypes.func
  };

  handleLogout = () => {
    this.props.logoutAction();
  };

  render() {
    return (
      <div>
        {!this.props.authenticated && (
          <NavLink tabIndex="-1" style={styles.navlink} to={PATH.home}>
            <button className="btn btn-primary" style={styles.button}>
              {LOCALIZE.commons.login}
            </button>
          </NavLink>
        )}
        {this.props.authenticated && (
          <NavLink tabIndex="-1" style={styles.navlink} to={PATH.home}>
            <button
              type="button"
              className="btn btn-primary"
              style={styles.button}
              onClick={this.handleLogout}
            >
              {LOCALIZE.commons.logout}
            </button>
          </NavLink>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
