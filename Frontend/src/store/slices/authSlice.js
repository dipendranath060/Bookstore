import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    access_token: localStorage.getItem('access_token') || null
}

const reducers = {
    LOGIN: (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('access_token', action.payload.access_token);
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
    },
    LOGOUT: (state) => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        state.user = {};
        state.access_token = null;
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;