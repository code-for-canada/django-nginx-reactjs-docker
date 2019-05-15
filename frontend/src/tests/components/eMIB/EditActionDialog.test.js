import React from "react";
import { shallow, mount } from "enzyme";
import { UnconnectedEditActionDialog as EditActionDialog } from "../../../components/eMIB/EditActionDialog";
import { ACTION_TYPE, EDIT_MODE, EMAIL_TYPE } from "../../../components/eMIB/constants";
import isEmailFormEmpty, {
  isTaskFormEmpty,
  isTaskFormEdited,
  isEmailFormEdited
} from "../../../helpers/editActionDialogHelper";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const initialState = {
  emibInbox: {
    addressBook: [
      { id: 0, name: "Joe", role: "Developer" },
      { id: 1, name: "Bob", role: "Developer" },
      { id: 2, name: "Smithers", role: "Butler" },
      { id: 3, name: "Arthur", role: "King of Britain" },
      { id: 4, name: "Richard", role: "Lionheart" },
      { id: 5, name: "Robert", role: "The Bruce" }
    ]
  }
};

const mockStore = configureStore();

const emailStub = {
  id: 0,
  to: "To 1",
  from: "From 1",
  subject: "hello team",
  date: "Date 1",
  body: "body"
};

describe("email action type", () => {
  it("renders Add Email dialog", () => {
    testCore(ACTION_TYPE.email, EDIT_MODE.create);
  });

  it("renders Modify Email dialog", () => {
    testCore(ACTION_TYPE.email, EDIT_MODE.update);
  });
});

describe("task action type", () => {
  it("renders Add Task dialog", () => {
    testCore(ACTION_TYPE.task, EDIT_MODE.create);
  });

  it("renders Modify Task dialog", () => {
    testCore(ACTION_TYPE.task, EDIT_MODE.update);
  });
});

function testCore(actionType, editMode) {
  //Simulation of the save function
  const addEmail = jest.fn();
  const addTask = jest.fn();
  const updateEmail = jest.fn();
  const updateTask = jest.fn();
  const readEmail = jest.fn();

  //shallow wrapper of the dialog
  const wrapper = shallow(
    <EditActionDialog
      email={emailStub}
      showDialog={true}
      handleClose={() => {}}
      addEmail={addEmail}
      addTask={addTask}
      updateEmail={updateEmail}
      updateTask={updateTask}
      readEmail={readEmail}
      actionType={actionType}
      editMode={editMode}
    />
  );

  // The components to test; these should only be present when the proper parameters are passed in
  const emailIcon = "fas fa-envelope";
  const taskIcon = "fas fa-tasks";

  // Check if it is an email or a task
  if (actionType === ACTION_TYPE.email) {
    expect(
      wrapper
        .find("i")
        .first()
        .hasClass(emailIcon)
    ).toEqual(true);
    expect(
      wrapper
        .find("i")
        .first()
        .hasClass(taskIcon)
    ).toEqual(false);
  }
  if (actionType === ACTION_TYPE.task) {
    expect(
      wrapper
        .find("i")
        .first()
        .hasClass(emailIcon)
    ).toEqual(false);
    expect(
      wrapper
        .find("i")
        .first()
        .hasClass(taskIcon)
    ).toEqual(true);
  }

  //Check that the button click triggers the function
  wrapper.find("#unit-test-email-response-button").simulate("click");
  if (actionType === ACTION_TYPE.email && editMode === EDIT_MODE.create) {
    expect(addTask).toHaveBeenCalledTimes(0);
    expect(addEmail).toHaveBeenCalledTimes(1);
    expect(updateEmail).toHaveBeenCalledTimes(0);
    expect(updateTask).toHaveBeenCalledTimes(0);
    expect(readEmail).toHaveBeenCalledTimes(1);
  } else if (actionType === ACTION_TYPE.email && editMode === EDIT_MODE.update) {
    expect(addTask).toHaveBeenCalledTimes(0);
    expect(addEmail).toHaveBeenCalledTimes(0);
    expect(updateEmail).toHaveBeenCalledTimes(1);
    expect(updateTask).toHaveBeenCalledTimes(0);
    expect(readEmail).toHaveBeenCalledTimes(0);
  } else if (actionType === ACTION_TYPE.task && editMode === EDIT_MODE.create) {
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addEmail).toHaveBeenCalledTimes(0);
    expect(updateEmail).toHaveBeenCalledTimes(0);
    expect(updateTask).toHaveBeenCalledTimes(0);
    expect(readEmail).toHaveBeenCalledTimes(1);
  } else if (actionType === ACTION_TYPE.task && editMode === EDIT_MODE.update) {
    expect(addTask).toHaveBeenCalledTimes(0);
    expect(addEmail).toHaveBeenCalledTimes(0);
    expect(updateEmail).toHaveBeenCalledTimes(0);
    expect(updateTask).toHaveBeenCalledTimes(1);
    expect(readEmail).toHaveBeenCalledTimes(0);
  }
}

describe("check status of inputs in email dialog", () => {
  it("renders Add Email dialog without filled inputs", () => {
    testMode(ACTION_TYPE.email, EDIT_MODE.create);
  });

  it("renders Modify Email dialog with filled inputs", () => {
    testMode(ACTION_TYPE.email, EDIT_MODE.update);
  });
});

describe("check status of inputs in task dialog", () => {
  it("renders Add Task dialog without filled inputs", () => {
    testMode(ACTION_TYPE.task, EDIT_MODE.create);
  });

  it("renders Modify Task dialog with filled inputs", () => {
    testMode(ACTION_TYPE.task, EDIT_MODE.update);
  });
});

function testMode(actionType, editMode) {
  // constants used to create the Dialog and to check that the values are present in the inputs later
  const reasonsForAction = "reasons";
  const emailTo = [0];
  const emailCc = [1];
  const emailBody = "body of email";
  const task = "task";
  const emailType = EMAIL_TYPE.forward;

  //mount wrapper of the dialog
  const wrapper = mount(
    <Provider store={mockStore(initialState)}>
      <EditActionDialog
        email={emailStub}
        showDialog={true}
        handleClose={() => {}}
        addEmail={() => {}}
        addTask={() => {}}
        updateEmail={() => {}}
        updateTask={() => {}}
        readEmail={() => {}}
        actionType={actionType}
        editMode={editMode}
        action={{
          actionType: actionType,
          reasonsForAction: reasonsForAction,
          emailTo: emailTo,
          emailCc: emailCc,
          emailBody: emailBody,
          task: task,
          emailType: emailType
        }}
      />
    </Provider>
  );

  if (actionType === ACTION_TYPE.email) {
    //set default values when in "create" mode
    let valEmailTo = [];
    let valEmailCc = [];
    let valEmailBody = "";
    let valReasonsForAction = "";
    let isReplyChecked = true;
    let isReplyAllChecked = false;
    let isForwardChecked = false;
    if (editMode == EDIT_MODE.update) {
      // change defaults when in 'update' mode
      valEmailTo = emailTo;
      valEmailCc = emailCc;
      valEmailBody = emailBody;
      valReasonsForAction = reasonsForAction;
      isReplyChecked = false;
      isReplyAllChecked = false;
      isForwardChecked = true;
    }

    expect(wrapper.find("#to-field").props().selectedValues).toEqual(valEmailTo);
    expect(wrapper.find("#cc-field").props().selectedValues).toEqual(valEmailCc);
    expect(wrapper.find("#your-response-text-area").props().value).toEqual(valEmailBody);
    expect(wrapper.find("#reasons-for-action-text-area").props().value).toEqual(
      valReasonsForAction
    );
    expect(wrapper.find("#reply-radio").props().checked).toEqual(isReplyChecked);
    expect(wrapper.find("#reply-all-radio").props().checked).toEqual(isReplyAllChecked);
    expect(wrapper.find("#forward-radio").props().checked).toEqual(isForwardChecked);
  } else if (actionType === ACTION_TYPE.task) {
    //set default values when in "create" mode
    let valTask = "";
    let valReasonsForAction = "";
    if (editMode == EDIT_MODE.update) {
      // change defaults when in 'update' mode
      valTask = task;
      valReasonsForAction = reasonsForAction;
    }
    expect(wrapper.find("#your-tasks-text-area").props().value).toEqual(valTask);
    expect(wrapper.find("#reasons-for-action-text-area").props().value).toEqual(
      valReasonsForAction
    );
  }
}

it("clicking on the button only adds the email once", () => {
  const addEmail = jest.fn();
  const handleClose = jest.fn();
  const wrapper = mount(
    <Provider store={mockStore(initialState)}>
      <EditActionDialog
        email={emailStub}
        showDialog={true}
        handleClose={handleClose}
        addEmail={addEmail}
        addTask={() => {}}
        updateEmail={() => {}}
        updateTask={() => {}}
        readEmail={() => {}}
        actionType={ACTION_TYPE.email}
        editMode={EDIT_MODE.create}
      />
    </Provider>
  );
  wrapper.find("#unit-test-email-response-button").simulate("click");
  // In the test, calling handleClose does not change the showDialog value
  // However, in the actual UI, it does; so if this has been called,
  // The the button is disabled in the UI
  expect(handleClose).toHaveBeenCalledTimes(1);
  expect(addEmail).toHaveBeenCalledTimes(1);
});

describe("edit action dialog helper file", () => {
  // ============================== VARIABLES ==============================
  // empty variables
  const emptyEmailType = "";
  const emptyEmailTo = "";
  const emptyEmailCc = "";
  const emptyEmailResponse = "";
  const emptyReasonsForActionContent = "";
  const emptyTaskContent = "";

  // initial variables (for edit only)
  const initialEmailType = EMAIL_TYPE.replyAll;
  const initialEmailTo = ["to"];
  const initialEmailCc = ["cc"];
  const initialEmailResponse = "response";
  const initialReasonsForActionContent = "reasons for action";
  const initialTaskContent = "tasks";

  // current variables
  let stubbedCurrentVariables;
  beforeEach(() => {
    stubbedCurrentVariables = {
      emailType: EMAIL_TYPE.replyAll,
      emailTo: ["to"],
      emailCc: ["cc"],
      emailResponse: "response",
      reasonsForActionContent: "reasons for action",
      taskContent: "tasks"
    };
  });

  afterEach(() => {
    stubbedCurrentVariables = {};
  });
  // ==========================================================================

  it("isEmailFormEmpty() returns 'true' if all the fields are empty and 'false' if at least one field has been updated", () => {
    // all fields are empty ==> returns true
    expect(
      isEmailFormEmpty(
        emptyEmailType,
        emptyEmailTo,
        emptyEmailCc,
        emptyEmailResponse,
        emptyReasonsForActionContent
      )
    ).toBe(true);
    // at least one of the fields is not empty (in that case, emailTo field is not empty) ==> returns false
    expect(
      isEmailFormEmpty(
        emptyEmailType,
        stubbedCurrentVariables.emailTo,
        emptyEmailCc,
        emptyEmailResponse,
        emptyReasonsForActionContent
      )
    ).toBe(false);
  });

  it("isTaskFormEmpty() returns 'true' if all the fields are empty and 'false' if at least one field has been updated", () => {
    // all fields are empty ==> returns true
    expect(isTaskFormEmpty(emptyTaskContent, emptyReasonsForActionContent)).toBe(true);

    // at least one of the fields is not empty (in that case, taskContent field is not empty) ==> returns false
    expect(isTaskFormEmpty(stubbedCurrentVariables.taskContent, emptyReasonsForActionContent)).toBe(
      false
    );
  });

  it("isEmailFormEdited() return 'true' if at least one field has been updated and 'false' if all the initial values are the same as the current ones", () => {
    // all fields are the same ==> return false
    expect(
      isEmailFormEdited(
        initialEmailType,
        stubbedCurrentVariables.emailType,
        initialEmailTo,
        stubbedCurrentVariables.emailTo,
        initialEmailCc,
        stubbedCurrentVariables.emailCc,
        initialEmailResponse,
        stubbedCurrentVariables.emailResponse,
        initialReasonsForActionContent,
        stubbedCurrentVariables.reasonsForActionContent
      )
    ).toBe(false);

    // updating emailResponse field
    stubbedCurrentVariables.emailResponse = "this is an updated response";

    // at least one of the fields has been updated (in that case, emailResponse has been updated) ==> return true
    expect(
      isEmailFormEdited(
        initialEmailType,
        stubbedCurrentVariables.emailType,
        initialEmailTo,
        stubbedCurrentVariables.emailTo,
        initialEmailCc,
        stubbedCurrentVariables.emailCc,
        initialEmailResponse,
        stubbedCurrentVariables.emailResponse,
        initialReasonsForActionContent,
        stubbedCurrentVariables.reasonsForActionContent
      )
    ).toBe(true);
  });

  it("isTaskFormEdited() return 'true' if at least one field has been updated and 'false' if all the initial values are the same as the current ones", () => {
    // all fields are the same ==> return false
    expect(
      isTaskFormEdited(
        initialTaskContent,
        stubbedCurrentVariables.taskContent,
        initialReasonsForActionContent,
        stubbedCurrentVariables.reasonsForActionContent
      )
    ).toBe(false);

    // updating taskContent field
    stubbedCurrentVariables.taskContent = "this is an updated task";

    // at least one of the fields has been updated (in that case, taskContent has been updated) ==> return true
    expect(
      isTaskFormEdited(
        initialTaskContent,
        stubbedCurrentVariables.taskContent,
        initialReasonsForActionContent,
        stubbedCurrentVariables.reasonsForActionContent
      )
    ).toBe(true);
  });
});

it("renders EditActionDialog with an edit empty email response", () => {
  emptyActionMount(ACTION_TYPE.email);
});

it("renders EditActionDialog with an edit empty task response", () => {
  emptyActionMount(ACTION_TYPE.task);
});

function emptyActionMount(actionType) {
  mount(
    <Provider store={mockStore(initialState)}>
      <EditActionDialog
        email={emailStub}
        showDialog={true}
        handleClose={() => {}}
        addEmail={() => {}}
        addTask={() => {}}
        updateEmail={() => {}}
        updateTask={() => {}}
        readEmail={() => {}}
        actionType={actionType}
        editMode={EDIT_MODE.update}
        action={{
          actionType: actionType
        }}
      />
    </Provider>
  );
}
