/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')


const firebaseConfig = {
  apiKey: "AIzaSyCP984y2HskeDPyrybPj7LCSutsslByBBM",
  authDomain: "feild-service-assistant.firebaseapp.com",
  projectId: "feild-service-assistant",
  storageBucket: "feild-service-assistant.appspot.com",
  messagingSenderId: "805339234189",
  appId: "1:805339234189:web:b81f6cee2be6f8c9e8c7c4",
  measurementId: "G-DT5C69W12V"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(' Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkFirst()
)
