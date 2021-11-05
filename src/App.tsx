import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Link.css';
import Subscribebutton from './components/SubscribeButton';
import {urlBase64ToUint8Array} from "./utils/notificationUtils";
import axios from "axios";
import MenuNavbar from './components/material/MenuNavbar';
import Links from './components/Links';
import pdp from './assets/image_avatar.jpg';

function App() {
    const [isSub, setSub] = useState(false);

  const vapidPublicKey = "BM0AYWnrNIo1NGaYDYgok4I-xtyB1NZidBV0MtUKEdx8jKIDaO7g8b9eOjNAOgFuf80mSyyGGoFUf3UNOBK_lqQ";
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  const subscribePush = () => {
      console.log('slt');
    navigator.serviceWorker.ready.then(registration => {
      if (!registration.pushManager) {
        alert("Push Unsupported");
        return
      }

      console.log(convertedVapidKey);
      registration.pushManager
          .subscribe({
            userVisibleOnly: true, //Always display notifications
            applicationServerKey: convertedVapidKey//convertedVapidKey
          })
          .then(subscription => {
            console.log('Sending api request');
            console.log(subscription);
            axios.post("https://node-backend-pwa.herokuapp.com/notification", subscription).then((res) => {
              console.log('Send ok');
              console.log(res);
              console.log(res.data);
              setSub(!isSub);
            })
          })
          .catch(err => console.error("Push subscription error: ", err))
    })
  };

    const unsubscribePush = () => {
      navigator.serviceWorker.ready.then(registration => {
        //Find the registered push subscription in the service worker
        registration.pushManager.getSubscription().then(subscription => {
          if (!subscription) {
            return
            //If there isn't a subscription, then there's nothing to do
          }

          subscription
              .unsubscribe()
              .then(() => {
                /*axios.delete("/api/push/unregister")*/
                console.log('unsubed');
                setSub(!isSub);
              }).catch(err => console.error(err))
        }).catch((err) => console.error(err))
      })
    };



  return (
      <>
      <div className={"Page-content"}>
          <MenuNavbar/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <img className="fit-picture"
               src={pdp}
               alt="Grapefruit slice atop a pile of other slices"
               style={{borderRadius: '50%',width:'200px', height:'auto'}}
          />
          </div>

        <div className={"Title-container"}>
          <p>Enzo Biamonti</p>
        </div>
        <div className={"Buttons-container"} >
          <button onClick={() => {
            if (!isSub)
              subscribePush();
            else
              unsubscribePush();
          }}>Subscribe to notifications</button>
        </div>


          <Links/>


      </div>
      </>
  );
}

export default App;
