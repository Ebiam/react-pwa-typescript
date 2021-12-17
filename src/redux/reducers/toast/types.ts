export type Severity = "error" | "success" | "info" | "warning";

// Use enums for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum ToastActionTypes {
    SET_SEVERITY = '@@toast/SET_SEVERITY',
    SET_MESSAGE = '@@toast/SET_MESSAGE',
    SET_IS_OPEN = '@@toast/SET_IS_OPEN',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ToastState {
    readonly severity: Severity
    readonly message: string,
    readonly isOpen: boolean
}
