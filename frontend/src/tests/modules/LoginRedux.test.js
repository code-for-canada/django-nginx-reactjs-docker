import login, {
  authenticateAction,
  initialState,
  logoutAction,
  updateIsRegistrationFormValidState
} from "../../modules/LoginRedux";

// authenticateAction
describe("authenticate action", () => {
  it("should update authenticated state to true", () => {
    const action = authenticateAction(true);
    expect(login(initialState, action)).toEqual({
      authenticated: true,
      isRegistrationFormValid: false
    });
  });
  it("should update authenticated state to false", () => {
    const action = authenticateAction(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      isRegistrationFormValid: false
    });
  });
});

// logoutAction
describe("logout action", () => {
  const action = logoutAction();
  it("should update authenticated state to false", () => {
    expect(login(initialState, action)).toEqual({
      authenticated: false
    });
  });
  it("should render UNAUTHENTICATED type", () => {
    expect(action).toEqual({ type: "UNAUTHENTICATED" });
  });
});

// updateIsRegistrationFormValidState
describe("updateIsRegistrationFormValidState action", () => {
  it("should update isRegistrationFormValid state to true", () => {
    const action = updateIsRegistrationFormValidState(true);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      isRegistrationFormValid: true
    });
  });
  it("should update isRegistrationFormValid state to false", () => {
    const action = updateIsRegistrationFormValidState(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      isRegistrationFormValid: false
    });
  });
});
