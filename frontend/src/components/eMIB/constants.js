import PropTypes from "prop-types";

// Display
export const HEADER_HEIGHT = 125;
export const FOOTER_HEIGHT = 60;

// Data structures

// Candidates can take action on an email by creating another
// email or creating a task.
export const ACTION_TYPE = {
  email: "email",
  task: "task"
};

// Actions can be created or edited.
export const EDIT_MODE = {
  create: "create",
  update: "update"
};

// Possible types of emails candidates can create.
export const EMAIL_TYPE = {
  reply: "reply",
  replyAll: "replyAll",
  forward: "forward"
};

// PropType Shape Definitions

// Email test content. Won't be edited by a candidate.
export const emailShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  to: PropTypes.string,
  from: PropTypes.string,
  subject: PropTypes.string,
  date: PropTypes.string,
  body: PropTypes.string
});

// Actions a candidate can take in response to an email.
export const actionShape = PropTypes.shape({
  actionType: PropTypes.oneOf(Object.keys(ACTION_TYPE)).isRequired,
  reasonsForAction: PropTypes.string,
  task: PropTypes.string,
  emailType: PropTypes.oneOf(Object.keys(EMAIL_TYPE)),
  emailTo: PropTypes.arrayOf(PropTypes.number),
  emailCc: PropTypes.arrayOf(PropTypes.number),
  emailBody: PropTypes.string
});

// The stucture of a contact in the addressbook
export const contactShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
});
