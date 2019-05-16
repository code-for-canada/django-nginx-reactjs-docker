import login, { authenticateAction, initialState, logoutAction } from "../../modules/LoginRedux";

// authenticateAction
describe("authenticate action", () => {
  it("should update authenticated state to true", () => {
    const action = authenticateAction(true);
    expect(login(initialState, action)).toEqual({
      authenticated: true
    });
  });
  it("should update authenticated state to false", () => {
    const action = authenticateAction(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false
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

// TODO(fnormand): Add tests for registerAction, loginAction
