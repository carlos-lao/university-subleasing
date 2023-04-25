// external
import { configureStore } from '@reduxjs/toolkit';

// internal
import { userSlice, likesSlice } from './slices';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        likes: likesSlice.reducer
    }
})

export const { setCurrentUser, resetCurrentUser } = userSlice.actions
export const { addLike, removeLike, clearLikes } = likesSlice.actions