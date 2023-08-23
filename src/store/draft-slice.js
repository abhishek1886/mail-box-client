import { createSlice } from "@reduxjs/toolkit";

const initialState = { draftItems: [], dataFetched: false };

const draft = createSlice({
  name: "drafts",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.dataFetched = true;
      state.draftItems = [ action.payload, ...state.draftItems ];
    },

    removeItems(state, action) {
      if(action.payload.type === 'all') {
        state.draftItems = [];
        state.dataFetched = false;
      } else {
        const { _id } = action.payload;
        const updatedList = state.draftItems.filter((item) => item._id !== _id);
        state.draftItems = updatedList;
      }
    }
  },
});

export const draftActions = draft.actions;

export default draft.reducer;
