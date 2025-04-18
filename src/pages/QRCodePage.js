import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRCodePage = () => {
  const qrUrl = window.location.origin;
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      // Download PNG
      const downloadLink = document.createElement('a');
      downloadLink.download = 'reactxchem-qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>ReactXchem Çekiliş QR Kodu</h1>
      </div>

      <div className="card">
        <h2>QR Kodu</h2>
        <p>Aşağıdaki QR kod, katılımcıların çekilişe kaydolabilmesi için kullanılacaktır.</p>

        <div
          ref={qrRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px 0',
            background: 'white',
            padding: '20px',
            borderRadius: '8px'
          }}
        >
          <QRCodeSVG
            value={qrUrl}
            size={250}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={true}
          />
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p>QR Kod URL: <strong>{qrUrl}</strong></p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button className="btn" onClick={downloadQRCode}>
            QR Kodu İndir
          </button>
          <Link to="/admin" className="btn">
            Yönetim Paneline Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
