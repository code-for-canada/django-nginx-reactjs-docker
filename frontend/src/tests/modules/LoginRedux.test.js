import login, {
  updateAuthenticatedState,
  initialState,
  logoutAction
} from "../../modules/LoginRedux";

// authenticateAction
describe("authenticate action", () => {
  it("should update authenticated state to true", () => {
    const action = updateAuthenticatedState();
    expect(login(initialState, action)).toEqual({
      authenticated: true
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
