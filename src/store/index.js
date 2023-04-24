// external
import { configureStore } from '@reduxjs/toolkit';

// internal
import { userSlice } from './slices';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export const { setCurrentUser, resetCurrentUser } = userSlice.actions