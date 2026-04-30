import React, { useState } from 'react';

const T = {
  accent: '#07D568',
  accentSoft: 'rgba(7,213,104,0.08)',
  text: '#12151f',
  muted: '#5f6678',
  line: 'rgba(18,21,31,0.08)',
  alert: '#e5484d',
  alertSoft: 'rgba(229,72,77,0.08)',
  amber: '#f59e0b',
  amberSoft: 'rgba(245,158,11,0.08)',
  purple: '#8b6cff',
  purpleSoft: 'rgba(139,92,246,0.08)',
  graySoft: 'rgba(18,21,31,0.04)',
  white: '#ffffff',
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[16px] border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

const inventoryData = [
  { id: 1, name: 'Linen Summer Shirt', variant: 'EU 40 / White', sku: 'LIN-SH-WH-40', available: 0, incoming: 45, daysLeft: 0, revenue: '$0', status: 'out', velocity: 'high' },
  { id: 2, name: 'Hoodie Classic White', variant: 'L / True White', sku: 'HOOD-CL-L-TW', available: 4, incoming: 20, daysLeft: 2, revenue: '$1,296', status: 'critical', velocity: 'high' },
  { id: 3, name: 'Performance Tee', variant: 'XL / Graphite', sku: 'PERF-TEE-XL-GR', available: 8, incoming: 50, daysLeft: 3, revenue: '$432', status: 'critical', velocity: 'high' },
  { id: 4, name: 'Crossback Bra Top', variant: 'S / Sage', sku: 'BRA-CB-S-SG', available: 24, incoming: 0, daysLeft: 18, revenue: '$486', status: 'healthy', velocity: 'normal' },
  { id: 5, name: 'Adventure Vest', variant: 'M / Slate', sku: 'ADV-VES-M-SL', available: 156, incoming: 0, daysLeft: 45, revenue: '$390', status: 'overstock', velocity: 'slow' },
  { id: 6, name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sku: 'TR-SH-US34-KH', available: 12, incoming: 30, daysLeft: 6, revenue: '$295', status: 'low', velocity: 'high' },
  { id: 7, name: 'Fleece Jacket Navy', variant: 'XL / Navy', sku: 'FLE-JK-XL-NV', available: 67, incoming: 0, daysLeft: 22, revenue: '$2,140', status: 'healthy', velocity: 'normal' },
  { id: 8, name: 'Slim Fit Chinos', variant: '32 / Charcoal', sku: 'CHI-SF-32-CH', available: 0, incoming: 25, daysLeft: 0, revenue: '$0', status: 'out', velocity: 'high' },
  { id: 9, name: 'Merino Wool Sweater', variant: 'M / Burgundy', sku: 'MER-WO-M-BG', available: 31, incoming: 0, daysLeft: 14, revenue: '$1,240', status: 'healthy', velocity: 'normal' },
  { id: 10, name: 'Running Shorts Black', variant: 'L / Black', sku: 'RUN-SH-L-BK', available: 89, incoming: 0, daysLeft: 30, revenue: '$890', status: 'healthy', velocity: 'normal' },
  { id: 11, name: 'Denim Jacket Classic', variant: 'S / Indigo', sku: 'DNM-JK-S-IN', available: 210, incoming: 0, daysLeft: 60, revenue: '$840', status: 'dead', velocity: 'dead' },
  { id: 12, name: 'Polo Shirt Red', variant: 'M / Red', sku: 'POL-SH-M-RD', available: 6, incoming: 40, daysLeft: 4, revenue: '$168', status: 'critical', velocity: 'high' },
];

const actionConfig = {
  critical: { label: 'Reorder now', bg: T.alertSoft, color: T.alert, dot: T.alert },
  out: { label: 'Out of stock', bg: T.alertSoft, color: T.alert, dot: T.alert },
  low: { label: 'Reorder soon', bg: T.amberSoft, color: T.amber, dot: T.amber },
  healthy: { label: 'Healthy', bg: T.accentSoft, color: T.accent, dot: T.accent },
  overstock: { label: 'Overstocked', bg: T.purpleSoft, color: T.purple, dot: T.purple },
  dead: { label: 'Dead stock', bg: T.graySoft, color: T.muted, dot: T.muted },
};

const smartFilters = ['all', 'critical', 'low', 'overstock', 'dead'];

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [smartFilter, setSmartFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [drawerItem, setDrawerItem] = useState(null);

  const filtered = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = smartFilter === 'all' || item.status === smartFilter || (smartFilter === 'critical' && (item.daysLeft <= 5 && item.daysLeft > 0 || item.status === 'out'));
    return matchesSearch && matchesFilter;
  });

  const criticalCount = inventoryData.filter(i => i.status === 'out' || i.status === 'critical' || i.daysLeft <= 5).length;
  const outCount = inventoryData.filter(i => i.status === 'out').length;
  const fastCount = inventoryData.filter(i => i.velocity === 'high').length;
  const deadCount = inventoryData.filter(i => i.status === 'dead' || i.velocity === 'dead').length;

  const insights = [
    { label: 'Reorder needed', value: `${criticalCount} SKUs`, sub: 'in next 5 days', urgent: criticalCount > 0, filter: 'critical' },
    { label: 'Out of stock', value: outCount, sub: 'products unavailable', urgent: outCount > 0, filter: 'out' },
    { label: 'Fast selling', value: `${fastCount} SKUs`, sub: 'selling faster than usual', urgent: false, filter: 'all' },
    { label: 'Dead stock', value: deadCount, sub: 'not sold in 30 days', urgent: deadCount > 5, filter: 'dead' },
  ];

  const priorityAlerts = [
    { icon: 'alert', title: `${inventoryData.filter(i => i.daysLeft <= 3 && i.daysLeft > 0).length} products will go out of stock in 3 days`, desc: 'Linen Shirt, Hoodie Classic, Performance Tee', urgent: true },
    { icon: 'warning', title: `${inventoryData.filter(i => i.status === 'overstock').length} SKUs are overstocked`, desc: 'Consider discounting to free up capital', urgent: false },
    { icon: 'trend', title: 'You may lose $2,340 in sales from stockouts', desc: 'Based on current sales velocity', urgent: true },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[var(--color-line)] bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-display)' }}>Inventory</h1>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">BluePeak Apparel</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium border border-[var(--color-line)] hover:bg-[rgba(18,21,31,0.02)] transition-colors" style={{ color: T.text }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9V3m-9 9a9 9 0 0 0 9 9m-9-9V3"/>
            </svg>
            Sync with Shopify
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Priority Insights Strip */}
        <div className="flex gap-3 mb-5">
          {priorityAlerts.map((alert, i) => (
            <div
              key={i}
              className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer hover:shadow-sm transition-shadow ${
                alert.urgent ? 'border-[rgba(229,72,77,0.20)] bg-[rgba(229,72,77,0.04)]' : 'border-[var(--color-line)] bg-white'
              }`}
            >
              <div className={`shrink-0 w-2 h-2 rounded-full ${alert.urgent ? 'bg-[var(--color-alert)]' : 'bg-[var(--color-amber)]'}`} />
              <div>
                <p className="text-[12px] font-medium text-[var(--color-text)]">{alert.title}</p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {insights.map((ins) => (
            <Card
              key={ins.label}
              className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${smartFilter === ins.filter ? 'ring-2 ring-[var(--color-accent)]' : ''}`}
              onClick={() => setSmartFilter(ins.filter)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${ins.urgent ? 'bg-[var(--color-alert)]' : 'bg-[var(--color-muted)]'}`} />
                <span className="text-[22px] font-semibold text-[var(--color-text)]">{ins.value}</span>
              </div>
              <div className="text-[11px] font-medium text-[var(--color-text)]">{ins.label}</div>
              <div className="text-[10px] text-[var(--color-muted)]">{ins.sub}</div>
            </Card>
          ))}
        </div>

        {/* Upgrade Banner */}
        <div className="mb-5 flex items-center justify-between px-5 py-3 rounded-xl border border-[rgba(7,213,104,0.15)] bg-[rgba(7,213,104,0.04)]">
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-[11px] text-[var(--color-text)]">Upgrade to automate reorder suggestions and never run out of stock</span>
          </div>
          <button className="px-4 py-1.5 text-[10px] font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity whitespace-nowrap">
            Upgrade now
          </button>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-[260px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search product or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-[12px] rounded-xl border border-[var(--color-line)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20"
              />
            </div>

            <div className="flex gap-1 rounded-full border border-[var(--color-line)] p-0.5">
              {smartFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSmartFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition-all whitespace-nowrap ${
                    smartFilter === f ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'critical' ? 'Needs Reorder' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-[11px] rounded-xl border border-[var(--color-line)] bg-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-[11px] rounded-xl border border-[var(--color-line)] bg-white focus:outline-none"
            >
              <option value="all">All Vendors</option>
              <option value="local">Local Supplier</option>
              <option value="direct">Direct Mfg</option>
            </select>
          </div>
        </Card>

        {/* Main Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr>
                  <th className="w-[240px] shrink-0 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] border-r border-[rgba(18,21,31,0.08)] bg-white text-left sticky left-0 z-20">Product</th>
                  <th className="w-[100px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-right">Stock</th>
                  <th className="w-[100px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-right">Incoming</th>
                  <th className="w-[80px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-center">Days Left</th>
                  <th className="w-[100px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-right">Revenue</th>
                  <th className="w-[120px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-center">Action Signal</th>
                  <th className="w-[140px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] border-b border-[var(--color-line)] bg-white text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                        <div>
                          <p className="text-[13px] font-medium text-[var(--color-text)]">No products found</p>
                          <p className="text-[11px] text-[var(--color-muted)] mt-1">Sync products from Shopify to get started</p>
                        </div>
                        <button className="mt-2 px-4 py-2 text-[11px] font-medium rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity">
                          Sync products from Shopify
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const action = actionConfig[item.status] || actionConfig.healthy;
                    const daysColor = item.daysLeft === 0 ? T.alert : item.daysLeft <= 5 ? T.amber : T.muted;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[rgba(18,21,31,0.015)] cursor-pointer"
                        onClick={() => setDrawerItem(drawerItem?.id === item.id ? null : item)}
                      >
                        <td className="w-[240px] shrink-0 px-6 py-3.5 border-b border-[rgba(18,21,31,0.04)] border-r border-[rgba(18,21,31,0.08)] bg-white sticky left-0 z-10">
                          <div className="text-[13px] font-medium text-[var(--color-text)] truncate">{item.name}</div>
                          <div className="text-[10px] text-[var(--color-muted)] truncate">{item.variant}</div>
                          <div className="text-[9px] font-mono text-[var(--color-muted)] mt-0.5">{item.sku}</div>
                        </td>
                        <td className="w-[100px] shrink-0 px-4 py-3.5 text-[13px] font-medium border-b border-[rgba(18,21,31,0.04)] text-right" style={{ color: item.available === 0 ? T.alert : T.text }}>{item.available === 0 ? 'Out' : item.available}</td>
                        <td className="w-[100px] shrink-0 px-4 py-3.5 text-[12px] border-b border-[rgba(18,21,31,0.04)] text-right text-[var(--color-muted)]">{item.incoming > 0 ? `+${item.incoming}` : '—'}</td>
                        <td className="w-[80px] shrink-0 px-4 py-3.5 border-b border-[rgba(18,21,31,0.04)] text-center">
                          <span className="inline-flex items-center justify-center w-10 h-6 rounded-lg text-[11px] font-semibold" style={{ background: item.daysLeft <= 5 ? (item.daysLeft === 0 ? T.alertSoft : T.amberSoft) : T.graySoft, color: daysColor }}>
                            {item.daysLeft === 0 ? 'Out' : `${item.daysLeft}d`}
                          </span>
                        </td>
                        <td className="w-[100px] shrink-0 px-4 py-3.5 text-[12px] border-b border-[rgba(18,21,31,0.04)] text-right text-[var(--color-muted)]">{item.revenue}</td>
                        <td className="w-[120px] shrink-0 px-4 py-3.5 border-b border-[rgba(18,21,31,0.04)]">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: action.dot }} />
                            <span className="text-[10px] font-medium" style={{ color: action.color }}>{action.label}</span>
                          </div>
                        </td>
                        <td className="w-[140px] shrink-0 px-4 py-3.5 border-b border-[rgba(18,21,31,0.04)]">
                          <div className="flex items-center justify-center gap-2">
                            {(item.status === 'out' || item.status === 'critical' || item.status === 'low') ? (
                              <button className="px-3 py-1.5 text-[10px] font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                Reorder
                              </button>
                            ) : (
                              <button className="px-3 py-1.5 text-[10px] font-medium rounded-lg border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.02)] transition-colors whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                View
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {/* Drawer */}
      {drawerItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/10" onClick={() => setDrawerItem(null)} />
          <div className="relative w-[380px] h-full bg-white border-l border-[var(--color-line)] shadow-xl overflow-y-auto animate-[slideIn_200ms_ease-out]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-[var(--color-text)]">{drawerItem.name}</h2>
                <button onClick={() => setDrawerItem(null)} className="p-1 rounded-lg hover:bg-[rgba(18,21,31,0.05)] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="mb-6 p-4 rounded-xl border border-[var(--color-line)]">
                <div className="text-[10px] text-[var(--color-muted)] mb-1">Variant</div>
                <div className="text-[13px] font-medium text-[var(--color-text)]">{drawerItem.variant}</div>
                <div className="text-[10px] font-mono text-[var(--color-muted)] mt-1">{drawerItem.sku}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[rgba(18,21,31,0.03)]">
                  <div className="text-[10px] text-[var(--color-muted)] mb-1">Available</div>
                  <div className="text-[18px] font-semibold text-[var(--color-text)]">{drawerItem.available}</div>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(18,21,31,0.03)]">
                  <div className="text-[10px] text-[var(--color-muted)] mb-1">Days Left</div>
                  <div className="text-[18px] font-semibold" style={{ color: drawerItem.daysLeft <= 5 ? T.alert : T.text }}>{drawerItem.daysLeft === 0 ? 'Out' : `${drawerItem.daysLeft}d`}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] mb-3">Sales Velocity</div>
                <div className="h-16 rounded-xl bg-[rgba(18,21,31,0.03)] flex items-end justify-around px-4 pb-2">
                  {[60, 45, 70, 55, 80, 65, 90, 75, 85, 95, 70, 100].map((h, i) => (
                    <div key={i} className="w-4 rounded-t-sm bg-[var(--color-accent)] opacity-70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 rounded-xl border border-[rgba(7,213,104,0.15)] bg-[rgba(7,213,104,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-[var(--color-accent)]">Reorder Suggestion</span>
                </div>
                <p className="text-[12px] text-[var(--color-text)]">Order <span className="font-semibold">45 units</span> to maintain healthy stock levels for the next 30 days.</p>
              </div>

              <button className="w-full py-3 text-[12px] font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity">
                Create Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}