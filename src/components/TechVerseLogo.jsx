import React from 'react';
import './TechVerseLogo.css';

export const TechVerseSymbol = ({ size = 32, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={`techverse-symbol-svg ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="tv-sym-primary" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB"/>
        <stop offset="100%" stopColor="#38BDF8"/>
      </linearGradient>
      <linearGradient id="tv-sym-cyan" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
      <filter id="tv-sym-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Outer Hexagonal Shield Ring */}
    <polygon 
      points="32,6 54,18 54,46 32,58 10,46 10,18" 
      stroke="url(#tv-sym-primary)" 
      strokeWidth="1.8" 
      strokeLinejoin="round"
      opacity="0.55"
    />

    {/* Interconnected Orbital Pathway */}
    <circle cx="32" cy="32" r="19" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>

    {/* Central Geometric 'T' & Digital Lattice */}
    <path d="M18 20 L46 20" stroke="url(#tv-sym-primary)" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M32 20 L32 46" stroke="url(#tv-sym-primary)" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M18 20 L25 33 L32 46 L39 33 L46 20" stroke="url(#tv-sym-cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
    <path d="M25 33 L39 33" stroke="#2563EB" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6"/>

    {/* Connected Nodes */}
    <circle cx="18" cy="20" r="2.8" fill="#2563EB" filter="url(#tv-sym-glow)"/>
    <circle cx="46" cy="20" r="2.8" fill="#38BDF8" filter="url(#tv-sym-glow)"/>
    <circle cx="32" cy="20" r="2.2" fill="#FFFFFF"/>
    <circle cx="25" cy="33" r="2.2" fill="#38BDF8"/>
    <circle cx="39" cy="33" r="2.2" fill="#2563EB"/>
    <circle cx="32" cy="46" r="3" fill="#10B981" filter="url(#tv-sym-glow)"/>
  </svg>
);

export const TechVerseLogo = ({ 
  variant = 'full', // 'full' | 'symbol' | 'sidebar' | 'loader'
  collapsed = false,
  size = 36,
  showTagline = false,
  className = ''
}) => {
  if (variant === 'symbol' || collapsed) {
    return (
      <div className={`techverse-logo-compact flex items-center justify-center ${className}`} title="TECHVERSE">
        <TechVerseSymbol size={size} />
      </div>
    );
  }

  if (variant === 'loader') {
    return (
      <div className={`techverse-loader-container flex flex-col items-center justify-center gap-4 ${className}`}>
        <div className="techverse-loader-pulse">
          <TechVerseSymbol size={64} className="animate-pulse" />
        </div>
        <div className="text-center">
          <h2 className="techverse-wordmark text-xl font-bold tracking-wider">TECHVERSE</h2>
          <p className="text-xs text-muted font-mono tracking-widest uppercase mt-1">Initializing Environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`techverse-brand-wrapper flex items-center gap-3 ${className}`}>
      <TechVerseSymbol size={size} />
      <div className="techverse-brand-text flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="techverse-wordmark font-bold text-lg tracking-wider text-white">
            TECH<span className="text-primary-accent" style={{ color: '#38BDF8' }}>VERSE</span>
          </span>
          <span className="techverse-version-tag text-[9px] font-mono px-1.5 py-0.2 rounded bg-primary/20 text-primary border border-primary/30">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-muted tracking-wider uppercase font-mono">
            Learn. Build. Innovate.
          </span>
        )}
      </div>
    </div>
  );
};

export default TechVerseLogo;
