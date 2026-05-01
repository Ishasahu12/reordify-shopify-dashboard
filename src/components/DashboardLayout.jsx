import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('main')?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}