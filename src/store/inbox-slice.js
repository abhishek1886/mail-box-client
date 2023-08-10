import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxItems: [], dataFetched: false };

const inbox = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    addItems(state, actions) {
      state.dataFetched = true;
      state.inboxItems = [actions.payload, ...state.inboxItems];
    },

    removeItems(state, action) {
      if(action.payload.type === 'all'){
        state.inboxItems = [];
        state.dataFetched = false;
      } else {

      }
    }
  },
});

export const inboxActions = inbox.actions;

export default inbox.reducer;