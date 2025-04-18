import React, { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runBasicTest = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      // Test verisi
      const testData = {
        testField: 'Test veri',
        timestamp: new Date().toISOString()
      };
      
      console.log('Test verisi ekleniyor:', testData);
      
      // Test koleksiyonuna veri ekle
      const docRef = await addDoc(collection(db, 'test_collection'), testData);
      console.log('Test verisi eklendi, ID:', docRef.id);
      
      // Eklenen veriyi oku
      const querySnapshot = await getDocs(collection(db, 'test_collection'));
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setTestResult({
        success: true,
        message: 'Firebase testi başarılı!',
        docId: docRef.id,
        documents
      });
    } catch (error) {
      console.error('Test hatası:', error);
      setTestResult({
        success: false,
        message: 'Firebase testi başarısız!',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>Firebase Bağlantı Testi</h3>
      
      <button 
        className="btn" 
        onClick={runBasicTest}
        disabled={loading}
      >
        {loading ? 'Test Çalışıyor...' : 'Basit Test Çalıştır'}
      </button>
      
      {testResult && (
        <div className={testResult.success ? 'success-message' : 'error'} style={{ marginTop: '15px' }}>
          <p><strong>Durum:</strong> {testResult.success ? 'Başarılı' : 'Başarısız'}</p>
          <p><strong>Mesaj:</strong> {testResult.message}</p>
          
          {testResult.docId && (
            <p><strong>Eklenen Belge ID:</strong> {testResult.docId}</p>
          )}
          
          {testResult.error && (
            <p><strong>Hata:</strong> {testResult.error}</p>
          )}
          
          {testResult.documents && (
            <div>
              <p><strong>Veritabanından Okunan Belgeler:</strong></p>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
                {JSON.stringify(testResult.documents, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;
