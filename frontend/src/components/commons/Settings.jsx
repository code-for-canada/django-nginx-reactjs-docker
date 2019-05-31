import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const styles = {
  button: {
    marginRight: 15
  }
};

class Settings extends Component {
  state = {
    isDialogOpen: false
  };

  static propTypes = {
    variant: PropTypes.string
  };

  toggleDialog = () => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  };

  render() {
    // TODO(caleybrock) - Fill in context and localize.
    return (
      <div>
        <Button
          style={styles.button}
          variant={this.props.variant}
          onClick={this.toggleDialog}
          aria-label="System settings"
        >
          <FontAwesomeIcon icon={faCog} />
        </Button>
        <PopupBox
          show={this.state.isDialogOpen}
          handleClose={this.toggleDialog}
          title={"System settings"}
          description={<div>TODO: Information about system settings will go here.</div>}
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={"Okay"}
          rightButtonAction={this.toggleDialog}
        />
      </div>
    );
  }
}

export default Settings;
