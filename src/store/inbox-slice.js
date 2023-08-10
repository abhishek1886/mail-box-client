import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxItems: [], dataFetched: false, totalNewMails: 0 };

const inbox = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    addItems(state, actions) {
      const { payload } = actions;

      const exisitingMail = state.inboxItems.find(
        (item) => item._id === payload._id
      );

      if (!exisitingMail) {
        state.dataFetched = true;
        if (payload.isNew === true) {
          state.totalNewMails = state.totalNewMails + 1;
        }
        state.inboxItems = [payload, ...state.inboxItems];
      }
    },

    removeItems(state, action) {
      if (action.payload.type === "all") {
        state.inboxItems = [];
        state.dataFetched = false;
        state.totalNewMails = 0;
      } else {
        const { _id } = action.payload;
        const item = state.inboxItems.filter((data) => data._id === _id);
        if (item[0].isNew === true) {
          state.totalNewMails = state.totalNewMails - 1;
        }
        const updatedList = state.inboxItems.filter((item) => item._id !== _id);
        state.inboxItems = updatedList;
      }
    },
  },
});

export const inboxActions = inbox.actions;

export default inbox.reducer;
