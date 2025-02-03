import { createSlice } from "@reduxjs/toolkit";

const menteeSlice = createSlice({
  name: "mentee",
  initialState: {
    singleMentee: null,
  },
  reducers: {
    setSingleMenteeDetails: (state, action) => {
      state.singleMentee = action.payload;
    },
  },
});

export const { setSingleMenteeDetails } = menteeSlice.actions;
export default menteeSlice.reducer;
