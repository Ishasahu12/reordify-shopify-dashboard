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

function Card({ children, style, className = '', elevated }) {
  return (
    <div
      className={`rounded-[28px] border border-[var(--color-line)] bg-white p-6 shadow-sm ${className}`}
      style={elevated ? { boxShadow: T.shadowLift, borderColor: 'rgba(7,213,104,0.16)' } : {}}
    >
      {children}
    </div>
  );
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
   STEP 4 — INSTANT VALUE DASHBOARD
   ───────────────────────────────────────────── */
function InstantValueScreen({ storeData, onProfileSetup }) {
  const { storeName, totalSKUs, healthyStock, atRisk, topProducts, reorderSuggestions } = storeData;

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-[720px]">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--color-muted)]">Your dashboard</div>
            <h2
              className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]"
              style={{ fontFamily: T.fontDisplay }}
            >
              Welcome back, {storeName}
            </h2>
          </div>
          <div
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: T.accentSoft, color: T.accent }}
          >
            Live
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Total SKUs', value: totalSKUs, color: T.text },
            { label: 'Healthy Stock', value: `${healthyStock}%`, color: T.accent },
            { label: 'At Risk', value: atRisk, color: T.alert },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[22px] border border-[var(--color-line)] bg-white p-4 shadow-sm"
            >
              <div
                className="font-display text-3xl font-[700] tracking-[-0.05em]"
                style={{ fontFamily: T.fontDisplay, color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reorder suggestions */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>
              Reorder suggestions
            </h3>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ background: T.alertSoft, color: T.alert }}
            >
              {reorderSuggestions.length} urgent
            </span>
          </div>

          <div className="space-y-3">
            {reorderSuggestions.map((item) => (
              <div
                key={item.sku}
                className="flex items-center justify-between rounded-[20px] border border-[var(--color-line)] bg-white p-4 shadow-sm hover-lift"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                    style={{ background: T.alertSoft, color: T.alert }}
                  >
                    ⚠️
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text)]">{item.name}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-[var(--color-muted)]">
                      <span>Stock: {item.stock}</span>
                      <span>•</span>
                      <span style={{ color: T.alert }}>{item.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="font-display text-lg font-[700] tracking-[-0.04em]"
                    style={{ fontFamily: T.fontDisplay, color: T.accent }}
                  >
                    Order {item.reorderQty}
                  </div>
                  <div className="mt-1 text-xs text-[var(--color-muted)]">{item.atRisk}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div>
          <h3 className="mb-4 font-display text-lg font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>
            Top performers
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {topProducts.map((product) => (
              <div
                key={product.sku}
                className="rounded-[20px] border border-[var(--color-line)] bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[var(--color-text)]">{product.name}</div>
                    <div className="mt-1 text-xs text-[var(--color-muted)]">{product.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-[700] tracking-[-0.04em]" style={{ fontFamily: T.fontDisplay, color: T.accent }}>
                      {product.units}
                    </div>
                    <div className="mt-1 text-xs text-[var(--color-muted)]">units sold</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile setup CTA */}
        {onProfileSetup && (
          <div
            className="mt-8 rounded-[24px] border border-[rgba(7,213,104,0.20)] p-5"
            style={{ background: T.accentSoft }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-[var(--color-text)]">Tell us about your store</div>
                <div className="mt-1 text-sm text-[var(--color-muted)]">Set your currency, timezone, and goal</div>
              </div>
              <button
                onClick={onProfileSetup}
                className="hover-lift focus-ring shrink-0 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#062912]"
              >
                Setup
              </button>
            </div>
          </div>
        )}
      </div>
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
   PRICING MODAL — Value-driven upgrade moment
   Appears 2-3s after dashboard loads OR on first interaction
   ───────────────────────────────────────────── */
function PricingModal({ storeData, onSelectPlan, onDismiss }) {
  const { atRisk, reorderSuggestions, totalSKUs } = storeData;

  const totalAtRisk = atRisk;
  const urgentCount = reorderSuggestions?.length || 0;
  const topRisk = reorderSuggestions?.[0];
  const revenueAtRisk = topRisk?.atRisk || '$0';

  const insights = [
    urgentCount > 0 && `${urgentCount} products need immediate attention`,
    totalAtRisk > 0 && `${totalAtRisk} items at risk of stockout`,
    topRisk && `You could lose ${revenueAtRisk} in the next 7 days`,
  ].filter(Boolean);

  const plans = [
    {
      key: 'free',
      label: 'Free',
      price: '$0',
      period: 'forever',
      highlight: false,
      features: [
        'Limited insights',
        'Up to 100 SKUs',
        'Basic alerts',
        'Manual updates',
      ],
      cta: 'Continue with free',
      ctaSecondary: null,
    },
    {
      key: 'pro',
      label: 'Pro',
      price: '$29',
      period: '/month',
      highlight: true,
      badge: 'Recommended',
      features: [
        'Full demand forecasting',
        'Smart reorder suggestions',
        'Unlimited SKUs',
        'Real-time updates',
        'Priority insights',
      ],
      cta: 'Upgrade to Pro',
      ctaSecondary: 'Upgrade in seconds. Cancel anytime.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ background: 'rgba(18,21,31,0.28)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div
        className="view-panel w-full max-w-[520px] overflow-y-auto rounded-[28px] border border-[var(--color-line)] bg-white shadow-[0_36px_100px_rgba(18,21,31,0.20)]"
        style={{ animation: 'viewIn 350ms var(--ease-out) forwards', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-0 text-center">
          <h2
            className="font-display text-[1.75rem] font-[700] tracking-[-0.04em] text-[var(--color-text)]"
            style={{ fontFamily: T.fontDisplay }}
          >
            Start making smarter inventory decisions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            You're already seeing your store data. Unlock full control to take action.
          </p>
        </div>

        {/* Value reinforcement — real insights from THEIR data */}
        {insights.length > 0 && (
          <div className="mx-8 mt-6 rounded-[20px] border border-[rgba(229,72,77,0.15)] bg-[linear-gradient(180deg,#fff_0%,#fff7f7_100%)] p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-alert)]">
              What we found in your store
            </div>
            <div className="space-y-2">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: T.alertSoft }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)]">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-2 gap-4 px-8 py-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="relative rounded-[22px] border p-5 text-sm transition-all"
              style={{
                borderColor: plan.highlight ? T.accent : T.line,
                background: plan.highlight ? T.accentSoft : T.white,
                boxShadow: plan.highlight ? '0 16px 48px rgba(7,213,104,0.15), 0 0 0 1px rgba(7,213,104,0.12)' : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{ background: T.accent, color: T.accentDark }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div
                className="font-display text-xl font-[700] tracking-[-0.04em]"
                style={{ fontFamily: T.fontDisplay, color: plan.highlight ? T.accent : T.text }}
              >
                {plan.label}
              </div>

              {/* Price */}
              <div className="mt-1 flex items-baseline gap-1">
                <span
                  className="font-display text-3xl font-[700] tracking-[-0.05em]"
                  style={{ fontFamily: T.fontDisplay, color: T.text }}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="mt-4 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.highlight ? T.accent : T.muted} strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => onSelectPlan(plan.key)}
                className={`hover-lift focus-ring mt-5 w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-[var(--color-accent)] text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.30)]'
                    : 'border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
              >
                {plan.cta}
              </button>

              {/* Secondary microcopy under Pro CTA */}
              {plan.ctaSecondary && (
                <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
                  {plan.ctaSecondary}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <div className="px-8 pb-8 text-center">
          <button
            onClick={onDismiss}
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            Continue with limited access
          </button>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            No credit card required. Your data stays accessible.
          </p>
        </div>
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

  const mockStoreData = {
    storeName: 'BluePeak Apparel',
    totalSKUs: 847,
    healthyStock: '91',
    atRisk: 7,
    topProducts: [
      { sku: 'BPA-HYD-L', name: 'Hydration Pack', units: '1,240' },
      { sku: 'BPA-CRG-M', name: 'Cargo Shorts', units: '890' },
      { sku: 'BPA-WRN-S', name: 'Wren Jacket', units: '654' },
      { sku: 'BPA-HOD-W', name: 'Hoodie White', units: '432' },
    ],
    reorderSuggestions: [
      { sku: 'BPA-HYD-L', name: 'Hydration Pack', stock: '12 units', daysLeft: '3', reorderQty: '120 units', atRisk: '$1,240' },
      { sku: 'BPA-CRG-M', name: 'Cargo Shorts', stock: '8 units', daysLeft: '2', reorderQty: '200 units', atRisk: '$980' },
      { sku: 'BPA-WRN-S', name: 'Wren Jacket', stock: '23 units', daysLeft: '5', reorderQty: '80 units', atRisk: '$640' },
    ],
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
    setStoreData(mockStoreData);
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
    // In production: navigate to signup/payment for the selected plan
  };

  const handleDismissPricing = () => {
    setShowPricing(false);
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
        <InstantValueScreen
          storeData={storeData}
          onProfileSetup={handleProfileSetup}
        />
      )}
      {step === 'profile' && (
        <ProfileSetupScreen
          storeInfo={{ storeName: 'BluePeak Apparel', currency: 'USD', timezone: 'America/New_York' }}
          onComplete={handleProfileComplete}
        />
      )}

      {/* Pricing modal */}
      {showPricing && (
        <PricingModal storeData={storeData} onSelectPlan={handleSelectPlan} onDismiss={handleDismissPricing} />
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
