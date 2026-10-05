import React, { useState, useEffect, useRef } from 'react';
import { Transaction } from '../types';

interface TransactionsScreenProps {
  transactions: Transaction[];
  onOpenAddModal: () => void;
  onDeleteTransaction: (id: string) => void;
  onViewDetails: (tx: Transaction) => void;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  onOpenAddModal,
  onDeleteTransaction,
  onViewDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expenses' | 'transfers'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDateFilter, setSelectedDateFilter] = useState('October 2026');
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExportMenuOpen(false);
      }
    };

    if (exportMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [exportMenuOpen]);

  const pageSize = 8;

  // Filter items
  const filtered = transactions.filter((tx) => {
    // tab filter
    if (activeTab === 'income' && tx.amount <= 0) return false;
    if (activeTab === 'expenses' && tx.amount >= 0) return false;
    if (activeTab === 'transfers' && tx.categorySlug !== 'transfer') return false;

    // search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchMerchant = tx.merchant.toLowerCase().includes(q);
      const matchCategory = tx.category.toLowerCase().includes(q);
      const matchAccount = tx.account.toLowerCase().includes(q);
      const matchNotes = tx.notes ? tx.notes.toLowerCase().includes(q) : false;
      return matchMerchant || matchCategory || matchAccount || matchNotes;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map((t) => t.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Helper to escape CSV field values
  const escapeCsv = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const exportToCsvFile = (dataToExport: Transaction[], filenameSuffix: string) => {
    const headers = [
      'Transaction ID',
      'Date',
      'Time',
      'Merchant / Payee',
      'Details / Subtext',
      'Category',
      'Account',
      'Payment Method',
      'Type',
      'Amount (USD)',
      'Status',
      'Notes'
    ];

    const rows = dataToExport.map((t) => {
      const typeStr = t.amount > 0 ? 'Income' : t.categorySlug === 'transfer' ? 'Transfer' : 'Expense';
      return [
        escapeCsv(t.id),
        escapeCsv(t.date),
        escapeCsv(t.time || '10:00 AM'),
        escapeCsv(t.merchant),
        escapeCsv(t.subtext),
        escapeCsv(t.category),
        escapeCsv(t.account),
        escapeCsv(t.method),
        escapeCsv(typeStr),
        escapeCsv(t.amount.toFixed(2)),
        escapeCsv(t.status),
        escapeCsv(t.notes || '')
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStamp = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `wealthpulse_${filenameSuffix}_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(`Exported ${dataToExport.length} transactions as CSV`);
    setExportMenuOpen(false);
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleExportCurrentLedger = () => {
    exportToCsvFile(filtered, 'current_ledger_view');
  };

  const handleExportSelected = () => {
    const selectedTransactions = transactions.filter((t) => selectedIds.includes(t.id));
    if (selectedTransactions.length > 0) {
      exportToCsvFile(selectedTransactions, 'selected_transactions');
    }
  };

  const handleExportAll = () => {
    exportToCsvFile(transactions, 'full_transactions_archive');
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Header & Global Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
              Ledger &amp; Flow
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00573a]" />
            <span className="text-[11px] text-[#00573a] font-semibold">Live Sync Active</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#151c27] tracking-tight">
            Transactions
          </h1>
          <p className="text-[14px] text-[#51443d] max-w-2xl">
            Monitor, filter, and categorize all financial movements across all accounts.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by description, merchant..."
              className="w-full h-10 pl-9 pr-3 bg-[#f0f3ff] text-[13px] text-[#151c27] rounded-lg placeholder:text-[#83746c] focus:outline-none focus:bg-white border border-[#e7eefe]"
            />
          </div>

          {/* Date Range Selector Pill */}
          <button
            onClick={() => setSelectedDateFilter(selectedDateFilter === 'October 2026' ? 'All Time' : 'October 2026')}
            className="h-10 px-3.5 bg-[#f0f3ff] hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-medium rounded-lg border border-[#e7eefe] flex items-center gap-2 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#83746c]">date_range</span>
            <span>{selectedDateFilter === 'October 2026' ? 'Oct 01 – Oct 31, 2026' : 'All Historical Records'}</span>
            <span className="material-symbols-outlined text-[16px] text-[#83746c]">expand_more</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="h-10 px-3.5 bg-[#f0f3ff] hover:bg-[#e7eefe] text-[#151c27] text-[13px] font-medium rounded-lg border border-[#e7eefe] flex items-center gap-1.5 transition-all shadow-xs"
              title="Export Transactions"
              aria-expanded={exportMenuOpen}
            >
              <span className="material-symbols-outlined text-[18px] text-[#6b4226]">file_download</span>
              <span>{exportNotice ? 'Exporting...' : 'Export CSV'}</span>
              <span className="material-symbols-outlined text-[16px] text-[#83746c]">expand_more</span>
            </button>

            {exportMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-[#e7eefe] py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3.5 py-1.5 border-b border-[#e7eefe] text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
                  Export Ledger Options
                </div>

                <button
                  onClick={handleExportCurrentLedger}
                  className="w-full px-3.5 py-2 text-left text-[13px] text-[#151c27] hover:bg-[#f0f3ff] flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#00573a]">filter_alt</span>
                    <span>Current Filtered View</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#83746c] bg-[#e7eefe] px-1.5 py-0.5 rounded">
                    {filtered.length}
                  </span>
                </button>

                {selectedIds.length > 0 && (
                  <button
                    onClick={handleExportSelected}
                    className="w-full px-3.5 py-2 text-left text-[13px] text-[#151c27] hover:bg-[#f0f3ff] flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#6b4226]">check_box</span>
                      <span>Selected Rows</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#6b4226] bg-[#ffdbc7] px-1.5 py-0.5 rounded">
                      {selectedIds.length}
                    </span>
                  </button>
                )}

                <button
                  onClick={handleExportAll}
                  className="w-full px-3.5 py-2 text-left text-[13px] text-[#151c27] hover:bg-[#f0f3ff] flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#83746c]">inventory_2</span>
                    <span>All Historical Records</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#83746c] bg-[#e7eefe] px-1.5 py-0.5 rounded">
                    {transactions.length}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Add CTA */}
          <button
            onClick={onOpenAddModal}
            className="h-10 px-4 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Highlights & Quick Stream Sparkline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e7eefe] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
              Net Cash Flow (Oct)
            </span>
            <span className="p-1 rounded bg-[#00573a]/10 text-[#00573a] material-symbols-outlined text-[16px]">
              trending_up
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold text-[#151c27] tracking-tight tabular-nums">
              +$4,295.40
            </span>
            <span className="text-[11px] text-[#00573a] font-bold">+14.2%</span>
          </div>
          <p className="text-[12px] text-[#83746c]">Compared to $3,760.10 in September</p>
        </div>

        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e7eefe] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
              Monthly Expenses
            </span>
            <span className="p-1 rounded bg-[#ba1a1a]/10 text-[#ba1a1a] material-symbols-outlined text-[16px]">
              trending_down
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold text-[#151c27] tracking-tight tabular-nums">
              −$3,924.60
            </span>
            <span className="text-[11px] text-[#ba1a1a] font-bold">−2.4%</span>
          </div>
          <p className="text-[12px] text-[#83746c]">64% of $6,100 monthly cap</p>
        </div>

        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e7eefe] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#83746c]">
              Pending Settlements
            </span>
            <span className="p-1 rounded bg-[#e5e2e1] text-[#51443d] material-symbols-outlined text-[16px]">
              hourglass_top
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold text-[#151c27] tracking-tight">
              2 Items
            </span>
            <span className="text-[11px] text-[#83746c] font-medium">$134.50</span>
          </div>
          <p className="text-[12px] text-[#83746c]">Expected settlement in ~24h</p>
        </div>

        <div className="p-4 rounded-xl bg-[#6b4226] text-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffdbc7]">
              Smart Vault Sync
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#6ffbbe]">verified</span>
          </div>
          <div>
            <div className="text-[18px] font-bold tracking-tight text-white">100% Reconciled</div>
            <p className="text-[12px] text-[#ffdbc7]">All 4 linked institutions balanced</p>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-[#6ffbbe] rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Segmented Tabs & Batch Operations */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1 p-1 bg-[#f0f3ff] rounded-xl border border-[#e7eefe]">
          <button
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#6b4226] shadow-xs'
                : 'text-[#51443d] hover:text-[#151c27]'
            }`}
          >
            <span>All Transactions</span>
            <span className="px-2 py-0.2 rounded-full bg-[#6b4226]/10 text-[#6b4226] text-[11px]">
              {transactions.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('income');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'income'
                ? 'bg-white text-[#6b4226] shadow-xs'
                : 'text-[#51443d] hover:text-[#151c27]'
            }`}
          >
            <span>Income</span>
            <span className="px-2 py-0.2 rounded-full bg-[#e7eefe] text-[#51443d] text-[11px]">
              {transactions.filter((t) => t.amount > 0).length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('expenses');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'expenses'
                ? 'bg-white text-[#6b4226] shadow-xs'
                : 'text-[#51443d] hover:text-[#151c27]'
            }`}
          >
            <span>Expenses</span>
            <span className="px-2 py-0.2 rounded-full bg-[#e7eefe] text-[#51443d] text-[11px]">
              {transactions.filter((t) => t.amount < 0).length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('transfers');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'transfers'
                ? 'bg-white text-[#6b4226] shadow-xs'
                : 'text-[#51443d] hover:text-[#151c27]'
            }`}
          >
            <span>Transfers</span>
            <span className="px-2 py-0.2 rounded-full bg-[#e7eefe] text-[#51443d] text-[11px]">
              {transactions.filter((t) => t.categorySlug === 'transfer').length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#51443d] text-[12px]">
          <span className="material-symbols-outlined text-[16px] text-[#00573a]">auto_awesome</span>
          <span>Auto-categorization active (98.4% precision)</span>
        </div>
      </div>

      {/* Batch Action Bar if rows are selected */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-[#6b4226] text-white shadow-md animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2 text-[13px] font-medium">
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            <span>{selectedIds.length} transaction{selectedIds.length > 1 ? 's' : ''} selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSelected}
              className="px-3.5 py-1.5 rounded-lg bg-white text-[#6b4226] text-[12px] font-bold hover:bg-[#f0f3ff] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Export Selected as CSV</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 rounded-lg text-white/80 hover:text-white text-[12px] font-medium transition-colors"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Transactions Table Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#e7eefe] overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f0f3ff]/70 text-[#83746c] text-[11px] font-semibold uppercase tracking-wider select-none border-b border-[#e7eefe]">
                <th className="py-3.5 pl-6 pr-3 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={paginated.length > 0 && selectedIds.length === paginated.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-[#6b4226] accent-[#6b4226] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4">Description &amp; Merchant</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Account</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 pr-6 pl-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e7eefe]/60 text-[13px] text-[#151c27]">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#83746c]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[36px] text-[#dce2f3]">search_off</span>
                      <p className="text-[14px] font-semibold text-[#151c27]">No transactions match your search</p>
                      <p className="text-[12px] text-[#83746c]">Try adjusting search filters or post a new transaction.</p>
                      <button
                        onClick={onOpenAddModal}
                        className="mt-2 px-4 py-2 rounded-lg bg-[#6b4226] text-white text-[12px] font-semibold"
                      >
                        + Add First Entry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => {
                  const isIncome = tx.amount > 0;
                  const isSelected = selectedIds.includes(tx.id);
                  return (
                    <tr
                      key={tx.id}
                      className={`hover:bg-[#f0f3ff]/50 transition-colors group ${
                        isSelected ? 'bg-[#f0f3ff]/80' : ''
                      }`}
                    >
                      <td className="py-3.5 pl-6 pr-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(tx.id)}
                          className="w-4 h-4 rounded text-[#6b4226] accent-[#6b4226] cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-4 min-w-[240px]">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isIncome
                                ? 'bg-[#00573a]/10 text-[#00573a]'
                                : 'bg-[#e7eefe] text-[#151c27]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-[#151c27] truncate">{tx.merchant}</span>
                            <span className="text-[12px] text-[#83746c] truncate">{tx.subtext}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isIncome
                              ? 'bg-[#00573a]/10 text-[#00573a]'
                              : 'bg-[#e7eefe] text-[#51443d]'
                          }`}
                        >
                          {tx.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-[#51443d] text-[12px]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#83746c]">
                            account_balance
                          </span>
                          <span>{tx.account}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-[12px]">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#151c27]">{tx.date}</span>
                          <span className="text-[#83746c]">{tx.time || '10:00 AM'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-[12px] text-[#83746c]">
                        {tx.method}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-right font-bold tabular-nums text-[14px]">
                        <span className={isIncome ? 'text-[#00573a]' : 'text-[#151c27]'}>
                          {isIncome
                            ? `+$${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                            : `−$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                            tx.status === 'Completed'
                              ? 'bg-[#00573a]/10 text-[#00573a] border-[#00573a]/20'
                              : 'bg-[#e5e2e1] text-[#51443d] border-[#dce2f3]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              tx.status === 'Completed' ? 'bg-[#00573a]' : 'bg-[#83746c]'
                            }`}
                          />
                          {tx.status}
                        </span>
                      </td>

                      <td className="py-3.5 pr-6 pl-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onViewDetails(tx)}
                            className="p-1.5 hover:bg-[#e7eefe] rounded-lg text-[#83746c] hover:text-[#151c27]"
                            title="View Digital Receipt"
                          >
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                          </button>
                          <button
                            onClick={() => onDeleteTransaction(tx.id)}
                            className="p-1.5 hover:bg-[#ffdad6] rounded-lg text-[#83746c] hover:text-[#ba1a1a]"
                            title="Delete Entry"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination */}
        <div className="p-4 bg-[#f0f3ff]/40 border-t border-[#e7eefe] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[12px] text-[#83746c]">
            Showing{' '}
            <span className="font-semibold text-[#151c27]">
              {filtered.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–
              {Math.min(currentPage * pageSize, filtered.length)}
            </span>{' '}
            of <span className="font-semibold text-[#151c27]">{filtered.length}</span> transactions
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white text-[#83746c] hover:text-[#151c27] shadow-xs border border-[#e7eefe] disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-[12px] font-semibold shadow-xs border transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#6b4226] text-white border-[#6b4226]'
                    : 'bg-white hover:bg-[#e7eefe] text-[#151c27] border-[#e7eefe]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white text-[#83746c] hover:text-[#151c27] shadow-xs border border-[#e7eefe] disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
