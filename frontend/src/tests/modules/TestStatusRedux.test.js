import testStatus, {
  activateTest,
  initialState,
  deactivateTest,
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
});
