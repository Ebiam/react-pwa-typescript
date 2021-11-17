import React, {useState} from "react";
import {urlBase64ToUint8Array} from "../utils/notificationUtils";
import MenuNavbar from "../components/material/MenuNavbar";
import pdp from "../assets/image_avatar.jpg";
import Links from "../components/Links";
import ApiHelper from '../services/ApiHelper';
import config from '../config/config';
import BackgroundSync from "../serviceWorkerRegistration";
//import { notificate } from '../service-worker';

export default function User() {
    const [isSub, setSub] = useState(false);

    const convertedVapidKey = urlBase64ToUint8Array(config.vapidPublicKey);

    const verifNotifPermission = (title: string, mess: string) => {
        Notification.requestPermission(function(result) {
            if (result !== 'granted') console.log('Error with requestPermission');
            else send_notification(title, mess);
        });
    };

    function send_notification(title: string, mess: string) {
        let notifTitle = title;
        let notifBody = mess;
        let notifImg = '/image.png';
        let options = {
            body: notifBody,
            icon: notifImg
        }
        /*let notif = */new Notification(notifTitle, options);
        //setTimeout(randomNotification, 30000);
    }

    const subscribePush = () => {
        Notification.requestPermission(function(result) {
            if (result !== 'granted') alert('Please activate notifications to be able to subscribe to an user');
            else console.log('requestPermission GRANTED');
        });

        navigator.serviceWorker.ready.then(registration => {
            if (!registration.pushManager) {
                alert("Push Unsupported");
                return
            }

            console.log(convertedVapidKey);
            if(Notification.permission === 'granted') {
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true, //Always display notifications
                        applicationServerKey: convertedVapidKey//convertedVapidKey
                    })
                    .then(subscription => {
                        console.log('Sending api request');
                        console.log(subscription);
                        ApiHelper.register_notification(subscription).then((res) => {
                            console.log('Send ok');
                            console.log(res);
                            console.log(res.data);
                            setSub(!isSub);
                        })
                    })
                    .catch(err => console.error("Push subscription error: ", err))
            } else {

            }
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
            <div className={"Page-content Insta-background"}>
                <MenuNavbar/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img className="fit-picture"
                         src={pdp}
                         alt="Grapefruit slice atop a pile of other slices"
                         style={{borderRadius: '50%',width:'200px', height:'auto'}}
                    />
                </div>

                <div className={"Title-container"}>
                    <p>Jean BIle</p>
                </div>
                <div className={"Buttons-container"} >
                    <button onClick={() => {
                        if (!isSub)
                            subscribePush();
                        else
                            unsubscribePush();
                    }}>{isSub ? "Unsubscribe" : "Subscribe to notifications"}</button>
                    <button onClick={() => {
                        //verifNotifPermission();
                        BackgroundSync('notifPending');
                    }}>Background Test</button>
                    <button type="button" onClick={() =>
                        BackgroundSync('tryqueue')
                    }>{'Queue Pending Request Lol'}</button>
                    <button type="button" onClick={() =>
                        ApiHelper.edit().then((res) => {
                            console.log('Edit ok');
                            console.log(res);
                            console.log(res.data);
                            setSub(!isSub);
                        }).catch(err => {
                            console.log('Edit KO');

                            verifNotifPermission('We can\'t reach the server! 🛠', "Your request has been submitted to the Offline queue. " +
                                "The queue will sync with the server when we can contact it.");
                            //TODO alert or info snackbar
                            if (navigator.storage && navigator.storage.persist) {
                                navigator.storage.persist().then(persistent => {
                                    if (persistent) {
                                        console.log("Storage will not be cleared except by explicit user action");
                                    } else {
                                        console.warn("Storage may be cleared by the UA under storage pressure.");
                                    }
                                });
                            }

                        })
                    }>{'Edit'}</button>
                </div>


                <Links/>


            </div>
        </>
    );
}
