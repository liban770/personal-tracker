import React, { useState } from 'react';
import { SavingsVault } from '../types';

interface VaultAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaults: SavingsVault[];
  onAllocate: (vaultId: string, amount: number) => void;
}

export const VaultAllocationModal: React.FC<VaultAllocationModalProps> = ({
  isOpen,
  onClose,
  vaults,
  onAllocate,
}) => {
  const [selectedVaultId, setSelectedVaultId] = useState(vaults[0]?.id || '');
  const [amount, setAmount] = useState('150.00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (val > 0 && selectedVaultId) {
      onAllocate(selectedVaultId, val);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2a313d]/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-[#e7eefe]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e7eefe] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00573a]/10 text-[#00573a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">send_money</span>
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-[#151c27]">Instant Vault Allocation</h3>
              <p className="text-[12px] text-[#83746c]">Transfer surplus capital directly into a goal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#51443d] hover:bg-[#e7eefe]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
              Select Destination Vault
            </label>
            <div className="space-y-2">
              {vaults.map((vault) => {
                const percent = Math.min(Math.round((vault.saved / vault.target) * 100), 100);
                const isSelected = selectedVaultId === vault.id;
                return (
                  <button
                    key={vault.id}
                    type="button"
                    onClick={() => setSelectedVaultId(vault.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#00573a] bg-[#f0f3ff] ring-1 ring-[#00573a]'
                        : 'border-[#e7eefe] hover:bg-[#f9f9ff]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#6b4226] text-[20px]">
                        {vault.icon}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-[#151c27]">{vault.title}</p>
                        <p className="text-[11px] text-[#83746c]">
                          ${vault.saved.toLocaleString()} of ${vault.target.toLocaleString()} ({percent}%)
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[#00573a] text-[18px]">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
              Allocation Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[16px] font-bold text-[#151c27]">$</span>
              <input
                type="number"
                step="5"
                min="5"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-11 pl-8 pr-4 bg-[#f0f3ff] text-[15px] font-bold text-[#151c27] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00573a] border border-[#e7eefe] tabular-nums"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e7eefe]">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg text-[#51443d] hover:bg-[#e7eefe] text-[13px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-[#00573a] hover:bg-[#003d28] text-white text-[13px] font-semibold shadow-sm transition-colors"
            >
              Confirm Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
