import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';

type Severity = "error" | "success" | "info" | "warning";

const defaultMessage: string = "Oops ! An error happened !";

// Define a type for the slice state
interface ToastState {
  isConnected: boolean;
  isOpen: boolean,
  message: string,
  severity: Severity
};

// Define the initial state using that type
const initialState: ToastState = {
  isConnected: false,
  isOpen: false,
  message: defaultMessage,
  severity: "warning"
};

export const toastSlice = createSlice({
  name: 'toast',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setSeverity: (state, action: PayloadAction<Severity>) => {
      state.severity = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  }
});

export const { setSeverity, setMessage, setOpen} = toastSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const rs_isOpen = (state: RootState) => state.toast.isOpen;

export default toastSlice.reducer;
