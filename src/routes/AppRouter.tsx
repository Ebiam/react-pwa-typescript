import {BrowserRouter, Route, Routes, useLocation/*, useLocation */} from 'react-router-dom';
import User from "../pages/User";
import Login from "../pages/Login";
import Home from "../pages/Home";
import React from "react";
import Toast from "../components/material/Toast";
import {setOpen, setMessage} from "../redux2/toast/toastSlice";
import {useAppDispatch} from "../redux2/store/hooks";
import {createAxiosInterceptor} from "../services/ApiHelper";

function RefreshSwWrapper(props: any) {

    const location = useLocation();
    React.useEffect(() => {
        navigator.serviceWorker
            .getRegistrations()
            .then((regs) => {
                console.log("Page changed !!");
                regs.forEach((reg) => reg.update());
            });
    }, [location]);

    return (
        <>
            {props.component}
        </>
    );
}

function AppRouter() {

    const dispatch = useAppDispatch();

    createAxiosInterceptor();

    React.useEffect(() => {
        navigator.serviceWorker.ready.then(worker => {
            worker!.active!.postMessage({type: 'REGISTER'});
        });

        navigator!.serviceWorker!.onmessage = (event) => {
            console.log("[HOME] MESSSSAGE FROM SERVICE WORKER", event);
            if (event.data && event.data.type)
            {
                switch (event.data.type){
                    case 'OFFLINE':
                        console.log(" OFFLINE MESSSSAGE FROM SERVICE WORKER", event.data.count)
                        break;
                    case 'TEST':
                        console.log(" TEST MESSSSAGE FROM SERVICE WORKER", event.data.count)
                        break;
                    case 'NOTIF':
                        console.log(" NOTIF MESSSSAGE FROM SERVICE WORKER", event.data.message);
                        dispatch(setMessage(event.data.message));
                        dispatch(setOpen(true));
                        break;
                    default:
                        console.log('Unknown message');
                }

            }
        };

    }, [dispatch]);

    return (
        <BrowserRouter basename='/'>
            <Toast/>
            <Routes>
                <Route  path="/" element={<RefreshSwWrapper component={<Home/>}/>}/>
                <Route  path="/index.html" element={<RefreshSwWrapper component={<Home/>}/>}/>
                <Route  path="/user" element={<RefreshSwWrapper component={<User/>}/>}/>
                <Route path="/login" element={<RefreshSwWrapper component={<Login/>}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
