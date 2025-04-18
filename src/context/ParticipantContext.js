import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        console.log('Veritabanından katılımcılar getiriliyor...');
        const querySnapshot = await getDocs(collection(db, 'participants'));
        console.log('Veritabanı yanıtı:', querySnapshot);
        
        const participantList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log('Katılımcılar başarıyla getirildi:', participantList);
        setParticipants(participantList);
        setLoading(false);
      } catch (err) {
        console.error('Katılımcılar yüklenirken hata oluştu:', err);
        setError('Katılımcılar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const addParticipant = async (participantData) => {
    try {
      console.log('Katılımcı verileri:', participantData);
      console.log('Firestore referansı:', db);
      
      // serverTimestamp kullanılıyor - daha güvenilir
      const dataToAdd = {
        ...participantData,
        registrationTime: serverTimestamp(),
        isWinner: false,
        prize: null
      };
      
      console.log('Eklenecek veri:', dataToAdd);
      
      // Veritabanına ekleme işlemi
      const docRef = await addDoc(collection(db, 'participants'), dataToAdd);
      console.log('Belge başarıyla eklendi, ID:', docRef.id);
      
      // State güncelleme
      const newParticipant = {
        id: docRef.id,
        ...participantData,
        registrationTime: new Date(), // UI için geçici tarih
        isWinner: false,
        prize: null
      };
      
      setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Katılımcı eklenirken detaylı hata:', err);
      console.error('Hata stack:', err.stack);
      setError('Katılımcı eklenirken bir hata oluştu.');
      return { success: false, error: err.message };
    }
  };

  const updateParticipant = async (id, data) => {
    try {
      const participantRef = doc(db, 'participants', id);
      await updateDoc(participantRef, data);
      
      setParticipants(participants.map(participant => 
        participant.id === id ? { ...participant, ...data } : participant
      ));
      
      return { success: true };
    } catch (err) {
      console.error('Katılımcı güncellenirken hata oluştu:', err);
      setError('Katılımcı güncellenirken bir hata oluştu.');
      return { success: false, error: err.message };
    }
  };

  const refreshParticipants = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'participants'));
      const participantList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setParticipants(participantList);
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Katılımcılar yenilenirken hata oluştu:', err);
      setError('Katılımcılar yenilenirken bir hata oluştu.');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return (
    <ParticipantContext.Provider value={{
      participants,
      loading,
      error,
      addParticipant,
      updateParticipant,
      refreshParticipants
    }}>
      {children}
    </ParticipantContext.Provider>
  );
};
