import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import LOCALIZE from "../../text_resources";

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
    return (
      <div>
        <Button
          style={styles.button}
          variant={this.props.variant}
          onClick={this.toggleDialog}
          aria-label={LOCALIZE.settings.systemSettings}
        >
          <FontAwesomeIcon icon={faCog} />
        </Button>
        <PopupBox
          show={this.state.isDialogOpen}
          handleClose={this.toggleDialog}
          title={LOCALIZE.settings.systemSettings}
          description={
            <div>
              <h3>Zoom (+/-)</h3>
              <p>Info</p>
              <h3>Text size</h3>
              <p>Info</p>
              <h3>Font style</h3>
              <p>Info</p>
              <h3>Text and background colour</h3>
              <p>Info</p>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.settings.okay}
          rightButtonAction={this.toggleDialog}
        />
      </div>
    );
  }
}

export default Settings;
