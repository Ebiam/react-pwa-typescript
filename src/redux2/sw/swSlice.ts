import { /*createAsyncThunk, */createSlice, PayloadAction } from '@reduxjs/toolkit';
/*import { RootState, AppThunk } from '../store/store';*/
//import { fetchCount } from './counterAPI';

type SwStateType = "offline" | "pending" | "online";

// Define a type for the slice state
interface SwState {
    state: SwStateType,
    lastUpdate: string
};

// Define the initial state using that type
const initialState: SwState = {
    state: "online",
    lastUpdate: new Date().toString()
};

export const swSlice = createSlice({
    name: 'sw',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<SwStateType>) => {
            state.state = action.payload;
        },
        update: (state, action: PayloadAction<string>) => {
            state.lastUpdate = action.payload;
        },
    }
});

export const { setState, update } = swSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const rs_isLogged = (state: RootState) => state.sw.value;

export default swSlice.reducer;
