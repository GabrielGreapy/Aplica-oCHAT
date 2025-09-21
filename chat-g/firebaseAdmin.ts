import admin from 'firebase-admin';

const serviceAccount = require( './chat-g-be22c-firebase-adminsdk-fbsvc-7342a6d33a.json');

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const adminAuth = admin.auth();