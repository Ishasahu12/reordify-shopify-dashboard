import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

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
  blueSoft: 'rgba(59,130,246,0.08)',
  blue: '#3b82f6',
  blueMid: 'rgba(59,130,246,0.50)',
  amberSoft: 'rgba(245,158,11,0.08)',
  amber: '#f59e0b',
  graySoft: 'rgba(18,21,31,0.04)',
  greenSoft: 'rgba(7,213,104,0.10)',
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[16px] border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

const reorderData = [
  { id: 1, name: 'Linen Summer Shirt', variant: 'EU 40 / White', sku: 'LIN-SH-WH-40', currentStock: 0, daysLeft: 0, velocity: 'high', suggestedQty: 45, reason: 'Stockout expected in 2 days', supplier: 'StyleCo Global', unitCost: 8.50, incoming: 0, demandTrend: '+23%', priorityScore: 'high' },
  { id: 2, name: 'Hoodie Classic White', variant: 'L / True White', sku: 'HOOD-CL-L-TW', currentStock: 4, daysLeft: 2, velocity: 'high', suggestedQty: 30, reason: 'Selling 2.3x faster than usual', supplier: 'Urban Threads Ltd', unitCost: 12.00, incoming: 0, demandTrend: '+45%', priorityScore: 'high' },
  { id: 3, name: 'Performance Tee', variant: 'XL / Graphite', sku: 'PERF-TEE-XL-GR', currentStock: 8, daysLeft: 3, velocity: 'high', suggestedQty: 40, reason: 'Velocity up 34% this week', supplier: 'Urban Threads Ltd', unitCost: 6.50, incoming: 20, demandTrend: '+34%', priorityScore: 'high' },
  { id: 4, name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sku: 'TR-SH-US34-KH', currentStock: 12, daysLeft: 6, velocity: 'normal', suggestedQty: 25, reason: 'Stable demand. Normal coverage.', supplier: 'ActiveLife Supplies', unitCost: 9.00, incoming: 0, demandTrend: '+2%', priorityScore: 'medium' },
  { id: 5, name: 'Crossback Bra Top', variant: 'S / Sage', sku: 'BRA-CB-S-SG', currentStock: 18, daysLeft: 12, velocity: 'normal', suggestedQty: 20, reason: 'Normal coverage. Stable demand.', supplier: 'StyleCo Global', unitCost: 7.00, incoming: 0, demandTrend: '0%', priorityScore: 'low' },
  { id: 6, name: 'Slim Fit Chinos', variant: '32 / Charcoal', sku: 'CHI-SF-32-CH', currentStock: 0, daysLeft: 0, velocity: 'high', suggestedQty: 35, reason: 'Stockout risk. Popular item.', supplier: 'ActiveLife Supplies', unitCost: 11.00, incoming: 0, demandTrend: '+18%', priorityScore: 'high' },
  { id: 7, name: 'Denim Jacket Classic', variant: 'S / Indigo', sku: 'DNM-JK-S-IN', currentStock: 210, daysLeft: 60, velocity: 'low', suggestedQty: 0, reason: 'Overstocked. Pause orders.', supplier: 'StyleCo Global', unitCost: 18.00, incoming: 0, demandTrend: '-8%', priorityScore: 'low' },
  { id: 8, name: 'Polo Shirt Red', variant: 'M / Red', sku: 'POL-SH-M-RD', currentStock: 6, daysLeft: 4, velocity: 'high', suggestedQty: 30, reason: 'Selling 18% faster than usual', supplier: 'Urban Threads Ltd', unitCost: 7.50, incoming: 15, demandTrend: '+18%', priorityScore: 'high' },
  { id: 9, name: 'Running Shorts Black', variant: 'M / Black', sku: 'RUN-SH-M-BK', currentStock: 3, daysLeft: 1, velocity: 'high', suggestedQty: 50, reason: 'Stockout expected tomorrow', supplier: 'ActiveLife Supplies', unitCost: 5.50, incoming: 0, demandTrend: '+67%', priorityScore: 'high' },
  { id: 10, name: 'Cotton Cardigan Beige', variant: 'XL / Beige', sku: 'COT-CA-XL-BG', currentStock: 15, daysLeft: 8, velocity: 'normal', suggestedQty: 20, reason: 'Stable demand. Good coverage.', supplier: 'StyleCo Global', unitCost: 14.00, incoming: 0, demandTrend: '-3%', priorityScore: 'medium' },
];

export default function ReorderPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [approved, setApproved] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [quantities, setQuantities] = useState(
    reorderData.reduce((acc, item) => ({ ...acc, [item.id]: item.suggestedQty }), {})
  );

  // Filters
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('daysLeft');

  const reorderItems = reorderData.filter(i => i.suggestedQty > 0);
  const urgentItems = reorderItems.filter(i => i.daysLeft <= 2);
  const shortCoverage = reorderItems.filter(i => i.daysLeft > 2 && i.daysLeft <= 5);
  const healthy = reorderItems.filter(i => i.daysLeft > 5);
  const reorderNowItems = reorderItems.filter(i => !skipped.includes(i.id));

  const estimatedSpend = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const item = reorderData.find(i => i.id === parseInt(id));
    return sum + (item ? qty * item.unitCost : 0);
  }, 0);

  // Filter logic
  const filteredItems = useMemo(() => {
    let items = reorderItems.filter(i => !skipped.includes(i.id));

    if (activeTab === 'urgent') items = items.filter(i => i.daysLeft <= 2);
    if (activeTab === 'reorder') items = items.filter(i => !approved.includes(i.id));

    if (search) {
      items = items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.sku.toLowerCase().includes(search.toLowerCase())
      );
    }

    return items.sort((a, b) => {
      if (sortBy === 'daysLeft') return a.daysLeft - b.daysLeft;
      if (sortBy === 'demand') {
        const order = { high: 0, normal: 1, low: 2 };
        return order[a.velocity] - order[b.velocity];
      }
      return 0;
    });
  }, [activeTab, search, sortBy, approved, skipped]);

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleApprove = (id) => {
    setApproved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    setSelected(prev => prev.filter(i => i !== id));
  };

  const handleSkip = (id) => {
    setSkipped(prev => [...prev, id]);
    setSelected(prev => prev.filter(i => i !== id));
  };

  const handleBulkSkip = () => {
    selected.forEach(id => setSkipped(prev => [...prev, id]));
    setSelected([]);
  };

  const handleCreatePO = () => {
    const itemsToAdd = approved.length > 0
      ? filteredItems.filter(i => approved.includes(i.id))
      : filteredItems.filter(i => !skipped.includes(i.id));
    navigate('/purchase-orders/review', {
      state: { items: reorderItems, quantities, approved: itemsToAdd.map(i => i.id) }
    });
  };

  const selectedSpend = selected.reduce((sum, id) => {
    const item = reorderData.find(i => i.id === id);
    return sum + (item ? quantities[item.id] * item.unitCost : 0);
  }, 0);

  const totalSpend = filteredItems.reduce((sum, item) => {
    return sum + quantities[item.id] * item.unitCost;
  }, 0);

  const getDaysLeftStyle = (item) => {
    if (item.currentStock === 0 || item.daysLeft <= 1) return { bg: T.alertSoft, color: T.alert, label: 'Out of Stock', dot: T.alert };
    if (item.daysLeft <= 3) return { bg: T.alertSoft, color: T.alert, label: 'Critical', dot: T.alert };
    if (item.daysLeft <= 5) return { bg: T.amberSoft, color: T.amber, label: 'Low', dot: T.amber };
    return { bg: T.accentSoft, color: T.accent, label: 'Healthy', dot: T.accent };
  };

  const getDemandStyle = (velocity) => {
    if (velocity === 'high') return { label: 'High', color: T.accent };
    if (velocity === 'low') return { label: 'Low', color: T.muted };
    return { label: 'Normal', color: T.muted };
  };

  const getPriorityStyle = (score) => {
    if (score === 'high') return { bg: T.alertSoft, color: T.alert };
    if (score === 'medium') return { bg: T.amberSoft, color: T.amber };
    return { bg: T.graySoft, color: T.muted };
  };

  const getCoverageBar = (daysLeft) => {
    const maxDays = 30;
    const pct = Math.min((daysLeft / maxDays) * 100, 100);
    if (daysLeft <= 2) return { pct, bg: T.alertSoft, fill: T.alert };
    if (daysLeft <= 5) return { pct, bg: T.amberSoft, fill: T.amber };
    return { pct, bg: T.accentSoft, fill: T.accent };
  };

  return (
    <div className="px-8 py-7 flex flex-col min-h-0">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[1.25rem] font-[700] tracking-[-0.02em] text-[var(--color-text)]">Reorder</h1>
          <p className="text-[12px] text-[var(--color-muted)] mt-0.5">Review and create purchase orders</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card style={{ padding: '20px', background: T.alertSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Urgent Reorder</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.alert }}>{urgentItems.length} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Running out in 2 days</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.amberSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Short Coverage</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.amber }}>{shortCoverage.length} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Below 5 days</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.accentSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Healthy</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.accent }}>{healthy.length} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Stable coverage</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.blueSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Estimated Spend</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.blue }}>${estimatedSpend.toLocaleString()}</p>
              <p className="text-[10px] text-[var(--color-muted)]">If all orders placed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex rounded-full border border-[var(--color-line)] p-0.5 bg-white">
          {[
            { key: 'all', label: 'All', count: reorderNowItems.length },
            { key: 'urgent', label: 'Urgent', count: urgentItems.length },
            { key: 'reorder', label: 'Reorder Now', count: reorderNowItems.filter(i => !approved.includes(i.id)).length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium transition-all ${
                activeTab === tab.key ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-white/20' : 'bg-[var(--color-gray-soft)]'
              }`}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search SKU or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[11px] rounded-full border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 text-[11px] rounded-full border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
        >
          <option value="daysLeft">Sort: Days Left</option>
          <option value="demand">Sort: Demand</option>
        </select>
      </div>

      {/* Decision Bar */}
      {filteredItems.length > 0 && (
        <div className="mb-4 flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[var(--color-text)] text-white">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Total SKUs</p>
              <p className="text-[18px] font-bold">{filteredItems.length}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Total Spend</p>
              <p className="text-[18px] font-bold">${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            {selected.length > 0 && (
              <>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Selected</p>
                  <p className="text-[18px] font-bold">{selected.length} (${selectedSpend.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })})</p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleCreatePO}
            className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Create Purchase Orders
          </button>
        </div>
      )}

      {/* Main Table */}
      <Card className="flex-1 overflow-hidden" style={{ padding: 0 }}>
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-[var(--color-line)]">
                <th className="w-[240px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-left sticky left-0 z-20 border-r border-[var(--color-line)]">Product</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Status</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Days of Cover</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Stock</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Demand</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Trend</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Suggested Qty</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Days to Cover</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Coverage</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-right">Unit Cost</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-right">Total</th>
                <th className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Priority</th>
                <th className="w-[100px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center border-l border-[var(--color-line)]">Actions</th>
                <th className="w-[200px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-left border-l border-[var(--color-line)]">AI Insight</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-16 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: T.accentSoft }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-[14px] font-medium text-[var(--color-text)]">All products are healthy</p>
                    <p className="text-[12px] text-[var(--color-muted)] mt-1">No reorder needed at this time</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => {
                  const isApproved = approved.includes(item.id);
                  const isSelected = selected.includes(item.id);
                  const daysLeftStyle = getDaysLeftStyle(item);
                  const demandStyle = getDemandStyle(item.velocity);
                  const priorityStyle = getPriorityStyle(item.priorityScore);
                  const coverage = getCoverageBar(item.daysLeft);
                  const total = quantities[item.id] * item.unitCost;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isApproved ? 'bg-[rgba(7,213,104,0.04)]' : 'hover:bg-[rgba(18,21,31,0.02)]'
                      } ${isSelected && !isApproved ? 'bg-[rgba(7,213,104,0.08)]' : ''}`}
                    >
                      {/* Product Context - Sticky */}
                      <td className="w-[240px] shrink-0 px-4 py-3 border-b border-[rgba(18,21,31,0.04)] bg-white sticky left-0 z-10 border-r border-[var(--color-line)]">
                        <div className="flex items-center gap-2.5">
                          <div
                            onClick={() => handleSelect(item.id)}
                            className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                              isApproved ? 'opacity-50 cursor-not-allowed' : ''
                            } ${isSelected ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' : 'border-[var(--color-line-strong)] hover:border-[var(--color-muted)]'}`}
                          >
                            {isSelected && !isApproved && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold text-[var(--color-text)] truncate">{item.name}</p>
                            <p className="text-[10px] text-[var(--color-muted)] truncate">{item.variant}</p>
                            <p className="text-[9px] font-mono text-[var(--color-muted)] mt-0.5">{item.sku}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold rounded-md" style={{ background: daysLeftStyle.bg, color: daysLeftStyle.color }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: daysLeftStyle.dot }} />
                          {daysLeftStyle.label}
                        </span>
                      </td>

                      {/* Days of Cover */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <p className="text-[12px] font-bold" style={{ color: daysLeftStyle.color }}>{item.daysLeft === 0 ? 'OUT' : item.daysLeft + 'd'}</p>
                      </td>

                      {/* Stock */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <p className="text-[12px] font-semibold" style={{ color: item.currentStock === 0 ? T.alert : T.text }}>{item.currentStock}</p>
                        {item.incoming > 0 && (
                          <p className="text-[8px]" style={{ color: T.blue }}>+{item.incoming} in transit</p>
                        )}
                      </td>

                      {/* Demand */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="text-[10px] font-semibold" style={{ color: demandStyle.color }}>
                          {demandStyle.label}
                        </span>
                      </td>

                      {/* Trend */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        {item.demandTrend.startsWith('+') ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold" style={{ color: T.accent }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
                            {item.demandTrend.replace('+', '')}
                          </span>
                        ) : item.demandTrend.startsWith('-') ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold" style={{ color: T.alert }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                            {item.demandTrend.replace('-', '')}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold" style={{ color: T.muted }}>{item.demandTrend}</span>
                        )}
                      </td>

                      {/* Suggested Qty (editable) */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <input
                          type="number"
                          value={quantities[item.id]}
                          onChange={(e) => setQuantities(prev => ({ ...prev, [item.id]: parseInt(e.target.value) || 0 }))}
                          disabled={isApproved}
                          className="w-[55px] px-1.5 py-1 text-[11px] font-semibold text-center rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            background: isApproved ? T.accentSoft : T.white,
                            borderColor: isApproved ? T.accent : 'transparent',
                            color: isApproved ? T.accent : T.text,
                          }}
                        />
                      </td>

                      {/* Days to Cover */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <p className="text-[11px] text-[var(--color-muted)]">
                          {item.daysLeft > 0 ? Math.round(quantities[item.id] / (item.currentStock / item.daysLeft)) : quantities[item.id]}d
                        </p>
                      </td>

                      {/* Coverage Bar */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <div className="w-[60px] mx-auto h-1.5 rounded-full overflow-hidden" style={{ background: coverage.bg }}>
                          <div className="h-full rounded-full transition-all" style={{ width: coverage.pct + '%', background: coverage.fill }} />
                        </div>
                      </td>

                      {/* Unit Cost */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-right">
                        <span className="text-[11px] text-[var(--color-text)]">${item.unitCost.toFixed(2)}</span>
                      </td>

                      {/* Total */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-right">
                        <span className="text-[11px] font-semibold text-[var(--color-text)]">${total.toFixed(0)}</span>
                      </td>

                      {/* Priority */}
                      <td className="px-2 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="inline-flex px-2 py-0.5 text-[9px] font-bold uppercase rounded" style={{ background: priorityStyle.bg, color: priorityStyle.color }}>
                          {item.priorityScore}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="w-[100px] shrink-0 px-4 py-3 border-b border-[rgba(18,21,31,0.04)] border-l border-[var(--color-line)]">
                        {isApproved ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-lg" style={{ background: T.accentSoft, color: T.accent }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              Done
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleSkip(item.id)}
                              className="px-2 py-1 text-[10px] font-medium rounded-lg border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors"
                            >
                              Skip
                            </button>
                          </div>
                        )}
                      </td>

                      {/* AI Insight */}
                      <td className="w-[200px] shrink-0 px-4 py-3 border-b border-[rgba(18,21,31,0.04)] border-l border-[var(--color-line)]">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: T.blueSoft }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          </div>
                          <p className="text-[10px] leading-[1.4] text-[var(--color-muted)]">{item.reason}</p>
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

      {/* Bulk Selection Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-4 rounded-2xl bg-[var(--color-text)] text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-medium">{selected.length} selected</span>
            <span className="text-[10px] text-white/50">|</span>
            <span className="text-[12px] text-white/70">${selectedSpend.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <button
            onClick={handleCreatePO}
            className="px-5 py-2.5 text-[11px] font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Create PO ({selected.length})
          </button>
          <button
            onClick={handleBulkSkip}
            className="px-4 py-2.5 text-[11px] font-medium rounded-xl text-white/60 hover:text-white transition-colors"
          >
            Skip
          </button>
          <button
            onClick={() => setSelected([])}
            className="px-4 py-2.5 text-[11px] font-medium rounded-xl text-white/40 hover:text-white/60 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
