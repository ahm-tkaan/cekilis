import { db } from './config';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Firebase bağlantısını test etmek için kullanılacak fonksiyon
export const testFirebaseConnection = async () => {
  try {
    // Test verisi oluştur
    const testData = {
      testField: 'Test Connection',
      timestamp: new Date()
    };
    
    // Veritabanına test verisi ekle
    const docRef = await addDoc(collection(db, 'connection_tests'), testData);
    console.log('Test verisi başarıyla eklendi. Belge ID:', docRef.id);
    
    // Veriyi geri oku
    const querySnapshot = await getDocs(collection(db, 'connection_tests'));
    console.log('Veritabanından veriler okundu:');
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    
    return {
      success: true,
      message: 'Firebase bağlantısı başarılı.',
      docId: docRef.id
    };
  } catch (error) {
    console.error('Firebase bağlantı hatası:', error);
    return {
      success: false,
      message: 'Firebase bağlantısı başarısız.',
      error: error.message
    };
  }
};
