import React, { useState } from 'react';
import { BudgetPool } from '../types';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBudget: (budget: BudgetPool) => void;
}

export const CreateBudgetModal: React.FC<CreateBudgetModalProps> = ({
  isOpen,
  onClose,
  onAddBudget,
}) => {
  const [categoryName, setCategoryName] = useState('Health & Medical');
  const [limit, setLimit] = useState('250.00');
  const [alertTrigger, setAlertTrigger] = useState('85');
  const [rollover, setRollover] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allocated = parseFloat(limit) || 250;
    
    let icon = 'favorite';
    if (categoryName.includes('Travel')) icon = 'flight_takeoff';
    if (categoryName.includes('Education')) icon = 'school';
    if (categoryName.includes('Fitness')) icon = 'fitness_center';
    if (categoryName.includes('Gifts')) icon = 'redeem';

    const newBudget: BudgetPool = {
      id: `b-${Date.now()}`,
      title: categoryName,
      subtitle: rollover ? 'Rollover enabled • Active target' : 'Standard monthly target',
      type: categoryName.includes('Medical') ? 'needs' : 'wants',
      allocated: allocated,
      spent: 0,
      icon: icon,
      status: 'on_track',
      statusLabel: 'On Track',
      recentMerchant: 'Newly configured pool',
      recentAmount: 0,
      recentDate: 'Today',
      recentIcon: 'verified'
    };

    onAddBudget(newBudget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2a313d]/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-[0_20px_48px_-12px_rgba(17,17,17,0.12)] space-y-4 border border-[#e7eefe]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e7eefe] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6b4226]/10 text-[#6b4226] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_chart</span>
            </div>
            <h3 className="text-[18px] font-semibold text-[#151c27]">Create New Budget</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#51443d] hover:bg-[#e7eefe] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
              Category Pool
            </label>
            <div className="relative">
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full h-11 px-3 bg-[#f0f3ff] text-[13px] text-[#151c27] rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#6b4226] border border-[#e7eefe] cursor-pointer"
              >
                <option value="Health & Medical">Health &amp; Medical</option>
                <option value="Travel & Expeditions">Travel &amp; Expeditions</option>
                <option value="Education & Learning">Education &amp; Continuous Learning</option>
                <option value="Fitness & Wellness">Fitness &amp; Wellness</option>
                <option value="Gifts & Celebrations">Gifts &amp; Celebrations</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#83746c] text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
                Monthly Limit ($)
              </label>
              <input
                type="number"
                step="10"
                min="10"
                required
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="250.00"
                className="w-full h-11 px-3 bg-[#f0f3ff] text-[13px] text-[#151c27] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6b4226] border border-[#e7eefe] tabular-nums"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
                Alert Trigger
              </label>
              <div className="relative">
                <select
                  value={alertTrigger}
                  onChange={(e) => setAlertTrigger(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f0f3ff] text-[13px] text-[#151c27] rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#6b4226] border border-[#e7eefe] cursor-pointer"
                >
                  <option value="80">At 80% usage</option>
                  <option value="85">At 85% usage</option>
                  <option value="90">At 90% usage</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#83746c] text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#83746c] uppercase tracking-wider mb-1.5">
              Rollover Behavior
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0f3ff] border border-[#e7eefe]">
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[#151c27]">Carry Forward Unspent Balance</span>
                <span className="text-[12px] text-[#83746c]">Roll unused allocation into the subsequent month</span>
              </div>
              <input
                type="checkbox"
                checked={rollover}
                onChange={(e) => setRollover(e.target.checked)}
                className="w-4 h-4 rounded text-[#6b4226] accent-[#6b4226] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e7eefe]">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg bg-[#e7eefe] hover:bg-[#dce2f3] text-[#151c27] text-[13px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-[#6b4226] hover:bg-[#502c12] text-white text-[13px] font-semibold shadow-sm transition-colors"
            >
              Save Allocation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
