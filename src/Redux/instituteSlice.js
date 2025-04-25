import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    instututeDtls: null,

};

const instututeSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {
        setinstututeDtls: (state, action) => {
            state.instututeDtls = action.payload;
        }
    },
});

export const { setinstututeDtls } = instututeSlice.actions;

export default instututeSlice.reducer;
