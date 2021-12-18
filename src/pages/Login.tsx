import MenuNavbar from "../components/material/MenuNavbar";
import LoginForm from "../components/material/LoginForm";
import Snackbar/*, { SnackbarOrigin } */from '@mui/material/Snackbar';
import React from "react";
import {useAppSelector} from "../redux/hooks";
import ApiHelper from "../services/ApiHelper";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
//import {useLocation} from "react-router-dom";
import {login} from '../redux2/user/userSlice';
import {useAppDispatch} from '../redux2/store/hooks';
import {useNavigate} from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {

    const isLogged = useAppSelector(state => state.user.isLogged);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLogged) {
            navigate('/user');
        }
    });

    const _login = (username: string, password: string, keepAlive: boolean) => {
        ApiHelper.login(username, password).then((res: any) => {
            console.log('[Login] ok' , res);
            dispatch(login({token: res.data.token, username: username}));
            navigate('/user');
        }).catch((err) => {
            console.error("[Login]", err);
            //console.log(err.response.status);

            let message = "Oops ! An error happened !";
            let severity = 2;

            switch (err.response.status) {
                case 401:
                    message = "You must be logged to do this";
                    severity = 2;
            }
            setSnackSeverity(severity);
            setMessage(message);
            setOpenSnack(true);
        })
    };

    const register = (username: string, password: string, keepAlive: boolean) => {
        ApiHelper.register(username, password).then((res) => {
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
            setSnackSeverity(severity);
            setMessage(message);
            setOpenSnack(true);
        })
    };

    const [openSnack, setOpenSnack] = React.useState(false);
    type Severity = "error" | "success" | "info" | "warning";
    const snackSeverities : [Severity, Severity, Severity, Severity] = ["success", "info", "warning", "error"];
    const [snackSeverity, setSnackSeverity] = React.useState(0);
    const [message, setMessage] = React.useState("Oops ! An error happened !");


    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false)
    };

    return (
        <div className={"Page-content"}>
            <MenuNavbar isLogged={isLogged}/>
            <div className="center">
                <LoginForm login={_login} register={register}/>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top',
                    horizontal: 'center' }}
                autoHideDuration={6000}
                open={openSnack}
                key={'topcenter'}
                onClose={handleClose}
            >
                <Alert onClose={handleClose}  severity={snackSeverities[snackSeverity]}>{message}</Alert>
            </Snackbar>
        </div>
    );
};
