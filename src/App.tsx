import React from 'react';
import './App.css';
import './components/Link.css';
import AppRouter from './routes/AppRouter';
import './assets/fonts/MochiyPopOne-Regular.ttf';
import {setOpen} from "./redux2/toast/toastSlice";

const App = () =>  {



        /*navigator.serviceWorker.onmessage = (event) => {
                console.log('[App] navigator.serviceWorker.onmessage');

                if (event.data && event.data.type === 'REPLY_COUNT_CLIENTS') {
                        console.log('[App] navigator.serviceWorker.onmessage')
                }
        };*/

        /*navigator!.serviceWorker!.controller!.postMessage({
                type: 'INCREASE_COUNT_CLIENTS',
        });*/


        return (
            <AppRouter/>
        );
};

export default App;
