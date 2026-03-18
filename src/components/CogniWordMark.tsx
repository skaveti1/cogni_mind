// Creative COGNI MIND wordmark
// COGNI — small, tracked wide, white · gradient rule · MIND — large, bold, gradient

export default function CogniWordMark() {
  return (
    <svg
      viewBox="0 0 116 52"
      width="116"
      height="52"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cogni Mind"
    >
      <defs>
        {/* emerald → cyan gradient shared across elements */}
        <linearGradient id="wm-main" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* fade-out line: solid brand → transparent */}
        <linearGradient id="wm-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="70%"  stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"   />
        </linearGradient>

        {/* glow filter on MIND */}
        <filter id="wm-glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── COGNI — small, tracked wide, white ── */}
      <text
        x="3"
        y="19"
        fontSize="13"
        fontWeight="900"
        fill="white"
        letterSpacing="4.5"
        style={{ fontFamily: "var(--font-orbitron, 'Orbitron', monospace)", opacity: 0.92 }}
      >
        COGNI
      </text>

      {/* ── Gradient rule between the two words ── */}
      <rect x="3" y="23.5" width="110" height="0.9" fill="url(#wm-line)" rx="0.4" />

      {/* ── Small diamond accent on the rule ── */}
      <polygon points="3,23.5 6,21.5 9,23.5 6,25.5" fill="#34d399" opacity="0.8" />

      {/* ── MIND — large, bold, gradient glow ── */}
      <text
        x="12"
        y="48"
        fontSize="27"
        fontWeight="900"
        fill="url(#wm-main)"
        letterSpacing="1"
        filter="url(#wm-glow)"
        style={{ fontFamily: "var(--font-orbitron, 'Orbitron', monospace)" }}
      >
        MIND
      </text>
    </svg>
  );
}
