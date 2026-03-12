export default function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark rounded background */}
      <rect width="40" height="40" rx="9" fill="#0b0b14" />

      {/* Outer hexagon frame */}
      <polygon
        points="20,3 35.5,11.75 35.5,28.25 20,37 4.5,28.25 4.5,11.75"
        stroke="#34d399"
        strokeWidth="1.4"
        strokeOpacity="0.7"
        fill="none"
      />

      {/* Inner hexagon — inset, rotated */}
      <polygon
        points="20,10 28,14.6 28,25.4 20,30 12,25.4 12,14.6"
        stroke="#34d399"
        strokeWidth="0.75"
        strokeOpacity="0.25"
        fill="none"
      />

      {/* Neural network: outer triangle nodes */}
      <circle cx="20" cy="3"    r="2"   fill="#34d399" />
      <circle cx="35.5" cy="28.25" r="2" fill="#34d399" />
      <circle cx="4.5"  cy="28.25" r="2" fill="#34d399" />

      {/* Connecting lines between outer nodes */}
      <line x1="20" y1="3" x2="35.5" y2="28.25"
        stroke="#34d399" strokeWidth="0.9" strokeOpacity="0.3" />
      <line x1="20" y1="3" x2="4.5" y2="28.25"
        stroke="#34d399" strokeWidth="0.9" strokeOpacity="0.3" />
      <line x1="35.5" y1="28.25" x2="4.5" y2="28.25"
        stroke="#34d399" strokeWidth="0.9" strokeOpacity="0.3" />

      {/* Center hub glow */}
      <circle cx="20" cy="18" r="3.5" fill="#34d399" fillOpacity="0.12" />
      <circle cx="20" cy="18" r="1.8" fill="#34d399" fillOpacity="0.9" />

      {/* Spokes from center to outer nodes */}
      <line x1="20" y1="18" x2="20" y2="3"
        stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 2" />
      <line x1="20" y1="18" x2="35.5" y2="28.25"
        stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 2" />
      <line x1="20" y1="18" x2="4.5" y2="28.25"
        stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="2 2" />

      {/* Gradient definition */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="18" rx="14" ry="14" fill="url(#glow)" />
    </svg>
  );
}
