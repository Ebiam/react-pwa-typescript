import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from "../pages/User";
import Login from "../pages/Login";
import Home from "../pages/Home";
import React from "react";
import Toast from "../components/material/Toast";
import {setOpen, setMessage} from "../redux2/toast/toastSlice";
import {useAppDispatch} from "../redux2/store/hooks";

export default function AppRouter() {

    const dispatch = useAppDispatch();

    React.useEffect(() => {

        navigator.serviceWorker.ready.then(worker => {
            worker!.active!.postMessage({type: 'REGISTER'});
        });

        navigator!.serviceWorker!.onmessage = (event) => {
            console.log("[HOME] MESSSSAGE FROM SERVICE WORKER", event);
            if (event.data && event.data.type)
            {
                switch (event.data.type){
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
                <Route  path="/" element={<Home/>}/>
                <Route  path="/index.html" element={<Home/>}/>
                <Route  path="/user" element={<User/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}
