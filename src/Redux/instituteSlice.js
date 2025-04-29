import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./userRedux";
const initialState = {
    instituteDtls: null,
};

const instituteSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {
        setinstituteDtls: (state, action) => {
            state.instituteDtls = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
          state.instituteDtls = null;
        });
      },
});

export const { setinstituteDtls } = instituteSlice.actions;

export default instituteSlice.reducer;
