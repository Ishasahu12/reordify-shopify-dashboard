import React, { useState, useEffect, useRef } from 'react';
import './index.css';

/* ─────────────────────────────────────────────
   DESIGN TOKENS (from Reordify codebase)
   ───────────────────────────────────────────── */
const T = {
  accent: '#07D568',
  accentDark: '#062912',
  accentSoft: 'rgba(7,213,104,0.10)',
  accentSoft2: 'rgba(7,213,104,0.12)',
  text: '#12151f',
  muted: '#5f6678',
  line: 'rgba(18,21,31,0.08)',
  lineStrong: 'rgba(18,21,31,0.18)',
  alert: '#e5484d',
  alertSoft: 'rgba(229,72,77,0.12)',
  surface: 'rgba(255,255,255,0.82)',
  white: '#ffffff',
  purple: 'rgba(140,102,255,0.12)',
  purpleAccent: 'rgba(140,102,255,0.42)',
  fontDisplay: "'Poppins', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  radiusSm: '12px',
  radiusMd: '18px',
  radiusLg: '28px',
  shadowSoft: '0 20px 60px rgba(23,28,45,0.08)',
  shadowLift: '0 26px 70px rgba(23,28,45,0.12)',
  easeOut: 'cubic-bezier(.22,1,.36,1)',
};

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
   ───────────────────────────────────────────── */

function LogoMark() {
  return (
    <img src="/logo.jpeg" alt="Reordify" className="h-10 w-auto object-contain" />
  );
}

function BtnPrimary({ children, loading, onClick, disabled, fullWidth }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="hover-lift focus-ring rounded-full bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.28)] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      style={fullWidth ? { width: '100%' } : {}}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}

function BtnGhost({ children, loading, onClick, disabled, fullWidth }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="hover-lift focus-ring rounded-full border border-[var(--color-line)] bg-white px-6 py-4 text-base font-semibold text-[var(--color-text)] transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      style={fullWidth ? { width: '100%' } : {}}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   SHARED SVG ICON SYSTEM (stroke-based, 1.5px consistent)
   ───────────────────────────────────────────── */
function NavIcon({ type, size = 18, color = 'currentColor' }) {
  const icons = {
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    inventory: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    reorder: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    purchaseOrders: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1.5" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
    analytics: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    lock: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  };
  return icons[type] || null;
}

function Chip({ children, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 focus-ring ${
        selected
          ? 'bg-[var(--color-accent)] text-[#062912]'
          : 'border border-[var(--color-line)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      }`}
    >
      {children}
    </button>
  );
}

function SkeletonLine({ width = '100%', height = '16px' }) {
  return (
    <div
      className="shimmer rounded-full"
      style={{ width, height, background: 'rgba(18,21,31,0.06)' }}
    />
  );
}

function ProgressDots({ label }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-[var(--color-muted)]">{label}{dots}</span>;
}

/* ─────────────────────────────────────────────
   STEP 1 — ENTRY SCREEN
   ───────────────────────────────────────────── */
function EntryScreen({ onShopify, onGoogle }) {
  const [shopifyLoading, setShopifyLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleShopify = async () => {
    setShopifyLoading(true);
    await onShopify();
    setShopifyLoading(false);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await onGoogle();
    setGoogleLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <LogoMark />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[2.2rem] font-[800] leading-tight tracking-[-0.05em] text-[var(--color-text)] sm:text-[2.8rem]"
          style={{ fontFamily: T.fontDisplay }}
        >
          Connect your store.
          <br />
          <span style={{ color: T.accent }}>We'll handle the rest.</span>
        </h1>

        <p className="mt-4 text-base text-[var(--color-muted)]">
          See what's running out, how much money is at risk, and what to do next.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          <BtnPrimary onClick={handleShopify} loading={shopifyLoading} fullWidth>
            {shopifyLoading ? 'Connecting…' : (
              <span className="flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.337 3.418c-.301-.12-1.583-.342-2.932-.342-1.35 0-2.633.222-2.934.342C5.988 4.44 0 8.682 0 12.345c0 3.17 2.3 6.11 5.64 7.247 1.17.38 2.2.593 3.06.593.86 0 1.89-.213 3.06-.593 3.34-1.137 5.64-4.077 5.64-7.247 0-3.663-5.988-7.905-12.003-8.927z"/>
                  <path d="M12.003 5.25l5.25 5.25-5.25 5.25-5.25-5.25z"/>
                </svg>
                Continue with Shopify
              </span>
            )}
          </BtnPrimary>

          <BtnGhost onClick={handleGoogle} loading={googleLoading} fullWidth>
            {googleLoading ? 'Connecting…' : (
              <span className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </span>
            )}
          </BtnGhost>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-[var(--color-muted)]">
          By continuing, you agree to Reordify's{' '}
          <button className="underline hover:text-[var(--color-text)]">Terms of Service</button>
          {' '}and{' '}
          <button className="underline hover:text-[var(--color-text)]">Privacy Policy</button>.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 2 — CONNECTION STATE
   ───────────────────────────────────────────── */
function ConnectionScreen({ storeName }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 1.5;
      });
    }, 30);

    const stepTimer = setTimeout(() => setStep(2), 1500);
    const stepTimer2 = setTimeout(() => setStep(3), 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
      clearTimeout(stepTimer2);
    };
  }, []);

  const steps = [
    { label: 'Authenticating' },
    { label: 'Fetching store data' },
    { label: 'Syncing inventory' },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">

        {/* Animated store icon */}
        <div className="mb-8 flex justify-center">
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: 'rgba(7,213,104,0.10)',
              animation: 'floatCard 2s ease-in-out infinite',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${T.accent}`,
                animation: 'pulseAlert 2s ease-in-out infinite',
                opacity: 0.4,
              }}
            />
          </div>
        </div>

        <h2
          className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]"
          style={{ fontFamily: T.fontDisplay }}
        >
          {storeName ? `Connecting to ${storeName}…` : 'Connecting…'}
        </h2>

        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Step {Math.min(step, 3)} of 3: {steps[Math.min(step - 1, 2)]?.label}
        </p>

        {/* Progress bar */}
        <div className="mt-6 overflow-hidden rounded-full" style={{ background: 'rgba(18,21,31,0.06)', height: '6px' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${T.accent}, rgba(7,213,104,0.7))`,
            }}
          />
        </div>

        {/* Step indicators */}
        <div className="mt-8 grid grid-cols-3 gap-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300"
              style={{
                background: i < step ? T.accentSoft : 'rgba(18,21,31,0.04)',
                color: i < step ? T.accent : T.muted,
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 3 — AI LOADING STATE
   ───────────────────────────────────────────── */
function LoadingScreen({ onComplete }) {
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const timings = [0, 600, 1200];
    timings.forEach((t, i) => {
      setTimeout(() => setVisibleCards(i + 1), t);
    });

    const completeTimer = setTimeout(() => onComplete(), 3200);
    return () => clearTimeout(completeTimer);
  }, [onComplete]);

  const cards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: 'Fetching last 10 orders',
      subtitle: 'Reading your Shopify data',
      done: false,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      ),
      title: 'Analyzing product performance',
      subtitle: 'Calculating sell-through rates',
      done: false,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Calculating inventory health',
      subtitle: 'Identifying reorder points',
      done: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-[480px]">

        <div className="mb-8 text-center">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{ background: T.accentSoft, color: T.accent }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: T.accent, animation: 'pulseAlert 1.5s ease-in-out infinite' }}
            />
            AI-powered analysis
          </div>
          <h2
            className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]"
            style={{ fontFamily: T.fontDisplay }}
          >
            Analyzing your store
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">This only takes a few seconds</p>
        </div>

        <div className="space-y-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-[24px] border p-6 shadow-sm transition-all duration-500"
              style={{
                borderColor: visibleCards > i ? (i === visibleCards - 1 ? T.accent : T.line) : T.line,
                background: visibleCards > i ? (i === visibleCards - 1 ? T.accentSoft : T.white) : T.white,
                opacity: visibleCards > i ? 1 : 0,
                transform: visibleCards > i ? 'translateY(0)' : 'translateY(16px)',
                boxShadow: visibleCards > i && i === visibleCards - 1 ? '0 0 0 1px rgba(7,213,104,0.20)' : T.shadowSoft,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: T.accentSoft }}
                >
                  {card.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--color-text)]">{card.title}</div>
                  <div className="mt-1 text-sm text-[var(--color-muted)]">{card.subtitle}</div>
                </div>
                {visibleCards > i + 1 && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: T.accent }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                {visibleCards === i + 1 && (
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 4 — FREE TIER DASHBOARD (Redesigned v4)
   Rich product orders + blurred insights + inline upgrade panel
   ───────────────────────────────────────────── */
function FreeDashboard({ storeData, onUpgrade }) {
  const { storeName, recentOrders, stockSnapshot } = storeData;

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', state: 'limited' },
    { label: 'Inventory', icon: 'inventory', state: 'locked' },
    { label: 'Reorder', icon: 'reorder', state: 'locked' },
    { label: 'Purchase Orders', icon: 'purchaseOrders', state: 'locked' },
    { label: 'Analytics', icon: 'analytics', state: 'locked' },
    { label: 'Settings', icon: 'settings', state: 'locked' },
  ];

  const blurredInsights = [
    { label: 'Demand forecast', hint: 'Reorder in 3 days', locked: true },
    { label: 'Reorder suggestions', hint: 'Suggested: 40 units', locked: true },
    { label: 'Financial trends', hint: '+12% this month', locked: true },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* ── SIDEBAR ── */}
      <aside className="sticky top-0 flex h-screen w-[220px] flex-col border-r border-[var(--color-line)] bg-white px-4 py-8">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 px-3">
          <img src="/logo.jpeg" alt="Reordify" className="h-8 w-auto object-contain" />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-[14px] px-3 py-3 text-sm font-medium transition-all ${
                item.state === 'limited'
                  ? 'bg-[var(--color-accent-soft)] text-[var(--color-text)]'
                  : 'text-[var(--color-muted)] cursor-not-allowed'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                <NavIcon type={item.icon} size={18} color={item.state === 'locked' ? T.muted : T.text} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.state === 'limited' && (
                <span className="rounded-full border border-[var(--color-accent)] px-2 py-0.5 text-[10px] font-semibold" style={{ color: T.accent }}>
                  Limited
                </span>
              )}
              {item.state === 'locked' && (
                <span style={{ opacity: 0.4 }}>
                  <NavIcon type="lock" size={12} color={T.muted} />
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Upgrade nudge */}
        <div className="mt-auto rounded-[18px] border border-[var(--color-accent)] p-4" style={{ background: T.accentSoft }}>
          <p className="text-xs font-medium text-[var(--color-text)]">Upgrade to unlock all features</p>
          <button
            onClick={onUpgrade}
            className="mt-3 w-full rounded-full py-2 text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: T.accent, color: T.accentDark }}
          >
            View plans
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 px-8 py-10">

        {/* ── HEADER: Store + Status ── */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>
              {storeName}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              10 recent orders • 3 products low on stock
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: T.accentSoft, color: T.accent }}>
              Free plan
            </span>
            <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(18,21,31,0.04)', color: T.muted }}>
              Live
            </span>
          </div>
        </div>

        {/* ── SECTION 1: STOCK SNAPSHOT (muted) ── */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Total units in stock', value: '847', color: T.text, icon: '◦' },
            { label: 'Out of stock', value: '2', color: T.alert, icon: '◦' },
            { label: 'At risk', value: '7', color: '#f59e0b', icon: '◦' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-[18px] border border-[var(--color-line)] bg-white px-5 py-4 shadow-sm opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(18,21,31,0.04)' }}>
                <span className="text-base font-bold" style={{ color: item.color }}>{item.icon}</span>
              </div>
              <div>
                <div className="font-display text-2xl font-[700] tracking-[-0.04em]" style={{ fontFamily: T.fontDisplay, color: item.color }}>
                  {item.value}
                </div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION 2: RECENT ORDERS (clean table) ── */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>
              Recent orders
            </h3>
            <span className="text-xs text-[var(--color-muted)]">Last 10 orders</span>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white shadow-sm">
            {/* Table Header */}
            <div
              className="flex items-center px-5 py-3 border-b border-[var(--color-line)]"
              style={{ background: 'rgba(18,21,31,0.02)' }}
            >
              <div className="w-[100px] text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Order ID</div>
              <div className="flex-1 text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Product</div>
              <div className="w-[90px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Revenue</div>
              <div className="w-[90px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Profit</div>
              <div className="w-[100px] text-center text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Status</div>
              <div className="w-[120px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Stock</div>
              <div className="w-[70px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Date</div>
            </div>
            {/* Table Rows */}
            {recentOrders.map((order, i) => {
              const statusConfig = {
                delivered: { label: 'Delivered', bg: T.accentSoft, color: T.accent },
                in_progress: { label: 'In Progress', bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
                cancelled: { label: 'Cancelled', bg: T.alertSoft, color: T.alert },
              };
              const status = statusConfig[order.status] || statusConfig.delivered;
              const isProfitable = order.profit >= 0;
              return (
                <div
                  key={i}
                  className="flex items-center border-b border-[rgba(18,21,31,0.04)] px-5 py-3.5 transition-colors hover:bg-[rgba(18,21,31,0.01)] last:border-0"
                >
                  <div className="w-[100px] font-mono text-xs font-medium text-[var(--color-muted)]">{order.orderId}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--color-text)]">{order.product}</div>
                    <div className="text-xs text-[var(--color-muted)]">{order.variant}</div>
                  </div>
                  <div className="w-[90px] text-right text-sm font-medium text-[var(--color-text)]">{order.revenue}</div>
                  <div className="w-[90px] text-right text-sm font-medium" style={{ color: isProfitable ? T.accent : T.alert }}>
                    {isProfitable ? '+' : ''}{order.profit >= 0 ? '$' : '-$'}{Math.abs(order.profit).toFixed(2)}
                  </div>
                  <div className="w-[100px] flex justify-center">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="w-[120px] text-right text-xs text-[var(--color-muted)]">
                    <span className={order.stockRemaining <= 3 ? 'font-semibold' : ''} style={order.stockRemaining <= 3 ? { color: T.alert } : {}}>
                      {order.stockRemaining} units
                    </span>
                  </div>
                  <div className="w-[70px] text-right text-xs text-[var(--color-muted)]">{order.date}</div>
                </div>
              );
            })}
            {/* Blur overlay + CTA */}
            <div className="relative">
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 40%)',
                }}
              >
                <div />
                <button
                  onClick={onUpgrade}
                  className="hover-lift focus-ring rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-all"
                  style={{ background: 'rgba(18,21,31,0.04)' }}
                >
                  Set up full dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: BLURRED INSIGHTS ── */}
        <div className="mb-6 relative overflow-hidden rounded-[24px] border border-[var(--color-line)]" style={{ filter: 'blur(8px)', pointerEvents: 'none' }}>
          <div className="bg-gradient-to-br from-white to-[rgba(18,21,31,0.02)] p-6">
            <div className="mb-4 font-display text-sm font-[600] tracking-[-0.04em] text-[var(--color-muted)]" style={{ fontFamily: T.fontDisplay }}>
              Insights & Forecasts
            </div>
            <div className="grid grid-cols-3 gap-4">
              {blurredInsights.map((insight, i) => (
                <div key={i} className="space-y-3 rounded-[16px] border border-[var(--color-line)] bg-white/80 p-4">
                  <div className="h-20 rounded-[10px]" style={{ background: 'rgba(18,21,31,0.04)' }} />
                  <div>
                    <div className="text-xs font-medium text-[var(--color-text)]">{insight.label}</div>
                    <div className="mt-1 text-xs text-[var(--color-muted)]">{insight.hint}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>

        {/* ── SECTION 4: FULL-WIDTH UPGRADE PANEL ── */}
        <div
          className="relative overflow-hidden rounded-[24px] border-2 px-8 py-7"
          style={{
            borderColor: T.accent,
            background: `linear-gradient(135deg, ${T.white} 0%, rgba(7,213,104,0.04) 100%)`,
            boxShadow: `0 16px 60px rgba(7,213,104,0.10)`,
          }}
        >
          <div className="flex items-start justify-between gap-8">
            {/* Left: copy + points */}
            <div className="flex-1">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: T.accent }}>
                Upgrade available
              </div>
              <h3 className="font-display text-[1.5rem] font-[700] leading-tight tracking-[-0.05em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>
                Unlock full control of your inventory
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Get complete visibility, forecasts, and smarter decisions.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-4">
                {[
                  'Predict stockouts before they happen',
                  'Smart reorder suggestions',
                  'Track profit and performance',
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: T.accentSoft }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text)]">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-center justify-center" style={{ minWidth: '200px' }}>
              <button
                onClick={onUpgrade}
                className="hover-lift focus-ring w-full rounded-full py-4 text-base font-semibold transition-all"
                style={{ background: T.accent, color: T.accentDark, boxShadow: '0 14px 30px rgba(7,213,104,0.28)' }}
              >
                Set up full dashboard
              </button>
              <p className="mt-2 text-xs text-[var(--color-muted)]">Takes less than 10 seconds</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 5 — PROFILE SETUP (INLINE)
   ───────────────────────────────────────────── */
function ProfileSetupScreen({ storeInfo, onComplete }) {
  const [form, setForm] = useState({
    storeName: storeInfo?.storeName || '',
    currency: storeInfo?.currency || 'USD',
    timezone: storeInfo?.timezone || 'America/New_York',
    goal: storeInfo?.goal || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimeout = useRef(null);

  const debouncedSave = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }, 600);
    }, 500);
  };

  const goals = [
    { key: 'avoid-stockouts', label: 'Avoid stockouts' },
    { key: 'improve-forecasting', label: 'Improve forecasting' },
    { key: 'scale-operations', label: 'Scale operations' },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR'];
  const timezones = ['America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney'];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-[600px]">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2
            className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]"
            style={{ fontFamily: T.fontDisplay }}
          >
            Tell us about your store
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            We've pre-filled what we know. Adjust if needed.
          </p>
        </div>

        {/* Auto-filled info */}
        <Card className="mb-6">
          <div className="space-y-4">
            {/* Store name */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Store name
              </label>
              <input
                type="text"
                value={form.storeName}
                onChange={e => debouncedSave('storeName', e.target.value)}
                className="focus-ring w-full rounded-[18px] border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-muted)]"
                style={{ focus: { borderColor: T.accent, boxShadow: `0 0 0 3px ${T.accentSoft2}` } }}
              />
            </div>

            {/* Currency + Timezone row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  Currency
                </label>
                <select
                  value={form.currency}
                  onChange={e => debouncedSave('currency', e.target.value)}
                  className="focus-ring w-full appearance-none rounded-[18px] border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none transition-all"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  Timezone
                </label>
                <select
                  value={form.timezone}
                  onChange={e => debouncedSave('timezone', e.target.value)}
                  className="focus-ring w-full appearance-none rounded-[18px] border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-text)] outline-none transition-all"
                >
                  {timezones.map(tz => <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Goal selection */}
        <Card>
          <div className="mb-4">
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
              What's your main goal?
            </label>
            <p className="mt-1 text-sm text-[var(--color-muted)]">We'll prioritize recommendations accordingly</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {goals.map((g) => (
              <button
                key={g.key}
                onClick={() => debouncedSave('goal', g.key)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-150 focus-ring ${
                  form.goal === g.key
                    ? 'bg-[var(--color-accent)] text-[#062912]'
                    : 'border border-[var(--color-line)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)]'
                }`}
              >
                {form.goal === g.key && (
                  <span className="mr-1.5 inline-flex items-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
                {g.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onComplete}
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Skip for now
            </button>
            {saving && (
              <span className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving…
              </span>
            )}
            {saved && !saving && (
              <span className="flex items-center gap-2 text-sm" style={{ color: T.accent }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved
              </span>
            )}
            {!saving && !saved && (
              <BtnPrimary onClick={onComplete}>
                Done
              </BtnPrimary>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRICING MODAL — Appears after dashboard load
   ───────────────────────────────────────────── */
function PricingModal({ onSelectPlan, onDismiss }) {
  const plans = [
    {
      key: 'basic',
      label: 'Basic',
      price: 'Free',
      highlight: false,
      features: [
        'Limited insights',
        'Up to 100 SKUs',
        'Basic recommendations',
      ],
      cta: 'Start free',
    },
    {
      key: 'pro',
      label: 'Pro',
      price: '$29/mo',
      highlight: true,
      badge: 'Recommended',
      features: [
        'Full forecasting',
        'Unlimited SKUs',
        'Advanced insights',
        'Priority support',
      ],
      cta: 'Upgrade now',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ background: 'rgba(18,21,31,0.32)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div
        className="view-panel w-full max-w-[480px] rounded-[28px] border border-[var(--color-line)] bg-white p-8 shadow-[0_30px_90px_rgba(18,21,31,0.18)]"
        style={{ animation: 'viewIn 300ms var(--ease-out) forwards' }}
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2
            className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]"
            style={{ fontFamily: T.fontDisplay }}
          >
            Unlock full control
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Start using Reordify with your store data
          </p>
        </div>

        {/* Plan cards */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`rounded-[22px] border p-5 text-sm transition-all ${
                plan.highlight
                  ? 'rounded-[22px] border-2 p-5'
                  : ''
              }`}
              style={{
                borderColor: plan.highlight ? T.accent : T.line,
                background: plan.highlight ? T.accentSoft : T.white,
                boxShadow: plan.highlight ? '0 14px 40px rgba(7,213,104,0.12)' : 'none',
              }}
            >
              {plan.badge && (
                <div
                  className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: T.accent, color: T.accentDark }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {plan.badge}
                </div>
              )}

              <div
                className="font-display text-2xl font-[700] tracking-[-0.04em]"
                style={{ fontFamily: T.fontDisplay, color: plan.highlight ? T.accent : T.text }}
              >
                {plan.label}
              </div>

              <div
                className="mt-1 font-display text-xl font-[700] tracking-[-0.04em]"
                style={{ fontFamily: T.fontDisplay, color: T.text }}
              >
                {plan.price}
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.key)}
                className={`hover-lift focus-ring mt-5 w-full rounded-full py-3 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-[var(--color-accent)] text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.28)]'
                    : 'border border-[var(--color-line)] text-[var(--color-text)]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={onDismiss}
          className="w-full text-center text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          Continue with limited access
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT ONBOARDING FLOW
   ───────────────────────────────────────────── */
export default function OnboardingFlow() {
  const [step, setStep] = useState('entry'); // entry | connecting | loading | dashboard | profile
  const [storeData, setStoreData] = useState(null);
  const [showPricing, setShowPricing] = useState(false);

  const freeStoreData = {
    storeName: 'BluePeak Apparel',
    recentOrders: [
      { orderId: '#BP-2847', product: 'Linen Summer Shirt', variant: 'EU 40 / White', revenue: '$142.50', profit: 38.20, status: 'delivered', stockRemaining: 14, date: 'Apr 28' },
      { orderId: '#BP-2846', product: 'Hydration Pack', variant: '2L / Navy', revenue: '$89.00', profit: 22.40, status: 'in_progress', stockRemaining: 7, date: 'Apr 28' },
      { orderId: '#BP-2845', product: 'Cargo Shorts Navy', variant: 'US 32', revenue: '$198.00', profit: -12.50, status: 'cancelled', stockRemaining: 3, date: 'Apr 27' },
      { orderId: '#BP-2844', product: 'Wren Jacket Olive', variant: 'M / Olive Drab', revenue: '$176.00', profit: 61.20, status: 'delivered', stockRemaining: 2, date: 'Apr 26' },
      { orderId: '#BP-2843', product: 'Hoodie Classic White', variant: 'L / True White', revenue: '$204.00', profit: 72.80, status: 'delivered', stockRemaining: 18, date: 'Apr 25' },
      { orderId: '#BP-2842', product: 'Performance Tee', variant: 'XL / Graphite', revenue: '$132.00', profit: 44.00, status: 'in_progress', stockRemaining: 5, date: 'Apr 24' },
      { orderId: '#BP-2841', product: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', revenue: '$118.00', profit: 29.50, status: 'delivered', stockRemaining: 9, date: 'Apr 23' },
      { orderId: '#BP-2840', product: 'Linen Summer Shirt', variant: 'EU 42 / Blue', revenue: '$71.25', profit: 19.10, status: 'delivered', stockRemaining: 14, date: 'Apr 22' },
      { orderId: '#BP-2839', product: 'Crossback Bra Top', variant: 'S / Sage', revenue: '$98.00', profit: 34.30, status: 'in_progress', stockRemaining: 1, date: 'Apr 21' },
      { orderId: '#BP-2838', product: 'Adventure Vest', variant: 'M / Slate', revenue: '$145.00', profit: 50.75, status: 'delivered', stockRemaining: 6, date: 'Apr 20' },
    ],
    quickInsights: [
      { label: 'Out of stock', value: '2 items', color: T.alert },
      { label: 'Low in stock', value: '3 products', color: '#f59e0b' },
      { label: 'Next stockout', value: '4 days', color: T.text },
    ],
    stockSnapshot: [
      { label: 'Total units in stock', value: '847', color: T.text, icon: '◦' },
      { label: 'Out of stock', value: '2', color: T.alert, icon: '◦' },
      { label: 'At risk', value: '7', color: '#f59e0b', icon: '◦' },
    ],
    fullDashboardLocked: true,
  };

  const handleShopifyConnect = async () => {
    setStep('connecting');
    await new Promise(r => setTimeout(r, 3000));
    setStep('loading');
  };

  const handleGoogleConnect = async () => {
    setStep('connecting');
    await new Promise(r => setTimeout(r, 3000));
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    setStoreData(freeStoreData);
    setStep('dashboard');
    setTimeout(() => setShowPricing(true), 800);
  };

  const handleProfileSetup = () => {
    setStep('profile');
  };

  const handleProfileComplete = () => {
    setStep('dashboard');
  };

  const handleSelectPlan = (plan) => {
    setShowPricing(false);
  };

  const handleDismissPricing = () => {
    setShowPricing(false);
  };

  const handleUpgrade = () => {
    setShowPricing(true);
  };

  return (
    <div className="relative min-h-screen" style={{ background: T.white }}>
      {step === 'entry' && (
        <EntryScreen onShopify={handleShopifyConnect} onGoogle={handleGoogleConnect} />
      )}
      {step === 'connecting' && (
        <ConnectionScreen storeName="BluePeak Apparel" />
      )}
      {step === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {step === 'dashboard' && storeData && (
        <FreeDashboard storeData={storeData} onUpgrade={handleUpgrade} />
      )}
      {step === 'profile' && (
        <ProfileSetupScreen
          storeInfo={{ storeName: 'BluePeak Apparel', currency: 'USD', timezone: 'America/New_York' }}
          onComplete={handleProfileComplete}
        />
      )}

      {/* Pricing modal */}
      {showPricing && (
        <PricingModal onSelectPlan={handleSelectPlan} onDismiss={handleDismissPricing} />
      )}

      {/* Background decorative elements */}
      <div
        className="pointer-events-none fixed -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(7,213,104,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none fixed -left-32 bottom-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(140,102,255,0.08) 0%, transparent 70%)' }}
      />
    </div>
  );
}
