import React from 'react';

const WinnerDisplay = ({ winners }) => {
  // Ödüllere göre gruplandırılmış kazananlar
  const groupedWinners = winners.reduce((groups, winner) => {
    const prize = winner.prizeName;
    if (!groups[prize]) {
      groups[prize] = {
        name: prize,
        sponsor: winner.prizeSponsor,
        winners: []
      };
    }
    groups[prize].winners.push(winner);
    return groups;
  }, {});

  return (
    <div className="winner-display">
      <h2>Çekiliş Sonuçları</h2>
      
      {Object.values(groupedWinners).map((group, index) => (
        <div key={index} className="prize-group card" style={{ marginBottom: '20px' }}>
          <h3 className="prize-title">{group.name}</h3>
          <p className="sponsor-name">Sponsor: {group.sponsor}</p>
          
          <div className="winners-list">
            {group.winners.map((winner, idx) => (
              <div key={idx} className="winner-card winner-animation">
                <h4>{winner.firstName} {winner.lastName}</h4>
                <p>{winner.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnerDisplay;
