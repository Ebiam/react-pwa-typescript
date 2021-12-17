import MenuNavbar from "../components/material/MenuNavbar";
import Button from '@mui/material/Button';
import React from "react";
import './Home.css';
import {useNavigate} from 'react-router-dom';

import {useAppDispatch} from '../redux2/store/hooks';
import {RootState} from '../redux2/store/store';
import { login, logout } from '../redux2/user/userSlice';
import  {useAppSelector} from "../redux2/store/hooks";
//import Toast from "../components/material/Toast";
import { setOpen } from '../redux2/toast/toastSlice';


export default function Home() {
    const navigate = useNavigate();

    // The `state` arg is correctly typed as `RootState` already
    const isLogged = useAppSelector((state: RootState) => state.user.isLogged)//useAppSelector(r_isLogged);
    //const toastShow = useAppSelector((state: RootState) => state.counter.value)
    const dispatch = useAppDispatch();


    /*React.useEffect(() => {

        navigator.serviceWorker.ready.then(worker => {
            worker.active.postMessage({type: 'REGISTER'});
        });

        navigator!.serviceWorker!.ready!.then((registration) => {
            // At this point, a Service Worker is controlling the current page
            console.log('[HOME] SW ready ');

            if (navigator.serviceWorker) {
                console.log('OK 1');
                if (navigator.serviceWorker.controller != null) {
                    console.log('OKOKOKOKOKOKOKOKO 2');
                    if (navigator.serviceWorker.controller.postMessage != null) {
                        console.log('OKOKOKOKOKOKOKOKOKOKOK 3');
                    }
                }
                else
                    console.log("KO 2");
            }
            else
                console.log('KOOOOOOOOOOOOOOOOOOO')
            navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage && navigator!.serviceWorker!.controller!.postMessage!({
                type: 'REGISTER',
            });

            navigator!.serviceWorker!.onmessage = (event) => {
                console.log("[HOME] MESSSSAGE FROM SERVICE WORKER", event);
                if (event.data && event.data.type === 'TEST') {
                    console.log("MESSSSAGE FROM SERVICE WORKER", event.data.count)
                }
            };

        }).then(() => {
            if (navigator.serviceWorker) {
                console.log('OK 1');
                if (navigator.serviceWorker.controller != null) {
                    console.log('OKOKOKOKOKOKOKOKO 2');
                    if (navigator.serviceWorker.controller.postMessage != null) {
                        console.log('OKOKOKOKOKOKOKOKOKOKOK 3');
                    }
                }
                else
                    console.log("KO 2");
            }
            else
                console.log('KOOOOOOOOOOOOOOOOOOO')
        });

        if (navigator && navigator.serviceWorker) {
            navigator.serviceWorker.ready.then((registration) => {
                // At this point, a Service Worker is controlling the current page
                console.log('[HOME] SW ready ');

                navigator!.serviceWorker!.controller!.postMessage({
                    type: 'REGISTER',
                });

            });
            navigator!.serviceWorker!.onmessage = (event) => {
                if (event.data && event.data.type === 'TEST') {
                    console.log("MESSSSAGE FROM SERVICE WORKER", event.data.count)
                }
            };
        }else
            console.log("OHNONONONONONO");

        navigator.serviceWorker.addEventListener('message', event => {
            console.log(event.data.msg, event.data.url);
            console.log("OK FROM SEND MESSAGE ");
        });
        window.addEventListener('message', event => {
            //console.log(event.data.msg, event.data.url);
            console.log("WIN OK FROM SEND MESSAGE ", event.data, event.data.count, event.data.payload);
        });
    }, []);*/

    return (
        <div className={"Page-content"}>
            <MenuNavbar isLogged={isLogged}/>
            <div className={'home-content'}>
                <p style={{fontFamily: 'Mochiy Pop One', fontSize:'10vw', maxHeight: '30vh'}}>FollowMe!</p>
            </div>
            <div style={{marginInline: 25, alignItems: 'center', textAlign: 'center'}}>
                <p style={{
                    verticalAlign: 'middle',
                    lineHeight: '1.5',
                    display: 'inline-block'
                }}>
                    Tired to search your friend's different username in all social medias ? <br/>
                    You find it painful to give all your socials everytime you meet someone new ? <br/>
                    Angry to miss content because the creator put Instagram before TikTok ? <br/><br/>
                    This is the solution. All the socials in one page. One page to rule them all. <br/>
                </p>
            </div>
            <div className={'home-content'}>
                <Button variant="contained" onClick={() => navigate('login')}>Let's go !</Button>
                <Button variant="contained" onClick={() => navigate('user')}>Random user</Button>
                <Button variant="contained" onClick={() =>
                    dispatch(isLogged ? logout() : login("tkt"))
                }>{isLogged ? "logout" : "login"}</Button>
                <Button variant="contained" onClick={() =>
                    dispatch(setOpen(true))
                }>Open toast</Button>
            </div>

        </div>
    );
};
