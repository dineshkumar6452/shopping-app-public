// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js");

// Your Firebase config (copy from Firebase Console)
firebase.initializeApp({
  apiKey: "AIzaSyAGETSRv4QOsMlpwmuZCgWQjV8qzRwmcTM",
  authDomain: "push-notification-8a295.firebaseapp.com",
  projectId: "push-notification-8a295",
  storageBucket: "push-notification-8a295.firebasestorage.app",
  messagingSenderId: "739439719671",
  appId: "1:739439719671:web:8b8f4f95354ae094958ff2",
  measurementId: "G-4K3Q6KJ4ZF"
});

// Initialize messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icons/Icon-192.png", // optional
  });
});
