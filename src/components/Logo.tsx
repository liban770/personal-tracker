import React from 'react';

interface LogoProps {
  variant?: 'wealthpulse' | 'financetracker';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'wealthpulse', 
  className = '', 
  showText = true,
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon with warm saddle brown rounded container & green dot */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-[#502c12] flex items-center justify-center shadow-xs overflow-hidden shrink-0`}>
        {/* Mint green notification dot in upper right corner */}
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#34d399] ring-1 ring-[#502c12]" />
        
        {/* Monogram FTx vector */}
        <svg viewBox="0 0 40 40" fill="none" className="w-[72%] h-[72%] text-white">
          {/* Main top horizontal bar */}
          <path
            d="M8 12 C8 10 10 8 12 8 L28 8 C30 8 32 10 32 12 C32 14 30 16 28 16 L16 16 L16 32 C16 33.1 15.1 34 14 34 C12.9 34 12 33.1 12 32 L12 12 Z"
            fill="currentColor"
          />
          {/* Central stem */}
          <rect x="18" y="16" width="3.5" height="15" rx="1.75" fill="currentColor" />
          {/* Right small cross x */}
          <path
            d="M24 23 L31 30 M31 23 L24 30"
            stroke="#ffdbc7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center">
          {variant === 'wealthpulse' ? (
            <span className={`font-semibold tracking-tight text-[#151c27] ${textSizes[size]}`}>
              Wealth<span className="text-[#6b4226]">Pulse</span>
            </span>
          ) : (
            <span className={`font-bold tracking-tight text-[#151c27] ${textSizes[size]}`}>
              Finance<span className="text-[#6b4226] font-medium">Tracker</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
