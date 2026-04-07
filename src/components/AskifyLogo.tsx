import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

const AskifyLogo: React.FC<Props> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Askify logo"
  >
    <defs>
      <linearGradient id="askify-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#19c37d"/>
        <stop offset="100%" stopColor="#0a7a58"/>
      </linearGradient>
    </defs>

    {/* Rounded square background */}
    <rect width="100" height="100" rx="22" fill="url(#askify-bg)"/>

    {/* Main 4-pointed sparkle star */}
    <path d="M48,18 L54,41 L77,48 L54,55 L48,78 L42,55 L19,48 L42,41 Z" fill="white"/>

    {/* Small accent sparkle dots */}
    <circle cx="75" cy="21" r="5.5" fill="white" opacity="0.80"/>
    <circle cx="82" cy="31" r="3.2" fill="white" opacity="0.55"/>
    <circle cx="68" cy="15" r="3.2" fill="white" opacity="0.55"/>
  </svg>
);

export default AskifyLogo;
