import { createSlice } from "@reduxjs/toolkit";

const initialState = { sentItems: [], dataFetched: false };

const sent = createSlice({
  name: "sent",
  initialState: initialState,
  reducers: {
    refreshItems(state, action) {},

    addItem(state, action) {
      state.dataFetched = true;
      state.sentItems = [ action.payload, ...state.sentItems ];
    },

    removeItems(state, action) {
      if(action.payload.type === 'all') {
        state.sentItems = [];
        state.dataFetched = false;
      } else {
        const { _id } = action.payload;
        const updatedList = state.sentItems.filter((item) => item._id !== _id);
        state.sentItems = updatedList;
      }
    }
  },
});

export const sentActions = sent.actions;

export default sent.reducer;
