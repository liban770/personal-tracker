import { useState } from 'react';
import { 
  NavigationTab, 
  Transaction, 
  BudgetPool, 
  SavingsVault, 
  AccountItem 
} from './types';
import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_SAVINGS_VAULTS, 
  CONNECTED_ACCOUNTS 
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AddTransactionModal } from './components/AddTransactionModal';
import { CreateBudgetModal } from './components/CreateBudgetModal';
import { VaultAllocationModal } from './components/VaultAllocationModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { DashboardScreen } from './screens/DashboardScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { BudgetsScreen } from './screens/BudgetsScreen';
import { AccountsScreen } from './screens/AccountsScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { AuthScreen } from './screens/AuthScreen';

export default function App() {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isAuthMode, setIsAuthMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Core Financial Data State
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<BudgetPool[]>(INITIAL_BUDGETS);
  const [vaults, setVaults] = useState<SavingsVault[]>(INITIAL_SAVINGS_VAULTS);
  const [accounts, setAccounts] = useState<AccountItem[]>(CONNECTED_ACCOUNTS);

  // Modal State
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
  const [isVaultAllocOpen, setIsVaultAllocOpen] = useState(false);
  const [selectedTxDetail, setSelectedTxDetail] = useState<Transaction | null>(null);

  // Global search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Dynamic calculations based on state
  const totalBalance = 8450.00 + (transactions.length > INITIAL_TRANSACTIONS.length
    ? transactions.slice(0, transactions.length - INITIAL_TRANSACTIONS.length).reduce((acc, t) => acc + t.amount, 0)
    : 0);

  const monthlyIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyExpenses = Math.abs(
    transactions
      .filter((t) => t.amount < 0 && t.categorySlug !== 'transfer')
      .reduce((acc, t) => acc + t.amount, 0)
  );

  const totalVaultSavings = vaults.reduce((acc, v) => acc + v.saved, 0);
  const vaultTargetTotal = vaults.reduce((acc, v) => acc + v.target, 0);
  const vaultPercent = vaultTargetTotal > 0 ? Math.round((totalVaultSavings / vaultTargetTotal) * 100) : 78;

  // Transaction Actions
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`
    };

    setTransactions([newTx, ...transactions]);

    // If an expense matches a budget category, increment spent
    if (newTx.amount < 0) {
      const expenseVal = Math.abs(newTx.amount);
      setBudgets((prev) =>
        prev.map((b) => {
          if (
            (newTx.category.includes('Food') && b.title.includes('Food')) ||
            (newTx.category.includes('Housing') && b.title.includes('Housing')) ||
            (newTx.category.includes('Shopping') && b.title.includes('Shopping')) ||
            (newTx.category.includes('Transport') && b.title.includes('Transport')) ||
            (newTx.category.includes('Utilities') && b.title.includes('Utilities'))
          ) {
            return {
              ...b,
              spent: b.spent + expenseVal,
              recentMerchant: newTx.merchant,
              recentAmount: newTx.amount,
              recentDate: 'Today'
            };
          }
          return b;
        })
      );
    }

    showToast(`Added transaction: ${newTx.merchant} (${newTx.amount > 0 ? '+' : ''}$${newTx.amount.toFixed(2)})`);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Transaction removed from ledger');
  };

  // Budget Actions
  const handleAddBudget = (newBudget: BudgetPool) => {
    setBudgets([newBudget, ...budgets]);
    showToast(`Created new budget pool: ${newBudget.title} ($${newBudget.allocated.toFixed(2)})`);
  };

  // Vault Actions
  const handleAllocateVault = (vaultId: string, amount: number) => {
    setVaults((prev) =>
      prev.map((v) => (v.id === vaultId ? { ...v, saved: v.saved + amount } : v))
    );

    // Also add internal transfer transaction
    const targetVault = vaults.find((v) => v.id === vaultId);
    if (targetVault) {
      handleAddTransaction({
        merchant: `${targetVault.title} Allocation`,
        subtext: 'Instant transfer to savings vault',
        category: 'Internal Transfer',
        categorySlug: 'transfer',
        account: 'High Yield Vault (•••• 1298)',
        date: 'October 21, 2026',
        time: 'Just now',
        method: 'Internal Transfer',
        amount: -amount,
        status: 'Completed',
        icon: targetVault.icon
      });
    }

    showToast(`Successfully allocated $${amount.toFixed(2)} to ${targetVault?.title || 'vault'}`);
  };

  // If in Auth Mode, render Auth screens (Sign in / Sign up)
  if (isAuthMode) {
    return (
      <AuthScreen
        initialMode="signin"
        onLoginSuccess={() => {
          setIsAuthMode(false);
          setCurrentTab('dashboard');
          showToast('Welcome back, Ahmed Al-Mansoor! Ledger sync active.');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#151c27] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] font-medium border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#4edea3]">check_circle</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSignOut={() => setIsAuthMode(true)}
        transactionCount={transactions.length}
        notificationCount={3}
        vaultSaved={totalVaultSavings}
        vaultTarget={vaultTargetTotal}
        vaultPercent={vaultPercent}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main View Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAddTransaction={() => setIsAddTxOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenNotifications={() => setCurrentTab('notifications')}
          onOpenAuthPreview={() => setIsAuthMode(true)}
          notificationCount={3}
        />

        {/* Content Body */}
        <main className="relative pt-16 flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Tab Routing */}
          {currentTab === 'dashboard' && (
            <DashboardScreen
              transactions={transactions}
              savingsVaults={vaults}
              totalBalance={totalBalance}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              totalSavings={totalVaultSavings}
              onNavigateToTransactions={() => setCurrentTab('transactions')}
              onOpenQuickAdd={() => setIsAddTxOpen(true)}
              onOpenVaultAllocation={() => setIsVaultAllocOpen(true)}
              onViewTransactionDetail={(tx) => setSelectedTxDetail(tx)}
            />
          )}

          {currentTab === 'transactions' && (
            <TransactionsScreen
              transactions={transactions}
              onOpenAddModal={() => setIsAddTxOpen(true)}
              onDeleteTransaction={handleDeleteTransaction}
              onViewDetails={(tx) => setSelectedTxDetail(tx)}
            />
          )}

          {currentTab === 'budgets' && (
            <BudgetsScreen
              budgets={budgets}
              onOpenCreateBudget={() => setIsCreateBudgetOpen(true)}
              onOpenRolloverSettings={() => {
                showToast('Rollover configured: Unspent margins roll to November automatically');
              }}
            />
          )}

          {(currentTab === 'accounts' || currentTab === 'savings-goals') && (
            <AccountsScreen
              accounts={accounts}
              vaults={vaults}
              onOpenVaultAllocation={() => setIsVaultAllocOpen(true)}
            />
          )}

          {(currentTab === 'analytics' || currentTab === 'reports' || currentTab === 'recurring') && (
            <AnalyticsScreen />
          )}

          {currentTab === 'notifications' && (
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e7eefe]">
                <div>
                  <h1 className="text-[24px] font-bold text-[#151c27]">System &amp; Ledger Notifications</h1>
                  <p className="text-[13px] text-[#83746c]">Audited security and smart pacing alerts</p>
                </div>
                <button
                  onClick={() => showToast('All notifications marked as read')}
                  className="text-[13px] text-[#6b4226] font-semibold hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-xs flex items-start gap-3">
                  <span className="material-symbols-outlined text-[22px] text-amber-600">warning</span>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#151c27]">Shopping &amp; Personal Budget Alert</h3>
                    <p className="text-[13px] text-[#51443d]">
                      You've utilized 93% ($280 / $300) of your allocation. Only $20.00 remains for 10 days ($2.00/day).
                    </p>
                    <span className="text-[11px] text-[#83746c] mt-1 block">1 hour ago</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#00573a]/30 shadow-xs flex items-start gap-3">
                  <span className="material-symbols-outlined text-[22px] text-[#00573a]">savings</span>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#151c27]">Emergency Fund Milestone</h3>
                    <p className="text-[13px] text-[#51443d]">
                      Your reserve reached $3,200 (64% of target). You are projected to finish the milestone 18 days ahead of schedule!
                    </p>
                    <span className="text-[11px] text-[#83746c] mt-1 block">Yesterday at 4:30 PM</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#e7eefe] shadow-xs flex items-start gap-3">
                  <span className="material-symbols-outlined text-[22px] text-[#6b4226]">account_balance</span>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#151c27]">Payroll Auto-Reconciled</h3>
                    <p className="text-[13px] text-[#51443d]">
                      Bi-weekly deposit of +$5,850.00 settled from Apex Horizon Technologies into Main Bank •••4821.
                    </p>
                    <span className="text-[11px] text-[#83746c] mt-1 block">Oct 21, 2026, 09:15 AM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className="text-[24px] font-bold text-[#151c27]">System Settings &amp; Preferences</h1>
                <p className="text-[13px] text-[#83746c]">Customize currencies, threshold alerts, and ledger behavior</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#e7eefe] space-y-4">
                <h2 className="text-[16px] font-bold text-[#151c27]">Currency &amp; Localization</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#83746c] uppercase mb-1">Base Currency</label>
                    <select className="w-full h-10 px-3 bg-[#f0f3ff] rounded-lg text-[13px] border border-[#e7eefe]">
                      <option>USD ($) - United States Dollar</option>
                      <option>EUR (€) - Euro</option>
                      <option>GBP (£) - British Pound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#83746c] uppercase mb-1">Fiscal Cycle</label>
                    <select className="w-full h-10 px-3 bg-[#f0f3ff] rounded-lg text-[13px] border border-[#e7eefe]">
                      <option>Calendar Month (1st to 30th/31st)</option>
                      <option>Bi-Weekly Payday Anchor</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e7eefe]">
                  <h2 className="text-[16px] font-bold text-[#151c27] mb-3">Security &amp; Encryption</h2>
                  <div className="flex items-center justify-between p-3 bg-[#f0f3ff] rounded-xl">
                    <div>
                      <p className="text-[13px] font-semibold text-[#151c27]">256-Bit Hardware Keystore</p>
                      <p className="text-[12px] text-[#83746c]">Local biometric authentication enabled</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#00573a]/10 text-[#00573a]">
                      Active
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Settings saved successfully')}
                    className="px-5 py-2.5 rounded-lg bg-[#6b4226] text-white text-[13px] font-semibold shadow-xs hover:bg-[#502c12]"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      <CreateBudgetModal
        isOpen={isCreateBudgetOpen}
        onClose={() => setIsCreateBudgetOpen(false)}
        onAddBudget={handleAddBudget}
      />

      <VaultAllocationModal
        isOpen={isVaultAllocOpen}
        onClose={() => setIsVaultAllocOpen(false)}
        vaults={vaults}
        onAllocate={handleAllocateVault}
      />

      <TransactionDetailModal
        transaction={selectedTxDetail}
        onClose={() => setSelectedTxDetail(null)}
      />
    </div>
  );
}
