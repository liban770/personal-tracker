export type NavigationTab = 
  | 'dashboard' 
  | 'transactions' 
  | 'accounts' 
  | 'budgets' 
  | 'savings-goals' 
  | 'analytics' 
  | 'recurring' 
  | 'reports' 
  | 'notifications' 
  | 'settings';

export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  merchant: string;
  subtext: string;
  category: string;
  categorySlug: 'income' | 'groceries' | 'utilities' | 'dining' | 'shopping' | 'transfer' | 'investment';
  account: string;
  date: string;
  time?: string;
  method: string;
  amount: number; // positive for income, negative for expense
  status: 'Completed' | 'Pending';
  icon: string;
  notes?: string;
}

export interface BudgetPool {
  id: string;
  title: string;
  subtitle: string;
  type: 'needs' | 'wants';
  allocated: number;
  spent: number;
  icon: string;
  status: 'on_track' | 'near_limit' | 'warning';
  statusLabel: string;
  recentMerchant: string;
  recentAmount: number;
  recentDate: string;
  recentIcon: string;
  alertTooltip?: string;
}

export interface SavingsVault {
  id: string;
  title: string;
  target: number;
  saved: number;
  icon: string;
  category: string;
}

export interface AccountItem {
  id: string;
  name: string;
  accountNumber: string;
  institution: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  changeRate: string;
  status: 'synced' | 'pending';
}

export interface MonthlyTrajectory {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  isPeak?: boolean;
}
