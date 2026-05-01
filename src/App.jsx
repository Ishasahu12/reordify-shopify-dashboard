import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import FreeDashboard from './pages/FreeDashboard';
import PremiumDashboard from './pages/PremiumDashboard';
import InventoryPage from './pages/InventoryPage';
import ReorderPage from './pages/ReorderPage';
import POReviewPage from './pages/POReviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DashboardLayout from './components/DashboardLayout';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FreeDashboard />} />
        <Route path="/dashboard/premium" element={
          <DashboardLayout>
            <PremiumDashboard />
          </DashboardLayout>
        } />
        <Route path="/dashboard/inventory" element={
          <DashboardLayout>
            <InventoryPage />
          </DashboardLayout>
        } />
        <Route path="/dashboard/reorder" element={
          <DashboardLayout>
            <ReorderPage />
          </DashboardLayout>
        } />
        <Route path="/purchase-orders/review" element={
          <DashboardLayout>
            <POReviewPage />
          </DashboardLayout>
        } />
        <Route path="/dashboard/analytics" element={
          <DashboardLayout>
            <AnalyticsPage />
          </DashboardLayout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;