import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ax } from "react-bootstrap/dist/react-bootstrap";

const inboxinstance = axios.create({
  baseURL: "https://mail-box-client-a8037-default-rtdb.firebaseio.com",
});

const initialState = { inboxItems: [], dataFetched: false, totalNewMails: 0 };

const inbox = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    addItems(state, actions) {
      state.dataFetched = true;
      if (actions.payload.isNew === true) {
        state.totalNewMails = state.totalNewMails + 1;
      }
      state.inboxItems = [actions.payload, ...state.inboxItems];
    },

    removeItems(state, action) {
      if (action.payload.type === "all") {
        state.inboxItems = [];
        state.dataFetched = false;
        state.totalNewMails = 0;
      } else {
        const { _id } = action.payload;
        const updatedList = state.inboxItems.filter((item) => item._id !== _id);
        state.inboxItems = updatedList;
      }
    },
  },
});

export const inboxActions = inbox.actions;

export default inbox.reducer;
