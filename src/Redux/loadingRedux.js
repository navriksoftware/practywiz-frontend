import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoadingHandler: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    hideLoadingHandler: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const { showLoadingHandler, hideLoadingHandler } = loadingSlice.actions;
export default loadingSlice.reducer;
