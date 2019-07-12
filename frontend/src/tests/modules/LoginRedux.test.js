import login, {
  authenticateAction,
  initialState,
  logoutAction,
  updatePageHasErrorState
} from "../../modules/LoginRedux";

// authenticateAction
describe("authenticate action", () => {
  it("should update authenticated state to true", () => {
    const action = authenticateAction(true);
    expect(login(initialState, action)).toEqual({
      authenticated: true,
      pageHasError: false
    });
  });
  it("should update authenticated state to false", () => {
    const action = authenticateAction(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      pageHasError: false
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

// updatePageHasErrorState
describe("updatePageHasErrorState action", () => {
  it("should update pageHasError state to true", () => {
    const action = updatePageHasErrorState(true);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      pageHasError: true
    });
  });
  it("should update pageHasError state to false", () => {
    const action = updatePageHasErrorState(false);
    expect(login(initialState, action)).toEqual({
      authenticated: false,
      pageHasError: false
    });
  });
});
