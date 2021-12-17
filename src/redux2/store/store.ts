import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import userReducer from '../user/userSlice';
import toastReducer from '../toast/toastSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    toast: toastReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
