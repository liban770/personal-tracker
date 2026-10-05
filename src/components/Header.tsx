import React, { useState } from 'react';
import { Avatar } from './Avatar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddTransaction: () => void;
  onToggleMobileMenu: () => void;
  onOpenNotifications?: () => void;
  onOpenAuthPreview?: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAddTransaction,
  onToggleMobileMenu,
  onOpenNotifications,
  onOpenAuthPreview,
  notificationCount = 3
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white/80 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#e7eefe]/60">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left side: Hamburger (Mobile) + Search + Date */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-lg">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-[#51443d] hover:bg-[#e7eefe]"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Search bar with ⌘K badge */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#83746c] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search transactions, accounts..."
              className="w-full h-10 pl-10 pr-16 bg-[#f0f3ff] text-[13px] text-[#151c27] rounded-lg placeholder:text-[#83746c] focus:outline-none focus:ring-1 focus:ring-[#6b4226] focus:bg-white transition-all"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#83746c] bg-[#dce2f3] px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </div>

          {/* Date pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f3ff] text-[12px] font-medium text-[#51443d] whitespace-nowrap border border-[#e7eefe]">
            <span className="material-symbols-outlined text-[16px] text-[#6b4226]">calendar_today</span>
            <span>Wednesday, Oct 21, 2026</span>
          </div>
        </div>

        {/* Right side: Notifications + Add Transaction CTA + User Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-[#51443d] hover:text-[#151c27] hover:bg-[#e7eefe] rounded-lg transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6b4226] ring-2 ring-white" />
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenAddTransaction}
            className="h-10 px-3.5 sm:px-4 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-[0_2px_8px_rgba(107,66,38,0.2)] transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative pl-1">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center focus:outline-none rounded-full"
              aria-label="User profile options"
            >
              <Avatar size="sm" name="Ahmed Al-Mansoor" showStatus />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl border border-[#e7eefe] py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2 border-b border-[#e7eefe]">
                  <p className="text-[13px] font-semibold text-[#151c27]">Ahmed Al-Mansoor</p>
                  <p className="text-[11px] text-[#83746c] truncate">ahmed@wealthpulse.app</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      if (onOpenAuthPreview) onOpenAuthPreview();
                    }}
                    className="w-full px-4 py-2 text-left text-[13px] text-[#51443d] hover:bg-[#f0f3ff] hover:text-[#151c27] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#6b4226]">vpn_key</span>
                    <span>View Auth &amp; Login Screens</span>
                  </button>
                  <button
                    onClick={() => setProfileMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-[13px] text-[#51443d] hover:bg-[#f0f3ff] hover:text-[#151c27] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span>Account Preferences</span>
                  </button>
                </div>
                <div className="border-t border-[#e7eefe] pt-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      if (onOpenAuthPreview) onOpenAuthPreview();
                    }}
                    className="w-full px-4 py-2 text-left text-[13px] text-[#ba1a1a] hover:bg-[#ffdad6]/30 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Switch User / Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
