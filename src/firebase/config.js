import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDLZTtwSsR2vbDo9jcwY3vQEXXz-XNeqws",
  authDomain: "elifincekilisi.firebaseapp.com",
  projectId: "elifincekilisi",
  storageBucket: "elifincekilisi.appspot.com",
  messagingSenderId: "854140188360",
  appId: "1:854140188360:web:3c021df940d85af081d7fd"
};

// Firebase'i başlat
console.log('Firebase yapılandırma başlatılıyor...');
const app = initializeApp(firebaseConfig);

// Firestore veritabanı referansını al
console.log('Firestore DB referansı alınıyor...');
const db = getFirestore(app);

console.log('Firebase başlatma işlemi tamamlandı');

export { db };
