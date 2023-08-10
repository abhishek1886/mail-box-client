import { createSlice } from "@reduxjs/toolkit";

const initialState = { inboxItems: [], dataFetched: false, totalNewMails: 0 };

const inbox = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    addItems(state, actions) {
      state.dataFetched = true;
      if(actions.payload.isNew === true){
        state.totalNewMails = state.totalNewMails + 1;
      } 
      state.inboxItems = [actions.payload, ...state.inboxItems];
    },

    removeItems(state, action) {
      if(action.payload.type === 'all'){
        state.inboxItems = [];
        state.dataFetched = false;
        state.totalNewMails = 0;
      } else {

      }
    }
  },
});

export const inboxActions = inbox.actions;

export default inbox.reducer;