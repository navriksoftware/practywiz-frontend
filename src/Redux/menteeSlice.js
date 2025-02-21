import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./userRedux";

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
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.singleMentee = null;
    });
  },
});

export const { setSingleMenteeDetails } = menteeSlice.actions;
export default menteeSlice.reducer;
