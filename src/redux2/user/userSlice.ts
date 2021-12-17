import { /*createAsyncThunk, */createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState/*, AppThunk */} from '../store/store';
//import { fetchCount } from './counterAPI';

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
  }
});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const rs_isLogged = (state: RootState) => state.counter.value;

export default userSlice.reducer;
