import { Transaction, BudgetPool, SavingsVault, AccountItem, MonthlyTrajectory } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    merchant: 'Apex Horizon Technologies',
    subtext: 'Bi-weekly Payroll • Direct Salary',
    category: 'Income & Salary',
    categorySlug: 'income',
    account: 'Main Bank •••4821',
    date: 'Oct 21, 2026',
    time: '09:15 AM',
    method: 'Direct Deposit',
    amount: 5850.00,
    status: 'Completed',
    icon: 'corporate_fare',
    notes: 'Verified bi-weekly payroll deposit for Q4 cycle'
  },
  {
    id: 'tx-2',
    merchant: 'Park Avenue Residences',
    subtext: 'Monthly Lease Payment #10',
    category: 'Housing & Living',
    categorySlug: 'utilities',
    account: 'Main Bank •••4821',
    date: 'Oct 20, 2026',
    time: '08:00 AM',
    method: 'ACH Transfer',
    amount: -2200.00,
    status: 'Completed',
    icon: 'apartment',
    notes: 'Unit 14B residential rent'
  },
  {
    id: 'tx-3',
    merchant: 'Whole Foods Market',
    subtext: 'Organic Produce & Provisions',
    category: 'Food & Dining',
    categorySlug: 'groceries',
    account: 'Visa Platinum •••4821',
    date: 'Oct 19, 2026',
    time: '06:42 PM',
    method: 'Apple Pay',
    amount: -164.28,
    status: 'Completed',
    icon: 'local_grocery_store',
    notes: 'Organic weekly groceries and pantry restock'
  },
  {
    id: 'tx-4',
    merchant: 'Apple Fifth Avenue',
    subtext: 'MacBook Leather Sleeve & MagSafe',
    category: 'Shopping & Electronics',
    categorySlug: 'shopping',
    account: 'Visa Platinum •••4821',
    date: 'Oct 18, 2026',
    time: '02:14 PM',
    method: 'Visa Debit',
    amount: -249.00,
    status: 'Pending',
    icon: 'devices',
    notes: 'Hardware accessories for remote studio'
  },
  {
    id: 'tx-5',
    merchant: 'Vault Reserve Allocation',
    subtext: 'Internal Monthly Stash Plan',
    category: 'Internal Transfer',
    categorySlug: 'transfer',
    account: 'Savings •••1298',
    date: 'Oct 17, 2026',
    time: '11:00 AM',
    method: 'Internal Transfer',
    amount: -750.00,
    status: 'Completed',
    icon: 'sync_alt',
    notes: 'Automated transfer to high yield emergency vault'
  },
  {
    id: 'tx-6',
    merchant: 'Apex Grid & Light Co.',
    subtext: 'Auto-Pay Invoice #UT-8491',
    category: 'Utilities & Bills',
    categorySlug: 'utilities',
    account: 'Main Bank •••4821',
    date: 'Oct 15, 2026',
    time: '04:30 AM',
    method: 'Direct Debit',
    amount: -112.50,
    status: 'Completed',
    icon: 'bolt',
    notes: 'Electricity and fiber municipal billing'
  },
  {
    id: 'tx-7',
    merchant: 'Vanguard Index S&P 500',
    subtext: 'Quarterly Dividend Payout',
    category: 'Investment Return',
    categorySlug: 'investment',
    account: 'Savings •••1298',
    date: 'Oct 12, 2026',
    time: '07:50 PM',
    method: 'Brokerage Credit',
    amount: 345.90,
    status: 'Completed',
    icon: 'candlestick_chart',
    notes: 'Quarterly reinvested portfolio distribution'
  },
  {
    id: 'tx-8',
    merchant: 'Blue Bottle Roasters',
    subtext: 'Pour-over & Roasted Beans',
    category: 'Food & Dining',
    categorySlug: 'dining',
    account: 'Cash Wallet',
    date: 'Oct 10, 2026',
    time: '10:20 AM',
    method: 'Cash',
    amount: -18.40,
    status: 'Completed',
    icon: 'coffee',
    notes: 'Single origin espresso coffee beans'
  },
  {
    id: 'tx-9',
    merchant: 'Freelance Design Payment',
    subtext: 'Client Milestone UI Kit',
    category: 'Consulting',
    categorySlug: 'income',
    account: 'Savings •••1298',
    date: 'Oct 07, 2026',
    time: '03:15 PM',
    method: 'Direct Deposit',
    amount: 450.00,
    status: 'Completed',
    icon: 'design_services',
    notes: 'Design tokens deliverable milestone 2'
  },
  {
    id: 'tx-10',
    merchant: 'Gigabit Fiber Provider',
    subtext: 'Metro Optical Network',
    category: 'Utilities & Bills',
    categorySlug: 'utilities',
    account: 'Main Bank •••4821',
    date: 'Oct 05, 2026',
    time: '01:00 PM',
    method: 'Direct Debit',
    amount: -80.00,
    status: 'Completed',
    icon: 'wifi',
    notes: '1Gbps dedicated symmetric fiber internet'
  }
];

export const INITIAL_BUDGETS: BudgetPool[] = [
  {
    id: 'b-1',
    title: 'Food & Groceries',
    subtitle: 'Essential Pantry & Dining',
    type: 'needs',
    allocated: 400.00,
    spent: 280.00,
    icon: 'restaurant',
    status: 'on_track',
    statusLabel: 'On Track',
    recentMerchant: 'Whole Foods Market',
    recentAmount: -42.00,
    recentDate: 'yesterday',
    recentIcon: 'shopping_bag'
  },
  {
    id: 'b-2',
    title: 'Transport & Commute',
    subtitle: 'Transit, Rideshare, Fuel',
    type: 'needs',
    allocated: 200.00,
    spent: 130.00,
    icon: 'directions_subway',
    status: 'on_track',
    statusLabel: 'On Track',
    recentMerchant: 'Metro Monthly Pass',
    recentAmount: -85.00,
    recentDate: 'Oct 1',
    recentIcon: 'local_taxi'
  },
  {
    id: 'b-3',
    title: 'Entertainment & Leisure',
    subtitle: 'Streaming, Cinema, Outings',
    type: 'wants',
    allocated: 150.00,
    spent: 90.00,
    icon: 'theaters',
    status: 'on_track',
    statusLabel: 'On Track',
    recentMerchant: 'Criterion Channel & IMAX',
    recentAmount: -24.50,
    recentDate: 'Oct 18',
    recentIcon: 'subscriptions'
  },
  {
    id: 'b-4',
    title: 'Utilities & Bills',
    subtitle: 'Electric, Fiber Internet, Water',
    type: 'needs',
    allocated: 300.00,
    spent: 210.00,
    icon: 'bolt',
    status: 'on_track',
    statusLabel: 'On Track',
    recentMerchant: 'Gigabit Fiber Provider',
    recentAmount: -80.00,
    recentDate: 'Oct 14',
    recentIcon: 'wifi'
  },
  {
    id: 'b-5',
    title: 'Housing & Maintenance',
    subtitle: 'Repairs, Supplies, Cleaning',
    type: 'needs',
    allocated: 400.00,
    spent: 350.00,
    icon: 'home_repair_service',
    status: 'near_limit',
    statusLabel: 'Near Limit (88%)',
    recentMerchant: 'HVAC Filter Replacement',
    recentAmount: -65.00,
    recentDate: 'Oct 19',
    recentIcon: 'plumbing',
    alertTooltip: 'Near threshold: 87.5% consumed with 10 days remaining.'
  },
  {
    id: 'b-6',
    title: 'Shopping & Personal',
    subtitle: 'Apparel, Books, Gadgets',
    type: 'wants',
    allocated: 300.00,
    spent: 280.00,
    icon: 'checkroom',
    status: 'warning',
    statusLabel: 'Warning: 93% spent',
    recentMerchant: 'Tailored Wool Trousers',
    recentAmount: -145.00,
    recentDate: 'Oct 16',
    recentIcon: 'shopping_cart',
    alertTooltip: 'Only $20.00 remains for 10 days ($2.00/day). Consider freezing non-essential purchases.'
  }
];

export const INITIAL_SAVINGS_VAULTS: SavingsVault[] = [
  {
    id: 'v-1',
    title: 'Emergency Fund',
    target: 5000.00,
    saved: 3200.00,
    icon: 'shield',
    category: 'Reserve Fund'
  },
  {
    id: 'v-2',
    title: 'New Laptop',
    target: 1500.00,
    saved: 950.00,
    icon: 'laptop_mac',
    category: 'Hardware Goal'
  },
  {
    id: 'v-3',
    title: 'Japan Autumn Expedition',
    target: 4000.00,
    saved: 2450.00,
    icon: 'flight_takeoff',
    category: 'Travel Vault'
  }
];

export const CONNECTED_ACCOUNTS: AccountItem[] = [
  {
    id: 'acc-1',
    name: 'Main Bank Account',
    accountNumber: '•••• 4821',
    institution: 'Sovereign Depository',
    type: 'checking',
    balance: 4850.00,
    changeRate: '+4.2% this month',
    status: 'synced'
  },
  {
    id: 'acc-2',
    name: 'High Yield Vault',
    accountNumber: '•••• 1298',
    institution: 'Apex Apex Capital',
    type: 'savings',
    balance: 2600.00,
    changeRate: '4.85% APY compounding',
    status: 'synced'
  },
  {
    id: 'acc-3',
    name: 'Vanguard Index Portfolio',
    accountNumber: '•••• 7730',
    institution: 'Vanguard Brokerage',
    type: 'investment',
    balance: 850.00,
    changeRate: '+7.4% YTD',
    status: 'synced'
  },
  {
    id: 'acc-4',
    name: 'Everyday Cash Wallet',
    accountNumber: 'Cash reserve',
    institution: 'Physical Vault',
    type: 'checking',
    balance: 150.00,
    changeRate: 'Direct petty cash',
    status: 'synced'
  }
];

export const MONTHLY_TRAJECTORIES: MonthlyTrajectory[] = [
  { month: 'May', income: 3800, expenses: 2600, savings: 1200 },
  { month: 'Jun', income: 4100, expenses: 2750, savings: 1350 },
  { month: 'Jul', income: 4200, expenses: 2500, savings: 1700 },
  { month: 'Aug', income: 4700, expenses: 2200, savings: 2500 },
  { month: 'Sep', income: 4300, expenses: 2850, savings: 1450 },
  { month: 'Oct', income: 4950, expenses: 3100, savings: 1850, isPeak: true }
];

export const SPENDING_BREAKDOWN = [
  { name: 'Housing & Rent', amount: 950, percent: 34, color: '#6B4226' },
  { name: 'Food & Groceries', amount: 520, percent: 19, color: '#8C5B36' },
  { name: 'Shopping & Other', amount: 610, percent: 22, color: '#DCE2F3' },
  { name: 'Transport & Fuel', amount: 280, percent: 10, color: '#A5724C' },
  { name: 'Utilities & Bills', amount: 230, percent: 8, color: '#151C27' },
  { name: 'Entertainment', amount: 190, percent: 7, color: '#00573A' }
];
