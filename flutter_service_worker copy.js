// In web/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
      apiKey: "AIzaSyD-TqqcHT1qTXM8JQRKHk8ChHKpo8G4HEQ",
      authDomain: "push-notification-web-93c6b.firebaseapp.com",
      projectId: "push-notification-web-93c6b",
      storageBucket: "push-notification-web-93c6b.firebasestorage.app",
      messagingSenderId: "757763376577",
      appId: "1:757763376577:web:abb74d624dca59491b5b40",
});

const messaging = firebase.messaging();

// Show notification when received in background/terminated
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/Icon-192.png"
  });
});
