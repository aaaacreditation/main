/**
 * Three layered wave bands that sit low in the hero, behind the copy. Each
 * band is drawn twice as wide as the viewBox so TepaMotion can slide it one
 * full period to the left on a loop without a visible seam. Server-safe.
 */
function wave(period: number, amp: number, mid: number, width = 2880) {
  const half = period / 2;
  let d = `M0,${mid}`;
  for (let x = 0; x < width; x += period) {
    d += ` C${x + half * 0.5},${mid - amp} ${x + half * 0.5},${mid - amp} ${x + half},${mid}`;
    d += ` C${x + half * 1.5},${mid + amp} ${x + half * 1.5},${mid + amp} ${x + period},${mid}`;
  }
  return `${d} L${width},400 L0,400 Z`;
}

export default function HeroWaves() {
  return (
    <svg className="tepx-waves" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tepx-wave-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b38a2e" stopOpacity="0.28" />
          <stop offset="1" stopColor="#b38a2e" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="tepx-wave-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#244f93" stopOpacity="0.55" />
          <stop offset="1" stopColor="#173d73" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="tepx-wave-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="tepx-wave w1">
        <path d={wave(1440, 46, 210)} fill="url(#tepx-wave-light)" />
      </g>
      <g className="tepx-wave w2">
        <path d={wave(720, 34, 250)} fill="url(#tepx-wave-gold)" />
      </g>
      <g className="tepx-wave w3">
        <path d={wave(960, 40, 300)} fill="url(#tepx-wave-blue)" />
      </g>
    </svg>
  );
}
