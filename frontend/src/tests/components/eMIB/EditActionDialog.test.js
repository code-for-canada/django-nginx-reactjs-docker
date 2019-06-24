import React from "react";
import { shallow, mount } from "enzyme";
import { UnconnectedEditActionDialog as EditActionDialog } from "../../../components/eMIB/EditActionDialog";
import { ACTION_TYPE, EDIT_MODE, EMAIL_TYPE } from "../../../components/eMIB/constants";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTasks } from "@fortawesome/free-solid-svg-icons";

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
  const emailIcon = faEnvelope;
  const taskIcon = faTasks;

  // Check if it is an email or a task
  if (actionType === ACTION_TYPE.email) {
    expect(
      wrapper
        .find(FontAwesomeIcon)
        .first()
        .props().icon
    ).toEqual(emailIcon);
    // verify that the empty emailType is overridden to be a reply
    expect(wrapper.state("action").emailType).toEqual(EMAIL_TYPE.reply);
  }
  if (actionType === ACTION_TYPE.task) {
    expect(
      wrapper
        .find(FontAwesomeIcon)
        .first()
        .props().icon
    ).toEqual(taskIcon);
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

  it("renders EditActionDialog with an edit empty email response", () => {
    emptyActionMount(ACTION_TYPE.email);
  });

  it("renders EditActionDialog with an edit empty task response", () => {
    emptyActionMount(ACTION_TYPE.task);
  });
});

const emptyActionMount = actionType => {
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
          actionType: actionType,
          emailBody: "",
          task: "",
          reasonsForAction: ""
        }}
      />
    </Provider>
  );
};

it("check that undefined email type is overriden to be reply", () => {
  checkEmailTypeOverride(undefined);
});

it("check that replyAll email type is not overridden", () => {
  checkEmailTypeOverride(EMAIL_TYPE.replyAll);
});

it("check that forward email type is not overridden", () => {
  checkEmailTypeOverride(EMAIL_TYPE.forward);
});

function checkEmailTypeOverride(emailType) {
  const wrapper = shallow(
    <EditActionDialog
      email={emailStub}
      showDialog={true}
      handleClose={() => {}}
      addEmail={() => {}}
      addTask={() => {}}
      updateEmail={() => {}}
      updateTask={() => {}}
      readEmail={() => {}}
      actionType={ACTION_TYPE.email}
      action={{ actionType: ACTION_TYPE.email, emailType: emailType }}
      editMode={EDIT_MODE.create}
    />
  );
  if (emailType === undefined) {
    expect(wrapper.state("action").emailType).toEqual(EMAIL_TYPE.reply);
  } else {
    expect(wrapper.state("action").emailType).toEqual(emailType);
  }
}
