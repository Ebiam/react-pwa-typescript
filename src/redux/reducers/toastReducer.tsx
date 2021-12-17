import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import /*type*/ { RootState } from '../store/store'
import ApiHelper from '../../services/ApiHelper';

type Severity = "error" | "success" | "info" | "warning";

const defaultMessage: string = "Oops ! An error happened !";

// Define a type for the slice state
interface ToastState {
    isOpen: boolean,
    message: string,
    severity: Severity
};

// Define the initial state using that type
const initialState: ToastState = {
    isOpen: false,
    message: defaultMessage,
    severity: "warning"
};
/*
 Workaround: cast state instead of declaring variable type
const initialState = {
  value: 0
} as CounterState
*/

interface ToastForm {
    username: string,
    password: string,
    keepAlive: boolean
};

export const toastSlice = createSlice({
    name: 'toast',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        show: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isOpen = true
        },
        hide: state => {
            state.message = defaultMessage;
            state.isOpen = false
        },
    }
});

export const { show, hide} = toastSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.isLogged;

export default toastSlice.reducer
