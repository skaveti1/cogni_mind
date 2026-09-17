export default function CogniWordMark() {
  return (
    <svg
      viewBox="0 0 142 40"
      width="128"
      height="36"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cognimind"
    >
      <defs>
        <linearGradient id="wm-main" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="wm-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="2"
        y="28"
        fontSize="21"
        fontWeight="900"
        fill="white"
        letterSpacing="1.2"
        style={{ fontFamily: "var(--font-orbitron, 'Orbitron', monospace)" }}
      >
        COGNI
      </text>
      <text
        x="72"
        y="28"
        fontSize="21"
        fontWeight="900"
        fill="url(#wm-main)"
        letterSpacing="1.2"
        filter="url(#wm-glow)"
        style={{ fontFamily: "var(--font-orbitron, 'Orbitron', monospace)" }}
      >
        MIND
      </text>
      <rect x="2" y="34" width="136" height="1" rx="0.5" fill="url(#wm-main)" opacity="0.65" />
    </svg>
  );
}
