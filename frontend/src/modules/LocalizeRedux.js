import LOCALIZE from "../text_resources";

const LANGUAGES = {
  english: "en",
  french: "fr"
};

// Action Types
export const SET_LANGUAGE = "localize/SET_LANGUAGE";

// Action Creators
const setLanguage = language => {
  if (language === LANGUAGES.english) {
    LOCALIZE.setLanguage(LANGUAGES.english);
  } else {
    LOCALIZE.setLanguage(LANGUAGES.french);
  }
  return { type: SET_LANGUAGE, language };
};

// Initial State
const initialState = {
  language: ""
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
