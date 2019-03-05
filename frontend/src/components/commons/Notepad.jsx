import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import TextareaAutosize from "react-textarea-autosize";
import { BROWSER_STRING, IE_STRING, VALID_BROWSERS } from "../../Status";

let COLS = "";

const styles = {
  windowPadding: {
    paddingTop: 43,
    paddingLeft: 20
  },
  h4: {
    color: "white"
  },
  title: {
    paddingLeft: 15,
    paddingTop: 0.1,
    height: 55,
    backgroundColor: "#00565e",
    borderRadius: "5px 5px 0 0"
  },
  content: {
    backgroundColor: "white",
    border: "1px solid #00565e",
    borderRadius: "5px 5px 0 0",
    width: 220,
    height: "calc(100vh - 208px)"
  },
  notepadSection: {
    overflow: "auto",
    height: "calc(100vh - 270px)"
  },
  textArea: {
    resize: "none",
    border: "none"
  },
  center: {
    textAlign: "center"
  }
};

class Notepad extends Component {
  //Adjust the notepad text zone width depending on the browser
  detectBrowser = () => {
    //if browser is IE
    if (BROWSER_STRING === IE_STRING) {
      COLS = "20";
    }
    //if browser is Chrome
    else if (BROWSER_STRING === VALID_BROWSERS[0]) {
      COLS = "22";
    }
    //if browser is Firefox
    else if (BROWSER_STRING === VALID_BROWSERS[1]) {
      COLS = "18";
    }
    //other
    else {
      COLS = "18";
    }
  };

  render() {
    this.detectBrowser();
    return (
      <div style={styles.windowPadding}>
        <div style={styles.content}>
          <div style={styles.title}>
            <h4 style={styles.h4}>{LOCALIZE.commons.notepad.title}</h4>
          </div>
          <div style={styles.notepadSection}>
            <form>
              <fieldset style={styles.center}>
                <label for="text-area-zone" className="invisible position-absolute">
                  {LOCALIZE.commons.notepad.title}
                </label>
                <TextareaAutosize
                  id="text-area-zone"
                  maxLength="3000"
                  className="text-area"
                  style={styles.textArea}
                  cols={COLS}
                  minRows={5}
                  placeholder={LOCALIZE.commons.notepad.placeholder}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Notepad;
