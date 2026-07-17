// 場景裝飾用的小插畫（純 SVG，向量繪製，呼應手繪風景的可愛氛圍）

export function BirdFlock() {
  const birds = [
    { top: '10%', left: '8%', size: 14, opacity: 0.85 },
    { top: '6%', left: '14%', size: 10, opacity: 0.7 },
    { top: '16%', left: '42%', size: 12, opacity: 0.75 },
    { top: '9%', left: '48%', size: 9, opacity: 0.6 },
  ];
  return (
    <>
      {birds.map((b, i) => (
        <svg
          key={i}
          viewBox="0 0 24 12"
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size / 2,
            opacity: b.opacity,
          }}
        >
          <path
            d="M0 6 Q6 0 12 6 Q18 0 24 6"
            stroke="#4a4a4a"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  );
}

export function FrogDuo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
      {/* lily pad / rock */}
      <ellipse cx="70" cy="92" rx="62" ry="14" fill="#6FA86B" opacity="0.55" />
      <ellipse cx="70" cy="86" rx="46" ry="10" fill="#8CB86B" />

      {/* frog 1 */}
      <g transform="translate(30,40)">
        <ellipse cx="20" cy="34" rx="22" ry="16" fill="#79C267" />
        <circle cx="8" cy="12" r="9" fill="#79C267" />
        <circle cx="32" cy="12" r="9" fill="#79C267" />
        <circle cx="8" cy="10" r="4.2" fill="#2E2E2E" />
        <circle cx="32" cy="10" r="4.2" fill="#2E2E2E" />
        <circle cx="6.5" cy="8.5" r="1.2" fill="#fff" />
        <circle cx="30.5" cy="8.5" r="1.2" fill="#fff" />
        <path d="M11 34 Q20 40 29 34" stroke="#2E2E2E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>

      {/* frog 2 (smaller, slightly behind) */}
      <g transform="translate(72,50)">
        <ellipse cx="16" cy="26" rx="17" ry="12" fill="#8FD17C" />
        <circle cx="6" cy="9" r="7" fill="#8FD17C" />
        <circle cx="26" cy="9" r="7" fill="#8FD17C" />
        <circle cx="6" cy="7.5" r="3.2" fill="#2E2E2E" />
        <circle cx="26" cy="7.5" r="3.2" fill="#2E2E2E" />
        <path d="M9 26 Q16 30 23 26" stroke="#2E2E2E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function BearMascot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 200" className={className} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="70" cy="188" rx="42" ry="8" fill="#3E2723" opacity="0.12" />

      {/* body */}
      <ellipse cx="70" cy="140" rx="40" ry="46" fill="#B98A5E" />
      <ellipse cx="70" cy="150" rx="24" ry="28" fill="#EFDCC4" />

      {/* arms */}
      <ellipse cx="32" cy="128" rx="13" ry="18" fill="#B98A5E" transform="rotate(-18 32 128)" />
      <ellipse cx="108" cy="120" rx="13" ry="18" fill="#B98A5E" transform="rotate(35 108 120)" />

      {/* legs */}
      <ellipse cx="50" cy="182" rx="14" ry="11" fill="#B98A5E" />
      <ellipse cx="90" cy="182" rx="14" ry="11" fill="#B98A5E" />

      {/* head */}
      <circle cx="70" cy="70" r="38" fill="#B98A5E" />
      <circle cx="42" cy="42" r="13" fill="#B98A5E" />
      <circle cx="98" cy="42" r="13" fill="#B98A5E" />
      <circle cx="42" cy="42" r="6.5" fill="#8C6640" />
      <circle cx="98" cy="42" r="6.5" fill="#8C6640" />

      {/* muzzle */}
      <ellipse cx="70" cy="80" rx="18" ry="14" fill="#EFDCC4" />
      <ellipse cx="70" cy="74" rx="4.5" ry="3.4" fill="#3E2723" />
      <path d="M70 77 Q70 82 66 83" stroke="#3E2723" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M62 87 Q70 92 78 87" stroke="#3E2723" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* eyes */}
      <circle cx="56" cy="64" r="3.6" fill="#3E2723" />
      <circle cx="84" cy="64" r="3.6" fill="#3E2723" />

      {/* blush */}
      <circle cx="48" cy="76" r="5" fill="#F0A98C" opacity="0.6" />
      <circle cx="92" cy="76" r="5" fill="#F0A98C" opacity="0.6" />

      {/* four-leaf clover held up */}
      <g transform="translate(104,96)">
        <circle cx="0" cy="-8" r="6" fill="#6FBF6C" />
        <circle cx="8" cy="0" r="6" fill="#6FBF6C" />
        <circle cx="0" cy="8" r="6" fill="#6FBF6C" />
        <circle cx="-8" cy="0" r="6" fill="#6FBF6C" />
        <circle cx="0" cy="0" r="3.4" fill="#4E9B4C" />
        <line x1="0" y1="8" x2="0" y2="24" stroke="#5C8A3F" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LavenderPot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden="true">
      <path d="M22 78 L68 78 L60 106 L30 106 Z" fill="#C97B5A" />
      <rect x="22" y="72" width="46" height="10" rx="4" fill="#DD9068" />
      {[10, 26, 42, 58, 74].map((x, i) => (
        <g key={i} transform={`translate(${x},0)`}>
          <line x1="0" y1="30" x2="0" y2="76" stroke="#6B8E4E" strokeWidth="2.5" />
          {[8, 16, 24, 32, 40, 48].map((y, j) => (
            <circle key={j} cx={j % 2 === 0 ? -3 : 3} cy={30 + y} r="3.2" fill="#9C7FC2" opacity={0.9} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function LotusCorner({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden="true">
      <ellipse cx="80" cy="70" rx="80" ry="20" fill="#7FB9DE" opacity="0.35" />
      <ellipse cx="40" cy="66" rx="30" ry="10" fill="#4E9B5D" />
      <ellipse cx="120" cy="72" rx="26" ry="9" fill="#4E9B5D" />
      <g transform="translate(96,40)">
        <path d="M0 30 C-14 20 -14 4 0 0 C14 4 14 20 0 30 Z" fill="#F2A0C4" />
        <path d="M0 30 C-8 22 -8 8 0 4 C8 8 8 22 0 30 Z" fill="#F6C0D8" />
      </g>
    </svg>
  );
}
