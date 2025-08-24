// ✅ Import Firebase scripts for Service Worker
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

// ✅ Your Firebase config (same as in main.dart)
const firebaseConfig = {
  apiKey: "AIzaSyD-TqqcHT1qTXM8JQRKHk8ChHKpo8G4HEQ",
  authDomain: "push-notification-web-93c6b.firebaseapp.com",
  projectId: "push-notification-web-93c6b",
  storageBucket: "push-notification-web-93c6b.firebasestorage.app",
  messagingSenderId: "757763376577",
  appId: "1:757763376577:web:abb74d624dca59491b5b40",
};

// ✅ Initialize Firebase in the Service Worker
firebase.initializeApp(firebaseConfig);

// ✅ Retrieve messaging
const messaging = firebase.messaging();

// ✅ Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icons/Icon-192.png", // optional, must exist in your web/icons
    data: {
      url: payload.data?.click_action || "/", // 👈 Pass target URL
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle click on notification
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click Received.", event);

  event.notification.close();

  // 👇 Open the target URL (defaults to home if none)
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
