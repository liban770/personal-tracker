import React from 'react';
import { Transaction } from '../types';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  const isIncome = transaction.amount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2a313d]/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-[#e7eefe] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e7eefe] pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isIncome ? 'bg-[#00573a]/10 text-[#00573a]' : 'bg-[#e7eefe] text-[#151c27]'
            }`}>
              <span className="material-symbols-outlined text-[20px]">{transaction.icon}</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#151c27]">Transaction Details</h3>
              <p className="text-[12px] text-[#83746c]">Digital Audit Ledger Record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#51443d] hover:bg-[#e7eefe]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 bg-[#f0f3ff] rounded-xl text-center border border-[#e7eefe]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
            Settled Value
          </span>
          <div className={`text-[36px] font-bold tabular-nums ${isIncome ? 'text-[#00573a]' : 'text-[#151c27]'}`}>
            {isIncome
              ? `+$${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
              : `−$${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </div>
          <span className="text-[12px] text-[#00573a] font-semibold">
            Status: {transaction.status}
          </span>
        </div>

        <div className="space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Merchant / Counterparty</span>
            <span className="font-semibold text-[#151c27]">{transaction.merchant}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Description</span>
            <span className="text-[#151c27]">{transaction.subtext}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Category</span>
            <span className="font-medium text-[#151c27]">{transaction.category}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Linked Account</span>
            <span className="font-medium text-[#151c27]">{transaction.account}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Date &amp; Time</span>
            <span className="text-[#151c27]">{transaction.date} • {transaction.time || '10:00 AM'}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-[#e7eefe]/60">
            <span className="text-[#83746c]">Payment Method</span>
            <span className="text-[#151c27]">{transaction.method}</span>
          </div>

          {transaction.notes && (
            <div className="py-2">
              <span className="text-[#83746c] block text-[11px] font-semibold uppercase mb-1">Memo</span>
              <p className="p-2.5 rounded-lg bg-[#f0f3ff] text-[#51443d] text-[12px] border border-[#e7eefe]">
                {transaction.notes}
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-lg bg-[#6b4226] text-white text-[13px] font-semibold shadow-xs hover:bg-[#502c12]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
