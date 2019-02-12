import React, { Component } from "react";
import LocalizedStrings from "react-localization";
import PropTypes from "prop-types";

const LANGUAGES = {
  english: "en",
  french: "fr"
};

let WORDING = new LocalizedStrings({
  en: {
    testHome: "Welcome to the Compotency Assessment Tool.",

    //Home Page
    testTitle: "eMIB - Sample Test",
    welcomeMsg: "Welcome to the eMIB Sample Test",

    //HowTo Page
    howToPageTitle: "HowTo Page",
    emailInstructions: "Email Instuctions",
    taskInstructions: "Task Instuctions",
    howToNextButton: "Start test",

    //Background Page
    backgroundPageTitle: "Background Page",
    orgChart: "Org Chart",
    Scenarios: "Scenarios",

    //Inbox
    inboxPageTitle: "Inbox",
    taskList: "Tasks List",
    notePad: "NotePad",
    textTools: "Text Tools",
    emailFeatures: "Email Features",
    progressSaved: "Progress Saved",
    timer: "Timer",

    //Confirmation Page
    submissionConfirmed: "Submission Confirmed",
    exitTest: "Exit Test",

    //Generic
    nextButton: "Next",
    submitTestButton: "Submit test"
  },

  fr: {
    testHome: "(FR)Welcome to the Compotency Assessment Tool.",

    //Home Page
    testTitle: "eMIB - Test Pratique",
    welcomeMsg: "Bienvenu dans le test pratique de eMIB",

    //HowTo Page
    howToPageTitle: "Page 'How To'",
    emailInstructions: "Instructions pour les courriel",
    taskInstructions: "Instuctions pour les tâches",
    howToNextButton: "Commencer le test",

    //Background Page
    backgroundPageTitle: "Page de contexte",
    orgChart: "Organigramme",
    Scenarios: "Scénarios",

    //Inbox
    inboxPageTitle: "Boîte de réception",
    taskList: "Liste des tâches",
    notePad: "bloc-notes",
    textTools: "Outils de texte",
    emailFeatures: "Fonctions de messagerie",
    progressSaved: "Progression enregistrée",
    timer: "Minuteur",

    //Confirmation Page
    submissionConfirmed: "Soumission Confirmée",
    exitTest: "Quitter le test",

    //Generic
    nextButton: "Suivant",
    submitTestButton: "Soumettre le test"
  }
});

class Translation extends Component {
  state = {
    curLanguage: LANGUAGES.english
  };

  static propTypes = {
    updateLangOnPage: PropTypes.func
  };

  onSetLanguageToFrench = async () => {
    WORDING.setLanguage(LANGUAGES.french);
    this.setState({ curLanguage: LANGUAGES.french });
    this.props.updateLangOnPage();
  };

  onSetLanguageToEnglish = async () => {
    WORDING.setLanguage(LANGUAGES.english);
    this.setState({ curLanguage: LANGUAGES.english });
    this.props.updateLangOnPage();
  };

  render() {
    console.log("Current Language From Translation Component: ", WORDING.getLanguage());
    return (
      <div>
        {this.state.curLanguage === LANGUAGES.english && (
          <button style={{ color: "blue" }} onClick={this.onSetLanguageToFrench}>
            Français
          </button>
        )}
        {this.state.curLanguage === LANGUAGES.french && (
          <button style={{ color: "blue" }} onClick={this.onSetLanguageToEnglish}>
            English
          </button>
        )}
      </div>
    );
  }
}

export default Translation;
export { WORDING };
