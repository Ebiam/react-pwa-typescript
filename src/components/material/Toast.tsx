import Snackbar/*, { SnackbarOrigin } */from '@mui/material/Snackbar';
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux2/store/hooks";
//import ApiHelper from "../../services/ApiHelper";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {RootState} from "../../redux2/store/store";
import { setOpen/*, setMessage, setSeverity */} from '../../redux2/toast/toastSlice';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {

    const dispatch = useAppDispatch();

    const isOpen = useAppSelector((state: RootState) => state.toast.isOpen);
    const message = useAppSelector((state: RootState) => state.toast.message);
    const snackSeverity = useAppSelector((state: RootState) => state.toast.severity);

    //type Severity = "error" | "success" | "info" | "warning";
    //const snackSeverities : [Severity, Severity, Severity, Severity] = ["success", "info", "warning", "error"];
    //const isOpen = true;//useAppSelector(state => state.toast.isOpen);

    /*const login = (username: string, password: string, keepAlive: boolean) => {
        ApiHelper.login(username, password).then((res) => {
            console.log('[Login] ok' , res);
        }).catch((err) => {
            console.error("[Login]", err);
            console.log(err.response.status);

            let message = "Oops ! An error happened !";
            let severity = 2;

            switch (err.response.status) {
                case 401:
                    message = "You must be logged to do this";
                    severity = 2;
            }
            dispatch(setSeverity(snackSeverities[severity]));
            dispatch(setMessage(message));
            dispatch(setOpen(true));
        })
    };*/




    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setOpen(false))
    };

    return (
            <Snackbar
                anchorOrigin={{ vertical: 'top',
                    horizontal: 'center' }}
                autoHideDuration={6000}
                open={isOpen}
                key={'topcenter'}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackSeverity}>{message}</Alert>
            </Snackbar>
    );
};
