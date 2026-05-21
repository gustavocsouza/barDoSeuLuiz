export function BeerBottle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 580"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none ${className}`}
      aria-label="Iron Crow craft beer bottle"
      role="img"
    >
      <defs>
        {/* ── Dark amber glass gradient – horizontal ─────────────── */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1A0900" />
          <stop offset="12%"  stopColor="#3D1800" />
          <stop offset="28%"  stopColor="#6B2C00" />
          <stop offset="46%"  stopColor="#8A3800" />
          <stop offset="58%"  stopColor="#9A4200" />
          <stop offset="70%"  stopColor="#7A3200" />
          <stop offset="85%"  stopColor="#4A1A00" />
          <stop offset="100%" stopColor="#180800" />
        </linearGradient>

        {/* ── Neck glass ─────────────────────────────────────────── */}
        <linearGradient id="neckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#140700" />
          <stop offset="30%"  stopColor="#4A1E00" />
          <stop offset="50%"  stopColor="#6E2C00" />
          <stop offset="70%"  stopColor="#4A1E00" />
          <stop offset="100%" stopColor="#140700" />
        </linearGradient>

        {/* ── Crown cap gold ─────────────────────────────────────── */}
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#E0AA20" />
          <stop offset="45%"  stopColor="#C49010" />
          <stop offset="100%" stopColor="#8A6208" />
        </linearGradient>
        <linearGradient id="capSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6B4D02" />
          <stop offset="35%"  stopColor="#C49418" />
          <stop offset="65%"  stopColor="#D4A820" />
          <stop offset="100%" stopColor="#6B4D02" />
        </linearGradient>

        {/* ── Label paper ────────────────────────────────────────── */}
        <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#F9F4EA" />
          <stop offset="100%" stopColor="#EDE4CE" />
        </linearGradient>

        {/* ── Glass edge highlight ────────────────────────────────── */}
        <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,180,60,0.45)" />
          <stop offset="30%"  stopColor="rgba(255,180,60,0)" />
          <stop offset="100%" stopColor="rgba(255,180,60,0)" />
        </linearGradient>

        {/* ── Center body highlight ──────────────────────────────── */}
        <linearGradient id="bodyHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,200,90,0)" />
          <stop offset="40%"  stopColor="rgba(255,220,110,0.16)" />
          <stop offset="55%"  stopColor="rgba(255,230,130,0.22)" />
          <stop offset="70%"  stopColor="rgba(255,200,90,0.08)" />
          <stop offset="100%" stopColor="rgba(255,200,90,0)" />
        </linearGradient>

        {/* ── Deep shadow on body ────────────────────────────────── */}
        <filter id="bottleShadow" x="-40%" y="-5%" width="180%" height="120%">
          <feDropShadow dx="12" dy="40" stdDeviation="25" floodColor="#0A0A0A" floodOpacity="0.55" />
        </filter>

        {/* ── Warm inner glow ────────────────────────────────────── */}
        <filter id="innerGlow" x="-5%" y="-2%" width="110%" height="104%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feBlend in="SourceGraphic" in2="blur" mode="screen" />
        </filter>

        {/* ── Label clip ─────────────────────────────────────────── */}
        <clipPath id="labelClip">
          <rect x="68" y="228" width="64" height="128" rx="3" />
        </clipPath>
      </defs>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* GROUND SHADOW                                             */}
      {/* ══════════════════════════════════════════════════════════ */}
      <ellipse cx="100" cy="568" rx="46" ry="7" fill="rgba(0,0,0,0.22)" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* BOTTLE BODY                                               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <g filter="url(#bottleShadow)">
        <path
          d="
            M 93 0
            L 107 0
            C 112 0, 114 4, 114 10
            L 114 22
            C 114 28, 112 32, 112 38
            L 112 108
            C 122 122, 132 145, 132 168
            L 132 444
            C 132 472, 126 498, 100 508
            C 74 498, 68 472, 68 444
            L 68 168
            C 68 145, 78 122, 88 108
            L 88 38
            C 88 32, 86 28, 86 22
            L 86 10
            C 86 4, 88 0, 93 0
            Z
          "
          fill="url(#glassGrad)"
        />
      </g>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* GLASS HIGHLIGHTS & REFLECTIONS                            */}
      {/* ══════════════════════════════════════════════════════════ */}

      {/* Left edge amber glow */}
      <path
        d="
          M 68 444 L 68 168
          C 68 145, 78 122, 88 108
          L 88 22 L 86 10 L 86 0 L 76 0 L 76 12
          L 76 110 C 68 126, 58 150, 58 172
          L 58 448 C 58 478, 64 504, 82 512
          L 68 500 Z
        "
        fill="url(#edgeGlow)"
        opacity="0.7"
      />

      {/* Center body warm highlight */}
      <path
        d="M 88 172 L 88 440 Q 100 448, 112 440 L 112 172 Q 100 164, 88 172 Z"
        fill="url(#bodyHighlight)"
        opacity="0.8"
      />

      {/* Narrow neck highlight line */}
      <rect x="90" y="14" width="5" height="94" rx="2.5" fill="rgba(255,210,90,0.22)" />

      {/* Right body edge dark shadow */}
      <path
        d="M 132 168 C 132 145, 122 122, 112 108 L 112 22 L 126 22 L 128 108
           C 138 124, 148 148, 148 170 L 148 446
           C 148 478, 138 508, 116 516 L 132 500 Z"
        fill="rgba(0,0,0,0.18)"
        opacity="0.5"
      />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* LABEL                                                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <g clipPath="url(#labelClip)">
        {/* Label backing */}
        <rect x="68" y="228" width="64" height="128" rx="3" fill="url(#labelGrad)" />

        {/* Top red stripe */}
        <rect x="68" y="228" width="64" height="7" fill="#C41E3A" />
        {/* Bottom red stripe */}
        <rect x="68" y="349" width="64" height="7" fill="#C41E3A" />

        {/* Left red rule */}
        <rect x="68" y="235" width="3" height="114" fill="#C41E3A" opacity="0.55" />
        {/* Right red rule */}
        <rect x="129" y="235" width="3" height="114" fill="#C41E3A" opacity="0.55" />

        {/* ─ Bird/crow icon (geometric silhouette) ─ */}
        <g transform="translate(100, 262)" opacity="0.88">
          <path d="M 0 -9 C -7 -9, -12 -4, -9 0 C -6 4, -2 4, 0 0 C 2 4, 6 4, 9 0 C 12 -4, 7 -9, 0 -9 Z" fill="#0A0A0A" />
          <path d="M -9 0 L -18 -4 L -14 2 Z" fill="#0A0A0A" />
          <path d="M 9 0 L 18 -4 L 14 2 Z" fill="#0A0A0A" />
          <line x1="0" y1="0" x2="-2" y2="9" stroke="#0A0A0A" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="2" y2="9" stroke="#0A0A0A" strokeWidth="1.4" />
          <line x1="-4" y1="9" x2="4" y2="9" stroke="#0A0A0A" strokeWidth="1" />
        </g>

        {/* IRON */}
        <text
          x="100" y="287"
          textAnchor="middle"
          fontFamily="var(--font-bebas), 'Bebas Neue', sans-serif"
          fontSize="10"
          fill="#0A0A0A"
          letterSpacing="5"
        >IRON</text>

        {/* CROW */}
        <text
          x="100" y="310"
          textAnchor="middle"
          fontFamily="var(--font-bebas), 'Bebas Neue', sans-serif"
          fontSize="20"
          fill="#0A0A0A"
          letterSpacing="3"
        >CROW</text>

        {/* CRAFT BREWERY */}
        <text
          x="100" y="323"
          textAnchor="middle"
          fontFamily="var(--font-grotesk), sans-serif"
          fontSize="5.5"
          fill="#6B6B6B"
          letterSpacing="3"
        >CRAFT BREWERY</text>

        {/* Rule */}
        <line x1="78" y1="329" x2="122" y2="329" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.3" />

        {/* EST */}
        <text
          x="100" y="338"
          textAnchor="middle"
          fontFamily="var(--font-grotesk), sans-serif"
          fontSize="5"
          fill="#6B6B6B"
          letterSpacing="2.5"
        >EST. 2024</text>

        {/* ABV / Volume */}
        <text x="74" y="352" fontFamily="var(--font-grotesk), sans-serif" fontSize="4.5" fill="#6B6B6B" letterSpacing="0.8">6.5% ABV</text>
        <text x="126" y="352" textAnchor="end" fontFamily="var(--font-grotesk), sans-serif" fontSize="4.5" fill="#6B6B6B" letterSpacing="0.8">355 ml</text>
      </g>

      {/* Label edge shadow */}
      <rect x="68" y="228" width="64" height="128" rx="3"
        fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* CROWN CAP                                                 */}
      {/* ══════════════════════════════════════════════════════════ */}

      {/* Cap flat top */}
      <ellipse cx="100" cy="4" rx="10" ry="5" fill="url(#capGrad)" />

      {/* Cap cylindrical body */}
      <path
        d="M 90 4 L 90 16 Q 90 22, 95 24 L 105 24 Q 110 22, 110 16 L 110 4 Z"
        fill="url(#capSide)"
      />

      {/* Cap serration ridge */}
      <rect x="89" y="17" width="22" height="3" rx="1" fill="rgba(0,0,0,0.22)" />

      {/* Cap highlight */}
      <ellipse cx="95" cy="3.5" rx="4.5" ry="2" fill="rgba(255,240,140,0.45)" />

      {/* Bottle base shine */}
      <ellipse cx="100" cy="506" rx="28" ry="4" fill="rgba(0,0,0,0.28)" />
    </svg>
  )
}
