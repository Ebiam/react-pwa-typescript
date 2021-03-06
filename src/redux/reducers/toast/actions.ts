import { action } from 'typesafe-actions'

import { ToastActionTypes, Severity } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const setSeverity = (severity: Severity) => action(ToastActionTypes.SET_SEVERITY, severity);
export const setMessage = (message: string) => action(ToastActionTypes.SET_MESSAGE, message);
export const setIsOpen = (isOpen: boolean) => action(ToastActionTypes.SET_IS_OPEN, isOpen);
