import login, { loginAction, authenticateAction, initialState } from "../../modules/LoginRedux";

describe("authenticate action", () => {
  it("should update authenticated state to true", () => {
    const action = authenticateAction(true);
    expect(login(initialState, action)).toEqual({
      authenticated: true,
      registration_message: ""
    });
  });
  it("should update authenticated state to false", () => {
    const action = authenticateAction(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      registration_message: ""
    });
  });
});

// TODO(fnormand): Add tests for registerAction, loginAction and logoutAction
