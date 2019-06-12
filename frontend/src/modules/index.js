import { combineReducers } from "redux";
import localize from "./LocalizeRedux";
import login from "./LoginRedux";
import testStatus from "./TestStatusRedux";
import emibInbox from "./EmibInboxRedux";
import loadTestContent from "./LoadTestContentRedux";

export default combineReducers({ localize, login, emibInbox, testStatus, loadTestContent });
