import LOCALIZE from "../text_resources";

export const LANGUAGES = {
  english: "en",
  french: "fr"
};

// Action Types
export const SET_LANGUAGE = "localize/SET_LANGUAGE";

// Action Creators
const setLanguage = language => {
  // Save the language preference in the browser so we don't have
  // to ask again.
  localStorage.setItem("catLanguage", language);
  // Set the language of the string localizer.
  LOCALIZE.setLanguage(language);
  // Return the redux action object.
  return { type: SET_LANGUAGE, language };
};

// Initial State
// language: string in LANGUAGES, initially empty until a language is selected
const initialState = {
  language: localStorage.getItem("catLanguage") || ""
};

// Reducer
const localize = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language
      };

    default:
      return state;
  }
};

export default localize;
export { setLanguage, initialState };
