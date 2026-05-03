export const AiIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="20" r="4" fill="url(#aiGrad)" opacity="0.9"/>
    <circle cx="16" cy="32" r="4" fill="url(#aiGrad)" opacity="0.7"/>
    <circle cx="48" cy="32" r="4" fill="url(#aiGrad)" opacity="0.7"/>
    <circle cx="22" cy="46" r="4" fill="url(#aiGrad)" opacity="0.5"/>
    <circle cx="42" cy="46" r="4" fill="url(#aiGrad)" opacity="0.5"/>
    <line x1="32" y1="24" x2="16" y2="28" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.4"/>
    <line x1="32" y1="24" x2="48" y2="28" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.4"/>
    <line x1="16" y1="36" x2="22" y2="42" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.3"/>
    <line x1="48" y1="36" x2="42" y2="42" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.3"/>
    <line x1="20" y1="32" x2="44" y2="32" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.3"/>
    <line x1="22" y1="46" x2="42" y2="46" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.25"/>
    <circle cx="32" cy="34" r="3" fill="url(#aiGrad)" opacity="0.6"/>
    <line x1="32" y1="24" x2="32" y2="31" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.35"/>
    <line x1="16" y1="32" x2="29" y2="34" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.3"/>
    <line x1="48" y1="32" x2="35" y2="34" stroke="url(#aiGrad)" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

export const AiIconSmall = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.9"/>
    <circle cx="16" cy="32" r="4" fill="currentColor" opacity="0.7"/>
    <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.7"/>
    <circle cx="22" cy="46" r="4" fill="currentColor" opacity="0.5"/>
    <circle cx="42" cy="46" r="4" fill="currentColor" opacity="0.5"/>
    <line x1="32" y1="24" x2="16" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <line x1="32" y1="24" x2="48" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <line x1="16" y1="36" x2="22" y2="42" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    <line x1="48" y1="36" x2="42" y2="42" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    <line x1="20" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
    <circle cx="32" cy="34" r="3" fill="currentColor" opacity="0.6"/>
    <line x1="32" y1="24" x2="32" y2="31" stroke="currentColor" strokeWidth="2" opacity="0.35"/>
  </svg>
);
