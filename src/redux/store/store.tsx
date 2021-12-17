import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/userReducer';
import toastSlice from '../reducers/userReducer';
import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
    toast: toastSlice,
    user: userSlice,
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
/*const store = configureStore({
    reducer: {toast: toastSlice,
        user: userSlice,

    }
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch*/
