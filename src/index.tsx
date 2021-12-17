import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux2/store/store';
//import configureStore from './redux/configureStore'
//import { setOpen } from './redux2/toast/toastSlice';
//import {useAppDispatch} from './redux2/store/hooks';



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



function invokeServiceWorkerUpdateFlow(registration: ServiceWorkerRegistration) {
    // TODO implement your own UI notification element


    /*notification.show("New version of the app is available. Refresh now?");
    notification.addEventListener('click', () => {
        if (registration.waiting) {
            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    })*/

    console.log('invokeServiceWorkerUpdateFlow !!');
    alert('New version available!  Ready to update?');
    if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    //useAppDispatch();
    if (navigator && navigator.serviceWorker) {
        navigator!.serviceWorker!.onmessage = (event) => {
            if (event.data && event.data.type === 'TEST') {
                console.log("MESSSSAGE FROM SERVICE WORKER", event.data.count)
            }
        };

        navigator!.serviceWorker!.controller!.postMessage({
            type: 'REGISTER',
        });
    }

    setInterval(()=>window.location.reload(), 5000);
    //window.location.pathname = '/';
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    //onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate: invokeServiceWorkerUpdateFlow,
});



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
