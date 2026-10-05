import React, { useState } from 'react';
import { MONTHLY_TRAJECTORIES, SPENDING_BREAKDOWN } from '../data/initialData';

export const AnalyticsScreen: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState<'6m' | '1y' | 'ytd'>('6m');
  const [activeMetric, setActiveMetric] = useState<'net_margin' | 'savings_rate' | 'burn_velocity'>('net_margin');

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
              Quantitative Telemetry
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00573a]" />
            <span className="text-[11px] text-[#00573a] font-semibold">Real-Time Precision</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#151c27] tracking-tight mt-1">
            Financial Analytics &amp; Reports
          </h1>
          <p className="text-[14px] text-[#51443d]">
            In-depth analysis of capital velocity, savings margins, and recurring commitments.
          </p>
        </div>

        {/* Timeline selector */}
        <div className="flex items-center p-1 bg-[#f0f3ff] rounded-xl border border-[#e7eefe]">
          <button
            onClick={() => setSelectedTimeline('6m')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedTimeline === '6m' ? 'bg-white text-[#151c27] shadow-xs' : 'text-[#83746c]'
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setSelectedTimeline('1y')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedTimeline === '1y' ? 'bg-white text-[#151c27] shadow-xs' : 'text-[#83746c]'
            }`}
          >
            1 Year
          </button>
          <button
            onClick={() => setSelectedTimeline('ytd')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
              selectedTimeline === 'ytd' ? 'bg-white text-[#151c27] shadow-xs' : 'text-[#83746c]'
            }`}
          >
            YTD
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveMetric('net_margin')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            activeMetric === 'net_margin'
              ? 'border-[#6b4226] ring-1 ring-[#6b4226] shadow-sm'
              : 'border-[#e7eefe] hover:border-[#83746c]'
          }`}
        >
          <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider block mb-1">
            Average Net Savings Margin
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#00573a] tracking-tight tabular-nums">+34.6%</span>
            <span className="text-[12px] text-[#00573a] font-semibold">Pacing ahead</span>
          </div>
          <p className="text-[12px] text-[#83746c] mt-2">
            $1,470 monthly average retained across 6 months
          </p>
        </div>

        <div
          onClick={() => setActiveMetric('savings_rate')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            activeMetric === 'savings_rate'
              ? 'border-[#6b4226] ring-1 ring-[#6b4226] shadow-sm'
              : 'border-[#e7eefe] hover:border-[#83746c]'
          }`}
        >
          <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider block mb-1">
            Savings Growth Velocity
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#6b4226] tracking-tight tabular-nums">+15.3%</span>
            <span className="text-[12px] text-[#00573a] font-semibold">vs target</span>
          </div>
          <p className="text-[12px] text-[#83746c] mt-2">
            2 goals currently funded at or above schedule
          </p>
        </div>

        <div
          onClick={() => setActiveMetric('burn_velocity')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            activeMetric === 'burn_velocity'
              ? 'border-[#6b4226] ring-1 ring-[#6b4226] shadow-sm'
              : 'border-[#e7eefe] hover:border-[#83746c]'
          }`}
        >
          <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider block mb-1">
            Daily Burn Velocity
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#151c27] tracking-tight tabular-nums">$63.81</span>
            <span className="text-[12px] text-[#00573a] font-semibold">0.94x safe rate</span>
          </div>
          <p className="text-[12px] text-[#83746c] mt-2">
            Daily safe allocation limit is $66.00/day
          </p>
        </div>
      </div>

      {/* Trajectory Table & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Performance Ledger */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#e7eefe] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-[#151c27]">Monthly Cash Flow Trajectory</h2>
            <span className="text-[12px] text-[#83746c]">Values in USD ($)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider border-b border-[#e7eefe]">
                  <th className="py-3 px-3">Month</th>
                  <th className="py-3 px-3 text-right">Inflow (Income)</th>
                  <th className="py-3 px-3 text-right">Outflow (Spent)</th>
                  <th className="py-3 px-3 text-right">Net Surplus</th>
                  <th className="py-3 px-3 text-right">Savings Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eefe]/60 text-[13px]">
                {MONTHLY_TRAJECTORIES.map((m) => {
                  const surplus = m.income - m.expenses;
                  const rate = Math.round((surplus / m.income) * 100);
                  return (
                    <tr key={m.month} className="hover:bg-[#f0f3ff]/50">
                      <td className="py-3 px-3 font-semibold text-[#151c27] flex items-center gap-2">
                        <span>{m.month} 2026</span>
                        {m.isPeak && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6b4226] text-white">
                            PEAK
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-[#00573a] tabular-nums">
                        +${m.income.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-[#151c27] tabular-nums">
                        −${m.expenses.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#00573a] tabular-nums">
                        +${surplus.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-[#6b4226] tabular-nums">
                        {rate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Percent Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#e7eefe] shadow-xs space-y-4">
          <h2 className="text-[18px] font-bold text-[#151c27]">Expenditure Share</h2>
          <p className="text-[13px] text-[#83746c]">Calculated against settled October transactions</p>

          <div className="space-y-3.5 pt-2">
            {SPENDING_BREAKDOWN.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#151c27] font-medium">{cat.name}</span>
                  <span className="font-semibold text-[#151c27]">
                    ${cat.amount} <span className="text-[#83746c] font-normal">({cat.percent}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#e7eefe] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
