import validateName, {
  validateEmail,
  validatePassword,
  PASSWORD_REQUIREMENTS
} from "../../../helpers/regexValidator";

//First and Last names validation
it("returns true for well formatted names", () => {
  const name1 = "John";
  const name2 = "Jean-Marie";
  const name3 = "John .jr";
  const name4 = "AB";
  const name5 = "D'Arcy";
  const name6 = "Rémi";
  expect(validateName(name1)).toBe(true);
  expect(validateName(name2)).toBe(true);
  expect(validateName(name3)).toBe(true);
  expect(validateName(name4)).toBe(true);
  expect(validateName(name5)).toBe(true);
  expect(validateName(name6)).toBe(true);
});

it("returns false for wrong formatted names", () => {
  const name1 = "John!";
  const name2 = "John ,jr";
  const name3 = "";
  const name4 = "A";
  expect(validateName(name1)).toBe(false);
  expect(validateName(name2)).toBe(false);
  expect(validateName(name3)).toBe(false);
  expect(validateName(name4)).toBe(false);
});

//Email validation
it("returns true for well formatted emails", () => {
  const email1 = "abc@outlook.ca";
  const email2 = "123@hotmail.com";
  const email3 = "abc123@canada.ca";
  const email4 = "a@b.gc.ca";
  expect(validateEmail(email1)).toBe(true);
  expect(validateEmail(email2)).toBe(true);
  expect(validateEmail(email3)).toBe(true);
  expect(validateEmail(email4)).toBe(true);
});

it("returns false for wrong formatted emails", () => {
  const email1 = "";
  const email2 = "abc.def.com";
  const email3 = "123@a.b";
  const email4 = "123@outlook.cà";
  const email5 = "123@outlôok.ca";
  expect(validateEmail(email1)).toBe(false);
  expect(validateEmail(email2)).toBe(false);
  expect(validateEmail(email3)).toBe(false);
  expect(validateEmail(email4)).toBe(false);
  expect(validateEmail(email5)).toBe(false);
});

//Password validation
it("returns true for well formatted passwords", () => {
  const password1 = "Password1!";
  const password2 = "&1pAssword";
  const password3 = "Ab12@";
  const password4 = "abcdefG1234567%";
  expect(validatePassword(password1).length === 0).toBe(true);
  expect(validatePassword(password2).length === 0).toBe(true);
  expect(validatePassword(password3).length === 0).toBe(true);
  expect(validatePassword(password4).length === 0).toBe(true);
});

it("returns false for wrong formatted passwords", () => {
  const password1 = "password1!";
  const password2 = "PASSWORD1!";
  const password3 = "Password!";
  const password4 = "Password1";
  const password5 = "Ab1$";
  const password6 = "Password1!Password1!Password1!";
  expect(validatePassword(password1).indexOf(PASSWORD_REQUIREMENTS.UPPERCASE) >= 0).toBe(true);
  expect(validatePassword(password2).indexOf(PASSWORD_REQUIREMENTS.LOWERCASE) >= 0).toBe(true);
  expect(validatePassword(password3).indexOf(PASSWORD_REQUIREMENTS.DIGIT) >= 0).toBe(true);
  expect(validatePassword(password4).indexOf(PASSWORD_REQUIREMENTS.SPECIAL_CHARS) >= 0).toBe(true);
  expect(validatePassword(password5).indexOf(PASSWORD_REQUIREMENTS.NUMBER_OF_CHARS) >= 0).toBe(
    true
  );
  expect(validatePassword(password6).indexOf(PASSWORD_REQUIREMENTS.NUMBER_OF_CHARS) >= 0).toBe(
    true
  );
});
