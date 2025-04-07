import { deleteApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCk6HcM_HJr61FKzetZgqQtg0hmf1JSjvw",
  authDomain: "limenka360.firebaseapp.com",
  projectId: "limenka360",
  storageBucket: "limenka360.firebasestorage.app",
  messagingSenderId: "311141819812",
  appId: "1:311141819812:web:73356dd3918948b4510d31",
  measurementId: "G-Z5JF09TPGT",
};

let messaging;

if (getApps().length) {
  deleteApp(getApps()[0]);
}

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined" && "Notification" in window) {
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCk6HcM_HJr61FKzetZgqQtg0hmf1JSjvw",
//   authDomain: "limenka360.firebaseapp.com",
//   projectId: "limenka360",
//   storageBucket: "limenka360.firebasestorage.app",
//   messagingSenderId: "311141819812",
//   appId: "1:311141819812:web:73356dd3918948b4510d31",
//   measurementId: "G-Z5JF09TPGT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
