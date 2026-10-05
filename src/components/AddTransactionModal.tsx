import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('85.00');
  const [merchant, setMerchant] = useState<string>('Apple Fifth Avenue');
  const [subtext, setSubtext] = useState<string>('MacBook Leather Sleeve & MagSafe');
  const [category, setCategory] = useState<string>('Shopping & Electronics');
  const [account, setAccount] = useState<string>('Main Bank Account (•••• 4821)');
  const [date, setDate] = useState<string>('October 21, 2026');
  const [method, setMethod] = useState<string>('Visa Debit Card');
  const [notes, setNotes] = useState<string>('');
  const [receiptAttached, setReceiptAttached] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount) || 0;
    const finalAmount = type === 'expense' || type === 'transfer' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    let categorySlug: Transaction['categorySlug'] = 'shopping';
    let icon = 'devices';

    if (type === 'income') {
      categorySlug = 'income';
      icon = 'corporate_fare';
    } else if (type === 'transfer') {
      categorySlug = 'transfer';
      icon = 'sync_alt';
    } else {
      if (category.includes('Food') || category.includes('Dining')) {
        categorySlug = 'dining';
        icon = 'local_grocery_store';
      } else if (category.includes('Housing') || category.includes('Rent')) {
        categorySlug = 'utilities';
        icon = 'apartment';
      } else if (category.includes('Bills') || category.includes('Utilities')) {
        categorySlug = 'utilities';
        icon = 'bolt';
      } else {
        categorySlug = 'shopping';
        icon = 'devices';
      }
    }

    onAddTransaction({
      merchant: merchant.trim() || (type === 'income' ? 'Client Deposit' : 'Merchant Payment'),
      subtext: subtext.trim() || 'Direct verified entry',
      category: category,
      categorySlug: categorySlug,
      account: account.replace('Account ', ''),
      date: date,
      time: 'Just now',
      method: method,
      amount: finalAmount,
      status: 'Completed',
      icon: icon,
      notes: notes.trim() || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2a313d]/40 backdrop-blur-sm transition-all duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e7eefe]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#f0f3ff]/70 flex items-center justify-between border-b border-[#e7eefe]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#6b4226] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <div>
              <h2 className="text-[17px] font-semibold text-[#151c27]">Add New Transaction</h2>
              <p className="text-[12px] text-[#51443d]">Post a verified entry directly to your wealth ledger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#51443d] hover:text-[#151c27] hover:bg-[#e7eefe] transition-colors"
            title="Close dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Segmented Type Picker */}
          <div className="flex p-1 bg-[#f0f3ff] rounded-xl border border-[#e7eefe]">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                type === 'expense'
                  ? 'bg-[#6b4226] text-white shadow-sm'
                  : 'text-[#51443d] hover:text-[#151c27]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              <span>Expense</span>
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                type === 'income'
                  ? 'bg-[#6b4226] text-white shadow-sm'
                  : 'text-[#51443d] hover:text-[#151c27]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              <span>Income</span>
            </button>
            <button
              type="button"
              onClick={() => setType('transfer')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                type === 'transfer'
                  ? 'bg-[#6b4226] text-white shadow-sm'
                  : 'text-[#51443d] hover:text-[#151c27]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span>Transfer</span>
            </button>
          </div>

          {/* Hero Currency Value Input */}
          <div className="p-4 bg-[#f0f3ff]/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 border border-[#e7eefe]">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
              Enter Transaction Value
            </label>
            <div className="flex items-center justify-center w-full">
              <span className="text-[40px] font-bold text-[#151c27] pr-1 leading-none">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="text-[40px] font-bold text-[#151c27] bg-transparent text-left max-w-[220px] focus:outline-none placeholder:text-[#83746c]/40 tabular-nums leading-none"
                placeholder="0.00"
              />
            </div>
            <span className="text-[12px] text-[#83746c]">Currency locked: USD ($)</span>
          </div>

          {/* 2-Column Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Merchant / Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center justify-between text-[13px] font-medium text-[#151c27]">
                <span>Description &amp; Merchant</span>
                <span className="text-[11px] text-[#83746c]">Required</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
                  storefront
                </span>
                <input
                  type="text"
                  required
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  placeholder="e.g. Apple Fifth Avenue or Whole Foods"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] focus:bg-white border border-[#e7eefe]"
                />
              </div>
            </div>

            {/* Subtext Detail */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[13px] font-medium text-[#151c27]">Item Details / Subtext</label>
              <input
                type="text"
                value={subtext}
                onChange={(e) => setSubtext(e.target.value)}
                placeholder="e.g. Organic Produce or Tech Accessories"
                className="w-full h-10 px-3 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] focus:bg-white border border-[#e7eefe]"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#151c27]">Category</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
                  category
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 pl-10 pr-8 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] appearance-none cursor-pointer border border-[#e7eefe]"
                >
                  <option value="Shopping & Electronics">Shopping &amp; Electronics</option>
                  <option value="Food & Dining">Food &amp; Dining</option>
                  <option value="Housing & Living">Housing &amp; Rent</option>
                  <option value="Utilities & Bills">Utilities &amp; Bills</option>
                  <option value="Transport & Fuel">Transport &amp; Fuel</option>
                  <option value="Health & Fitness">Health &amp; Fitness</option>
                  <option value="Income & Salary">Income &amp; Salary</option>
                  <option value="Internal Transfer">Internal Transfer</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Account */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[13px] font-medium text-[#151c27]">
                <span>Account</span>
                <span className="text-[11px] text-[#00573a] font-bold">Bal: $4,850.00</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
                  account_balance
                </span>
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full h-11 pl-10 pr-8 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] appearance-none cursor-pointer border border-[#e7eefe]"
                >
                  <option value="Main Bank Account (•••• 4821)">Main Bank Account (•••• 4821)</option>
                  <option value="High Yield Vault (•••• 1298)">High Yield Vault (•••• 1298)</option>
                  <option value="Everyday Cash Wallet">Everyday Cash Wallet</option>
                  <option value="Vanguard Index (•••• 7730)">Vanguard Index (•••• 7730)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#151c27]">Date</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
                  event
                </span>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] border border-[#e7eefe]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#151c27]">Payment Method</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
                  credit_card
                </span>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full h-11 pl-10 pr-8 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] appearance-none cursor-pointer border border-[#e7eefe]"
                >
                  <option value="Visa Debit Card">Visa Debit Card</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="ACH Direct Transfer">ACH Direct Transfer</option>
                  <option value="Physical Cash">Physical Cash</option>
                  <option value="Direct Deposit">Direct Deposit</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Notes / Memo */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[13px] font-medium text-[#151c27]">Notes / Memo</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#83746c] text-[18px]">
                  notes
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Optional receipt note or tax deductible tag..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f3ff] text-[#151c27] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6b4226] border border-[#e7eefe] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Micro-attachment banner */}
          <div className="p-3 rounded-xl bg-[#f0f3ff] flex items-center justify-between text-[#51443d] text-[12px] border border-[#e7eefe]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#6b4226]">attach_file</span>
              <span>
                {receiptAttached 
                  ? 'receipt_scanned_oct21.pdf (240 KB attached)' 
                  : 'Receipt attachment supported (JPG, PNG, PDF up to 10MB)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setReceiptAttached(!receiptAttached)}
              className="text-[11px] font-semibold text-[#6b4226] hover:underline"
            >
              {receiptAttached ? 'Remove' : 'Upload'}
            </button>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-lg text-[#51443d] hover:text-[#151c27] hover:bg-[#f0f3ff] text-[13px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
