function validateName(string) {
  const regexExpression = /^([a-zA-zÀ-ÿ .'-]{2,})$/;
  if (regexExpression.test(string)) {
    return true;
  } else {
    return false;
  }
}

//ref: http://emailregex.com/
export function validateEmail(string) {
  const regexExpression = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexExpression.test(string)) {
    return true;
  } else {
    return false;
  }
}

//ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

/*
Conditions:
  - At least one uppercase
  - At least one lowercase
  - At least one digit
  - At least one special character
  - Minimum 5 and maximum 15 in length
*/

export const PASSWORD_REQUIREMENTS = {
  UPPERCASE: "uppercase",
  LOWERCASE: "lowercase",
  DIGIT: "digit",
  SPECIAL_CHARS: "special_char",
  NUMBER_OF_CHARS: "number_of_chars"
};

export function validatePassword(string) {
  let array = [];
  const regexExpression = /^(?=.*?[A-ZÀ-ÿ])(?=.*?[a-zÀ-ÿ])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,15}$/;
  if (regexExpression.test(string)) {
    // empty array
    return array;
  } else {
    const uppercaseRegex = /(?=.*[A-Z])/;
    const lowercaseRegex = /(?=.*[a-z])/;
    const digitRegex = /(?=.*\d)/;
    const specialCharRegex = /(?=.*?[#?!@$%^&*-])/;
    const numberOfCharRegex = /^(?=.{5,15}$).*/;
    // at least one uppercase
    if (!uppercaseRegex.test(string)) {
      array.push(PASSWORD_REQUIREMENTS.UPPERCASE);
    }
    // at least one lowercase
    if (!lowercaseRegex.test(string)) {
      array.push(PASSWORD_REQUIREMENTS.LOWERCASE);
    }
    // at least one digit
    if (!digitRegex.test(string)) {
      array.push(PASSWORD_REQUIREMENTS.DIGIT);
    }
    // at least one special character
    if (!specialCharRegex.test(string)) {
      array.push(PASSWORD_REQUIREMENTS.SPECIAL_CHARS);
    }
    // minimum of 5 and maximum of 15 characters in length
    if (!numberOfCharRegex.test(string)) {
      array.push(PASSWORD_REQUIREMENTS.NUMBER_OF_CHARS);
    }
    return array;
  }
}

export default validateName;
