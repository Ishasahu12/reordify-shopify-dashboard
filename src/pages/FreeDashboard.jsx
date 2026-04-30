import React from 'react';
import { Link } from 'react-router-dom';

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
    lock: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  };
  return icons[type] || null;
}

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
  stockSnapshot: [
    { label: 'Total units in stock', value: '847', color: T.text },
    { label: 'Out of stock', value: '2', color: T.alert },
    { label: 'At risk', value: '7', color: '#f59e0b' },
  ],
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[18px] border border-[var(--color-line)] bg-white p-5 ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function FreeDashboard() {
  const { storeName, recentOrders, stockSnapshot } = freeStoreData;

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', state: 'limited' },
    { label: 'Inventory', icon: 'inventory', state: 'locked' },
    { label: 'Reorder', icon: 'reorder', state: 'locked' },
    { label: 'Purchase Orders', icon: 'purchaseOrders', state: 'locked' },
    { label: 'Analytics', icon: 'analytics', state: 'locked' },
    { label: 'Settings', icon: 'settings', state: 'locked' },
  ];

  const blurredInsights = [
    { label: 'Demand forecast', hint: 'Reorder in 3 days' },
    { label: 'Reorder suggestions', hint: 'Suggested: 40 units' },
    { label: 'Financial trends', hint: '+12% this month' },
  ];

  const statusConfig = {
    delivered: { label: 'Delivered', bg: T.accentSoft, color: T.accent },
    in_progress: { label: 'In Progress', bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
    cancelled: { label: 'Cancelled', bg: T.alertSoft, color: T.alert },
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR */}
      <aside className="sticky top-0 flex h-screen w-[220px] flex-col border-r border-[var(--color-line)] bg-white px-4 py-8">
        <div className="mb-8 flex items-center gap-2 px-3">
          <img src="/logo.jpeg" alt="Reordify" className="h-8 w-auto object-contain" />
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div key={item.label} className={`flex items-center gap-3 rounded-[14px] px-3 py-3 text-sm font-medium transition-all ${item.state === 'limited' ? 'bg-[var(--color-accent-soft)] text-[var(--color-text)]' : 'text-[var(--color-muted)] cursor-not-allowed'}`}>
              <span className="flex h-5 w-5 items-center justify-center">
                <NavIcon type={item.icon} size={18} color={item.state === 'locked' ? T.muted : T.text} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.state === 'limited' && (
                <span className="rounded-full border border-[var(--color-accent)] px-2 py-0.5 text-[10px] font-semibold" style={{ color: T.accent }}>Limited</span>
              )}
              {item.state === 'locked' && <span style={{ opacity: 0.4 }}><NavIcon type="lock" size={12} color={T.muted} /></span>}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-[18px] border border-[var(--color-accent)] p-4" style={{ background: T.accentSoft }}>
          <p className="text-xs font-medium text-[var(--color-text)]">Upgrade to unlock all features</p>
          <Link to="/dashboard/premium">
            <button className="mt-3 w-full rounded-full py-2 text-xs font-semibold transition-all hover:opacity-90" style={{ background: T.accent, color: T.accentDark }}>
              View plans
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-8 py-10">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>{storeName}</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">10 recent orders • 3 products low on stock</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: T.accentSoft, color: T.accent }}>Free plan</span>
            <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(18,21,31,0.04)', color: T.muted }}>Live</span>
          </div>
        </div>

        {/* STOCK SNAPSHOT */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {stockSnapshot.map((item) => (
            <Card key={item.label} className="flex items-center gap-4 opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(18,21,31,0.04)' }}>
                <span className="text-base font-bold" style={{ color: item.color }}>◦</span>
              </div>
              <div>
                <div className="font-display text-2xl font-[700] tracking-[-0.04em]" style={{ fontFamily: T.fontDisplay, color: item.color }}>{item.value}</div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">{item.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-[700] tracking-[-0.04em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Recent orders</h3>
            <span className="text-xs text-[var(--color-muted)]">Last 10 orders</span>
          </div>
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center px-5 py-3 border-b border-[var(--color-line)]" style={{ background: 'rgba(18,21,31,0.02)' }}>
              <div className="w-[100px] text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Order ID</div>
              <div className="flex-1 text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Product</div>
              <div className="w-[90px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Revenue</div>
              <div className="w-[90px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Profit</div>
              <div className="w-[100px] text-center text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Status</div>
              <div className="w-[120px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Stock</div>
              <div className="w-[70px] text-right text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-muted)]">Date</div>
            </div>
            {recentOrders.map((order, i) => {
              const status = statusConfig[order.status] || statusConfig.delivered;
              const isProfitable = order.profit >= 0;
              return (
                <div key={i} className="flex items-center border-b border-[rgba(18,21,31,0.04)] px-5 py-3.5 hover:bg-[rgba(18,21,31,0.01)] last:border-0 transition-colors">
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
                    <span className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: status.bg, color: status.color }}>{status.label}</span>
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
              <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 40%)' }}>
                <div />
                <Link to="/dashboard/premium">
                  <button className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-all hover:opacity-90" style={{ background: 'rgba(18,21,31,0.04)' }}>
                    Set up full dashboard
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* BLURRED INSIGHTS */}
        <div className="mb-6 relative overflow-hidden rounded-[24px] border border-[var(--color-line)]" style={{ filter: 'blur(8px)', pointerEvents: 'none' }}>
          <div className="bg-gradient-to-br from-white to-[rgba(18,21,31,0.02)] p-6">
            <div className="mb-4 font-display text-sm font-[600] tracking-[-0.04em] text-[var(--color-muted)]" style={{ fontFamily: T.fontDisplay }}>Insights & Forecasts</div>
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

        {/* UPGRADE PANEL */}
        <div className="relative overflow-hidden rounded-[24px] border-2 px-8 py-7" style={{ borderColor: T.accent, background: `linear-gradient(135deg, ${T.white} 0%, rgba(7,213,104,0.04) 100%)`, boxShadow: `0 16px 60px rgba(7,213,104,0.10)` }}>
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: T.accent }}>Upgrade available</div>
              <h3 className="font-display text-[1.5rem] font-[700] leading-tight tracking-[-0.05em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Unlock full control of your inventory</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Get complete visibility, forecasts, and smarter decisions.</p>
              <div className="mt-5 grid grid-cols-3 gap-4">
                {['Predict stockouts before they happen', 'Smart reorder suggestions', 'Track profit and performance'].map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: T.accentSoft }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text)]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center" style={{ minWidth: '200px' }}>
              <Link to="/dashboard/premium">
                <button className="hover-lift focus-ring rounded-full bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[#062912] shadow-[0_14px_30px_rgba(7,213,104,0.28)] transition-all active:scale-[0.98]" style={{ fontFamily: T.fontDisplay }}>
                  Set up full dashboard
                </button>
              </Link>
              <p className="mt-2 text-xs text-[var(--color-muted)]">No credit card required</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
