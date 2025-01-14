// purchasedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchasedItems: [], // Array of purchased item IDs
};

const purchasedSlice = createSlice({
  name: "purchased",
  initialState,
  reducers: {
    setPurchasedItems: (state, action) => {
      state.purchasedItems = action.payload;
    },
  },
});

export const { setPurchasedItems } = purchasedSlice.actions;
export default purchasedSlice.reducer;
