import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParticipantContext } from '../context/ParticipantContext';
import { PrizeContext } from '../context/PrizeContext';
import WinnerDisplay from '../components/WinnerDisplay';
import ConfettiEffect from '../components/ConfettiEffect';

const DrawPage = () => {
  const { participants, updateParticipant, refreshParticipants } = useContext(ParticipantContext);
  const { prizes, updatePrize, refreshPrizes } = useContext(PrizeContext);
  
  const [drawing, setDrawing] = useState(false);
  const [winners, setWinners] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [drawingComplete, setDrawingComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Verileri yenile
    const loadData = async () => {
      await refreshParticipants();
      await refreshPrizes();
    };

    loadData();
  }, [refreshParticipants, refreshPrizes]);

  const conductDraw = async () => {
    if (participants.length === 0) {
      setError('Çekiliş için katılımcı bulunmamaktadır.');
      return;
    }

    setDrawing(true);
    setWinners([]);
    setError('');

    try {
      const availableParticipants = [...participants];
      const drawnWinners = [];
      let allPrizesDrawn = true;

      // Her ödül için çekiliş yap
      for (const prize of prizes) {
        if (availableParticipants.length === 0) {
          allPrizesDrawn = false;
          break;
        }

        // Bu ödül için çekilecek kazanan sayısı
        const winnersCount = Math.min(prize.quantity, availableParticipants.length);
        const prizeWinners = [];

        for (let i = 0; i < winnersCount; i++) {
          // Rastgele bir katılımcı seç
          const randomIndex = Math.floor(Math.random() * availableParticipants.length);
          const winner = availableParticipants[randomIndex];
          
          // Seçilen katılımcıyı kullanılabilir katılımcılar listesinden çıkar
          availableParticipants.splice(randomIndex, 1);
          
          // Kazananı listeye ekle
          prizeWinners.push({
            ...winner,
            prizeName: prize.name,
            prizeSponsor: prize.sponsor
          });

          // Kazananı veritabanında güncelle
          await updateParticipant(winner.id, {
            isWinner: true,
            prize: prize.name
          });
        }

        // Ödül kazananlarını veritabanında güncelle
        const winnerIds = prizeWinners.map(winner => winner.id);
        await updatePrize(prize.id, {
          winners: winnerIds
        });

        // Kazananları toplam listesine ekle
        drawnWinners.push(...prizeWinners);
      }

      // Kazananları ekrana yansıt ve konfeti göster
      setWinners(drawnWinners);
      setShowConfetti(true);
      setDrawingComplete(allPrizesDrawn);
      
      // 10 saniye sonra konfetiyi kapat
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    } catch (err) {
      console.error('Çekiliş sırasında hata oluştu:', err);
      setError('Çekiliş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setDrawing(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>ReactXchem Çekiliş Sonuçları</h1>
      </div>

      {showConfetti && <ConfettiEffect />}

      <div className="card">
        <h2>Çekilişi Başlat</h2>
        
        {error && <div className="error">{error}</div>}
        
        <div style={{ marginBottom: '20px' }}>
          <p>
            Toplam Katılımcı Sayısı: <strong>{participants.length}</strong>
          </p>
          <p>
            Toplam Ödül Sayısı: <strong>{prizes.reduce((total, prize) => total + prize.quantity, 0)}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            className="btn btn-accent"
            onClick={conductDraw}
            disabled={drawing || participants.length === 0}
          >
            {drawing ? 'Çekiliş Yapılıyor...' : drawingComplete ? 'Çekilişi Yenile' : 'Çekilişi Başlat'}
          </button>
          
          <Link to="/admin" className="btn">
            Yönetim Paneline Dön
          </Link>
        </div>

        {winners.length > 0 && (
          <WinnerDisplay winners={winners} />
        )}
      </div>
    </div>
  );
};

export default DrawPage;
