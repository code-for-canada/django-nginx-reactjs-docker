import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import scrollToTop from "../../helpers/scrollToTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const styles = {
  displayedButton: {
    display: "block",
    position: "fixed",
    bottom: 20,
    right: 20
  }
};

class BackToTop extends Component {
  state = {
    buttonVisible: false
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleOnScroll, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleOnScroll, false);
  };

  // handle onScroll event
  handleOnScroll = () => {
    // If the total page is shorter than this size, do not show a back to top button
    if (window.document.body.offsetHeight < 1800) {
      this.setState({ buttonVisible: false });
      return;
    }
    const currentScroll = document.documentElement.scrollTop;
    //Only shows up after scrlling for 1000 pxs
    if (currentScroll > 1000) {
      this.setState({ buttonVisible: true });
    } else {
      this.setState({ buttonVisible: false });
    }
  };

  render() {
    const { buttonVisible } = this.state;
    return (
      <div>
        {buttonVisible && (
          <div id="unit-test-button-visible">
            <a
              style={styles.displayedButton}
              href="#main-content"
              className="btn btn-backtotop"
              onClick={() => scrollToTop()}
            >
              <FontAwesomeIcon icon={faArrowUp} />
              &nbsp;{LOCALIZE.commons.backToTop}
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default BackToTop;
