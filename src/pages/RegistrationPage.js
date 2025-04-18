import React, { useState, useContext } from 'react';
import { ParticipantContext } from '../context/ParticipantContext';
import RegistrationForm from '../components/RegistrationForm';
import SuccessMessage from '../components/SuccessMessage';
import FirebaseTest from '../components/FirebaseTest';

const RegistrationPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { addParticipant } = useContext(ParticipantContext);
  const [registrationError, setRegistrationError] = useState('');
  const [showTest, setShowTest] = useState(false);

  const handleRegistration = async (formData) => {
    try {
      console.log('Form verileri gönderiliyor:', formData);
      const result = await addParticipant(formData);
      
      console.log('Kayıt işlemi sonucu:', result);
      
      if (result.success) {
        setIsRegistered(true);
        setRegistrationError('');
      } else {
        console.error('Kayıt hatası:', result.error);
        setRegistrationError(`Kayıt işlemi sırasında bir hata oluştu: ${result.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error('Kayıt işlemi exception:', error);
      setRegistrationError(`Beklenmeyen bir hata oluştu: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>ReactXchem Çekiliş Kaydı</h1>
        <p>25 Nisan 2025 Cuma | Konya Teknik Üniversitesi</p>
      </div>

      <div className="card">
        {isRegistered ? (
          <SuccessMessage />
        ) : (
          <>
            <h2>Çekiliş Kayıt Formu</h2>
            <p>Çekilişe katılmak için lütfen aşağıdaki formu doldurun.</p>
            
            {registrationError && (
              <div className="error">{registrationError}</div>
            )}
            
            <RegistrationForm onSubmit={handleRegistration} />
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button 
                onClick={() => setShowTest(!showTest)} 
                className="btn"
                style={{ background: '#6c757d', fontSize: '14px' }}
              >
                {showTest ? 'Firebase Testi Gizle' : 'Firebase Bağlantı Testi Göster'}
              </button>
            </div>
            
            {showTest && <FirebaseTest />}
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
