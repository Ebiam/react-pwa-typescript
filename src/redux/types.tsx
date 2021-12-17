export namespace StoreState {

    export interface UserState {
        isLogged: boolean,
        token: string
    };

    export type Severity = "error" | "success" | "info" | "warning";

    export interface ToastState {
        isOpen: boolean,
        message: string,
        severity: Severity
    };

    export type All = {
        user: UserState
        toast: ToastState
    }
}
