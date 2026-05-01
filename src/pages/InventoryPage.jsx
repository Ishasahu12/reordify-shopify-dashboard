import React, { useState } from 'react';
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
  blueLight: 'rgba(59,130,246,0.15)',
  amberSoft: 'rgba(245,158,11,0.08)',
  amber: '#f59e0b',
  purpleSoft: 'rgba(139,92,246,0.08)',
  purple: '#8b6cff',
  graySoft: 'rgba(18,21,31,0.04)',
  greenSoft: 'rgba(7,213,104,0.10)',
  greenLight: 'rgba(7,213,104,0.15)',
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-[16px] border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

const inventoryData = [
  { id: 1, name: 'Linen Summer Shirt', variant: 'EU 40 / White', sku: 'LIN-SH-WH-40', available: 0, incoming: 45, daysLeft: 0, status: 'out', velocity: 'high', demand: [40, 65, 80, 95, 110, 100, 90], forecast: 95, risk: 'high', insight: 'Stockout expected today. Demand up 34% this week.' },
  { id: 2, name: 'Hoodie Classic White', variant: 'L / True White', sku: 'HOOD-CL-L-TW', available: 4, incoming: 20, daysLeft: 2, status: 'critical', velocity: 'high', demand: [30, 45, 60, 75, 90, 110, 120], forecast: 115, risk: 'high', insight: 'Selling 2.3x faster than usual. Will stock out in 2 days.' },
  { id: 3, name: 'Performance Tee', variant: 'XL / Graphite', sku: 'PERF-TEE-XL-GR', available: 8, incoming: 50, daysLeft: 3, status: 'critical', velocity: 'high', demand: [50, 55, 70, 65, 80, 90, 85], forecast: 88, risk: 'high', insight: 'Velocity up 40% this week. Reorder needed.' },
  { id: 4, name: 'Crossback Bra Top', variant: 'S / Sage', sku: 'BRA-CB-S-SG', available: 24, incoming: 0, daysLeft: 18, status: 'healthy', velocity: 'normal', demand: [20, 22, 18, 24, 20, 19, 21], forecast: 20, risk: 'safe', insight: 'Stable sales, no action needed.' },
  { id: 5, name: 'Adventure Vest', variant: 'M / Slate', sku: 'ADV-VES-M-SL', available: 156, incoming: 0, daysLeft: 45, status: 'overstock', velocity: 'slow', demand: [8, 6, 5, 7, 4, 3, 5], forecast: 4, risk: 'low', insight: 'Overstocked. Demand dropped 30%, pause orders.' },
  { id: 6, name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sku: 'TR-SH-US34-KH', available: 12, incoming: 30, daysLeft: 6, status: 'low', velocity: 'high', demand: [35, 40, 38, 45, 50, 48, 52], forecast: 50, risk: 'medium', insight: 'Demand rising steadily. 30 units incoming.' },
  { id: 7, name: 'Fleece Jacket Navy', variant: 'XL / Navy', sku: 'FLE-JK-XL-NV', available: 67, incoming: 0, daysLeft: 22, status: 'healthy', velocity: 'normal', demand: [15, 18, 14, 16, 19, 17, 16], forecast: 17, risk: 'safe', insight: 'Healthy coverage for 3 weeks.' },
  { id: 8, name: 'Slim Fit Chinos', variant: '32 / Charcoal', sku: 'CHI-SF-32-CH', available: 0, incoming: 25, daysLeft: 0, status: 'out', velocity: 'high', demand: [45, 55, 70, 80, 75, 90, 95], forecast: 92, risk: 'high', insight: 'Popular item. Out of stock. 25 units arriving.' },
  { id: 9, name: 'Merino Wool Sweater', variant: 'M / Burgundy', sku: 'MER-WO-M-BG', available: 31, incoming: 0, daysLeft: 14, status: 'healthy', velocity: 'normal', demand: [12, 14, 11, 13, 15, 12, 14], forecast: 13, risk: 'safe', insight: 'Normal demand. No action required.' },
  { id: 10, name: 'Running Shorts Black', variant: 'L / Black', sku: 'RUN-SH-L-BK', available: 89, incoming: 0, daysLeft: 30, status: 'healthy', velocity: 'normal', demand: [25, 28, 22, 26, 24, 27, 25], forecast: 26, risk: 'safe', insight: 'Stock level healthy. Stable demand.' },
  { id: 11, name: 'Denim Jacket Classic', variant: 'S / Indigo', sku: 'DNM-JK-S-IN', available: 210, incoming: 0, daysLeft: 60, status: 'dead', velocity: 'slow', demand: [3, 2, 4, 1, 2, 3, 2], forecast: 2, risk: 'low', insight: 'Dead stock. No sales in 30 days. Consider discount.' },
  { id: 12, name: 'Polo Shirt Red', variant: 'M / Red', sku: 'POL-SH-M-RD', available: 6, incoming: 40, daysLeft: 4, status: 'critical', velocity: 'high', demand: [40, 45, 55, 60, 65, 70, 68], forecast: 72, risk: 'high', insight: 'Selling fast. 40 units incoming, will last 2 weeks.' },
];

const aiInsights = [
  { icon: 'alert', title: '3 products will stock out this weekend', desc: 'Linen Shirt, Slim Fit Chinos, and 1 more', urgent: true, filter: 'out' },
  { icon: 'trend', title: 'Demand spike detected in Hoodies category', desc: '+34% vs last week. Consider increasing stock.', urgent: false },
  { icon: 'warning', title: '2 SKUs overstocked by 40%', desc: 'Denim Jacket and Adventure Vest have excess inventory', urgent: false },
];

const categoryBreakdown = [
  { label: 'Tops', value: 45, color: T.blue },
  { label: 'Bottoms', value: 30, color: T.accent },
  { label: 'Outerwear', value: 15, color: T.amber },
  { label: 'Accessories', value: 10, color: T.purple },
];

const supplierBreakdown = [
  { label: 'StyleCo Global', value: 40, color: T.blue },
  { label: 'Urban Threads Ltd', value: 35, color: T.accent },
  { label: 'ActiveLife Supplies', value: 25, color: T.amber },
];

// Generate smooth curve points using Bezier interpolation
const smoothLine = (points, tension = 0.4) => {
  if (points.length < 2) return points.map((p, i) => `${i},${p}`).join(' ');
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i === points.length - 2 ? points[points.length - 1] : points[i + 2];
    for (let t = 0; t <= 1; t += 0.1) {
      const x1 = p1 + (p2 - p0) * tension * t;
      const x2 = p2 + (p3 - p1) * tension * t;
      result.push([t === 0 ? i : i + t, p1 + (p2 - p1) * t]);
    }
  }
  return result;
};

const demandData7d = [85, 92, 78, 95, 110, 100, 115];
const stockData7d = [180, 165, 155, 140, 125, 115, 100];

const demandData30d = [70, 75, 68, 82, 88, 95, 90, 98, 105, 100, 108, 115, 110, 118, 125, 120, 128, 135, 130, 138, 145, 140, 148, 155, 150, 158, 165, 160, 168, 175];
const stockData30d = [280, 265, 250, 235, 220, 210, 195, 180, 170, 160, 150, 145, 135, 125, 120, 110, 100, 95, 88, 80, 75, 70, 65, 60, 55, 50, 48, 45, 42, 40];

const demandData90d = Array.from({ length: 90 }, (_, i) => 80 + Math.sin(i * 0.1) * 30 + Math.random() * 20);
const stockData90d = Array.from({ length: 90 }, (_, i) => 280 - i * 2.5 + Math.random() * 15);

const REORDER_THRESHOLD = 50;

export default function InventoryContent() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [toggleView, setToggleView] = useState('units');
  const [search, setSearch] = useState('');

  const atRiskCount = inventoryData.filter(i => i.risk === 'high').length;
  const fastMovingCount = inventoryData.filter(i => i.velocity === 'high' && i.status !== 'out').length;
  const slowMovingCount = inventoryData.filter(i => i.velocity === 'slow' || i.status === 'overstock').length;
  const inventoryValue = inventoryData.reduce((sum, i) => sum + (i.available * 12), 0);

  const filteredData = inventoryData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const getSparklinePath = (data, width = 50, height = 20) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const getSmoothPath = (data, width = 50, height = 20) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const len = data.length;
    const pts = data.map((v, i) => [i, (v - min) / range]);
    const result = [];
    for (let i = 0; i < len - 1; i++) {
      const x0 = i === 0 ? pts[0][0] : pts[i - 1][0];
      const x1 = pts[i][0];
      const x2 = pts[i + 1][0];
      const x3 = i === len - 2 ? pts[len - 1][0] : pts[i + 2][0];
      const y0 = i === 0 ? pts[0][1] : pts[i - 1][1];
      const y1 = pts[i][1];
      const y2 = pts[i + 1][1];
      const y3 = i === len - 2 ? pts[len - 1][1] : pts[i + 2][1];
      for (let t = 0; t <= 1; t++) {
        const x = (x3 - x0) * 0.5 * t * t * t + (x2 + x0 - 2 * x1) * 0.5 * t * t + (x1 - x0) * t + x0;
        const y = (y3 - y0) * 0.5 * t * t * t + (y2 + y0 - 2 * y1) * 0.5 * t * t + (y1 - y0) * t + y0;
        result.push([(x / (len - 1)) * width, height - y * height]);
      }
    }
    return `M ${result.map(p => p.join(',')).join(' L ')}`;
  };

  const getDemandIcon = (velocity) => {
    if (velocity === 'high') return { icon: '↑', color: T.accent };
    if (velocity === 'slow') return { icon: '↓', color: T.muted };
    return { icon: '→', color: T.muted };
  };

  const getRiskStyle = (risk) => {
    if (risk === 'high') return { bg: T.alertSoft, color: T.alert, label: 'High' };
    if (risk === 'medium') return { bg: T.amberSoft, color: T.amber, label: 'Medium' };
    return { bg: T.accentSoft, color: T.accent, label: 'Safe' };
  };

  const getDaysCoverStyle = (daysLeft) => {
    if (daysLeft <= 3) return { bg: T.alertSoft, color: T.alert };
    if (daysLeft <= 10) return { bg: T.amberSoft, color: T.amber };
    return { bg: T.accentSoft, color: T.accent };
  };

  // Render adaptive graph based on time range
  const renderGraph = () => {
    if (timeRange === '7d') {
      const maxVal = Math.max(...demandData7d, ...stockData7d);
      return (
        <div className="relative" style={{ height: '200px' }}>
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="border-b border-[rgba(18,21,31,0.04)] w-full" style={{ height: '20%' }} />
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[var(--color-muted)] pr-3">
            <span>{maxVal}</span>
            <span>{Math.round(maxVal * 0.75)}</span>
            <span>{Math.round(maxVal * 0.5)}</span>
            <span>{Math.round(maxVal * 0.25)}</span>
            <span>0</span>
          </div>
          <div className="absolute left-12 right-2 bottom-6 flex items-end justify-between gap-2 px-1">
            {demandData7d.map((d, i) => {
              const demandH = (d / maxVal) * 160;
              const stockH = (stockData7d[i] / maxVal) * 160;
              return (
                <div key={i} className="flex items-end justify-center gap-1 flex-1">
                  <div className="w-5 rounded-t-sm" style={{ height: `${demandH}px`, background: T.blue }} />
                  <div className="w-5 rounded-t-sm" style={{ height: `${stockH}px`, background: T.accent }} />
                </div>
              );
            })}
          </div>
          <div className="absolute left-12 right-2 bottom-0 flex justify-between text-[10px] text-[var(--color-muted)] px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>
      );
    }

    if (timeRange === '30d') {
      const maxVal = Math.max(...demandData30d, ...stockData30d);
      return (
        <div className="relative" style={{ height: '200px' }}>
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="border-b border-[rgba(18,21,31,0.04)] w-full" style={{ height: '20%' }} />
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[var(--color-muted)] pr-3">
            <span>{maxVal}</span>
            <span>{Math.round(maxVal * 0.5)}</span>
            <span>0</span>
          </div>
          <div className="absolute left-12 right-2 bottom-6">
            {/* Stock area */}
            <svg className="w-full" viewBox={`0 0 700 160`} preserveAspectRatio="none" style={{ height: '160px' }}>
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(7,213,104,0.3)" />
                  <stop offset="100%" stopColor="rgba(7,213,104,0)" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 160 L ${stockData30d.map((v, i) => `${i * (700 / 29)},${160 - (v / maxVal) * 140}`).join(' L ')} L 700 160 Z`}
                fill="url(#stockGrad)"
              />
              <path
                d={`M 0 160 L ${stockData30d.map((v, i) => `${i * (700 / 29)},${160 - (v / maxVal) * 140}`).join(' L ')}`}
                fill="none"
                stroke="rgba(7,213,104,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Demand line */}
              <path
                d={`M ${demandData30d.map((v, i) => `${i * (700 / 29)},${160 - (v / maxVal) * 140}`).join(' L ')}`}
                fill="none"
                stroke={T.blue}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute left-12 right-2 bottom-0 flex justify-between text-[10px] text-[var(--color-muted)]">
            <span>Day 1</span>
            <span>Day 10</span>
            <span>Day 20</span>
            <span>Day 30</span>
          </div>
        </div>
      );
    }

    // 90d view
    const maxVal = Math.max(...demandData90d, ...stockData90d);
    return (
      <div className="relative" style={{ height: '200px' }}>
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="border-b border-[rgba(18,21,31,0.04)] w-full" style={{ height: '20%' }} />
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-[var(--color-muted)] pr-3">
          <span>{maxVal}</span>
          <span>{Math.round(maxVal * 0.5)}</span>
          <span>0</span>
        </div>
        <div className="absolute left-12 right-2 bottom-6">
          <svg className="w-full" viewBox={`0 0 700 160`} preserveAspectRatio="none" style={{ height: '160px' }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(229,72,77,0.1)" />
                <stop offset="100%" stopColor="rgba(229,72,77,0)" />
              </linearGradient>
            </defs>
            {/* Risk zone highlight */}
            <path
              d={`M 0 160 L ${demandData90d.map((d, i) => {
                const riskStart = (REORDER_THRESHOLD / maxVal) * 160;
                return `0,${riskStart} L ${i * (700 / 89)},${160 - (d / maxVal) * 140}`;
              }).join(' L ')} L 700 160 L 0 160 Z`}
              fill="url(#riskGrad)"
            />
            {/* Demand line */}
            <path
              d={`M ${demandData90d.map((v, i) => `${i * (700 / 89)},${160 - (v / maxVal) * 140}`).join(' L ')}`}
              fill="none"
              stroke={T.blue}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Stock line */}
            <path
              d={`M ${stockData90d.map((v, i) => `${i * (700 / 89)},${160 - (v / maxVal) * 140}`).join(' L ')}`}
              fill="none"
              stroke="rgba(7,213,104,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Reorder threshold line */}
            <line
              x1="0"
              y1={(1 - REORDER_THRESHOLD / maxVal) * 160 + 40}
              x2="700"
              y2={(1 - REORDER_THRESHOLD / maxVal) * 160 + 40}
              stroke={T.amber}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="absolute left-0 top-0 flex items-center gap-1" style={{ top: `${(1 - REORDER_THRESHOLD / maxVal) * 140}px` }}>
            <div className="w-3 h-0.5" style={{ background: T.amber }} />
            <span className="text-[9px] text-[var(--color-muted)]">Risk threshold</span>
          </div>
        </div>
        <div className="absolute left-12 right-2 bottom-0 flex justify-between text-[10px] text-[var(--color-muted)]">
          <span>Day 1</span>
          <span>Day 30</span>
          <span>Day 60</span>
          <span>Day 90</span>
        </div>
      </div>
    );
  };

  return (
    <div className="px-8 py-7 flex flex-col min-h-0">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-display text-[1.25rem] font-[700] tracking-[-0.02em] text-[var(--color-text)]">Inventory Overview</h1>
        <p className="text-[12px] text-[var(--color-muted)] mt-0.5">Track stock health, demand trends, and future risks across your products</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card
          style={{ padding: '20px', background: T.alertSoft, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard/reorder', { state: { filter: 'out' } })}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">At Risk</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.alert }}>{atRiskCount} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Stock out in 3–5 days</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.accentSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Fast Moving</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.accent }}>{fastMovingCount} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Above forecast demand</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.amberSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Slow Moving</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.amber }}>{slowMovingCount} SKUs</p>
              <p className="text-[10px] text-[var(--color-muted)]">Low demand / overstock</p>
            </div>
          </div>
        </Card>

        <Card style={{ padding: '20px', background: T.blueSoft }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: T.white }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Inventory Value</p>
              <p className="text-[1.25rem] font-semibold" style={{ color: T.blue }}>${inventoryValue.toLocaleString()}</p>
              <p className="text-[10px] text-[var(--color-muted)]">+2.4% vs last week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Demand vs Stock Visualization */}
      <Card className="mb-6" style={{ padding: '24px' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]">Demand vs Stock Level</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: T.blue }} />
                <span className="text-[10px] text-[var(--color-muted)]">Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: T.accent }} />
                <span className="text-[10px] text-[var(--color-muted)]">Stock</span>
              </div>
            </div>
            <div className="flex rounded-full border border-[var(--color-line)] p-0.5">
              {['7d', '30d', '90d'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition-all ${
                    timeRange === range ? 'bg-[var(--color-text)] text-white' : 'text-[var(--color-muted)]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderGraph()}
      </Card>

      {/* Product Intelligence Table */}
      <Card className="mb-6" style={{ padding: 0 }}>
        <div className="px-5 py-4 border-b border-[var(--color-line)] flex items-center justify-between">
          <h2 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]">Product Intelligence</h2>
          <div className="relative w-[180px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-[11px] rounded-full border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
            />
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full border-collapse min-w-[1100px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-[var(--color-line)]">
                <th className="w-[220px] shrink-0 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-left sticky left-0 z-20 border-r border-[var(--color-line)]">Product</th>
                <th className="w-[90px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-right">Stock</th>
                <th className="w-[80px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Trend</th>
                <th className="w-[90px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Days Cover</th>
                <th className="w-[100px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Forecast</th>
                <th className="w-[90px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Incoming</th>
                <th className="w-[80px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-center">Risk</th>
                <th className="w-[320px] shrink-0 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)] bg-white text-left">Insight</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => {
                const demand = getDemandIcon(item.velocity);
                const risk = getRiskStyle(item.risk);
                const daysCoverStyle = getDaysCoverStyle(item.daysLeft);
                const avgDemand = Math.round(item.demand.reduce((a, b) => a + b, 0) / item.demand.length);

                return (
                  <tr key={item.id} className="border-b border-[rgba(18,21,31,0.04)] hover:bg-[rgba(18,21,31,0.02)] transition-colors">
                    <td className="w-[220px] shrink-0 px-5 py-4 border-r border-[var(--color-line)] bg-white sticky left-0 z-10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold bg-[rgba(18,21,31,0.05)] text-[var(--color-muted)]">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-[var(--color-text)]">{item.name}</p>
                          <p className="text-[11px] text-[var(--color-muted)]">{item.variant}</p>
                          <p className="text-[9px] font-mono text-[var(--color-muted)] mt-0.5">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="w-[90px] shrink-0 px-4 py-4 text-right">
                      <p className="text-[14px] font-semibold" style={{ color: item.available === 0 ? T.alert : T.text }}>
                        {item.available === 0 ? 'Out' : item.available}
                      </p>
                    </td>
                    <td className="w-[90px] shrink-0 px-4 py-4 text-center">
                      <span className="text-[12px] font-semibold" style={{ color: demand.color }}>{demand.icon}</span>
                    </td>
                    <td className="w-[90px] shrink-0 px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-1 text-[11px] font-semibold rounded-md" style={{ background: daysCoverStyle.bg, color: daysCoverStyle.color }}>
                        {item.daysLeft === 0 ? 'Out' : `${item.daysLeft}d`}
                      </span>
                    </td>
                    <td className="w-[100px] shrink-0 px-4 py-4 text-center">
                      <p className="text-[12px] font-medium text-[var(--color-text)]">{item.forecast}</p>
                      <p className="text-[9px] text-[var(--color-muted)]">units/wk</p>
                    </td>
                    <td className="w-[90px] shrink-0 px-4 py-4 text-center">
                      {item.incoming > 0 ? (
                        <span className="text-[11px] font-medium" style={{ color: T.accent }}>+{item.incoming}</span>
                      ) : (
                        <span className="text-[11px] text-[var(--color-muted)]">—</span>
                      )}
                    </td>
                    <td className="w-[80px] shrink-0 px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-1 text-[10px] font-semibold rounded-md" style={{ background: risk.bg, color: risk.color }}>
                        {risk.label}
                      </span>
                    </td>
                    <td className="w-[320px] shrink-0 px-4 py-4">
                      <p className="text-[11px] text-[var(--color-text)] leading-relaxed">{item.insight}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom Grid: Category/Supplier + AI Insights */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Category Breakdown */}
        <Card style={{ padding: '20px' }}>
          <h3 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)] mb-4">Inventory by Category</h3>
          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[var(--color-muted)]">{cat.label}</span>
                  <span className="text-[11px] font-medium text-[var(--color-text)]">{cat.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(18,21,31,0.06)] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${cat.value}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card style={{ padding: '20px' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg" style={{ background: T.accentSoft }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12l4-4" /><path d="M12 6v2" /><circle cx="12" cy="12" r="1" fill={T.accent} /></svg>
            </div>
            <h3 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)]">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  insight.urgent ? 'border-[rgba(229,72,77,0.20)] bg-[rgba(229,72,77,0.04)]' : 'border-[var(--color-line)] hover:bg-[rgba(18,21,31,0.02)]'
                }`}
                onClick={() => navigate('/dashboard/reorder')}
              >
                <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${insight.urgent ? 'bg-[rgba(229,72,77,0.15)]' : 'bg-[rgba(18,21,31,0.06)]'}`}>
                  {insight.icon === 'alert' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                  {insight.icon === 'trend' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                  {insight.icon === 'warning' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                </div>
                <div>
                  <p className="text-[12px] font-medium text-[var(--color-text)]">{insight.title}</p>
                  <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/dashboard/reorder')} className="mt-3 text-[11px] font-medium text-[var(--color-accent)] hover:opacity-80 transition-opacity">
            View in Reorder →
          </button>
        </Card>
      </div>

      {/* Supplier Breakdown */}
      <Card style={{ padding: '20px' }}>
        <h3 className="font-display text-sm font-[700] tracking-[-0.02em] text-[var(--color-text)] mb-4">Inventory by Supplier</h3>
        <div className="grid grid-cols-3 gap-6">
          {supplierBreakdown.map(sup => (
            <div key={sup.label} className="text-center">
              <div className="relative mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(18,21,31,0.08)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke={sup.color} strokeWidth="3" strokeDasharray={`${sup.value} 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-[var(--color-text)]">{sup.value}%</span>
                </div>
              </div>
              <p className="text-[12px] font-medium text-[var(--color-text)]">{sup.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
