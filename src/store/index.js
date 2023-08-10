import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice";
import SentReducer from './sent-slice';
import InboxReducer from './inbox-slice';

const rootReducers = combineReducers({
  auth: AuthReducer,
  sent: SentReducer,
  inbox: InboxReducer,
})
const store = configureStore({ reducer: rootReducers });

export default store;