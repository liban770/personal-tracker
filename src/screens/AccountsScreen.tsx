import React, { useState } from 'react';
import { AccountItem, SavingsVault } from '../types';

interface AccountsScreenProps {
  accounts: AccountItem[];
  vaults: SavingsVault[];
  onOpenVaultAllocation: () => void;
}

export const AccountsScreen: React.FC<AccountsScreenProps> = ({
  accounts,
  vaults,
  onOpenVaultAllocation,
}) => {
  const [reconciling, setReconciling] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const totalLiquidity = accounts.reduce((acc, a) => acc + a.balance, 0);

  const handleReconcile = () => {
    setReconciling(true);
    setTimeout(() => {
      setReconciling(false);
      setSyncMessage('All accounts successfully reconciled with zero delta.');
      setTimeout(() => setSyncMessage(null), 3000);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
              Connected Financial Institutions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00573a]" />
            <span className="text-[11px] text-[#00573a] font-semibold">100% Synced</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#151c27] tracking-tight mt-1">
            Accounts &amp; Vaults
          </h1>
          <p className="text-[14px] text-[#51443d]">
            Unified overview of depository, brokerage, and allocated savings vaults.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReconcile}
            disabled={reconciling}
            className="h-10 px-4 rounded-lg bg-white hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-semibold flex items-center gap-2 border border-[#e7eefe] shadow-xs transition-all"
          >
            <span className={`material-symbols-outlined text-[18px] text-[#00573a] ${reconciling ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{reconciling ? 'Reconciling...' : 'Reconcile Balances'}</span>
          </button>

          <button
            onClick={onOpenVaultAllocation}
            className="h-10 px-4 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">send_money</span>
            <span>Deposit to Vault</span>
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className="p-3 bg-[#00573a]/10 border border-[#00573a]/20 rounded-xl text-[13px] text-[#00573a] font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Aggregate Liquidity Banner */}
      <div className="p-6 rounded-2xl bg-[#f0f3ff] border border-[#e7eefe] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
            Total Aggregate Liquidity
          </span>
          <div className="text-[32px] sm:text-[36px] font-bold text-[#151c27] tracking-tight tabular-nums">
            ${totalLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[12px] text-[#00573a] font-semibold">
            +4.8% net liquid capital growth over 30 days
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 bg-white rounded-xl border border-[#e7eefe] text-center">
            <span className="text-[11px] text-[#83746c] block">Primary Checking</span>
            <span className="text-[16px] font-bold text-[#151c27]">$4,850.00</span>
          </div>
          <div className="px-4 py-2.5 bg-white rounded-xl border border-[#e7eefe] text-center">
            <span className="text-[11px] text-[#83746c] block">High Yield Savings</span>
            <span className="text-[16px] font-bold text-[#00573a]">$2,600.00</span>
          </div>
          <div className="px-4 py-2.5 bg-white rounded-xl border border-[#e7eefe] text-center">
            <span className="text-[11px] text-[#83746c] block">Investments</span>
            <span className="text-[16px] font-bold text-[#6b4226]">$850.00</span>
          </div>
        </div>
      </div>

      {/* Connected Accounts Cards */}
      <div className="space-y-3">
        <h2 className="text-[18px] font-bold text-[#151c27]">Active Depository &amp; Brokerage Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-xl bg-white border border-[#e7eefe] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f3ff] flex items-center justify-center text-[#6b4226]">
                    <span className="material-symbols-outlined text-[22px]">
                      {acc.type === 'investment' ? 'candlestick_chart' : acc.type === 'savings' ? 'savings' : 'account_balance'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#151c27]">{acc.name}</h3>
                    <p className="text-[12px] text-[#83746c]">{acc.institution} • {acc.accountNumber}</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#00573a]/10 text-[#00573a]">
                  Synced
                </span>
              </div>

              <div className="pt-4 flex items-baseline justify-between border-t border-[#e7eefe] mt-4">
                <div className="text-[22px] font-bold text-[#151c27] tabular-nums">
                  ${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[12px] text-[#83746c]">{acc.changeRate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Goals & Vaults Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-[#151c27]">Dedicated Savings Vaults</h2>
            <p className="text-[13px] text-[#83746c]">Automated stash reserves locked for milestones</p>
          </div>
          <button
            onClick={onOpenVaultAllocation}
            className="text-[13px] font-semibold text-[#6b4226] hover:underline flex items-center gap-1"
          >
            <span>Deposit into Vault</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vaults.map((vault) => {
            const percent = Math.min(Math.round((vault.saved / vault.target) * 100), 100);
            return (
              <div
                key={vault.id}
                className="p-5 rounded-xl bg-white border border-[#e7eefe] shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ffdbc7] flex items-center justify-center text-[#6b4226]">
                      <span className="material-symbols-outlined text-[18px]">{vault.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#151c27]">{vault.title}</h3>
                      <span className="text-[11px] text-[#83746c]">{vault.category}</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#00573a]">{percent}%</span>
                </div>

                <div className="w-full h-2 bg-[#dce2f3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00573a] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[12px] text-[#51443d]">
                  <span>${vault.saved.toLocaleString()} saved</span>
                  <span className="text-[#83746c]">Target: ${vault.target.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
