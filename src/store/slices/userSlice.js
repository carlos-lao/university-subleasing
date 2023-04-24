import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setCurrentUser(state, action) {
            return action.payload;
        },
        resetCurrentUser(state, action) {
            return null
        }
    }
})