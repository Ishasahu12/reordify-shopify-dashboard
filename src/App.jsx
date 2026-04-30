import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import FreeDashboard from './pages/FreeDashboard';
import PremiumDashboard from './pages/PremiumDashboard';
import InventoryPage from './pages/InventoryPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FreeDashboard />} />
        <Route path="/dashboard/premium" element={<PremiumDashboard />} />
        <Route path="/dashboard/inventory" element={<InventoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
