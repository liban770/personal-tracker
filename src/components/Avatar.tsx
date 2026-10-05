import React from 'react';

interface AvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  name?: string;
  role?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  className = '',
  size = 'md',
  showStatus = true,
  name = 'Ahmed Al-Mansoor',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const statusDotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5'
  };

  return (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-xs ring-1 ring-black/5 bg-[#e5e2e1] flex items-center justify-center font-semibold text-[#502c12] relative`}
        title={name}
      >
        {/* Stylized vector portrait inspired by Ahmed Al-Mansoor */}
        <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d5c3b9" />
              <stop offset="100%" stopColor="#bfa696" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b68364" />
              <stop offset="100%" stopColor="#986546" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d444f" />
              <stop offset="100%" stopColor="#222831" />
            </linearGradient>
          </defs>
          {/* Warm studio backdrop */}
          <rect width="100" height="100" fill="url(#bgGrad)" />
          {/* Charcoal knit sweater */}
          <path d="M15 100 C 15 75, 30 70, 50 70 C 70 70, 85 75, 85 100 Z" fill="url(#shirtGrad)" />
          {/* Neckline */}
          <path d="M40 70 C 40 76, 60 76, 60 70 Z" fill="#222831" />
          <path d="M43 62 L43 72 C 43 75, 57 75, 57 72 L57 62 Z" fill="#986546" />
          {/* Head & Face */}
          <ellipse cx="50" cy="46" rx="20" ry="24" fill="url(#skinGrad)" />
          {/* Neat short hairline & beard */}
          <path d="M30 40 C 30 25, 40 22, 50 22 C 60 22, 70 25, 70 40 C 70 33, 62 26, 50 26 C 38 26, 30 33, 30 40 Z" fill="#1b1c1e" />
          {/* Groomed beard contour */}
          <path d="M33 46 C 33 66, 42 70, 50 70 C 58 70, 67 66, 67 46 C 63 56, 58 64, 50 64 C 42 64, 37 56, 33 46 Z" fill="#1b1c1e" opacity="0.9" />
          {/* Warm bright smile */}
          <path d="M42 56 Q 50 62 58 56 Q 50 59 42 56 Z" fill="#ffffff" />
          {/* Eyes & eyebrows */}
          <ellipse cx="43" cy="43" rx="2.5" ry="1.5" fill="#1b1c1e" />
          <ellipse cx="57" cy="43" rx="2.5" ry="1.5" fill="#1b1c1e" />
          <path d="M39 39 Q 44 37 47 40" stroke="#1b1c1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M53 40 Q 56 37 61 39" stroke="#1b1c1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${statusDotSizes[size]} rounded-full bg-[#00573a] ring-2 ring-white`}
          title="Online & Synchronized"
        />
      )}
    </div>
  );
};
