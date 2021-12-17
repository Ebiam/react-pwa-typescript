import { Reducer } from 'redux';
import { ToastState, ToastActionTypes } from './types';

const defaultMessage: string = "Oops ! An error happened !";
// Type-safe initialState!
export const initialState: ToastState = {
    message: defaultMessage,
    severity: 'warning',
    isOpen: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ToastState> = (state = initialState, action) => {
    switch (action.type) {
        case ToastActionTypes.SET_MESSAGE: {
            return { ...state, message: action.payload }
        }
        case ToastActionTypes.SET_IS_OPEN: {
            return { ...state, isOpen: action.payload }
        }
        case ToastActionTypes.SET_SEVERITY: {
            return { ...state, severity: action.payload }
        }
        default: {
            return state
        }
    }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as toastReducer }
