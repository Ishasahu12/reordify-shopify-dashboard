import React, { useState, useMemo, useEffect } from 'react';
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
};

function Card({ children, style, className = '' }) {
  return (
    <div className={`rounded-2xl border border-[var(--color-line)] bg-white ${className}`} style={style}>
      {children}
    </div>
  );
}

function Toast({ message, show, onUndo, onDismiss }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-text)] text-white shadow-lg">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span className="text-[12px] font-medium">{message}</span>
      {onUndo && (
        <button onClick={onUndo} className="text-[11px] font-semibold text-[var(--color-accent)] hover:underline">
          Undo
        </button>
      )}
      <button onClick={onDismiss} className="ml-2 text-white/60 hover:text-white">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  );
}

const initialProducts = [
  { id: 1, name: 'Linen Summer Shirt', variant: 'EU 40 / White', sku: 'LIN-SH-WH-40', currentStock: 0, daysLeft: 0, velocity: 'high', supplier: 'StyleCo Global', unitCost: 8.50, incoming: 0, demandTrend: '+23%', suggestedQty: 45 },
  { id: 2, name: 'Hoodie Classic White', variant: 'L / True White', sku: 'HOOD-CL-L-TW', currentStock: 4, daysLeft: 2, velocity: 'high', supplier: 'Urban Threads Ltd', unitCost: 12.00, incoming: 0, demandTrend: '+45%', suggestedQty: 30 },
  { id: 3, name: 'Performance Tee', variant: 'XL / Graphite', sku: 'PERF-TEE-XL-GR', currentStock: 8, daysLeft: 3, velocity: 'high', supplier: 'Urban Threads Ltd', unitCost: 6.50, incoming: 20, demandTrend: '+34%', suggestedQty: 40 },
  { id: 4, name: 'Trail Shorts Khaki', variant: 'US 34 / Khaki', sku: 'TR-SH-US34-KH', currentStock: 12, daysLeft: 6, velocity: 'normal', supplier: 'ActiveLife Supplies', unitCost: 9.00, incoming: 0, demandTrend: '+2%', suggestedQty: 25 },
  { id: 5, name: 'Polo Shirt Red', variant: 'M / Red', sku: 'POL-SH-M-RD', currentStock: 6, daysLeft: 4, velocity: 'high', supplier: 'Urban Threads Ltd', unitCost: 7.50, incoming: 15, demandTrend: '+18%', suggestedQty: 30 },
  { id: 6, name: 'Running Shorts Black', variant: 'M / Black', sku: 'RUN-SH-M-BK', currentStock: 3, daysLeft: 1, velocity: 'high', supplier: 'ActiveLife Supplies', unitCost: 5.50, incoming: 0, demandTrend: '+67%', suggestedQty: 50 },
];

const suppliers = [
  { name: 'StyleCo Global', leadTime: 5, leadTimeLabel: '5–7 days' },
  { name: 'Urban Threads Ltd', leadTime: 7, leadTimeLabel: '7–10 days' },
  { name: 'ActiveLife Supplies', leadTime: 3, leadTimeLabel: '3–5 days' },
];

const locations = [
  { id: 1, name: 'Main Warehouse' },
  { id: 2, name: 'Fulfillment Center' },
];

export default function POReviewPage() {
  const navigate = useNavigate();

  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0].name);
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryDateEdited, setDeliveryDateEdited] = useState(false);
  const [freightCost, setFreightCost] = useState(0);
  const [customsCost, setCustomsCost] = useState(0);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [removedProduct, setRemovedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', onUndo: null });

  const [products, setProducts] = useState(initialProducts);
  const [quantities, setQuantities] = useState(() => {
    const q = {};
    initialProducts.forEach(p => { q[p.id] = p.suggestedQty; });
    return q;
  });
  const [unitCosts, setUnitCosts] = useState(() => {
    const c = {};
    initialProducts.forEach(p => { c[p.id] = p.unitCost; });
    return c;
  });

  const supplierData = suppliers.find(s => s.name === selectedSupplier);

  // Auto-fill delivery date based on lead time
  useEffect(() => {
    if (!deliveryDateEdited && supplierData) {
      const today = new Date();
      const expected = new Date(today);
      expected.setDate(today.getDate() + supplierData.leadTime);
      setDeliveryDate(expected.toISOString().split('T')[0]);
    }
  }, [selectedSupplier, supplierData, deliveryDateEdited]);

  // Incompatible items warning
  const incompatibleItems = useMemo(() => {
    return products.filter(p => p.supplier !== selectedSupplier);
  }, [products, selectedSupplier]);

  const totalUnits = useMemo(() => products.reduce((sum, p) => sum + (quantities[p.id] || 0), 0), [products, quantities]);
  const subtotal = useMemo(() => products.reduce((sum, p) => sum + (quantities[p.id] || 0) * unitCosts[p.id], 0), [products, quantities, unitCosts]);
  const totalLandingCost = subtotal + freightCost + customsCost + additionalCost;

  const avgDaysOfCover = useMemo(() => {
    if (products.length === 0) return 0;
    const totalDays = products.reduce((sum, p) => {
      const dailyBurn = p.currentStock / (p.daysLeft || 1);
      const coverAfter = dailyBurn > 0 ? Math.round((p.currentStock + quantities[p.id]) / dailyBurn) : 30;
      return sum + coverAfter;
    }, 0);
    return Math.round(totalDays / products.length);
  }, [products, quantities]);

  const atRiskItems = useMemo(() => products.filter(p => {
    const dailyBurn = p.currentStock / (p.daysLeft || 1);
    const coverAfter = dailyBurn > 0 ? Math.round((p.currentStock + quantities[p.id]) / dailyBurn) : 30;
    return coverAfter <= 7;
  }).length, [products, quantities]);

  const overstockedItems = useMemo(() => products.filter(p => {
    return quantities[p.id] > p.suggestedQty * 1.5;
  }).length, [products, quantities]);

  const handleQtyChange = (id, val) => {
    const qty = Math.max(0, parseInt(val) || 0);
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const handleQtyIncrement = (id, delta) => {
    const newQty = Math.max(0, (quantities[id] || 0) + delta);
    setQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const handleCostChange = (id, val) => {
    const cost = Math.max(0, parseFloat(val) || 0);
    setUnitCosts(prev => ({ ...prev, [id]: cost }));
  };

  const getCoverageAfter = (product) => {
    const dailyBurn = product.currentStock / (product.daysLeft || 1);
    return dailyBurn > 0 ? Math.round((product.currentStock + quantities[product.id]) / dailyBurn) : 30;
  };

  const getInsight = (product) => {
    const coverAfter = getCoverageAfter(product);
    if (product.currentStock === 0) return 'Out of stock. Order immediately.';
    if (coverAfter <= 3) return 'Critical: will run out within days.';
    if (product.demandTrend.startsWith('+') && parseInt(product.demandTrend) > 30) return 'High demand surge. Consider more.';
    if (coverAfter > 45) return 'Overstock risk. Reduce quantity recommended.';
    if (product.incoming > 0) return `${product.incoming} units incoming.`;
    return 'Good coverage. Safe to order.';
  };

  const getCoverageFeedback = (product) => {
    const coverAfter = getCoverageAfter(product);
    const stockoutRisk = product.currentStock === 0 || product.daysLeft <= 2;

    if (stockoutRisk && quantities[product.id] > 0) {
      return { text: 'Stockout avoided', type: 'success' };
    }
    if (coverAfter <= 7) {
      return { text: `Only ~${coverAfter} days cover. Consider more.`, type: 'warning' };
    }
    if (coverAfter > 30) {
      return { text: `Will cover ${coverAfter} days`, type: 'success' };
    }
    return { text: `~${coverAfter} days of cover`, type: 'neutral' };
  };

  const handleRemoveProduct = (product) => {
    setRemovedProduct({ ...product, quantities: quantities[product.id], unitCosts: unitCosts[product.id] });
    setProducts(prev => prev.filter(p => p.id !== product.id));
    setToast({
      show: true,
      message: 'Item removed',
      onUndo: () => {
        setProducts(prev => [...prev, product].sort((a, b) => a.id - b.id));
        setQuantities(prev => ({ ...prev, [product.id]: removedProduct?.quantities || product.suggestedQty }));
        setUnitCosts(prev => ({ ...prev, [product.id]: removedProduct?.unitCosts || product.unitCost }));
        setRemovedProduct(null);
        setToast(prev => ({ ...prev, show: false }));
      }
    });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  const getSuggestion = () => {
    if (products.length === 0) {
      return 'All items removed. Add items from Reorder page.';
    }
    if (atRiskItems > 0 && overstockedItems > 0) {
      return `${atRiskItems} item${atRiskItems > 1 ? 's' : ''} may still stock out. ${overstockedItems} item${overstockedItems > 1 ? 's' : ''} may be overstocked.`;
    }
    if (atRiskItems > 0) {
      return `${atRiskItems} item${atRiskItems > 1 ? 's' : ''} may still stock out. Consider increasing quantity.`;
    }
    if (overstockedItems > 0) {
      return `${overstockedItems} item${overstockedItems > 1 ? 's' : ''} may be overstocked. Consider reducing quantity.`;
    }
    return 'All items have adequate coverage. Review and place order when ready.';
  };

  return (
    <div className="relative flex gap-6">
      {/* Main Content */}
      <div className="flex-1 min-w-0 px-8 py-7">
        {/* Header */}
        <div className="mb-7">
          <h1 className="font-display text-[1.5rem] font-[700] tracking-[-0.02em] text-[var(--color-text)]">Create Purchase Order</h1>
          <p className="text-[12px] text-[var(--color-muted)] mt-1">Review items and confirm your restock</p>
        </div>

        {/* Step 1: Supplier & Delivery */}
        <Card className="p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: T.accent }}>1</div>
            <h2 className="text-[14px] font-semibold text-[var(--color-text)]">Supplier & Delivery</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-[10px] font-medium text-[var(--color-muted)] uppercase tracking-wider mb-1.5 block">Supplier</label>
              <div className="relative">
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 text-[12px] rounded-xl border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white pr-8"
                >
                  {suppliers.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-[var(--color-muted)] uppercase tracking-wider mb-1.5 block">Ship To</label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 text-[12px] rounded-xl border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white pr-8"
                >
                  {locations.map(l => (
                    <option key={l.id} value={l.name}>{l.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-[var(--color-muted)] uppercase tracking-wider mb-1.5 block">Expected Delivery</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => { setDeliveryDate(e.target.value); setDeliveryDateEdited(true); }}
                className="w-full px-3 py-2.5 text-[12px] rounded-xl border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
              />
              {!deliveryDateEdited && (
                <p className="text-[8px] text-[var(--color-muted)] mt-1">Estimated based on lead time</p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-medium text-[var(--color-muted)] uppercase tracking-wider mb-1.5 block">Lead Time</label>
              <div className="px-3 py-2.5 text-[12px] rounded-xl flex items-center gap-2" style={{ background: T.blueSoft, color: T.blue }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {supplierData?.leadTimeLabel}
              </div>
            </div>
          </div>

          {/* Incompatible Items Warning */}
          {incompatibleItems.length > 0 && (
            <div className="mt-4 p-3 rounded-xl flex items-start gap-3" style={{ background: T.amberSoft }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2" className="mt-0.5 shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div className="flex-1">
                <p className="text-[11px] font-medium" style={{ color: T.amber }}>Some items are not supplied by this vendor</p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                  {incompatibleItems.map(p => p.name).join(', ')}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => incompatibleItems.forEach(p => handleRemoveProduct(p))}
                    className="px-3 py-1 text-[10px] font-medium rounded-lg" style={{ background: T.amber, color: T.white }}
                  >
                    Remove All
                  </button>
                  <button
                    onClick={() => setSelectedSupplier(incompatibleItems[0].supplier)}
                    className="px-3 py-1 text-[10px] font-medium rounded-lg border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)]"
                  >
                    Change Supplier
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Step 2: Review Items */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: T.accent }}>2</div>
            <h2 className="text-[14px] font-semibold text-[var(--color-text)]">Review Items</h2>
            <span className="text-[11px] text-[var(--color-muted)] ml-auto">{products.length} items</span>
          </div>

          {products.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: T.graySoft }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <p className="text-[14px] font-medium text-[var(--color-text)] mb-1">No items in order</p>
              <p className="text-[12px] text-[var(--color-muted)]">Add items from the Reorder page</p>
              <button
                onClick={() => navigate('/dashboard/reorder')}
                className="mt-4 px-4 py-2 text-[12px] font-medium rounded-lg text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors"
              >
                Go to Reorder
              </button>
            </Card>
          ) : (
            <div className="space-y-3">
              {products.map(product => {
                const coverAfter = getCoverageAfter(product);
                const lineTotal = (quantities[product.id] || 0) * unitCosts[product.id];
                const coverageFeedback = getCoverageFeedback(product);
                const isOutOfStock = product.currentStock === 0;
                const isIncompatible = product.supplier !== selectedSupplier;

                return (
                  <Card
                    key={product.id}
                    className={`p-4 transition-all group ${isIncompatible ? 'border-[var(--color-amber)]' : 'hover:border-[var(--color-line-strong)]'}`}
                    style={isIncompatible ? { borderWidth: 2 } : {}}
                  >
                    {/* Top Row: Product + Delete */}
                    <div className="flex items-start gap-3 mb-3">
                      {/* Product Avatar */}
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: isIncompatible ? T.amberSoft : T.graySoft, color: isIncompatible ? T.amber : T.muted }}>
                        {product.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-semibold text-[var(--color-text)]">{product.name}</p>
                          {isIncompatible && (
                            <span className="px-1.5 py-0.5 text-[8px] font-semibold rounded" style={{ background: T.amberSoft, color: T.amber }}>Different supplier</span>
                          )}
                        </div>
                        <p className="text-[10px] text-[var(--color-muted)]">{product.variant} · {product.sku}</p>
                      </div>

                      {/* Stock Badges */}
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-[9px] text-[var(--color-muted)] uppercase">Stock</p>
                          <p className="text-[14px] font-bold" style={{ color: isOutOfStock ? T.alert : T.text }}>{product.currentStock}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] text-[var(--color-muted)] uppercase">Days</p>
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-md" style={{
                            background: product.daysLeft <= 2 ? T.alertSoft : product.daysLeft <= 5 ? T.amberSoft : T.accentSoft,
                            color: product.daysLeft <= 2 ? T.alert : product.daysLeft <= 5 ? T.amber : T.accent
                          }}>
                            {product.daysLeft === 0 ? 'OUT' : product.daysLeft + 'd'}
                          </span>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] text-[var(--color-muted)] uppercase">Demand</p>
                          <div className="flex items-center justify-center gap-0.5">
                            <span className="text-[11px] font-semibold" style={{ color: product.velocity === 'high' ? T.accent : T.muted }}>
                              {product.velocity === 'high' ? 'High' : 'Normal'}
                            </span>
                            {product.demandTrend.startsWith('+') && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemoveProduct(product)}
                          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[rgba(229,72,77,0.1)] transition-all ml-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.alert} strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[var(--color-line)] my-3" />

                    {/* Middle Row: Qty Stepper + Cost + Total */}
                    <div className="flex items-center gap-5">
                      {/* Quantity Stepper */}
                      <div>
                        <label className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1 block">Qty</label>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQtyIncrement(product.id, -5)}
                            className="w-7 h-8 rounded-l-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-gray-soft)] transition-colors"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                          <input
                            type="number"
                            value={quantities[product.id] || 0}
                            onChange={(e) => handleQtyChange(product.id, e.target.value)}
                            className="w-[60px] h-8 text-[13px] font-semibold text-center border-y border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
                          />
                          <button
                            onClick={() => handleQtyIncrement(product.id, 5)}
                            className="w-7 h-8 rounded-r-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-muted)] hover:bg-[var(--color-gray-soft)] transition-colors"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                        </div>
                        <p className="text-[8px] text-[var(--color-muted)] mt-1">Suggested: {product.suggestedQty}</p>
                      </div>

                      {/* Unit Cost */}
                      <div>
                        <label className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1 block">Unit Cost</label>
                        <div className="flex items-center">
                          <span className="text-[11px] text-[var(--color-muted)] mr-1">$</span>
                          <input
                            type="number"
                            value={unitCosts[product.id] || 0}
                            onChange={(e) => handleCostChange(product.id, e.target.value)}
                            className="w-[60px] h-8 px-2 text-[12px] font-medium text-center rounded-lg border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
                            step="0.01"
                          />
                        </div>
                      </div>

                      {/* Coverage after order */}
                      <div>
                        <label className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1 block">Coverage</label>
                        <span className="inline-flex px-2 py-1 text-[11px] font-semibold rounded-lg" style={{
                          background: coverAfter <= 7 ? T.alertSoft : coverAfter <= 14 ? T.amberSoft : T.accentSoft,
                          color: coverAfter <= 7 ? T.alert : coverAfter <= 14 ? T.amber : T.accent
                        }}>
                          {coverAfter} days
                        </span>
                      </div>

                      {/* Line Total */}
                      <div className="ml-auto text-right">
                        <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-0.5">Total</p>
                        <p className="text-[16px] font-bold text-[var(--color-text)]">${lineTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>

                    {/* Bottom Row: Coverage Feedback */}
                    <div className="mt-3 pt-3 border-t border-[var(--color-line)]">
                      <div className="flex items-center gap-2">
                        {coverageFeedback.type === 'success' && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                        {coverageFeedback.type === 'warning' && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.amber} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        )}
                        <span className="text-[11px]" style={{ color: coverageFeedback.type === 'success' ? T.accent : coverageFeedback.type === 'warning' ? T.amber : T.muted }}>
                          {coverageFeedback.text}
                        </span>
                        <span className="text-[10px] text-[var(--color-muted)]">·</span>
                        <span className="text-[10px] text-[var(--color-muted)]">{getInsight(product)}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 3: Cost Breakdown */}
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: T.accent }}>3</div>
            <h2 className="text-[14px] font-semibold text-[var(--color-text)]">Landing Cost</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 rounded-xl" style={{ background: T.graySoft }}>
              <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Product Cost</p>
              <p className="text-[16px] font-bold text-[var(--color-text)]">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: T.graySoft }}>
              <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Freight</p>
              <input
                type="number"
                value={freightCost}
                onChange={(e) => setFreightCost(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-[12px] font-medium rounded-lg border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
                placeholder="0"
              />
            </div>
            <div className="p-3 rounded-xl" style={{ background: T.graySoft }}>
              <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Customs</p>
              <input
                type="number"
                value={customsCost}
                onChange={(e) => setCustomsCost(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-[12px] font-medium rounded-lg border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
                placeholder="0"
              />
            </div>
            <div className="p-3 rounded-xl" style={{ background: T.graySoft }}>
              <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider mb-1">Additional</p>
              <input
                type="number"
                value={additionalCost}
                onChange={(e) => setAdditionalCost(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 text-[12px] font-medium rounded-lg border border-[var(--color-line)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-white"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[var(--color-muted)]">Total Landing Cost</p>
              <p className="text-[20px] font-bold text-[var(--color-text)]">${totalLandingCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[var(--color-muted)]">Per Unit (Avg)</p>
              <p className="text-[16px] font-bold" style={{ color: T.accent }}>${(totalLandingCost / (totalUnits || 1)).toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Spacer for sticky bar */}
        <div className="h-20" />
      </div>

      {/* Right Panel */}
      <div className="w-[280px] shrink-0 px-6 py-7 bg-[rgba(18,21,31,0.02)] border-l border-[var(--color-line)]">
        <div className="sticky top-7 space-y-4">
          {/* Order Summary */}
          <Card className="p-4">
            <h3 className="text-[12px] font-semibold text-[var(--color-text)] mb-3">Order Summary</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[11px] text-[var(--color-muted)]">Total SKUs</span>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">{products.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[var(--color-muted)]">Total Units</span>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">{totalUnits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[var(--color-muted)]">Avg Coverage</span>
                <span className="text-[11px] font-semibold" style={{ color: avgDaysOfCover <= 7 ? T.alert : avgDaysOfCover <= 14 ? T.amber : T.accent }}>{avgDaysOfCover} days</span>
              </div>
              <div className="pt-2.5 border-t border-[var(--color-line)] flex justify-between">
                <span className="text-[11px] font-semibold text-[var(--color-text)]">Total Cost</span>
                <span className="text-[14px] font-bold" style={{ color: T.accent }}>${totalLandingCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </Card>

          {/* Smart Suggestion */}
          <Card className="p-4">
            <h3 className="text-[12px] font-semibold text-[var(--color-text)] mb-2 flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: T.blueSoft }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              Actionable Insights
            </h3>
            <p className="text-[10px] leading-[1.5] text-[var(--color-muted)]">{getSuggestion()}</p>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-6 py-4 bg-white border-t border-[var(--color-line)] shadow-lg"
           style={{ left: 'var(--sidebar-width, 240px)' }}>
        <div className="flex items-center gap-3" style={{ maxWidth: 'calc(100% - var(--sidebar-width, 240px))' }}>
          <button
            onClick={() => navigate('/dashboard/reorder')}
            className="px-4 py-2.5 text-[12px] font-medium rounded-xl border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2.5 text-[12px] font-medium rounded-xl border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors">
            Save Draft
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={products.length === 0}
            className="px-6 py-2.5 text-[13px] font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        show={toast.show}
        onUndo={toast.onUndo}
        onDismiss={() => setToast(prev => ({ ...prev, show: false }))}
      />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-[420px] p-6 shadow-2xl">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: T.accentSoft }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-[18px] font-semibold text-center text-[var(--color-text)] mb-1">Order Created!</h3>
            <p className="text-[12px] text-center text-[var(--color-muted)] mb-5">
              Purchase order sent to {selectedSupplier}
            </p>

            <div className="p-4 rounded-xl mb-5" style={{ background: T.graySoft }}>
              <div className="flex justify-between mb-2">
                <span className="text-[11px] text-[var(--color-muted)]">Order #</span>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">PO-2026-0851</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[11px] text-[var(--color-muted)]">Items</span>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">{products.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[var(--color-muted)]">Total</span>
                <span className="text-[11px] font-semibold" style={{ color: T.accent }}>${totalLandingCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <button className="w-full py-2.5 text-[13px] font-semibold rounded-xl bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity">
                Send to Supplier
              </button>
              <button className="w-full py-2.5 text-[12px] font-medium rounded-xl border border-[var(--color-line)] text-[var(--color-muted)] hover:bg-[rgba(18,21,31,0.03)] transition-colors">
                Mark as Ordered
              </button>
            </div>

            <button
              onClick={() => { setShowConfirmModal(false); navigate('/dashboard/reorder'); }}
              className="w-full py-2 text-[12px] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Back to Reorder
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}