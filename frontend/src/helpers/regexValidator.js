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

export default validateName;
