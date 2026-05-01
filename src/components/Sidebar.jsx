import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const T = {
  accent: '#07D568',
  accentDark: '#062912',
  accentSoft: 'rgba(7,213,104,0.08)',
  text: '#12151f',
  muted: '#5f6678',
  line: 'rgba(18,21,31,0.08)',
};

function NavIcon({ type, size = 18, color = 'currentColor' }) {
  const icons = {
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    inventory: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    reorder: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    purchaseOrders: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1.5" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    analytics: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    chevronLeft: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    chevronRight: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  };
  return icons[type] || null;
}

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard/premium', activeIf: '/dashboard/premium' },
  { label: 'Inventory', icon: 'inventory', to: '/dashboard/inventory', activeIf: '/dashboard/inventory' },
  { label: 'Reorder', icon: 'reorder', to: '/dashboard/reorder', activeIf: '/dashboard/reorder' },
  { label: 'Purchase Orders', icon: 'purchaseOrders', to: '/purchase-orders/review', activeIf: '/purchase-orders' },
  { label: 'Analytics', icon: 'analytics', to: '/dashboard/analytics', activeIf: '/dashboard/analytics' },
  { label: 'Settings', icon: 'settings', to: '#', activeIf: null },
];

const STORAGE_KEY = 'reordify-sidebar-collapsed';

function Tooltip({ children, label, visible }) {
  if (!visible) return children;
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-lg bg-[var(--color-text)] text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg">
        {label}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[var(--color-text)]" />
      </div>
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Persist collapse state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isCollapsed));
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '68px' : '240px');
  }, [isCollapsed]);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Determine active item from current route
  const getActiveItem = useCallback(() => {
    const path = location.pathname;
    return navItems.find(item => {
      if (!item.activeIf) return false;
      return path.startsWith(item.activeIf);
    });
  }, [location.pathname]);

  const activeItem = getActiveItem();

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <aside
      className={`flex flex-col border-r border-[var(--color-line)] bg-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
      style={{ height: '100vh', position: 'sticky', top: 0, zIndex: 20 }}
    >
      {/* Logo */}
      <div className={`px-6 py-7 border-b border-[var(--color-line)] transition-all duration-300 ${isCollapsed ? 'px-4 justify-center flex' : ''}`}>
        <div className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Reordify" className={`h-8 w-auto object-contain transition-all duration-300 ${isCollapsed ? 'w-8' : ''}`} />
          {!isCollapsed && (
            <span className="font-display text-[15px] font-bold text-[var(--color-text)] whitespace-nowrap">
              Reordify
            </span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = activeItem?.label === item.label;

          return (
            <Tooltip key={item.label} label={item.label} visible={isCollapsed}>
              <Link
                to={item.to}
                className={`relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-text)]'
                    : 'text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] hover:text-[var(--color-text)]'
                } ${isInitialized ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  animation: isActive && isInitialized ? 'subtle-pulse 0.5s ease-out' : 'none',
                }}
              >
                {/* Active indicator bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full transition-all duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ background: T.accent }}
                />

                {/* Icon */}
                <span className={`flex h-5 w-5 items-center justify-center shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]'
                }`}>
                  <NavIcon type={item.icon} size={18} color={isActive ? T.accent : T.muted} />
                </span>

                {/* Label */}
                {!isCollapsed && (
                  <span className={`flex-1 whitespace-nowrap overflow-hidden transition-all duration-200 ${
                    isActive ? 'font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>
                )}

                {/* Active dot (only when collapsed) */}
                {isActive && isCollapsed && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
                )}
              </Link>
            </Tooltip>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-[var(--color-line)]">
        <button
          onClick={toggleCollapse}
          className={`flex items-center justify-center w-full py-2.5 rounded-xl transition-all duration-200 ${
            isCollapsed
              ? 'hover:bg-[rgba(18,21,31,0.05)] text-[var(--color-muted)]'
              : 'hover:bg-[rgba(18,21,31,0.03)] text-[var(--color-muted)]'
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            <NavIcon type={isCollapsed ? 'chevronRight' : 'chevronLeft'} size={16} />
          </span>
          {!isCollapsed && (
            <span className="ml-2 text-[12px] font-medium">Collapse</span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </aside>
  );
}