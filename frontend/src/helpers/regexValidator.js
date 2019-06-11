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

/*
Military Number Condition:
  - starts with a letter and followed by 6 numbers

PRI Condition:
  - Contains 8 or 9 numbers
*/
export function validatePriOrMilitaryNbr(string) {
  // valid if the field is empty (since this field is not mandatory)
  if (string.length === 0) {
    return true;
    // if the string contains a letter ==> military number
  } else if (string.match(/[A-Za-z]/)) {
    // string must contains 7 characters (1 letter and 6 numbers)
    return string.length === 7;
    // else ==> pri
  } else {
    // string must contains 8 or 9 characters (8 or 9 numbers)
    return string.length === 8 || string.length === 9;
  }
}

export default validateName;
