import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  savedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    saveForLater: (state, action) => {
      const itemToSave = state.items.find(
        (_, index) => index === action.payload
      );
      if (itemToSave) {
        state.savedItems.push(itemToSave);
        state.items = state.items.filter(
          (_, index) => index !== action.payload
        );
      }
    },
    moveToCart: (state, action) => {
      const itemToMove = state.savedItems.find(
        (_, index) => index === action.payload
      );
      if (itemToMove) {
        state.items.push(itemToMove);
        state.savedItems = state.savedItems.filter(
          (_, index) => index !== action.payload
        );
      }
    },
    removeFromSaved: (state, action) => {
      state.savedItems = state.savedItems.filter(
        (_, index) => index !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveForLater,
  moveToCart,
  removeFromSaved,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
