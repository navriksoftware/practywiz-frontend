import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./userRedux";
const initialState = {
    facultyDtls: null,

};

const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {
        setfacultyDtls: (state, action) => {
            state.facultyDtls = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logOut, (state) => {
            state.facultyDtls = null;
        });
    },

});

export const { setfacultyDtls } = facultySlice.actions;

export default facultySlice.reducer;
