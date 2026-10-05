import React, { useState } from 'react';
import { Transaction, SavingsVault, MonthlyTrajectory } from '../types';

interface DashboardScreenProps {
  transactions: Transaction[];
  savingsVaults: SavingsVault[];
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  onNavigateToTransactions: () => void;
  onOpenQuickAdd: () => void;
  onOpenVaultAllocation: () => void;
  onViewTransactionDetail: (tx: Transaction) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  transactions,
  savingsVaults,
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  totalSavings,
  onNavigateToTransactions,
  onOpenQuickAdd,
  onOpenVaultAllocation,
  onViewTransactionDetail,
}) => {
  const [chartPeriod, setChartPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [recentFilter, setRecentFilter] = useState<'all' | 'income' | 'expenses'>('all');
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const handleExport = () => {
    setExportedStatus('Exporting...');
    setTimeout(() => {
      setExportedStatus('Exported PDF');
      setTimeout(() => setExportedStatus(null), 2500);
    }, 600);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (recentFilter === 'income') return tx.amount > 0;
    if (recentFilter === 'expenses') return tx.amount < 0;
    return true;
  }).slice(0, 5);

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Welcome Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#151c27] tracking-tight">
              Good morning, Ahmed
            </h1>
            <span className="inline-flex items-center justify-center text-[26px] animate-bounce">
              👋
            </span>
          </div>
          <p className="text-[14px] text-[#51443d]">
            Here's your financial overview for October 2026. You are pacing{' '}
            <span className="text-[#00573a] font-semibold">+14.2%</span> ahead of target reserves.
          </p>
        </div>

        {/* Date Badge and Fast Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f0f3ff] border border-[#e7eefe] text-[#51443d]">
            <span className="material-symbols-outlined text-[18px] text-[#6b4226]">calendar_month</span>
            <span className="text-[13px] font-medium text-[#151c27]">October 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00573a]" />
            <span className="text-[11px] text-[#00573a] font-semibold">Active Cycle</span>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] text-[13px] font-medium transition-all shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] text-[#51443d]">
              {exportedStatus === 'Exported PDF' ? 'check_circle' : 'download'}
            </span>
            <span>{exportedStatus || 'Export Summary'}</span>
          </button>

          <button
            onClick={onOpenQuickAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Quick Add Transaction</span>
          </button>
        </div>
      </section>

      {/* Four Premium Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. Total Balance */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs border border-[#e7eefe] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6b4226] via-[#f4ba96] to-transparent" />
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#83746c] tracking-wider uppercase">
                Total Balance
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] sm:text-[36px] font-bold text-[#151c27] tracking-tight tabular-nums">
                  ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#6b4226] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+4.8%</span>
            </div>
            <span className="text-[#83746c]">Prev: $8,060.00</span>
          </div>
        </div>

        {/* 2. Monthly Income */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs border border-[#e7eefe] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#83746c] tracking-wider uppercase">
                Monthly Income
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] sm:text-[36px] font-bold text-[#151c27] tracking-tight tabular-nums">
                  ${monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#00573a]/10 flex items-center justify-center text-[#00573a] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">south_west</span>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
              <span>+8.2% vs target</span>
            </div>
            <span className="text-[#83746c]">3 deposits</span>
          </div>
        </div>

        {/* 3. Monthly Expenses */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs border border-[#e7eefe] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#83746c] tracking-wider uppercase">
                Monthly Expenses
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] sm:text-[36px] font-bold text-[#151c27] tracking-tight tabular-nums">
                  ${monthlyExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#151c27] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">north_east</span>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              <span>-3.4% spend</span>
            </div>
            <span className="text-[#83746c]">65% of budget</span>
          </div>
        </div>

        {/* 4. Total Savings */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs border border-[#e7eefe] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#83746c] tracking-wider uppercase">
                Total Savings
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[32px] sm:text-[36px] font-bold text-[#151c27] tracking-tight tabular-nums">
                  ${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#ffdbc7] flex items-center justify-center text-[#6b4226] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00573a]/10 text-[#00573a] font-semibold text-[11px]">
              <span className="material-symbols-outlined text-[14px]">moving</span>
              <span>+15.3% growth</span>
            </div>
            <span className="text-[#83746c]">2 goals funded</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout (12-Column Grid: 8 Cols Left, 4 Cols Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Income vs Expenses Chart Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e7eefe] hover:shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e7eefe]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-[#151c27]">Income vs Expenses</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e7eefe] text-[#51443d] text-[11px] font-semibold">
                    H2 Trajectory
                  </span>
                </div>
                <p className="text-[13px] text-[#83746c]">Cash inflow velocity against monthly commitments</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Legend Indicators */}
                <div className="hidden md:flex items-center gap-3 text-[12px] font-medium text-[#51443d]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6b4226]" />
                    <span>Income</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#151c27]" />
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00573a]" />
                    <span>Savings</span>
                  </div>
                </div>

                {/* Granularity Pill Selector */}
                <div className="inline-flex p-1 rounded-xl bg-[#f0f3ff] text-[12px] font-semibold border border-[#e7eefe]">
                  <button
                    onClick={() => setChartPeriod('monthly')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      chartPeriod === 'monthly'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setChartPeriod('quarterly')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      chartPeriod === 'quarterly'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    Quarterly
                  </button>
                  <button
                    onClick={() => setChartPeriod('yearly')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      chartPeriod === 'yearly'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>

            {/* High-Fidelity SVG Bar Chart Visualization */}
            <div className="pt-6 pb-2">
              <div className="w-full h-64 relative">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 740 240">
                  {/* Grid horizontal guideline markers */}
                  <line stroke="#E7EEFE" strokeDasharray="4 4" strokeWidth="1.2" x1="40" x2="720" y1="20" y2="20" />
                  <line stroke="#E7EEFE" strokeDasharray="4 4" strokeWidth="1.2" x1="40" x2="720" y1="75" y2="75" />
                  <line stroke="#E7EEFE" strokeDasharray="4 4" strokeWidth="1.2" x1="40" x2="720" y1="130" y2="130" />
                  <line stroke="#E7EEFE" strokeWidth="1.2" x1="40" x2="720" y1="185" y2="185" />

                  {/* Y-Axis numerical values */}
                  <text className="fill-[#83746c] text-[11px] font-medium" textAnchor="end" x="32" y="24">
                    {chartPeriod === 'yearly' ? '$60k' : chartPeriod === 'quarterly' ? '$15k' : '$5k'}
                  </text>
                  <text className="fill-[#83746c] text-[11px] font-medium" textAnchor="end" x="32" y="79">
                    {chartPeriod === 'yearly' ? '$40k' : chartPeriod === 'quarterly' ? '$10k' : '$3.5k'}
                  </text>
                  <text className="fill-[#83746c] text-[11px] font-medium" textAnchor="end" x="32" y="134">
                    {chartPeriod === 'yearly' ? '$20k' : chartPeriod === 'quarterly' ? '$5k' : '$2k'}
                  </text>
                  <text className="fill-[#83746c] text-[11px] font-medium" textAnchor="end" x="32" y="189">$0</text>

                  {/* Month 1: May */}
                  <g className="transition-all hover:opacity-85 cursor-pointer">
                    <rect fill="#6B4226" height="105" rx="4" width="18" x="85" y="80" />
                    <rect fill="#151C27" height="75" rx="4" width="18" x="107" y="110" />
                    <rect fill="#00573A" height="40" rx="3" width="10" x="129" y="145" />
                    <text fill="#83746c" fontSize="12" fontWeight="500" textAnchor="middle" x="116" y="210">
                      {chartPeriod === 'yearly' ? '2021' : chartPeriod === 'quarterly' ? 'Q1' : 'May'}
                    </text>
                  </g>

                  {/* Month 2: Jun */}
                  <g className="transition-all hover:opacity-85 cursor-pointer">
                    <rect fill="#6B4226" height="115" rx="4" width="18" x="195" y="70" />
                    <rect fill="#151C27" height="80" rx="4" width="18" x="217" y="105" />
                    <rect fill="#00573A" height="45" rx="3" width="10" x="239" y="140" />
                    <text fill="#83746c" fontSize="12" fontWeight="500" textAnchor="middle" x="226" y="210">
                      {chartPeriod === 'yearly' ? '2022' : chartPeriod === 'quarterly' ? 'Q2' : 'Jun'}
                    </text>
                  </g>

                  {/* Month 3: Jul */}
                  <g className="transition-all hover:opacity-85 cursor-pointer">
                    <rect fill="#6B4226" height="120" rx="4" width="18" x="305" y="65" />
                    <rect fill="#151C27" height="70" rx="4" width="18" x="327" y="115" />
                    <rect fill="#00573A" height="55" rx="3" width="10" x="349" y="130" />
                    <text fill="#83746c" fontSize="12" fontWeight="500" textAnchor="middle" x="336" y="210">
                      {chartPeriod === 'yearly' ? '2023' : chartPeriod === 'quarterly' ? 'Q3' : 'Jul'}
                    </text>
                  </g>

                  {/* Month 4: Aug */}
                  <g className="transition-all hover:opacity-85 cursor-pointer">
                    <rect fill="#6B4226" height="140" rx="4" width="18" x="415" y="45" />
                    <rect fill="#151C27" height="60" rx="4" width="18" x="437" y="125" />
                    <rect fill="#00573A" height="80" rx="3" width="10" x="459" y="105" />
                    <text fill="#83746c" fontSize="12" fontWeight="500" textAnchor="middle" x="446" y="210">
                      {chartPeriod === 'yearly' ? '2024' : chartPeriod === 'quarterly' ? 'Q4' : 'Aug'}
                    </text>
                  </g>

                  {/* Month 5: Sep */}
                  <g className="transition-all hover:opacity-85 cursor-pointer">
                    <rect fill="#6B4226" height="125" rx="4" width="18" x="525" y="60" />
                    <rect fill="#151C27" height="85" rx="4" width="18" x="547" y="100" />
                    <rect fill="#00573A" height="40" rx="3" width="10" x="569" y="145" />
                    <text fill="#83746c" fontSize="12" fontWeight="500" textAnchor="middle" x="556" y="210">
                      {chartPeriod === 'yearly' ? '2025' : chartPeriod === 'quarterly' ? 'Q1 \'26' : 'Sep'}
                    </text>
                  </g>

                  {/* Month 6: Oct (Peak Highlighted) */}
                  <g className="transition-all cursor-pointer">
                    <rect fill="#E7EEFE" fillOpacity="0.5" height="185" rx="10" width="95" x="620" y="12" />
                    <rect fill="#6B4226" height="147" rx="4" width="20" x="635" y="38" />
                    <rect fill="#151C27" height="97" rx="4" width="20" x="659" y="88" />
                    <rect fill="#00573A" height="52" rx="3" width="12" x="683" y="133" />
                    {/* Callout badge */}
                    <rect fill="#6B4226" height="18" rx="4" width="62" x="635" y="15" />
                    <text fill="#ffffff" fontSize="10" fontWeight="700" letterSpacing="0.05em" textAnchor="middle" x="666" y="27">
                      OCT PEAK
                    </text>
                    <text fill="#6B4226" fontSize="12" fontWeight="700" textAnchor="middle" x="667" y="210">
                      {chartPeriod === 'yearly' ? '2026' : chartPeriod === 'quarterly' ? 'Q2 \'26' : 'Oct'}
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Performance Footer Metrics */}
            <div className="mt-2 pt-3 bg-[#f0f3ff] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4 border border-[#e7eefe]">
              <div className="flex items-center gap-5">
                <div>
                  <span className="text-[11px] font-semibold text-[#83746c] block uppercase tracking-wider">
                    Average Net Margin
                  </span>
                  <span className="text-[18px] text-[#00573a] font-bold">+34.6%</span>
                </div>
                <div className="h-8 w-px bg-[#dce2f3]" />
                <div>
                  <span className="text-[11px] font-semibold text-[#83746c] block uppercase tracking-wider">
                    Highest Surplus
                  </span>
                  <span className="text-[18px] text-[#151c27] font-bold">
                    August <span className="text-[#00573a] text-[14px] font-medium">(+$1,820)</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#51443d] text-[13px]">
                <span className="material-symbols-outlined text-[18px] text-[#00573a]">verified</span>
                <span>All bank accounts reconciled today</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions Table Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e7eefe] hover:shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e7eefe]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-[#151c27]">Recent Transactions</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e7eefe] text-[#51443d] text-[11px] font-semibold">
                    {transactions.length} Total
                  </span>
                </div>
                <p className="text-[13px] text-[#83746c]">Live audit ledger of settled debits &amp; payroll credits</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex p-1 rounded-xl bg-[#f0f3ff] text-[12px] font-semibold border border-[#e7eefe]">
                  <button
                    onClick={() => setRecentFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      recentFilter === 'all'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setRecentFilter('income')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      recentFilter === 'income'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setRecentFilter('expenses')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      recentFilter === 'expenses'
                        ? 'bg-white text-[#151c27] shadow-xs'
                        : 'text-[#83746c] hover:text-[#151c27]'
                    }`}
                  >
                    Expenses
                  </button>
                </div>

                <button
                  onClick={onNavigateToTransactions}
                  className="text-[13px] text-[#6b4226] hover:text-[#502c12] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>View all ({transactions.length})</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Ledger Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#83746c] text-[11px] uppercase tracking-wider font-semibold border-b border-[#e7eefe]">
                    <th className="py-3 px-3">Merchant / Details</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Account</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Amount</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eefe]/50 text-[13px]">
                  {filteredTransactions.map((tx) => {
                    const isIncome = tx.amount > 0;
                    return (
                      <tr key={tx.id} className="hover:bg-[#f0f3ff]/60 transition-colors group">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isIncome ? 'bg-[#00573a]/10 text-[#00573a]' : 'bg-[#e7eefe] text-[#151c27]'
                            }`}>
                              <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-[#151c27] truncate">{tx.merchant}</span>
                              <span className="text-[12px] text-[#83746c] truncate">{tx.subtext}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isIncome
                              ? 'bg-[#00573a]/10 text-[#00573a]'
                              : 'bg-[#e7eefe] text-[#51443d]'
                          }`}>
                            {tx.category}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap text-[#51443d] text-[12px]">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#83746c]">account_balance</span>
                            <span>{tx.account}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap text-[#83746c] text-[12px]">
                          {tx.date}
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap text-right font-bold tabular-nums">
                          <span className={isIncome ? 'text-[#00573a]' : 'text-[#151c27]'}>
                            {isIncome ? `+$${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : `−$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f0f3ff] text-[#51443d] text-[11px] font-medium border border-[#e7eefe]">
                            <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-[#00573a]' : 'bg-[#d97706]'}`} />
                            {tx.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => onViewTransactionDetail(tx)}
                            className="p-1 rounded-lg text-[#83746c] hover:text-[#151c27] hover:bg-[#e7eefe] transition-colors"
                            title="View Transaction Details"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Smart AI Financial Insight Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-sm border border-[#e7eefe] hover:shadow-md transition-all">
            {/* Ambient radial glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#ffdbc7] blur-2xl pointer-events-none opacity-50" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#6ffbbe] blur-2xl pointer-events-none opacity-30" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdbc7]/70 text-[#502c12] text-[11px] font-semibold tracking-wide border border-[#f4ba96]/40">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  <span>Smart AI Insight</span>
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#83746c]">lightbulb</span>
              </div>

              <h3 className="text-[17px] font-bold text-[#151c27] leading-snug">
                Your spending is 12% lower than last month.
              </h3>

              <p className="text-[13px] text-[#51443d] leading-relaxed">
                You've cut dining expenses by <span className="font-semibold text-[#151c27]">$145</span>. Keeping this pace will boost your emergency fund milestone by{' '}
                <span className="text-[#00573a] font-semibold">18 days</span>.
              </p>

              <div className="pt-1">
                <button
                  onClick={onNavigateToTransactions}
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#6b4226] hover:text-[#502c12] font-semibold group"
                >
                  <span>Review spending opportunities</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Spending Breakdown Card with SVG Donut Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e7eefe] hover:shadow-sm transition-all space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#151c27]">Spending Breakdown</h3>
              <button
                onClick={onNavigateToTransactions}
                className="p-1 rounded-lg text-[#83746c] hover:text-[#151c27] hover:bg-[#f0f3ff]"
                title="View categories"
              >
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
              </button>
            </div>

            {/* Donut Chart Canvas */}
            <div className="flex items-center justify-center relative py-2">
              <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#E7EEFE" strokeWidth="16" />
                {/* Segments: Circumference ~402.12 */}
                {/* Housing: 34% -> 136.7 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#6B4226" strokeDasharray="136.7 402.12" strokeDashoffset="0" strokeWidth="16" />
                {/* Food: 19% -> 76.4 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#8C5B36" strokeDasharray="76.4 402.12" strokeDashoffset="-136.7" strokeWidth="16" />
                {/* Shopping: 22% -> 88.4 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#DCE2F3" strokeDasharray="88.4 402.12" strokeDashoffset="-213.1" strokeWidth="16" />
                {/* Transport: 10% -> 40.2 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#A5724C" strokeDasharray="40.2 402.12" strokeDashoffset="-301.5" strokeWidth="16" />
                {/* Utilities: 8% -> 32.1 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#151C27" strokeDasharray="32.1 402.12" strokeDashoffset="-341.7" strokeWidth="16" />
                {/* Entertainment: 7% -> 28.1 */}
                <circle cx="80" cy="80" fill="transparent" r="64" stroke="#00573A" strokeDasharray="28.1 402.12" strokeDashoffset="-373.8" strokeWidth="16" />
              </svg>

              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[26px] font-bold text-[#151c27] leading-none tabular-nums">$2,780</span>
                <span className="text-[11px] text-[#83746c] font-medium mt-1">Total Spent</span>
              </div>
            </div>

            {/* Category Progress Bars */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B4226]" />
                    Housing &amp; Rent
                  </span>
                  <span className="font-semibold text-[#151c27]">$950 <span className="text-[#83746c] font-normal">(34%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6B4226] rounded-full w-[34%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8C5B36]" />
                    Food &amp; Groceries
                  </span>
                  <span className="font-semibold text-[#151c27]">$520 <span className="text-[#83746c] font-normal">(19%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C5B36] rounded-full w-[19%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DCE2F3]" />
                    Shopping &amp; Other
                  </span>
                  <span className="font-semibold text-[#151c27]">$610 <span className="text-[#83746c] font-normal">(22%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#bfa696] rounded-full w-[22%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A5724C]" />
                    Transport &amp; Fuel
                  </span>
                  <span className="font-semibold text-[#151c27]">$280 <span className="text-[#83746c] font-normal">(10%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A5724C] rounded-full w-[10%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#151C27]" />
                    Utilities &amp; Bills
                  </span>
                  <span className="font-semibold text-[#151c27]">$230 <span className="text-[#83746c] font-normal">(8%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#151C27] rounded-full w-[8%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00573A]" />
                    Entertainment
                  </span>
                  <span className="font-semibold text-[#151c27]">$190 <span className="text-[#83746c] font-normal">(7%)</span></span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00573A] rounded-full w-[7%]" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Mini Goals & Quick Transfer Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e7eefe] hover:shadow-sm transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-bold text-[#151c27]">Savings Vaults</span>
                <span className="w-2 h-2 rounded-full bg-[#00573a]" />
              </div>
              <button
                onClick={onOpenVaultAllocation}
                className="flex items-center gap-1 text-[#6b4226] hover:text-[#502c12] text-[12px] font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Deposit</span>
              </button>
            </div>

            {/* Vault Item 1: Emergency Fund */}
            <div className="p-3.5 rounded-xl bg-[#f0f3ff] space-y-2 group hover:bg-[#e7eefe]/60 transition-colors border border-[#e7eefe]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#ffdbc7] flex items-center justify-center text-[#6b4226]">
                    <span className="material-symbols-outlined text-[16px]">shield</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#151c27]">Emergency Fund</span>
                </div>
                <span className="text-[11px] font-bold text-[#6b4226]">64%</span>
              </div>
              <div className="w-full h-2 bg-[#dce2f3] rounded-full overflow-hidden">
                <div className="h-full bg-[#6b4226] rounded-full w-[64%] transition-all duration-500" />
              </div>
              <div className="flex items-center justify-between text-[12px] text-[#83746c]">
                <span>$3,200 saved</span>
                <span>Target: $5,000</span>
              </div>
            </div>

            {/* Vault Item 2: New Laptop */}
            <div className="p-3.5 rounded-xl bg-[#f0f3ff] space-y-2 group hover:bg-[#e7eefe]/60 transition-colors border border-[#e7eefe]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#dce2f3] flex items-center justify-center text-[#151c27]">
                    <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#151c27]">New Laptop</span>
                </div>
                <span className="text-[11px] font-bold text-[#00573a]">63%</span>
              </div>
              <div className="w-full h-2 bg-[#dce2f3] rounded-full overflow-hidden">
                <div className="h-full bg-[#00573a] rounded-full w-[63%] transition-all duration-500" />
              </div>
              <div className="flex items-center justify-between text-[12px] text-[#83746c]">
                <span>$950 saved</span>
                <span>Target: $1,500</span>
              </div>
            </div>

            {/* Fast Quick Add Action Strip */}
            <button
              onClick={onOpenVaultAllocation}
              className="w-full py-2.5 px-4 rounded-xl bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6b4226]">send_money</span>
              <span>Instant Allocation to Vault</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
