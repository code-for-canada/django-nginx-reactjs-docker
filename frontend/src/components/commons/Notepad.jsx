import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import TextareaAutosize from "react-textarea-autosize";
import "../../css/emib-tabs.css";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../eMIB/constants";

const NOTEPAD_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`;
const SECTION_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT + 53}px)`;

const styles = {
  windowPadding: {
    maxWidth: 300,
    marginTop: 38
  },
  label: {
    textAlign: "left",
    float: "left",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#00565e"
  },
  hideNotepadBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    float: "right"
  },
  hideNotepadBtnIcon: {
    paddingRight: 5
  },
  headerSection: {
    borderBottom: "1.5px solid #88C800",
    width: "100%",
    padding: "8px 12px",
    height: 40
  },
  content: {
    backgroundColor: "white",
    borderWidth: "1px 1px 0 1px",
    borderStyle: "solid",
    borderColor: "#00565e",
    minWidth: 300,
    height: NOTEPAD_HEIGHT
  },
  notepadSection: {
    overflow: "auto",
    width: "100%",
    height: SECTION_HEIGHT
  },
  textArea: {
    padding: "6px 12px",
    width: "100%",
    resize: "none",
    border: "none"
  },
  openNotepadBtn: {
    width: 60,
    height: NOTEPAD_HEIGHT,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    cursor: "pointer",
    whiteSpace: "normal",
    padding: 8
  }
};

class Notepad extends Component {
  state = {
    notepadHidden: false,
    notepadContent: ""
  };

  handleHide = () => {
    this.setState({ notepadHidden: true });
  };

  handleOpen = () => {
    this.setState({ notepadHidden: false });
  };

  handleNotepadContent = event => {
    this.setState({ notepadContent: event.target.value });
  };

  render() {
    const { notepadHidden } = this.state;
    return (
      <div style={styles.windowPadding}>
        {!notepadHidden && (
          <div style={styles.content}>
            <div style={styles.headerSection}>
              <div style={styles.label}>
                <label htmlFor={"text-area-notepad"}>
                  {LOCALIZE.commons.notepad.title.toUpperCase()}
                </label>
              </div>
              <button onClick={this.handleHide} style={styles.hideNotepadBtn}>
                <i style={styles.hideNotepadBtnIcon} className="fas fa-minus-circle" />
                {LOCALIZE.commons.notepad.hideButton}
              </button>
            </div>
            <div style={styles.notepadSection}>
              <TextareaAutosize
                id="text-area-notepad"
                maxLength="3000"
                className="text-area"
                style={styles.textArea}
                cols="45"
                minRows={16}
                placeholder={LOCALIZE.commons.notepad.placeholder}
                value={this.state.notepadContent}
                onChange={this.handleNotepadContent}
              />
            </div>
          </div>
        )}
        {notepadHidden && (
          <button
            className="btn btn-primary"
            onClick={this.handleOpen}
            style={styles.openNotepadBtn}
          >
            <i className="fas fa-external-link-alt" />
            {LOCALIZE.commons.notepad.openButton}
          </button>
        )}
      </div>
    );
  }
}

export default Notepad;
