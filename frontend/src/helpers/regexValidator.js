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
  - At least one upper case
  - At least one lower case
  - At least one digit
  - At least one special character
  - Minimum 5 and maximum 15 in length
*/
export function validatePassword(string) {
  const regexExpression = /^(?=.*?[A-ZÀ-ÿ])(?=.*?[a-zÀ-ÿ])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,15}$/;
  if (regexExpression.test(string)) {
    return true;
  } else {
    return false;
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
