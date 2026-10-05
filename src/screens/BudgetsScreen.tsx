import React, { useState } from 'react';
import { BudgetPool } from '../types';

interface BudgetsScreenProps {
  budgets: BudgetPool[];
  onOpenCreateBudget: () => void;
  onOpenRolloverSettings: () => void;
}

export const BudgetsScreen: React.FC<BudgetsScreenProps> = ({
  budgets,
  onOpenCreateBudget,
  onOpenRolloverSettings,
}) => {
  const months = ['September 2026', 'October 2026', 'November 2026'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'needs' | 'wants' | 'at_risk'>('all');
  const [autoSweepEnabled, setAutoSweepEnabled] = useState(true);
  const [autoBalanceNotice, setAutoBalanceNotice] = useState<string | null>(null);

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalRemaining = Math.max(0, totalAllocated - totalSpent);
  const overallPercent = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  const filteredBudgets = budgets.filter((b) => {
    if (filterType === 'needs') return b.type === 'needs';
    if (filterType === 'wants') return b.type === 'wants';
    if (filterType === 'at_risk') return b.status === 'near_limit' || b.status === 'warning';
    return true;
  });

  const handleAutoBalance = () => {
    setAutoBalanceNotice('Recalibrating margins based on 21-day velocity...');
    setTimeout(() => {
      setAutoBalanceNotice('Limits auto-balanced with +$50 emergency buffer applied');
      setTimeout(() => setAutoBalanceNotice(null), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
              Fiscal Management
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d5c3b9]" />
            <span className="text-[11px] font-semibold text-[#00573a]">Active Plan</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#151c27] tracking-tight mt-1">
            Monthly Budgets
          </h1>
        </div>

        {/* Controls & Period Navigator */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-[#f0f3ff] p-1 rounded-xl shadow-xs border border-[#e7eefe]">
            <button
              onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
              disabled={currentMonthIndex === 0}
              className="p-1.5 rounded-lg text-[#51443d] hover:text-[#151c27] hover:bg-[#dce2f3] transition-colors disabled:opacity-40"
              title="Previous Month"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <div className="flex items-center gap-2 px-3">
              <span className="material-symbols-outlined text-[18px] text-[#6b4226]">calendar_month</span>
              <span className="text-[14px] font-semibold text-[#151c27]">
                {months[currentMonthIndex]}
              </span>
              {currentMonthIndex === 1 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00573a]/10 text-[#00573a]">
                  Current Month
                </span>
              )}
            </div>

            <button
              onClick={() => setCurrentMonthIndex(Math.min(months.length - 1, currentMonthIndex + 1))}
              disabled={currentMonthIndex === months.length - 1}
              className="p-1.5 rounded-lg text-[#51443d] hover:text-[#151c27] hover:bg-[#dce2f3] transition-colors disabled:opacity-40"
              title="Next Month"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRolloverSettings}
              className="h-10 px-3.5 rounded-lg bg-[#f0f3ff] hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-medium flex items-center gap-1.5 transition-colors border border-[#e7eefe]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#83746c]">tune</span>
              <span>Budget Settings</span>
            </button>

            <button
              onClick={onOpenCreateBudget}
              className="h-10 px-4 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-[0_2px_8px_rgba(107,66,38,0.2)] transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>+ Create New Budget</span>
            </button>
          </div>
        </div>
      </div>

      {/* Budget Master Overview Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f0f3ff] p-6 shadow-xs border border-[#e7eefe]">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#ffdbc7]/40 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-24 w-72 h-72 rounded-full bg-[#6ffbbe]/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Stat Blocks */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
                  Total Allocation Portfolio
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-white text-[#51443d] font-semibold border border-[#e7eefe]">
                  Active Target
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-[#83746c]">Consumed:</span>
                <span className="text-[#6b4226] font-bold">{overallPercent}% of monthly allocation</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/90 shadow-xs border border-[#e7eefe]">
                <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider block mb-1">
                  Total Monthly Budget
                </span>
                <span className="text-[26px] sm:text-[30px] font-bold text-[#151c27] tracking-tight tabular-nums">
                  ${totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#51443d]">
                  <span className="material-symbols-outlined text-[16px] text-[#00573a]">verified</span>
                  <span>Allocated across {budgets.length} pools</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/90 shadow-xs border border-[#e7eefe]">
                <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider block mb-1">
                  Total Spent
                </span>
                <span className="text-[26px] sm:text-[30px] font-bold text-[#6b4226] tracking-tight tabular-nums">
                  ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#83746c]">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>21 of 31 days elapsed</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/90 shadow-xs border border-[#e7eefe]">
                <span className="text-[11px] font-semibold text-[#00573a] uppercase tracking-wider block mb-1">
                  Remaining to Spend
                </span>
                <span className="text-[26px] sm:text-[30px] font-bold text-[#00573a] tracking-tight tabular-nums">
                  ${totalRemaining.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#00573a] font-medium">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>${((totalRemaining) / 10).toFixed(2)}/day safe rate</span>
                </div>
              </div>
            </div>

            {/* Master Visual Progress Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[12px] text-[#51443d]">
                <span>$0.00 spent</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6b4226]" />
                  <span className="font-semibold text-[#151c27]">Overall Spend ({overallPercent}%)</span>
                </div>
                <span className="text-[#151c27] font-semibold">${totalAllocated.toFixed(2)} cap</span>
              </div>

              <div className="relative w-full h-3 bg-[#dce2f3] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#6b4226] rounded-full transition-all duration-700 relative"
                  style={{ width: `${Math.min(overallPercent, 100)}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#ffdbc7] rounded-full animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[12px] text-[#83746c]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#00573a]">schedule</span>
                  <span className="font-medium text-[#151c27]">10 days left</span> in October cycle
                </span>
                <span className="flex items-center gap-1 text-[#6b4226] font-medium">
                  <span className="material-symbols-outlined text-[15px]">warning</span>
                  Approaching monthly soft limit threshold (85%)
                </span>
              </div>
            </div>
          </div>

          {/* Donut / Pace Ring Visualizer */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl bg-white/95 shadow-xs border border-[#e7eefe]">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-[#dce2f3]"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="9"
                />
                <circle
                  className="text-[#6b4226]"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - overallPercent / 100)}
                  strokeLinecap="round"
                  strokeWidth="9"
                />
                <circle
                  className="text-[#00573a]"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="2 249.2"
                  strokeDashoffset="-168"
                  strokeWidth="9"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-semibold text-[#83746c] uppercase tracking-wider">
                  Pace Ratio
                </span>
                <span className="text-[28px] font-bold text-[#151c27] tracking-tight">{overallPercent}%</span>
                <span className="text-[11px] text-[#00573a] font-semibold">Under Pace</span>
              </div>
            </div>

            <div className="w-full mt-3 grid grid-cols-2 gap-2 text-center pt-1 border-t border-[#e7eefe]">
              <div className="bg-[#f0f3ff] p-2 rounded-lg">
                <span className="block text-[10px] font-semibold text-[#83746c] uppercase">Run Rate</span>
                <span className="text-[16px] font-bold text-[#151c27]">$63.81</span>
                <span className="text-[10px] text-[#83746c] block">avg per day</span>
              </div>

              <div className="bg-[#f0f3ff] p-2 rounded-lg">
                <span className="block text-[10px] font-semibold text-[#83746c] uppercase">Safe Allowance</span>
                <span className="text-[16px] font-bold text-[#00573a]">$66.00</span>
                <span className="text-[10px] text-[#83746c] block">max daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-[#6b4226] text-white shadow-xs'
                : 'bg-[#f0f3ff] text-[#51443d] hover:bg-[#e7eefe]'
            }`}
          >
            All Pools ({budgets.length})
          </button>
          <button
            onClick={() => setFilterType('needs')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              filterType === 'needs'
                ? 'bg-[#6b4226] text-white shadow-xs'
                : 'bg-[#f0f3ff] text-[#51443d] hover:bg-[#e7eefe]'
            }`}
          >
            Needs ({budgets.filter((b) => b.type === 'needs').length})
          </button>
          <button
            onClick={() => setFilterType('wants')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              filterType === 'wants'
                ? 'bg-[#6b4226] text-white shadow-xs'
                : 'bg-[#f0f3ff] text-[#51443d] hover:bg-[#e7eefe]'
            }`}
          >
            Wants ({budgets.filter((b) => b.type === 'wants').length})
          </button>
          <button
            onClick={() => setFilterType('at_risk')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
              filterType === 'at_risk'
                ? 'bg-[#6b4226] text-white shadow-xs'
                : 'bg-[#f0f3ff] text-[#51443d] hover:bg-[#e7eefe]'
            }`}
          >
            At Risk ({budgets.filter((b) => b.status !== 'on_track').length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-[#83746c]">
          <span>Displaying {filteredBudgets.length} active allocations</span>
        </div>
      </div>

      {/* Category Budget Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBudgets.map((b) => {
          const percent = Math.min(Math.round((b.spent / b.allocated) * 100), 100);
          const left = Math.max(0, b.allocated - b.spent);
          const isWarning = b.status === 'warning';
          const isNearLimit = b.status === 'near_limit';

          return (
            <div
              key={b.id}
              className={`flex flex-col justify-between p-5 rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow relative overflow-hidden border ${
                isWarning
                  ? 'border-amber-400 ring-1 ring-amber-400/30'
                  : isNearLimit
                  ? 'border-amber-300'
                  : 'border-[#e7eefe]'
              }`}
            >
              {/* Alert strip tag */}
              {isWarning && <div className="absolute top-0 right-0 left-0 h-1 bg-amber-600" />}
              {isNearLimit && <div className="absolute top-0 right-0 left-0 h-1 bg-amber-500" />}

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isWarning
                          ? 'bg-amber-100 text-amber-900'
                          : isNearLimit
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-[#ffdbc7]/50 text-[#6b4226]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{b.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-[16px] font-bold text-[#151c27] leading-tight">{b.title}</h2>
                      <span className="text-[12px] text-[#83746c]">{b.subtitle}</span>
                    </div>
                  </div>

                  {/* Status chip */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                      isWarning
                        ? 'bg-amber-100 text-amber-900'
                        : isNearLimit
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-[#00573a]/10 text-[#00573a]'
                    }`}
                  >
                    {isWarning ? (
                      <span className="material-symbols-outlined text-[13px] text-amber-700">warning</span>
                    ) : isNearLimit ? (
                      <span className="material-symbols-outlined text-[13px] text-amber-600">notifications_active</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00573a]" />
                    )}
                    {b.statusLabel}
                  </span>
                </div>

                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-[24px] font-bold text-[#151c27] tracking-tight tabular-nums">
                      ${b.spent.toFixed(2)}
                    </span>
                    <span className="text-[13px] text-[#83746c]"> / ${b.allocated.toFixed(2)}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[13px] font-bold block ${
                        isWarning ? 'text-[#ba1a1a]' : isNearLimit ? 'text-amber-800' : 'text-[#00573a]'
                      }`}
                    >
                      ${left.toFixed(2)} left
                    </span>
                    <span className="text-[11px] text-[#83746c]">{percent}% consumed</span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="w-full h-2 bg-[#dce2f3] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWarning ? 'bg-amber-600' : isNearLimit ? 'bg-amber-500' : 'bg-[#00573a]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Tooltip hint if available */}
                {b.alertTooltip && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                    {b.alertTooltip}
                  </p>
                )}
              </div>

              {/* Sub-detail Snippet */}
              <div className="mt-4 pt-2.5 bg-[#f0f3ff] rounded-lg p-2.5 flex items-center justify-between border border-[#e7eefe]">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-[16px] text-[#83746c]">
                    {b.recentIcon}
                  </span>
                  <span className="text-[12px] text-[#151c27] truncate font-medium">{b.recentMerchant}</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap text-[12px]">
                  <span className="font-semibold text-[#151c27]">
                    {b.recentAmount < 0 ? `-$${Math.abs(b.recentAmount).toFixed(2)}` : `$${b.recentAmount.toFixed(2)}`}
                  </span>
                  <span className="text-[#83746c]">{b.recentDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Budget Trends & Predictive Insights Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f0f3ff] p-6 shadow-xs border border-[#e7eefe]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#00573a]/10 flex items-center justify-center text-[#00573a]">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </span>
              <h2 className="text-[20px] font-bold text-[#151c27]">
                Budget Trends &amp; Predictive Insights
              </h2>
            </div>
            <p className="text-[14px] text-[#51443d] leading-relaxed">
              Based on your average spending pace of <strong className="text-[#151c27] font-semibold">$63.81/day</strong>, you are currently projected to conclude October with approximately{' '}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] bg-[#00573a]/10 text-[#00573a] font-bold">
                $210.00 in surplus
              </span>.
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-[12px] text-[#83746c]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00573a]">check_circle</span>
                Groceries and Commute tracking safely within normal velocity
              </span>
              <span className="flex items-center gap-1 text-amber-800">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Personal shopping is 22% ahead of typical historical benchmark
              </span>
            </div>
            {autoBalanceNotice && (
              <p className="text-[12px] text-[#00573a] font-semibold pt-1 animate-pulse">
                ✓ {autoBalanceNotice}
              </p>
            )}
          </div>

          {/* Quick Actions Module */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenRolloverSettings}
              className="h-11 px-4 rounded-lg bg-white hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs border border-[#e7eefe] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6b4226]">sync</span>
              <span>Configure November Rollovers</span>
            </button>
            <button
              onClick={handleAutoBalance}
              className="h-11 px-5 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Auto-Balance Limits</span>
            </button>
          </div>
        </div>

        {/* Visual Pace Graph & Recommendation Matrix */}
        <div className="mt-6 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-[#e7eefe]">
          <div className="p-3.5 rounded-xl bg-white flex items-center gap-3 border border-[#e7eefe]">
            <span className="material-symbols-outlined text-[24px] text-[#00573a]">savings</span>
            <div>
              <span className="block text-[11px] font-semibold text-[#83746c] uppercase">Projected Vault Transfer</span>
              <span className="text-[16px] font-bold text-[#151c27]">+$210.00</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white flex items-center gap-3 border border-[#e7eefe]">
            <span className="material-symbols-outlined text-[24px] text-[#6b4226]">speed</span>
            <div>
              <span className="block text-[11px] font-semibold text-[#83746c] uppercase">Cycle Burn Velocity</span>
              <span className="text-[16px] font-bold text-[#151c27]">Optimal (0.94x)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white flex items-center gap-3 border border-[#e7eefe]">
            <span className="material-symbols-outlined text-[24px] text-[#83746c]">event_upcoming</span>
            <div>
              <span className="block text-[11px] font-semibold text-[#83746c] uppercase">Recurring Debits Pending</span>
              <span className="text-[16px] font-bold text-[#151c27]">1 item ($15.00)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white flex items-center justify-between border border-[#e7eefe]">
            <div>
              <span className="block text-[11px] font-semibold text-[#83746c] uppercase">Auto-Sweep to Savings</span>
              <span className="text-[14px] font-semibold text-[#00573a]">
                {autoSweepEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoSweepEnabled(!autoSweepEnabled)}
              className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                autoSweepEnabled ? 'bg-[#00573a] justify-end' : 'bg-[#dce2f3] justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
