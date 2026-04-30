import React, { useState } from 'react';

const T = {
  accent: '#07D568',
  accentDark: '#062912',
  accentSoft: 'rgba(7,213,104,0.08)',
  accentSoft2: 'rgba(7,213,104,0.12)',
  text: '#12151f',
  muted: '#5f6678',
  line: 'rgba(18,21,31,0.08)',
  lineStrong: 'rgba(18,21,31,0.14)',
  alert: '#e5484d',
  alertSoft: 'rgba(229,72,77,0.08)',
  white: '#ffffff',
  fontDisplay: "'Poppins', sans-serif",
  blueSoft: 'rgba(59,130,246,0.08)',
  blue: '#3b82f6',
  blueMid: 'rgba(59,130,246,0.50)',
  amberSoft: 'rgba(245,158,11,0.08)',
  amber: '#f59e0b',
  purpleSoft: 'rgba(139,92,246,0.08)',
  purple: '#8b6cff',
  graySoft: 'rgba(18,21,31,0.04)',
  greenSoft: 'rgba(7,213,104,0.10)',
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
  };
  return icons[type] || null;
}

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[16px] border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

const premiumData = {
  storeName: 'BluePeak Apparel',
  kpis: [
    { label: 'Revenue', value: '$4,218', change: '+12.4%', up: true, bg: T.accentSoft },
    { label: 'Profit', value: '$1,247', change: '+8.2%', up: true, bg: T.accentSoft2 },
    { label: 'Orders', value: '142', change: '+5.1%', up: true, bg: T.blueSoft },
    { label: 'Inventory Value', value: '$28,450', change: '-2.1%', up: false, bg: T.graySoft },
    { label: 'Low Stock Items', value: '7', change: 'Critical', up: false, bg: T.alertSoft },
  ],
  aiInsights: [
    { icon: 'alert', title: '5 products will go out of stock in 3 days', desc: 'Black Hoodie, Performance Tee, and 3 more', cta: 'Reorder now', urgent: true },
    { icon: 'trend', title: 'Reorder recommended for Linen Shirt', desc: 'Sales velocity up 34% this week', cta: 'View details', urgent: false },
    { icon: 'warning', title: 'Overstock detected in 12 SKUs', desc: 'Consider discounting to free up capital', cta: 'Review items', urgent: false },
  ],
  stockHealth: [
    { label: 'Total Units', value: '1,284', color: T.text },
    { label: 'Out of Stock', value: '2', color: T.alert },
    { label: 'Low Stock', value: '7', color: T.amber },
    { label: 'Overstocked', value: '12', color: T.purple },
    { label: 'Healthy Stock', value: '89%', color: T.accent },
  ],
  topSelling: [
    { name: 'Linen Summer Shirt', variant: 'EU 40 / White', sold: 24, revenue: '$1,842', profit: 498, status: 'hot' },
    { name: 'Hoodie Classic White', variant: 'L / True White', sold: 18, revenue: '$1,296', profit: 412, status: 'hot' },
    { name: 'Performance Tee', variant: 'XL / Graphite', sold: 12, revenue: '$432', profit: 142, status: 'slow' },
    { name: 'Crossback Bra Top', variant: 'S / Sage', sold: 9, revenue: '$486', profit: 168, status: 'slow' },
    { name: 'Adventure Vest', variant: 'M / Slate', sold: 6, revenue: '$390', profit: 104, status: 'slow' },
    { name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sold: 5, revenue: '$295', profit: 74, status: 'slow' },
  ],
  lowPerforming: [
    { name: 'Adventure Vest', variant: 'M / Slate', sold: 3, revenue: '$195', profit: 52, status: 'dead' },
    { name: 'Wren Jacket Olive', variant: 'M / Olive Drab', sold: 2, revenue: '$312', profit: 41, status: 'dead' },
    { name: 'Linen Shirt Blue', variant: 'L / Navy', sold: 1, revenue: '$89', profit: 12, status: 'dead' },
    { name: 'Running Shorts', variant: 'S / Black', sold: 0, revenue: '$0', profit: 0, status: 'dead' },
  ],
  recentOrders: [
    { orderId: '#BP-2910', product: 'Linen Summer Shirt', variant: 'EU 40 / White', revenue: '$142.50', profit: 38.20, status: 'delivered', stockRemaining: 14, date: 'Apr 30' },
    { orderId: '#BP-2909', product: 'Hoodie Classic White', variant: 'L / True White', revenue: '$204.00', profit: 72.80, status: 'delivered', stockRemaining: 18, date: 'Apr 30' },
    { orderId: '#BP-2908', product: 'Performance Tee', variant: 'XL / Graphite', revenue: '$132.00', profit: 44.00, status: 'in_progress', stockRemaining: 5, date: 'Apr 29' },
    { orderId: '#BP-2907', product: 'Wren Jacket Olive', variant: 'M / Olive Drab', revenue: '$176.00', profit: 61.20, status: 'delivered', stockRemaining: 2, date: 'Apr 29' },
    { orderId: '#BP-2906', product: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', revenue: '$118.00', profit: 29.50, status: 'in_progress', stockRemaining: 9, date: 'Apr 28' },
    { orderId: '#BP-2905', product: 'Crossback Bra Top', variant: 'S / Sage', revenue: '$98.00', profit: 34.30, status: 'delivered', stockRemaining: 1, date: 'Apr 28' },
    { orderId: '#BP-2904', product: 'Adventure Vest', variant: 'M / Slate', revenue: '$145.00', profit: 50.75, status: 'delivered', stockRemaining: 6, date: 'Apr 27' },
  ],
};

const chartData = [
  { label: 'Mon', sales: 620, purchases: 380 },
  { label: 'Tue', sales: 890, purchases: 520 },
  { label: 'Wed', sales: 740, purchases: 460 },
  { label: 'Thu', sales: 1100, purchases: 680 },
  { label: 'Fri', sales: 980, purchases: 590 },
  { label: 'Sat', sales: 520, purchases: 310 },
  { label: 'Sun', sales: 380, purchases: 240 },
];

const paymentsData = [
  { label: 'Mon', received: 580, sent: 320 },
  { label: 'Tue', received: 820, sent: 490 },
  { label: 'Wed', received: 690, sent: 400 },
  { label: 'Thu', received: 1040, sent: 620 },
  { label: 'Fri', received: 910, sent: 540 },
  { label: 'Sat', received: 480, sent: 280 },
  { label: 'Sun', received: 350, sent: 210 },
];

const maxSales = Math.max(...chartData.map(d => d.sales));
const maxPayments = Math.max(...paymentsData.map(d => d.received));

export default function PremiumDashboard() {
  const { storeName, kpis, aiInsights, stockHealth, topSelling, lowPerforming, recentOrders } = premiumData;
  const [activeTab, setActiveTab] = useState('top_selling');
  const [dateRange, setDateRange] = useState('7d');
  const dateRanges = ['Today', '7d', '30d', '90d'];

  const statusConfig = {
    delivered: { label: 'Delivered', bg: T.accentSoft, color: T.accent },
    in_progress: { label: 'In Progress', bg: T.amberSoft, color: T.amber },
    cancelled: { label: 'Cancelled', bg: T.alertSoft, color: T.alert },
  };
  const productStatusConfig = {
    hot: { label: 'Hot', bg: T.accentSoft, color: T.accent },
    slow: { label: 'Slow', bg: T.amberSoft, color: T.amber },
    dead: { label: 'Dead', bg: T.alertSoft, color: T.alert },
  };

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', state: 'active', to: '/dashboard/premium' },
    { label: 'Inventory', icon: 'inventory', state: 'unlocked', to: '/dashboard/inventory' },
    { label: 'Reorder', icon: 'reorder', state: 'unlocked' },
    { label: 'Purchase Orders', icon: 'purchaseOrders', state: 'unlocked' },
    { label: 'Analytics', icon: 'analytics', state: 'unlocked' },
    { label: 'Settings', icon: 'settings', state: 'unlocked' },
  ];

  const productData = activeTab === 'top_selling' ? topSelling : lowPerforming;

  return (
    <div className="flex h-screen overflow-hidden bg-[rgba(18,21,31,0.02)]">
      {/* SIDEBAR - fixed */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-[var(--color-line)] bg-white">
        <div className="px-6 py-7">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="Reordify" className="h-8 w-auto object-contain" />
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to || '#'}
              className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all ${
                item.state === 'active'
                  ? 'bg-[var(--color-accent-soft)] text-[var(--color-text)]'
                  : 'text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] hover:text-[var(--color-text)] cursor-pointer'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center">
                <NavIcon type={item.icon} size={18} color={item.state === 'active' ? T.accent : T.muted} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.state === 'active' && <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />}
            </Link>
          ))}
        </nav>
        <div className="mt-auto mx-3 mb-6 rounded-[12px] border border-[rgba(7,213,104,0.20)] p-3" style={{ background: T.accentSoft }}>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: T.accent }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#062912" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <span className="text-xs font-semibold" style={{ color: T.accentDark }}>Pro Plan Active</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - scrollable */}
      <main className="flex-1 overflow-y-auto px-8 py-7">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-[1.5rem] font-[700] tracking-[-0.03em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Welcome back, {storeName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-1 py-1">
              {dateRanges.map((r) => (
                <button key={r} onClick={() => setDateRange(r)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${dateRange === r ? 'bg-[var(--color-accent)] text-[#062912]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}>{r}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />Live<span className="mx-1">·</span>Synced 2m ago
            </div>
            <button className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-xs font-medium text-[var(--color-text)] transition-all hover:border-[rgba(18,21,31,0.16)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
              Sync with Shopify
            </button>
          </div>
        </div>

        {/* ROW 1: BUSINESS PERFORMANCE */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          {[
            { label: 'Revenue', value: '$4,218', change: '+12.4%', up: true, bg: T.graySoft, textColor: T.text, cta: 'View breakdown →' },
            { label: 'Profit', value: '$1,247', change: '+8.2%', up: true, bg: T.greenSoft, textColor: T.accent, cta: 'View margins →' },
            { label: 'Orders', value: '142', change: '+5.1%', up: true, bg: T.graySoft, textColor: T.text, cta: 'View all →' },
          ].map((kpi, i) => (
            <Card key={i} style={{ padding: '20px', background: kpi.bg }}>
              <div className="mb-2 flex items-start justify-between">
                <span className="text-[11px] font-medium text-[var(--color-muted)]">{kpi.label}</span>
                <span className="flex items-center gap-0.5 text-[11px] font-medium" style={{ color: kpi.up ? T.accent : T.alert }}>
                  {kpi.up ? (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15" /></svg>
                  ) : (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                  )}
                  {kpi.change}
                </span>
              </div>
              <div className="font-display text-[1.5rem] font-[700] tracking-[-0.03em] mb-2" style={{ fontFamily: T.fontDisplay, color: kpi.textColor }}>{kpi.value}</div>
              <button className="text-[10px] font-medium transition-colors hover:opacity-70" style={{ color: T.accent }}>{kpi.cta}</button>
            </Card>
          ))}
        </div>

        {/* ROW 2: INVENTORY FLOW */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {[
            { label: 'Sales', value: '142', color: T.text, bg: T.graySoft, cta: 'View orders →' },
            { label: 'Purchases', value: '89', color: T.blue, bg: T.blueSoft, cta: 'View PO history →' },
            { label: 'Out of Stock', value: '2', color: T.alert, bg: T.alertSoft, cta: 'Fix now →' },
            { label: 'Inventory Units', value: '1,284', color: T.text, bg: T.graySoft, cta: 'View inventory →' },
          ].map((item, i) => (
            <Card key={i} style={{ padding: '20px', background: item.bg }}>
              <div className="mb-1 font-display text-[1.5rem] font-[700] tracking-[-0.03em]" style={{ fontFamily: T.fontDisplay, color: item.color }}>{item.value}</div>
              <div className="text-[11px] font-medium mb-2" style={{ color: item.color }}>{item.label}</div>
              <button className="text-[10px] font-medium transition-colors hover:opacity-70" style={{ color: item.color }}>{item.cta}</button>
            </Card>
          ))}
        </div>

        {/* AI INSIGHTS */}
        <div className="mb-6">
          <Card style={{ padding: '20px', borderLeft: `3px solid ${T.accent}` }}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: T.accentSoft }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12l4-4" /><path d="M12 6v2" /><circle cx="12" cy="12" r="1" fill={T.accent} /></svg>
              </div>
              <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>AI Insights</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {aiInsights.map((insight, i) => (
                <div key={i} className="rounded-[12px] border border-[var(--color-line)] p-4 transition-all">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: insight.urgent ? T.alertSoft : T.graySoft }}>
                      {insight.icon === 'alert' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
                      {insight.icon === 'trend' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
                      {insight.icon === 'warning' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.purple} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>}
                    </div>
                    <span className="text-[11px] font-medium text-[var(--color-muted)]">{insight.urgent ? 'Urgent' : 'Insight'}</span>
                  </div>
                  <div className="mb-2 text-sm font-medium text-[var(--color-text)] leading-snug">{insight.title}</div>
                  <div className="mb-3 text-xs text-[var(--color-muted)]">{insight.desc}</div>
                  <button className="text-xs font-medium transition-colors hover:opacity-70" style={{ color: T.accent }}>{insight.cta} →</button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* PRIMARY CHART - SALES VS PURCHASES */}
        <div className="mb-6">
          <Card style={{ padding: '24px' }}>
            <div className="mb-5">
              <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)] mb-4" style={{ fontFamily: T.fontDisplay }}>Sales vs Purchases</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><div className="h-2.5 w-4 rounded-sm" style={{ background: T.blue }} /><span className="text-[11px] text-[var(--color-muted)]">Sales</span></div>
                <div className="flex items-center gap-2"><div className="h-2.5 w-4 rounded-sm" style={{ background: T.purple }} /><span className="text-[11px] text-[var(--color-muted)]">Purchases</span></div>
              </div>
            </div>
            <div className="relative" style={{ height: '280px' }}>
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-b border-[rgba(18,21,31,0.04)] w-full" style={{ height: '20%' }} />
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[var(--color-muted)] pr-3">
                <span>$1.2k</span>
                <span>$900</span>
                <span>$600</span>
                <span>$300</span>
                <span>$0</span>
              </div>
              <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end justify-between gap-2">
                {chartData.map((d, i) => {
                  const salesH = (d.sales / maxSales) * 220;
                  const purchasesH = (d.purchases / maxSales) * 220;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div className="flex items-end justify-center gap-1.5 w-full" style={{ height: '220px' }}>
                        <div className="w-3 rounded-t-sm" style={{ height: `${salesH}px`, background: T.blue }} />
                        <div className="w-3 rounded-t-sm" style={{ height: `${purchasesH}px`, background: T.purple }} />
                      </div>
                      <span className="text-[10px] text-[var(--color-muted)]">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* SECONDARY CHART - PAYMENTS FLOW + QUICK ACTIONS */}
        <div className="mb-6 grid grid-cols-3 gap-6">
          {/* PAYMENTS FLOW */}
          <Card className="col-span-2" style={{ padding: '24px' }}>
            <div className="mb-5">
              <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)] mb-4" style={{ fontFamily: T.fontDisplay }}>Payments Flow</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><div className="h-2.5 w-4 rounded-sm" style={{ background: T.accent }} /><span className="text-[11px] text-[var(--color-muted)]">Received</span></div>
                <div className="flex items-center gap-2"><div className="h-2.5 w-4 rounded-sm" style={{ background: T.alert }} /><span className="text-[11px] text-[var(--color-muted)]">Sent</span></div>
              </div>
            </div>
            <div className="relative" style={{ height: '180px' }}>
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-[rgba(18,21,31,0.04)] w-full" style={{ height: '25%' }} />
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[var(--color-muted)] pr-3">
                <span>$1k</span>
                <span>$750</span>
                <span>$500</span>
                <span>$0</span>
              </div>
              <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end justify-between gap-2">
                {paymentsData.map((d, i) => {
                  const receivedH = (d.received / maxPayments) * 140;
                  const sentH = (d.sent / maxPayments) * 140;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div className="flex items-end justify-center gap-1.5 w-full" style={{ height: '140px' }}>
                        <div className="w-3 rounded-t-sm" style={{ height: `${receivedH}px`, background: T.accent }} />
                        <div className="w-3 rounded-t-sm" style={{ height: `${sentH}px`, background: T.alert }} />
                      </div>
                      <span className="text-[10px] text-[var(--color-muted)]">{d.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* QUICK ACTIONS */}
          <Card style={{ padding: '24px' }}>
            <h2 className="mb-4 font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Create Purchase Order', icon: 'plus', accent: true },
                { label: 'Reorder Stock', icon: 'reorder', accent: true },
                { label: 'View Inventory', icon: 'inventory', accent: false },
                { label: 'Add Product', icon: 'plus', accent: false },
              ].map((action, i) => (
                <button key={i} className="flex w-full items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3 text-[12px] font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-line-strong)] hover:bg-[rgba(18,21,31,0.02)]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: action.accent ? T.accentSoft : T.graySoft }}>
                    {action.icon === 'plus' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={action.accent ? T.accent : T.muted} strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                    {action.icon === 'reorder' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /></svg>}
                    {action.icon === 'inventory' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>}
                  </div>
                  {action.label}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* PRODUCT + ORDERS - GROUPED TABLES */}
        <div className="mb-6 grid grid-cols-2 gap-6">
          {/* PRODUCT PERFORMANCE */}
          <Card style={{ padding: '20px' }}>
            {/* PRODUCT PERFORMANCE TABLE */}
            <div className="h-[420px] flex flex-col">
              {/* Header */}
              <div className="pb-3 mb-2 flex items-center justify-between">
                <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Product Performance</h2>
                <div className="flex gap-1 rounded-full border border-[var(--color-line)] p-0.5">
                  {[['top_selling', 'Top Selling'], ['low_performing', 'Low Performance']].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition-all whitespace-nowrap ${
                        activeTab === key ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLE WRAPPER */}
              <div className="flex-1 overflow-x-auto w-full rounded-xl border border-[var(--color-line)]">
                <table className="min-w-[900px] w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[280px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] border-r border-[rgba(18,21,31,0.08)] bg-white text-left sticky left-0 z-20">Product</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Sold</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Revenue</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Profit</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-center bg-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((p, i) => {
                      const ps = productStatusConfig[p.status] || productStatusConfig.hot;
                      return (
                        <tr key={i} className="hover:bg-[rgba(18,21,31,0.01)] cursor-pointer">
                          <td className="w-[280px] shrink-0 px-6 py-4 border-b border-[rgba(18,21,31,0.04)] border-r border-[rgba(18,21,31,0.08)] bg-white sticky left-0 z-10">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold bg-[rgba(18,21,31,0.05)] text-[var(--color-muted)]">{p.name.charAt(0)}</div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[13px] font-medium text-[var(--color-text)] truncate">{p.name}</div>
                                <div className="text-[11px] text-[var(--color-muted)] truncate">{p.variant}</div>
                              </div>
                            </div>
                          </td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[13px] text-[var(--color-text)] border-b border-[rgba(18,21,31,0.04)] text-right">{p.sold}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[13px] font-medium text-[var(--color-text)] border-b border-[rgba(18,21,31,0.04)] text-right">{p.revenue}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[13px] font-medium border-b border-[rgba(18,21,31,0.04)] text-right" style={{ color: T.accent }}>+${p.profit}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 border-b border-[rgba(18,21,31,0.04)] text-center">
                            <span className="rounded-full px-3 py-1 text-[9px] font-semibold whitespace-nowrap" style={{ background: ps.bg, color: ps.color }}>{ps.label}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* RECENT ORDERS */}
          <Card style={{ padding: '20px' }}>
            <div className="h-[420px] flex flex-col">
              {/* Header */}
              <div className="pb-3 mb-2 flex items-center justify-between">
                <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]" style={{ fontFamily: T.fontDisplay }}>Recent Orders</h2>
                <button className="text-[11px] font-medium transition-colors hover:opacity-70" style={{ color: T.accent }}>View all →</button>
              </div>

              {/* TABLE WRAPPER */}
              <div className="flex-1 overflow-x-auto w-full rounded-xl border border-[var(--color-line)]">
                <table className="min-w-[900px] w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[280px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] border-r border-[rgba(18,21,31,0.08)] bg-white text-left sticky left-0 z-20">Order Info</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Revenue</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Profit</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-center bg-white">Status</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Stock</th>
                      <th className="w-[140px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] text-right bg-white">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => {
                      const s = statusConfig[order.status] || statusConfig.delivered;
                      return (
                        <tr key={i} className="hover:bg-[rgba(18,21,31,0.01)] cursor-pointer">
                          <td className="w-[280px] shrink-0 px-6 py-4 border-b border-[rgba(18,21,31,0.04)] border-r border-[rgba(18,21,31,0.08)] bg-white sticky left-0 z-10">
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-medium text-[var(--color-text)] truncate">{order.product}</div>
                              <div className="text-[10px] text-[var(--color-muted)] truncate">{order.variant}</div>
                              <div className="text-[9px] font-mono text-[var(--color-muted)] mt-0.5">{order.orderId}</div>
                            </div>
                          </td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[13px] font-medium text-[var(--color-text)] border-b border-[rgba(18,21,31,0.04)] text-right">{order.revenue}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[13px] font-medium border-b border-[rgba(18,21,31,0.04)] text-right" style={{ color: T.accent }}>+${order.profit.toFixed(0)}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 border-b border-[rgba(18,21,31,0.04)] text-center">
                            <span className="rounded-full px-3 py-1 text-[9px] font-semibold whitespace-nowrap" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                          </td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[12px] text-[var(--color-muted)] border-b border-[rgba(18,21,31,0.04)] text-right">{order.stockRemaining}</td>
                          <td className="w-[140px] shrink-0 px-6 py-4 text-[12px] text-[var(--color-muted)] border-b border-[rgba(18,21,31,0.04)] text-right">{order.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="h-4" />
      </main>
    </div>
  );
}
