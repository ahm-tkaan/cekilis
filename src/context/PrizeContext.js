import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const PrizeContext = createContext();

export const PrizeProvider = ({ children }) => {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ReactXchem etkinliği için belirlenen ödülleri tanımla
  const defaultPrizes = [
    {
      name: "Yves Rocher Bakım Seti",
      sponsor: "Yves Rocher",
      quantity: 3,
      winners: []
    },
    {
      name: "Pentagon Konser Bileti",
      sponsor: "Pentagon",
      quantity: 10,
      winners: []
    },
    {
      name: "Youthall Termos",
      sponsor: "Youthall",
      quantity: 3,
      winners: []
    },
    {
      name: "Youthall Sırt Çantası",
      sponsor: "Youthall",
      quantity: 20,
      winners: []
    },
    {
      name: "Ücretsiz Eğitim",
      sponsor: "Sigmacert Global",
      quantity: 5, // Varsayılan değer, daha sonra güncellenebilir
      winners: []
    },
    {
      name: "Özel Parfüm Atölyesi",
      sponsor: "Mehmet Mor",
      quantity: 20,
      winners: []
    },
    {
      name: "D Vitamini ve Magnezyum Takviyesi",
      sponsor: "İlko İlaç",
      quantity: 10,
      winners: []
    }
  ];

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'prizes'));
        
        // Eğer veritabanında ödül yoksa, varsayılan ödülleri ekle
        if (querySnapshot.empty) {
          const prizesPromises = defaultPrizes.map(prize => 
            addDoc(collection(db, 'prizes'), prize)
          );
          
          await Promise.all(prizesPromises);
          
          // Eklenen ödülleri tekrar getir
          const newQuerySnapshot = await getDocs(collection(db, 'prizes'));
          const prizeList = newQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setPrizes(prizeList);
        } else {
          const prizeList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setPrizes(prizeList);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Ödüller yüklenirken hata oluştu:', err);
        setError('Ödüller yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPrizes();
    // defaultPrizes bağımlılık olarak eklendi
  }, [defaultPrizes]);

  const updatePrize = async (id, data) => {
    try {
      const prizeRef = doc(db, 'prizes', id);
      await updateDoc(prizeRef, data);
      
      setPrizes(prizes.map(prize => 
        prize.id === id ? { ...prize, ...data } : prize
      ));
      
      return { success: true };
    } catch (err) {
      console.error('Ödül güncellenirken hata oluştu:', err);
      setError('Ödül güncellenirken bir hata oluştu.');
      return { success: false, error: err.message };
    }
  };

  const refreshPrizes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'prizes'));
      const prizeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPrizes(prizeList);
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Ödüller yenilenirken hata oluştu:', err);
      setError('Ödüller yenilenirken bir hata oluştu.');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return (
    <PrizeContext.Provider value={{
      prizes,
      loading,
      error,
      updatePrize,
      refreshPrizes
    }}>
      {children}
    </PrizeContext.Provider>
  );
};
