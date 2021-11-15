/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import BackgroundSync from "./serviceWorkerRegistration";
import {Queue} from 'workbox-background-sync';
import {BackgroundSyncPlugin} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';


declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);


// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
    /*/\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'*/

);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

//Custom Strategy for edit route :


/*
// use of BackgroundSyncPlugin to create a queue with already made background strategy
const bgSyncPlugin = new BackgroundSyncPlugin('editQueue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes) (NOT MANDATORY)
});
*/
// use of basic Queue to be in control, in this case to be able to order a sync manually
const editqueue = new Queue('editQueue', {
    // @ts-ignore
    callbacks: {
        requestWillEnqueue: () => {
            console.log('BAH');
            notificate('We can\'t reach the server! 🛠',
                "Your request has been submitted to the Offline queue. " +
                "The queue will sync with the server when we can contact it.")
        }
    }
});

//Intercept the API call to “POST /edit(/id ?)” with the background sync plugin.
registerRoute(
    /.*\/edit\/.*/,
    new NetworkOnly({
        plugins: [/*bgSyncPlugin*/
            {
                fetchDidFail: async ({request}) => {
                    console.log('PUT ', request);
                    // @ts-ignore
                    await editqueue.pushRequest({request: request});
                },
            }
        ],
    }),
    //bgSyncPlugin will stock our failed request in an indexedDB Queue (editQueue)
    // or in this case, we do it ourselves
    // In both cases NetworkOnly will retry again when network is back (implicit listener sync event)
    'GET'
);

type notification = {
    title: string;
    body: string;
};

self.addEventListener('push', (event: any) => {
    console.log("SW catch push");
    /*console.log('=====');
    console.log(event);
    console.log('=====');
    console.log(event.data);
    console.log('=====');
    console.log(event.data.arrayBuffer);
    console.log('=====');
    console.log(event.data.json);
    console.log('=====');
    console.log(event.data.text);*/
    /*
    event.waitUntil(self.registration.showNotification(title, body))*/
    /*let notification = new Notification(title, {
        body: message,
        tag: 'simple-push-demo-notification',
        icon: icon
    });

    /*notification.addEventListener('click', function() {
        console.log('You CLICKED ON NOTIF !!!');
        /*if (clients.openWindow) {
            clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
        }
    });*/

    try {
        let notification_data;
        if (event.data) {
            notification_data = event.data.json();
        }
        let title = notification_data.title || "Something Has Happened";
        let message = notification_data.message || "Here's something you might want to check out.";
        let icon = "images/favicon-16x16.png";

        let body: object;


        if (event.data && event.data.json) {
            //You can set an original message by passing it on the event.
            body = event.data.json();
        } else {
            body = {body: 'Oops, a dev will be punished !', title: 'I have no message for you, sorry'}
        }
        console.log(body);
        console.log(typeof body);

        const options = {
            // @ts-ignore
            body: body.body,
            icon: icon,
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
            },
        };

        event.waitUntil(
            // @ts-ignore
            self.registration.showNotification(body.title, options))
    }
    catch (e) {
        console.log('SW pushlistn error ');
        console.log(e);
    }
});

function sync(bool: boolean){
    return new Promise((resolve, reject) => {
        if (bool)
            resolve({a: 'b'});
        else
            reject({error: 'a'});
    });
}

// our service worker file
// we create a push notification function so the user knows when the requests are being synced
export const notificate = (title : string, message : string) => {
    if(Notification.permission === 'granted') {
        self.registration.showNotification(title, {
            body: message,
            icon: '/image.png',
            tag: 'service-worker'
        })
    } else {
        console.log("Please activate the notifications, hers the notif you should have recieved :" + message);
        //TODO find a way to ask again ... Or to display that on page (Redux ?, Event ?)
        console.log(message);
    }

};

// let's create our queue
/*const queue = new Queue('myQueue', {
    onSync: async (queue) => {
        let entry;
        while (entry = await queue.shiftRequest()) {
            try {
                await fetch(entry.request);
                console.error('Replay successful for request', entry.request);
            } catch (error) {
                console.error('Replay failed for request', entry.request, error);

                // Put the entry back in the queue and re-throw the error:
                await this.unshiftRequest(entry);
                throw error;
            }
        }
        console.log('Replay complete!');
    }
});*/
const queue = new Queue('myQueue',
    {
        // @ts-ignore
        callbacks: {
            requestWillEnqueue: () => {
                notificate('You are offline! 🛠',
                    "Your request has been submitted to the Offline queue. " +
                    "The queue will sync with the server once you are back online.")
            }
        }
    }
);

/*setInterval(function(){
    /// call your function here
    editqueue.getAll().then((arr) => {
        console.log(typeof arr);
        console.log(arr);
        arr.forEach(e => {
            console.log(e);
        })
    });
}, 5000);*/


self.addEventListener('sync', function(event: any) {
    // When an sync.register is called offline, will be triggered when network is back
    console.log('[ServiceWorker v0.0.5] SYNC event listener Triggered ! : ' + event.tag);

    if (event.tag === 'tryqueue'){
        editqueue.getAll().then((arr) => {
            console.log(typeof arr);
            console.log(arr);
            arr.forEach(e => {
                console.log(e);
            })
        });

        editqueue.replayRequests().then((a) => {
            notificate('Syncing Application... 💾',
                'Any pending requests will be sent to the server.');
            console.log(a);
        }).catch(() =>
            notificate("We could not submit your requests. ❌", "Please hit the 'Sync Pending Requests' button when you regain internet connection.")
        );
    }
    if (event.tag === 'notifPending')
    {
        // Works :  when triggered in offline, will be triggered
        if(Notification.permission === 'granted') {
            console.log('[ServiceWorker] notifPending GRANTED');
            event.waitUntil(self.registration.showNotification("Sync event fired!"));

        } else {
            console.log('[ServiceWorker] notifPending NOT GRANTED');

            event.waitUntil(() => {
                return new Promise(async (resolve, reject) => {
                    console.log('[ServiceWorker] notifPending promise');
                    if (Notification.permission === 'granted') {
                        console.log('[ServiceWorker] notifPending promise');
                        event.waitUntil(self.registration.showNotification("notifPending"));
                        resolve(true);
                    } else {
                        await queue.pushRequest({request: event.request});
                        reject(false);
                    }
                });
            })
        }
    }
    if (event.tag === 'myFirstSync') {
        // Test for not fulfilling a sync (PROBLEM)
        event.waitUntil(
            sync(false)
                .then(data => console.log(data))
                .catch(error => {
                    /* PROBLEM : will try only 3 times, now , in 5 min, then in 15 min,
                        then the requests just get stuck inside indexedDB
                        until a new queued request tries to push the rest, see :
                        https://stackoverflow.com/questions/53786395/service-workers-when-does-the-browser-sync-back-again
                    */
                    console.log('Could not sync; scheduled for the next time (except if it failed 3 times)', error);
                    throw error; // Alternatively, `return Promise.reject(error);`
                })
        );
        /*Notification.requestPermission().then(function(result) {
            if (result !== 'granted') console.log('Error with requestPermission');
            else {
                console.log('requestPermission GRANTED');
                if(Notification.permission === 'granted'){
                    console.log('requestPermission GRANTED 2');
                    self.registration.showNotification("Salut");
                    event.waitUntil(self.registration.showNotification("Salut 2"));
                    navigator.serviceWorker.getRegistration().then(function(reg) {
                        if (reg) {
                            console.log('navigator', navigator)
                            console.log('navigator.serviceWorker', navigator.serviceWorker)
                            console.log('reg', reg)
                            reg.showNotification('Hello world!');
                        } else {
                            console.log('no reg', reg)
                        }
                    })
                }
                event.waitUntil(self.registration.showNotification("Sync event fired!"));
            }
        });*/

        /*if(Notification.permission === 'granted') {
            event.waitUntil(self.registration.showNotification("Sync event fired!"));
        } else {
            //BackgroundSync('notifPending');
            let eventName = 'notifPending';
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                navigator.serviceWorker.ready.then(function (swRegistration: any) {
                    console.log("Background Sync is supported, sync.register : " + eventName);
                    return swRegistration.sync.register(eventName).then(() => console.log('Register OK')).catch(() => console.log('register KO'));
                }).catch(err => {
                    console.log("Background Sync unsupported");
                    console.log(err);

                });
            } else {
                // serviceworker/sync not supported
                console.log("Background Sync unsupported");
            }
        }*/



        /*event.waitUntil(() => {
            return new Promise((resolve, reject) => {
                console.log('[ServiceWorker] myFirstSync event listener Triggered !');
                const body = {body: 'Vous êtes maintenant connecté à internet', title: 'FollowMe!'};
                const options = {
                    // @ts-ignore
                    body: body.body,
                    icon: "images/favicon-16x16.png",
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1,
                    },
                };
                if(Notification.permission === 'granted') {
                    self.registration.showNotification(body.title, options).then(
                        () => {
                            console.log('Notif back ok');
                            return resolve(true)
                        }
                    ).catch((err) => {
                        console.log('Notif back KO');
                        console.log(err);
                        return reject(false)
                    });
                    console.log('Okokokokokokokokok');
                    return resolve(true);
                } else {
                    console.log('Kokokokokokokookokoko');
                    reject(false);
                }

            });


        });*/
    }
});

