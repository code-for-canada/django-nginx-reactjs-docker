import testStatus, {
  activateTest,
  initialState,
  deactivateTest,
  quitTest,
  PAGES
} from "../../modules/TestStatusRedux";

describe("test activation state and moves to emib tabs", () => {
  it("test activate test", () => {
    const action1 = activateTest();
    expect(testStatus(initialState, action1)).toEqual({
      isTestActive: true,
      currentPage: PAGES.emibTabs
    });
  });
  it("test deactivate test and moves to confirm page", () => {
    const action2 = deactivateTest();
    expect(testStatus(initialState, action2)).toEqual({
      isTestActive: false,
      currentPage: PAGES.confirm
    });
  });
  it("test quits the test and moves to quit page", () => {
    const action3 = quitTest();
    expect(testStatus(initialState, action3)).toEqual({
      isTestActive: false,
      currentPage: PAGES.quit
    });
  });
});
