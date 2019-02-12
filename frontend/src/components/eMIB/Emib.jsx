import React, { Component } from "react";
import Confirmation from "./Confirmation";
import HowTo from "./HowTo";
import Background from "./Background";
import Inbox from "./Inbox";
// import LocalizedStrings from "react-localization";
import { WORDING } from "../translation/Translation";

const PAGES = {
  welcome: "welcome",
  howTo: "howTo",
  background: "background",
  inbox: "inbox",
  confirm: "confirm"
};

// const LANGUAGES = {
//   english: "en",
//   french: "fr"
// };

// let STRINGS = new LocalizedStrings({
//   en: {
//     //Home Page
//     testTitle: "eMIB - Sample Test",
//     welcomeMsg: "Welcome to the eMIB Sample Test",

//     //HowTo Page
//     howToPageTitle: "HowTo Page",
//     emailInstructions: "Email Instuctions",
//     taskInstructions: "Task Instuctions",
//     howToNextButton: "Start test",

//     //Background Page
//     backgroundPageTitle: "Background Page",
//     orgChart: "Org Chart",
//     Scenarios: "Scenarios",

//     //Inbox
//     inboxPageTitle: "Inbox",
//     taskList: "Tasks List",
//     notePad: "NotePad",
//     textTools: "Text Tools",
//     emailFeatures: "Email Features",
//     progressSaved: "Progress Saved",
//     timer: "Timer",

//     //Confirmation Page
//     submissionConfirmed: "Submission Confirmed",
//     exitTest: "Exit Test",

//     //Generic
//     nextButton: "Next",
//     submitTestButton: "Submit test"
//   },

//   fr: {
//     //Home Page
//     testTitle: "eMIB - Test Pratique",
//     welcomeMsg: "Bienvenu dans le test pratique de eMIB",

//     //HowTo Page
//     howToPageTitle: "Page 'How To'",
//     emailInstructions: "Instructions pour les courriel",
//     taskInstructions: "Instuctions pour les tâches",
//     howToNextButton: "Commencer le test",

//     //Background Page
//     backgroundPageTitle: "Page de contexte",
//     orgChart: "Organigramme",
//     Scenarios: "Scénarios",

//     //Inbox
//     inboxPageTitle: "Boîte de réception",
//     taskList: "Liste des tâches",
//     notePad: "bloc-notes",
//     textTools: "Outils de texte",
//     emailFeatures: "Fonctions de messagerie",
//     progressSaved: "Progression enregistrée",
//     timer: "Minuteur",

//     //Confirmation Page
//     submissionConfirmed: "Soumission Confirmée",
//     exitTest: "Quitter le test",

//     //Generic
//     nextButton: "Suivant",
//     submitTestButton: "Soumettre le test"
//   }
// });

class Emib extends Component {
  state = {
    curPage: PAGES.welcome
  };

  changePage = () => {
    switch (this.state.curPage) {
      case PAGES.welcome:
        this.setState({ curPage: PAGES.howTo });
        break;
      case PAGES.howTo:
        this.setState({ curPage: PAGES.background });
        break;
      case PAGES.background:
        this.setState({ curPage: PAGES.inbox });
        break;
      case PAGES.inbox:
        this.setState({ curPage: PAGES.confirm });
        break;
      default:
        this.setState({ curPage: PAGES.welcome });
        break;
    }
  };

  // onSetLanguageToFrench = () => {
  //   STRINGS.setLanguage(LANGUAGES.french);
  //   this.setState({ curLanguage: LANGUAGES.french });
  // };

  // onSetLanguageToEnglish = () => {
  //   STRINGS.setLanguage(LANGUAGES.english);
  //   this.setState({ curLanguage: LANGUAGES.english });
  // };

  render() {
    console.log("Current Language From Emib Component:        ", WORDING.getLanguage());
    return (
      <div>
        {/* <div>
          {this.state.curLanguage === Translation.LANGUAGES.english && (
            <div style={{ color: "blue" }} onClick={this.onSetLanguageToFrench}>
              Français
            </div>
          )}
          {this.state.curLanguage === Translation.LANGUAGES.french && (
            <div style={{ color: "blue" }} onClick={this.onSetLanguageToEnglish}>
              English
            </div>
          )}
        </div> */}
        {/* <div>
          <Translation />
        </div> */}
        <h2>{WORDING.testTitle}</h2>
        {this.state.curPage === PAGES.welcome && <p>{WORDING.welcomeMsg}</p>}
        {this.state.curPage === PAGES.howTo && <HowTo />}
        {this.state.curPage === PAGES.background && <Background />}
        {this.state.curPage === PAGES.inbox && <Inbox />}
        {this.state.curPage === PAGES.confirm && <Confirmation />}

        {this.state.curPage !== PAGES.confirm && (
          <div style={{ color: "blue" }} onClick={this.changePage}>
            {this.state.curPage === PAGES.welcome && <p>{WORDING.nextButton}</p>}
            {this.state.curPage === PAGES.howTo && <p>{WORDING.howToNextButton}</p>}
            {this.state.curPage === PAGES.background && <p>{WORDING.nextButton}</p>}
            {this.state.curPage === PAGES.inbox && <p>{WORDING.submitTestButton}</p>}
          </div>
        )}
      </div>
    );
  }
}

export default Emib;
export { PAGES };
