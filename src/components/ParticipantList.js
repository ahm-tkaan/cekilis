import React, { useState } from 'react';

const ParticipantList = ({ participants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;

  const filteredParticipants = participants.filter(participant => {
    const fullName = `${participant.firstName} ${participant.lastName}`.toLowerCase();
    const phone = participant.phoneNumber ? participant.phoneNumber.toLowerCase() : '';
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || phone.includes(search);
  });

  // Sayfalandırma için indeksleri hesapla
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = filteredParticipants.slice(indexOfFirstParticipant, indexOfLastParticipant);
  
  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredParticipants.length / participantsPerPage);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Arama terimini değiştirme
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
  };

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ad, soyad veya telefon ile ara..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredParticipants.length === 0 ? (
        <p>Katılımcı bulunamadı.</p>
      ) : (
        <>
          <p>Toplam Katılımcı: {filteredParticipants.length}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Ad</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Soyad</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Telefon</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Kayıt Zamanı</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Kazanan</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Ödül</th>
              </tr>
            </thead>
            <tbody>
              {currentParticipants.map((participant) => (
                <tr 
                  key={participant.id} 
                  style={{ 
                    borderBottom: '1px solid #eee',
                    backgroundColor: participant.isWinner ? '#e1f5fe' : 'inherit'
                  }}
                >
                  <td style={{ padding: '8px' }}>{participant.firstName}</td>
                  <td style={{ padding: '8px' }}>{participant.lastName}</td>
                  <td style={{ padding: '8px' }}>{participant.phoneNumber}</td>
                  <td style={{ padding: '8px' }}>
                    {participant.registrationTime instanceof Date
                      ? participant.registrationTime.toLocaleString('tr-TR')
                      : participant.registrationTime?.toDate?.().toLocaleString('tr-TR') || '-'}
                  </td>
                  <td style={{ padding: '8px' }}>
                    {participant.isWinner ? '✅' : '❌'}
                  </td>
                  <td style={{ padding: '8px' }}>
                    {participant.prize || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sayfalandırma */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn"
                style={{ marginRight: '10px' }}
              >
                Önceki
              </button>
              
              <span style={{ margin: '0 10px', lineHeight: '36px' }}>
                Sayfa {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn"
                style={{ marginLeft: '10px' }}
              >
                Sonraki
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ParticipantList;
