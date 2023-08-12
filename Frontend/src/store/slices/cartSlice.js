import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] }

const reducers = {
    UPDATE_CART: (state, action) => {
        state.cart = action.payload;
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers
});

export const { UPDATE_CART } = cartSlice.actions;

export default cartSlice.reducer;