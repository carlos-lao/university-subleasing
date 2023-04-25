import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'likes',
    initialState: [],
    reducers: {
        addLike(state, action) {
            state.push(action.payload)
        },
        removeLike(state, action) {
            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        },
        clearLikes() {
            return []
        }
    }
})