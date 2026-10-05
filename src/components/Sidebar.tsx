import React from 'react';
import { NavigationTab } from '../types';
import { Logo } from './Logo';
import { Avatar } from './Avatar';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onSignOut: () => void;
  transactionCount?: number;
  notificationCount?: number;
  vaultSaved?: number;
  vaultTarget?: number;
  vaultPercent?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onSignOut,
  transactionCount = 12,
  notificationCount = 3,
  vaultSaved = 12450,
  vaultTarget = 16000,
  vaultPercent = 78,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: 'grid_view' },
    { id: 'transactions' as NavigationTab, label: 'Transactions', icon: 'receipt_long', badge: transactionCount },
    { id: 'accounts' as NavigationTab, label: 'Accounts', icon: 'account_balance' },
    { id: 'budgets' as NavigationTab, label: 'Budgets', icon: 'pie_chart' },
    { id: 'savings-goals' as NavigationTab, label: 'Savings Goals', icon: 'savings' },
    { id: 'analytics' as NavigationTab, label: 'Analytics', icon: 'monitoring' },
    { id: 'recurring' as NavigationTab, label: 'Recurring', icon: 'event_repeat' },
    { id: 'reports' as NavigationTab, label: 'Reports', icon: 'summarize' },
    { id: 'notifications' as NavigationTab, label: 'Notifications', icon: 'notifications', badge: notificationCount, badgeType: 'alert' },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-[#f0f3ff] z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-r border-[#e7eefe] transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#e7eefe]/60">
            <Logo variant="wealthpulse" size="md" />
            {onCloseMobile && (
              <button 
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-[#51443d] hover:bg-[#e7eefe]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-3 overflow-y-auto space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-medium text-[13px] transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#6b4226] text-white shadow-[0_2px_8px_rgba(107,66,38,0.15)]'
                      : 'text-[#51443d] hover:bg-[#e7eefe] hover:text-[#151c27]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-[#83746c] group-hover:text-[#151c27]'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeType === 'alert'
                          ? 'bg-[#00573a] text-[#6ffbbe]'
                          : 'bg-[#dce2f3] text-[#51443d] group-hover:bg-[#e2e8f8]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Vault Reserve Card & User Profile */}
        <div className="p-4 space-y-3 border-t border-[#e7eefe]/60">
          {/* Vault Reserve Progress Box */}
          <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#e7eefe] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#83746c] uppercase tracking-wider">
                Vault Reserve
              </span>
              <span className="text-[11px] text-[#00573a] font-bold">
                {vaultPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#dce2f3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00573a] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(vaultPercent, 100)}%` }}
              />
            </div>
            <p className="text-[12px] text-[#51443d] font-medium">
              ${vaultSaved.toLocaleString()} / ${vaultTarget.toLocaleString()} saved
            </p>
          </div>

          {/* User Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <Avatar size="md" name="Ahmed Al-Mansoor" />
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-semibold text-[#151c27] leading-tight">
                  Ahmed Al-Mansoor
                </span>
                <span className="text-[12px] text-[#83746c]">
                  Pro Member
                </span>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="p-1.5 text-[#83746c] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors"
              title="Sign out or Switch Account"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
