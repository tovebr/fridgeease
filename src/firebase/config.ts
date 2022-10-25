import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBE7uzXAQGzdrzCl0jZ0vZdZ6hcM-o6Dw4',
  authDomain: 'fridgeease-38b30.firebaseapp.com',
  projectId: 'fridgeease-38b30',
  storageBucket: 'fridgeease-38b30.appspot.com',
  messagingSenderId: '48127403941',
  appId: '1:48127403941:web:7adcb9127cbd8d93336a4c',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
