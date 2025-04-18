import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import AdminPage from './pages/AdminPage';
import QRCodePage from './pages/QRCodePage';
import DrawPage from './pages/DrawPage';
import { ParticipantProvider } from './context/ParticipantContext';
import { PrizeProvider } from './context/PrizeContext';

function App() {
  return (
    <BrowserRouter>
      <ParticipantProvider>
        <PrizeProvider>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/qrcode" element={<QRCodePage />} />
            <Route path="/draw" element={<DrawPage />} />
          </Routes>
        </PrizeProvider>
      </ParticipantProvider>
    </BrowserRouter>
  );
}

export default App;
