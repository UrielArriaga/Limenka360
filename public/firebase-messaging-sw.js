importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCk6HcM_HJr61FKzetZgqQtg0hmf1JSjvw",
  authDomain: "limenka360.firebaseapp.com",
  projectId: "limenka360",
  storageBucket: "limenka360.firebasestorage.app",
  messagingSenderId: "311141819812",
  appId: "1:311141819812:web:73356dd3918948b4510d31",
  measurementId: "G-Z5JF09TPGT",
};

// Inicializar Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// // Manejar notificaciones en segundo plano
messaging.onBackgroundMessage(payload => {
  const notificationTitle = payload.data?.title || "Nueva Notificación";
  const notificationOptions = {
    body: payload.data?.body || "Tienes una nueva notificación.",
    icon: "/logo.png",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", async event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        // Si hay pestañas abiertas, enviar un mensaje con los query params
        clientList[0].postMessage({
          type: "UPDATE_URL",
          query: "?nuevoParametro=123",
        });

        return clientList[0].focus();
      } else {
        // Si no hay pestañas abiertas, abrir una con los query params
        return clients.openWindow(`https://tuapp.com/dashboard?nuevoParametro=123`);
      }
    })
  );
});

// // self.addEventListener("notificationclick", event => {
// //   event.notification.close(); // Cierra la notificación

// //   const newQueryParam = "nuevoDato=123"; // Modifica esto según lo que necesites

// //   event.waitUntil(
// //     clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
// //       if (clientList.length > 0) {
// //         // Enviar mensaje a TODAS las pestañas abiertas
// //         clientList.forEach(client => {
// //           client.postMessage({ type: "UPDATE_QUERY", query: newQueryParam });
// //           client.focus();
// //         });
// //         return;
// //       }

// //       // Si no hay pestañas abiertas, abrir una nueva
// //       if (clients.openWindow) {
// //         return clients.openWindow(`?${newQueryParam}`);
// //       }
// //     })
// //   );

// //   // event.notification.close(); // Cierra la notificación

// //   // const urlToOpen = event.notification.data?.url || "http://localhost:3000/prueba";

// //   // // Abre la URL en una nueva pestaña
// //   // event.waitUntil(
// //   //   clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
// //   //     for (let client of clientList) {
// //   //       if (client.url === urlToOpen && "focus" in client) {
// //   //         return client.focus();
// //   //       }
// //   //     }
// //   //     if (clients.openWindow) {
// //   //       return clients.openWindow(urlToOpen);
// //   //     }
// //   //   })
// //   // );
// // });
