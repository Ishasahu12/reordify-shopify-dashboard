import React, { useState, useMemo, useRef } from 'react';
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
  amber: '#f59e0b',
  amberSoft: 'rgba(245,158,11,0.08)',
  blue: '#3b82f6',
  blueSoft: 'rgba(59,130,246,0.08)',
  graySoft: 'rgba(18,21,31,0.04)',
  white: '#ffffff',
  purple: '#8b5cf6',
  purpleSoft: 'rgba(139,92,246,0.08)',
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

function InsightCard({ icon, value, label, sublabel, color, bgColor, actionLabel, onAction }) {
  return (
    <Card className="p-5 hover:border-[var(--color-line-strong)] transition-all cursor-pointer group" onClick={onAction}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bgColor }}>
          {icon}
        </div>
        {actionLabel && (
          <span className="px-2.5 py-1 text-[10px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: color, color: T.white }}>
            {actionLabel}
          </span>
        )}
      </div>
      <p className="text-[2rem] font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-[13px] font-semibold text-[var(--color-text)]">{label}</p>
      <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{sublabel}</p>
    </Card>
  );
}

function MiniLineGraph({ data, color, width = 60, height = 24 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="flex rounded-xl p-1" style={{ background: T.graySoft }}>
      {options.map(opt => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all ${
            value === opt.key
              ? 'bg-white text-[var(--color-text)] shadow-sm'
              : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ActionInsight({ icon, message, type, actionLabel, onAction }) {
  const colors = {
    alert: { bg: T.alertSoft, color: T.alert, border: T.alert },
    warning: { bg: T.amberSoft, color: T.amber, border: T.amber },
    success: { bg: T.accentSoft, color: T.accent, border: T.accent },
    info: { bg: T.blueSoft, color: T.blue, border: T.blue },
  };
  const c = colors[type] || colors.info;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]" style={{ background: c.bg }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: c.color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-[var(--color-text)]">{message}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-3 py-1.5 text-[11px] font-semibold rounded-lg shrink-0 transition-all hover:opacity-90"
          style={{ background: c.color, color: T.white }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

const skuPerformance = [
  { id: 1, name: 'Linen Summer Shirt', variant: 'EU 40 / White', sku: 'LIN-SH-WH-40', demand: [45, 52, 48, 61, 58, 72, 69], stock: 0, daysLeft: 0, velocity: 'high', reorderPoint: 20, suggestedQty: 45, insight: 'Stockout imminent. Order now.', action: 'Reorder' },
  { id: 2, name: 'Hoodie Classic White', variant: 'L / True White', sku: 'HOOD-CL-L-TW', demand: [12, 15, 18, 22, 28, 32, 35], stock: 4, daysLeft: 2, velocity: 'high', reorderPoint: 15, suggestedQty: 30, insight: 'Critical: 2 days left.', action: 'Reorder' },
  { id: 3, name: 'Performance Tee', variant: 'XL / Graphite', sku: 'PERF-TEE-XL-GR', demand: [30, 28, 35, 32, 38, 42, 45], stock: 8, daysLeft: 3, velocity: 'high', reorderPoint: 25, suggestedQty: 40, insight: 'High velocity. Restock soon.', action: 'Reorder' },
  { id: 4, name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sku: 'TR-SH-US34-KH', demand: [8, 9, 10, 9, 11, 10, 12], stock: 12, daysLeft: 6, velocity: 'normal', reorderPoint: 15, suggestedQty: 25, insight: 'Stable. No rush.', action: 'Inspect' },
  { id: 5, name: 'Polo Shirt Red', variant: 'M / Red', sku: 'POL-SH-M-RD', demand: [18, 22, 19, 25, 28, 26, 30], stock: 6, daysLeft: 4, velocity: 'high', reorderPoint: 20, suggestedQty: 30, insight: 'Trending up. Consider more.', action: 'Adjust Plan' },
  { id: 6, name: 'Running Shorts Black', variant: 'M / Black', sku: 'RUN-SH-M-BK', demand: [20, 25, 30, 35, 42, 50, 55], stock: 3, daysLeft: 1, velocity: 'high', reorderPoint: 15, suggestedQty: 50, insight: 'Surge detected. Order ASAP.', action: 'Reorder' },
  { id: 7, name: 'Denim Jacket Classic', variant: 'S / Indigo', sku: 'DNM-JK-S-IN', demand: [3, 2, 3, 2, 2, 1, 2], stock: 210, daysLeft: 60, velocity: 'low', reorderPoint: 30, suggestedQty: 0, insight: 'Overstocked. Pause orders.', action: 'Clear Stock' },
  { id: 8, name: 'Cotton Cardigan Beige', variant: 'XL / Beige', sku: 'COT-CA-XL-BG', demand: [10, 9, 11, 10, 9, 10, 8], stock: 15, daysLeft: 8, velocity: 'normal', reorderPoint: 20, suggestedQty: 20, insight: 'Normal coverage.', action: 'Inspect' },
];

const demandData30d = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  demand: [65, 72, 68, 75, 82, 78, 85, 92, 88, 95, 102, 98, 105, 112, 108, 115, 122, 118, 125, 132, 128, 135, 142, 138, 145, 152, 148, 155, 162, 158],
  stock: [120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 0, 0, 0, 0, 0],
  demandRev: [5850, 6480, 6120, 6750, 7380, 7020, 7650, 8280, 7920, 8550, 9180, 8820, 9450, 10080, 9720, 10350, 10980, 10620, 11250, 11880, 11520, 12150, 12780, 12420, 13050, 13680, 13320, 13950, 14580, 14220],
  stockRev: [10800, 10350, 9900, 9450, 9000, 8550, 8100, 7650, 7200, 6750, 6300, 5850, 5400, 4950, 4500, 4050, 3600, 3150, 2700, 2250, 1800, 1350, 900, 450, 0, 0, 0, 0, 0, 0],
};

const demandData7d = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  demand: [85, 92, 88, 95, 102, 98, 105],
  stock: [45, 40, 35, 30, 25, 20, 15],
  demandRev: [7650, 8280, 7920, 8550, 9180, 8820, 9450],
  stockRev: [4050, 3600, 3150, 2700, 2250, 1800, 1350],
};

const demandData90d = {
  labels: Array.from({ length: 90 }, (_, i) => i + 1),
  demand: Array.from({ length: 90 }, (_, i) => 55 + Math.sin(i * 0.2) * 20 + i * 0.8),
  stock: Array.from({ length: 90 }, (_, i) => Math.max(0, 280 - i * 3)),
  demandRev: Array.from({ length: 90 }, (_, i) => (55 + Math.sin(i * 0.2) * 20 + i * 0.8) * 90),
  stockRev: Array.from({ length: 90 }, (_, i) => Math.max(0, 280 - i * 3) * 90),
};

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  sales: [42000, 48500, 53200, 47800, 55600, 61200],
  purchases: [28000, 32500, 35800, 31200, 38900, 42500],
};

function BarChart({ data, color, maxValue }) {
  return (
    <div className="flex items-end justify-between gap-2 h-full px-2">
      {data.map((value, i) => {
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t transition-all hover:opacity-80"
              style={{
                height: `${height}%`,
                background: color,
                minHeight: '4px'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ demandData, stockData, maxValue }) {
  const width = 100;
  const height = 100;

  const demandPath = demandData.map((v, i) => {
    const x = (i / (demandData.length - 1)) * width;
    const y = height - (v / maxValue) * height;
    return `${x},${y}`;
  }).join(' ');

  const stockPath = stockData.map((v, i) => {
    const x = (i / (stockData.length - 1)) * width;
    const y = height - (v / maxValue) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.blue} stopOpacity="0.2" />
          <stop offset="100%" stopColor={T.blue} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polyline
        points={stockPath}
        fill="none"
        stroke={T.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={demandPath}
        fill="none"
        stroke={T.blue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function InteractiveBarChart({ demandData, stockData, labels, maxValue, metricType }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const todayIndex = labels.length - 1;

  const formatValue = (val) => {
    if (metricType === 'revenue') {
      return '$' + val.toLocaleString();
    }
    return val.toString();
  };

  return (
    <div className="relative h-full">
      <div className="flex items-end h-full gap-2 px-2">
        {demandData.map((dVal, i) => {
          const demandHeight = maxValue > 0 ? (dVal / maxValue) * 100 : 0;
          const stockHeight = maxValue > 0 ? (stockData[i] / maxValue) * 100 : 0;
          const isToday = i === todayIndex;
          const isHovered = hoveredIndex === i;
          const demandExceedsStock = dVal > stockData[i];

          return (
            <div
              key={i}
              className="flex-1 flex items-end gap-0.5 cursor-pointer"
              onMouseEnter={(e) => {
                setHoveredIndex(i);
                const rect = e.target.getBoundingClientRect();
                const parentRect = e.target.closest('.relative').getBoundingClientRect();
                setTooltip({
                  x: rect.left - parentRect.left + rect.width / 2,
                  y: rect.top - parentRect.top,
                  label: labels[i],
                  demand: dVal,
                  stock: stockData[i],
                  demandExceedsStock
                });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setTooltip(null);
              }}
            >
              <div
                className="flex-1 rounded-t transition-all duration-200"
                style={{
                  height: `${demandHeight}%`,
                  background: isToday ? T.blue : isHovered ? T.blue : demandExceedsStock ? '#3b82f6' : T.blue,
                  opacity: isHovered || isToday ? 1 : 0.75,
                  minHeight: '4px',
                  boxShadow: isToday ? `0 0 0 2px ${T.blue}33` : isHovered ? `0 0 0 2px ${T.blue}22` : 'none'
                }}
              />
              <div
                className="flex-1 rounded-t transition-all duration-200"
                style={{
                  height: `${stockHeight}%`,
                  background: isToday ? T.accent : isHovered ? T.accent : T.accent,
                  opacity: isHovered || isToday ? 1 : 0.75,
                  minHeight: '4px',
                  boxShadow: isToday ? `0 0 0 2px ${T.accent}33` : isHovered ? `0 0 0 2px ${T.accent}22` : 'none'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 px-3 py-2 rounded-xl bg-[var(--color-text)] text-white shadow-lg pointer-events-none transform -translate-x-1/2"
          style={{ left: tooltip.x, top: tooltip.y - 10 }}
        >
          <p className="text-[11px] font-semibold mb-1">{tooltip.label}</p>
          <p className="text-[10px]" style={{ color: T.blue }}>
            Demand: {formatValue(tooltip.demand)}
          </p>
          <p className="text-[10px]" style={{ color: T.accent }}>
            Stock: {formatValue(tooltip.stock)}
          </p>
          {tooltip.demandExceedsStock && (
            <p className="text-[9px] mt-1" style={{ color: T.amber }}>Demand exceeds stock</p>
          )}
        </div>
      )}
    </div>
  );
}

function IntersectionHighlight({ demandData, stockData, maxValue }) {
  const intersections = [];

  for (let i = 1; i < demandData.length; i++) {
    if ((demandData[i - 1] <= stockData[i - 1] && demandData[i] > stockData[i]) ||
        (demandData[i - 1] > stockData[i - 1] && demandData[i] <= stockData[i])) {
      intersections.push(i);
    }
  }

  if (intersections.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {intersections.map(idx => {
        const x = (idx / (demandData.length - 1)) * 100;
        const avgY = 100 - ((demandData[idx] + stockData[idx]) / 2 / maxValue) * 100;
        return (
          <div
            key={idx}
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{
              left: `${x}%`,
              top: `${avgY}%`,
              background: T.amber,
              transform: 'translate(-50%, -50%)',
              opacity: 0.6
            }}
          />
        );
      })}
    </div>
  );
}

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [metricType, setMetricType] = useState('units');

  const getGraphData = () => {
    if (timeRange === '7d') return demandData7d;
    if (timeRange === '30d') return demandData30d;
    return demandData90d;
  };

  const graphData = getGraphData();

  const activeDemand = metricType === 'revenue' ? graphData.demandRev : graphData.demand;
  const activeStock = metricType === 'revenue' ? graphData.stockRev : graphData.stock;
  const allValues = [...activeDemand, ...activeStock];
  const maxValue = Math.max(...allValues, 1);

  const formatYAxis = (val) => {
    if (metricType === 'revenue') {
      if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
      return '$' + val;
    }
    if (val >= 1000) return (val / 1000).toFixed(0) + 'K';
    return val.toString();
  };

  const getActionRoute = (action) => {
    switch (action) {
      case 'Reorder': return '/dashboard/reorder';
      case 'Clear Stock': return '/dashboard/inventory';
      case 'Adjust Plan': return '/dashboard/analytics';
      case 'Inspect': return '/dashboard/inventory';
      default: return '/dashboard/reorder';
    }
  };

  return (
    <div className="px-8 py-7 flex flex-col min-h-0">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-[1.5rem] font-[700] tracking-[-0.02em] text-[var(--color-text)]">Analytics</h1>
          <p className="text-[12px] text-[var(--color-muted)] mt-1">Real-time insights for smarter inventory decisions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/dashboard/reorder')}
            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-xl text-white transition-all"
            style={{ background: T.accent }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            Reorder Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium rounded-xl border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Top Insight Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <InsightCard
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
          value="$1.2K"
          label="Lost Revenue Risk"
          sublabel="3 products with stockout risk"
          color={T.alert}
          bgColor={T.alertSoft}
          actionLabel="Reorder"
          onAction={() => navigate('/dashboard/reorder')}
        />
        <InsightCard
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
          value="4"
          label="Stockouts Imminent"
          sublabel="Will run out within 3 days"
          color={T.amber}
          bgColor={T.amberSoft}
          actionLabel="Fix Now"
          onAction={() => navigate('/dashboard/reorder')}
        />
        <InsightCard
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>}
          value="$45K"
          label="Dead Stock"
          sublabel="18 SKUs with 60+ days cover"
          color={T.muted}
          bgColor={T.graySoft}
          actionLabel="Review"
          onAction={() => navigate('/dashboard/inventory')}
        />
        <InsightCard
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
          value="12"
          label="High Demand Items"
          sublabel="Up 20% vs last period"
          color={T.accent}
          bgColor={T.accentSoft}
          actionLabel="View All"
          onAction={() => navigate('/dashboard/inventory')}
        />
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Demand vs Stock Graph */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[14px] font-semibold text-[var(--color-text)]">Demand vs Stock</h2>
                <p className="text-[11px] text-[var(--color-muted)] mt-0.5">
                  {metricType === 'revenue' ? 'Dollar value' : 'Unit count'} over time
                </p>
              </div>
              <div className="flex items-center gap-4">
                <ToggleGroup
                  options={[
                    { key: '7d', label: '7D' },
                    { key: '30d', label: '30D' },
                    { key: '90d', label: '90D' },
                  ]}
                  value={timeRange}
                  onChange={setTimeRange}
                />
                <ToggleGroup
                  options={[
                    { key: 'units', label: 'Units' },
                    { key: 'revenue', label: 'Revenue' },
                  ]}
                  value={metricType}
                  onChange={setMetricType}
                />
              </div>
            </div>

            <div className="relative h-[200px]">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[9px] text-[var(--color-muted)]">
                <span>{formatYAxis(maxValue)}</span>
                <span>{formatYAxis(Math.round(maxValue * 0.75))}</span>
                <span>{formatYAxis(Math.round(maxValue * 0.5))}</span>
                <span>{formatYAxis(Math.round(maxValue * 0.25))}</span>
                <span>{formatYAxis(0)}</span>
              </div>

              {/* Graph area */}
              <div className="absolute left-10 right-0 top-0 bottom-8">
                {timeRange === '7d' ? (
                  <InteractiveBarChart
                    demandData={activeDemand}
                    stockData={activeStock}
                    labels={graphData.labels}
                    maxValue={maxValue}
                    metricType={metricType}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <IntersectionHighlight demandData={activeDemand} stockData={activeStock} maxValue={maxValue} />
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Grid lines */}
                      {[0, 25, 50, 75, 100].map((pct) => (
                        <line
                          key={pct}
                          x1="0"
                          y1={`${pct}%`}
                          x2="100%"
                          y2={`${pct}%`}
                          stroke={T.line}
                          strokeWidth="0.5"
                        />
                      ))}
                      {/* Stock line */}
                      <polyline
                        points={activeStock.map((v, i) => {
                          const x = (i / (activeStock.length - 1)) * 100;
                          const y = 100 - (v / maxValue) * 100;
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke={T.accent}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      {/* Demand line */}
                      <polyline
                        points={activeDemand.map((v, i) => {
                          const x = (i / (activeDemand.length - 1)) * 100;
                          const y = 100 - (v / maxValue) * 100;
                          return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke={T.blue}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      {/* Highlight intersection points */}
                      {activeDemand.map((d, i) => {
                        if (i === 0) return null;
                        const prevDemand = activeDemand[i - 1];
                        const currStock = activeStock[i];
                        const prevStock = activeStock[i - 1];
                        if ((prevDemand <= prevStock && d > currStock) || (prevDemand > prevStock && d <= currStock)) {
                          const x = (i / (activeDemand.length - 1)) * 100;
                          const y = 100 - (d / maxValue) * 100;
                          return (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r="2"
                              fill={T.amber}
                              stroke={T.white}
                              strokeWidth="1"
                            />
                          );
                        }
                        return null;
                      })}
                    </svg>
                  </div>
                )}
              </div>

              {/* X-axis labels */}
              <div className="absolute left-10 right-0 bottom-0 h-6 flex items-center justify-between text-[8px] text-[var(--color-muted)]">
                {(timeRange === '7d' ? graphData.labels : graphData.labels.filter((_, i, arr) => i % Math.ceil(arr.length / 6) === 0)).map((label, i, arr) => (
                  <span key={i} className={i === 0 || i === arr.length - 1 ? '' : 'invisible'}>{label}</span>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: T.blue }} />
                <span className="text-[11px] text-[var(--color-muted)]">Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: T.accent }} />
                <span className="text-[11px] text-[var(--color-muted)]">Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.amber }} />
                <span className="text-[11px] text-[var(--color-muted)]">Crossover</span>
              </div>
            </div>
          </Card>

          {/* Actionable Insights */}
          <Card className="p-5">
            <h2 className="text-[14px] font-semibold text-[var(--color-text)] mb-4">Action Required</h2>
            <div className="space-y-3">
              <ActionInsight
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>}
                message="3 products will stock out in 4 days"
                type="alert"
                actionLabel="Reorder"
                onAction={() => navigate('/dashboard/reorder')}
              />
              <ActionInsight
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
                message="$12K tied in dead stock — 5 SKUs slow moving"
                type="warning"
                actionLabel="Clear Stock"
                onAction={() => navigate('/dashboard/inventory')}
              />
              <ActionInsight
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                message="Reorder needed for 8 SKUs within 7 days"
                type="info"
                actionLabel="Adjust Plan"
                onAction={() => navigate('/dashboard/analytics')}
              />
              <ActionInsight
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                message="Hoodie Classic White demand up 45% — trending"
                type="success"
                actionLabel="Reorder"
                onAction={() => navigate('/dashboard/reorder')}
              />
            </div>
          </Card>

          {/* SKU Performance Table */}
          <Card className="overflow-hidden" style={{ padding: 0 }}>
            <div className="px-5 py-4 border-b border-[var(--color-line)]">
              <h2 className="text-[14px] font-semibold text-[var(--color-text)]">SKU Performance</h2>
              <p className="text-[11px] text-[var(--color-muted)] mt-0.5">Top items by demand and stock status</p>
            </div>
            <div className="overflow-auto max-h-[320px]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-[var(--color-line)]">
                    <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-left">Product</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-center">Trend</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-center">Stock</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-center">Days Left</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-center">Reorder Pt</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-center">Sug Qty</th>
                    <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skuPerformance.map(sku => (
                    <tr key={sku.id} className="hover:bg-[rgba(18,21,31,0.02)] transition-colors group">
                      <td className="px-5 py-3 border-b border-[rgba(18,21,31,0.04)]">
                        <p className="text-[12px] font-semibold text-[var(--color-text)]">{sku.name}</p>
                        <p className="text-[10px] text-[var(--color-muted)]">{sku.variant}</p>
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <MiniLineGraph data={sku.demand} color={sku.velocity === 'high' ? T.accent : T.muted} />
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="text-[12px] font-semibold" style={{ color: sku.stock === 0 ? T.alert : T.text }}>{sku.stock}</span>
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md" style={{
                          background: sku.daysLeft <= 2 ? T.alertSoft : sku.daysLeft <= 5 ? T.amberSoft : T.accentSoft,
                          color: sku.daysLeft <= 2 ? T.alert : sku.daysLeft <= 5 ? T.amber : T.accent
                        }}>
                          {sku.daysLeft === 0 ? 'OUT' : sku.daysLeft + 'd'}
                        </span>
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="text-[11px] text-[var(--color-muted)]">{sku.reorderPoint}</span>
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)] text-center">
                        <span className="text-[11px] font-semibold" style={{ color: sku.suggestedQty === 0 ? T.muted : T.accent }}>{sku.suggestedQty}</span>
                      </td>
                      <td className="px-3 py-3 border-b border-[rgba(18,21,31,0.04)]">
                        <button
                          onClick={() => navigate(getActionRoute(sku.action))}
                          className="px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all"
                          style={{
                            background: sku.action === 'Reorder' ? T.accentSoft : sku.action === 'Clear Stock' ? T.alertSoft : T.blueSoft,
                            color: sku.action === 'Reorder' ? T.accent : sku.action === 'Clear Stock' ? T.alert : T.blue
                          }}
                        >
                          {sku.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Side Panel */}
        <div className="w-[300px] shrink-0 space-y-5">
          {/* AI Insights Panel */}
          <Card className="p-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: T.purpleSoft }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.purple} strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-[var(--color-text)]">AI Insights</h3>
                <p className="text-[10px] text-[var(--color-muted)]">Based on your data</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl" style={{ background: T.alertSoft }}>
                <p className="text-[11px] font-medium text-[var(--color-text)] mb-1">Stockout Alert</p>
                <p className="text-[10px] text-[var(--color-muted)]">Running Shorts Black will run out in 1 day at current velocity</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: T.amberSoft }}>
                <p className="text-[11px] font-medium text-[var(--color-text)] mb-1">Demand Spike</p>
                <p className="text-[10px] text-[var(--color-muted)]">Hoodie demand up 45% week-over-week. Consider increasing order quantity.</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: T.accentSoft }}>
                <p className="text-[11px] font-medium text-[var(--color-text)] mb-1">Opportunity</p>
                <p className="text-[10px] text-[var(--color-muted)]">Performance Tee shows consistent growth. Good candidate for bundle deal.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-line)] space-y-2">
              <button className="w-full py-2 text-[12px] font-semibold rounded-xl text-white transition-all" style={{ background: T.purple }}>
                Generate Report
              </button>
              <button className="w-full py-2 text-[12px] font-medium rounded-xl border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors">
                View All Recommendations
              </button>
            </div>
          </Card>

          {/* Sales vs Purchase */}
          <Card className="p-5">
            <h3 className="text-[13px] font-semibold text-[var(--color-text)] mb-4">Sales vs Purchase</h3>
            <div className="space-y-4">
              {salesData.labels.map((month, i) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-[10px] text-[var(--color-muted)] w-8">{month}</span>
                  <div className="flex-1 flex gap-1">
                    <div className="h-6 rounded-r" style={{ width: `${(salesData.sales[i] / 65000) * 100}%`, background: T.blue }} />
                    <div className="h-6 rounded-r" style={{ width: `${(salesData.purchases[i] / 65000) * 100}%`, background: T.accent }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--color-line)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.blue }} />
                <span className="text-[10px] text-[var(--color-muted)]">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.accent }} />
                <span className="text-[10px] text-[var(--color-muted)]">Purchases</span>
              </div>
            </div>
          </Card>

          {/* Supplier Performance */}
          <Card className="p-5">
            <h3 className="text-[13px] font-semibold text-[var(--color-text)] mb-4">Supplier Performance</h3>
            <div className="space-y-3">
              {[
                { name: 'StyleCo Global', ontime: 94, qty: 145 },
                { name: 'Urban Threads Ltd', ontime: 87, qty: 230 },
                { name: 'ActiveLife Supplies', ontime: 78, qty: 89 },
              ].map(supplier => (
                <div key={supplier.name} className="p-3 rounded-xl" style={{ background: T.graySoft }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-[var(--color-text)]">{supplier.name}</span>
                    <span className="text-[11px] font-semibold" style={{ color: supplier.ontime >= 90 ? T.accent : supplier.ontime >= 80 ? T.amber : T.alert }}>{supplier.ontime}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: T.line }}>
                    <div className="h-full rounded-full" style={{ width: `${supplier.ontime}%`, background: supplier.ontime >= 90 ? T.accent : supplier.ontime >= 80 ? T.amber : T.alert }} />
                  </div>
                  <p className="text-[9px] text-[var(--color-muted)] mt-1">{supplier.qty} units this month</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Insights */}
          <Card className="p-5">
            <h3 className="text-[13px] font-semibold text-[var(--color-text)] mb-4">Category Health</h3>
            <div className="space-y-2">
              {[
                { cat: 'Tops', health: 72, trend: '+5%' },
                { cat: 'Bottoms', health: 58, trend: '-2%' },
                { cat: 'Outerwear', health: 85, trend: '+12%' },
                { cat: 'Accessories', health: 45, trend: '-8%' },
              ].map(c => (
                <div key={c.cat} className="flex items-center justify-between py-2">
                  <span className="text-[11px] text-[var(--color-text)]">{c.cat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: T.graySoft }}>
                      <div className="h-full rounded-full" style={{ width: `${c.health}%`, background: c.health >= 70 ? T.accent : c.health >= 50 ? T.amber : T.alert }} />
                    </div>
                    <span className="text-[9px] font-medium" style={{ color: c.trend.startsWith('+') ? T.accent : T.alert }}>{c.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}