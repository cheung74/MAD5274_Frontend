import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAvJ0o4axDKi_KoseVySloIJVS2LDSnWRo",
    authDomain: "mad5274capstone.firebaseapp.com",
    projectId: "mad5274capstone",
    storageBucket: "mad5274capstone.appspot.com",
    messagingSenderId: "435138984385",
    appId: "1:435138984385:web:c573bcda30d65f12259740",
    databaseURL: "https://mad5274capstone-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export default app;
