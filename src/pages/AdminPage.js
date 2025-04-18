import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ParticipantContext } from '../context/ParticipantContext';
import { PrizeContext } from '../context/PrizeContext';
import ParticipantList from '../components/ParticipantList';
import { testFirebaseConnection } from '../firebase/test-connection';

const AdminPage = () => {
  const { participants, loading: participantsLoading, error: participantsError, refreshParticipants } = useContext(ParticipantContext);
  const { prizes, loading: prizesLoading, error: prizesError, refreshPrizes } = useContext(PrizeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshParticipants();
    await refreshPrizes();
    setRefreshing(false);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    
    try {
      const result = await testFirebaseConnection();
      setConnectionResult(result);
    } catch (error) {
      setConnectionResult({
        success: false,
        message: 'Bir hata oluştu.',
        error: error.message
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const loading = participantsLoading || prizesLoading;
  const error = participantsError || prizesError;

  return (
    <div className="container">
      <div className="header">
        <h1>ReactXchem Çekiliş Yönetimi</h1>
      </div>

      <div className="card">
        <h2>Yönetim Paneli</h2>

        {error && <div className="error">{error}</div>}

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            {refreshing ? 'Yenileniyor...' : 'Verileri Yenile'}
          </button>

          <Link to="/qrcode" className="btn">
            QR Kod Oluştur
          </Link>

          <Link to="/draw" className="btn btn-accent">
            Çekilişi Başlat
          </Link>
          
          <button
            className="btn"
            onClick={handleTestConnection}
            disabled={testingConnection}
          >
            {testingConnection ? 'Test Ediliyor...' : 'Firebase Bağlantısını Test Et'}
          </button>
        </div>
        
        {connectionResult && (
          <div className={`card ${connectionResult.success ? 'success-message' : 'error'}`} style={{ marginBottom: '20px' }}>
            <h3>Firebase Bağlantı Testi</h3>
            <p><strong>Durum:</strong> {connectionResult.success ? 'Başarılı' : 'Başarısız'}</p>
            <p><strong>Mesaj:</strong> {connectionResult.message}</p>
            {connectionResult.docId && <p><strong>Test Belge ID:</strong> {connectionResult.docId}</p>}
            {connectionResult.error && <p><strong>Hata:</strong> {connectionResult.error}</p>}
          </div>
        )}

        <div className="card">
          <h3>Ödül Listesi</h3>
          {loading ? (
            <p>Ödüller yükleniyor...</p>
          ) : (
            <ul>
              {prizes.map((prize) => (
                <li key={prize.id} className="prize-card">
                  <h4 className="prize-title">{prize.name}</h4>
                  <p className="sponsor-name">Sponsor: {prize.sponsor}</p>
                  <p className="quantity">Kazanan Sayısı: {prize.quantity}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3>Katılımcı Listesi</h3>
          {loading ? (
            <p>Katılımcılar yükleniyor...</p>
          ) : (
            <ParticipantList participants={participants} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
