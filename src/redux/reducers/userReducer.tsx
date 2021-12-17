import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import /*type*/ { RootState } from '../store/store'
import ApiHelper from '../../services/ApiHelper';

// Define a type for the slice state
interface UserState {
    isLogged: boolean,
    token: string
};

// Define the initial state using that type
const initialState: UserState = {
    isLogged: false,
    token: ""
};
/*
 Workaround: cast state instead of declaring variable type
const initialState = {
  value: 0
} as CounterState
*/

interface LoginForm {
    username: string,
    password: string,
    keepAlive: boolean
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLogged = true
        },
        logout: state => {
            state.token = "";
            state.isLogged = false
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
        }
    }
});

export const { login, logout, incrementByAmount } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.isLogged;

export default userSlice.reducer
