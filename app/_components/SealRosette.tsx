// Engraved guilloché-style rosette — the fine-line seal motif used on
// accreditation certificates. Purely decorative; positioned via .seal-rosette
// context rules in globals.css.
export default function SealRosette({ spin = false }: { spin?: boolean }) {
  const ticks = Array.from({ length: 72 }, (_, i) => (i * 360) / 72);
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (r: number, deg: number) => ({
    x: 200 + r * Math.cos(rad(deg)),
    y: 200 + r * Math.sin(rad(deg)),
  });
  return (
    <div className={`seal-rosette${spin ? " spin" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none">
        {[198, 190, 174, 152, 146, 112, 106].map((r, i) => (
          <circle
            key={r}
            cx={200}
            cy={200}
            r={r}
            stroke="currentColor"
            strokeWidth={i % 2 === 0 ? 1 : 0.6}
          />
        ))}
        <circle
          cx={200}
          cy={200}
          r={182}
          stroke="currentColor"
          strokeWidth={8}
          strokeDasharray="1.2 4.4"
          opacity={0.55}
        />
        {ticks.map((a) => {
          const p1 = pt(146, a);
          const p2 = pt(152, a);
          return (
            <line
              key={`t${a}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="currentColor"
              strokeWidth={0.8}
            />
          );
        })}
        {ticks
          .filter((_, i) => i % 2 === 0)
          .map((a) => {
            const p1 = pt(112, a);
            const p2 = pt(128, a);
            return (
              <line
                key={`s${a}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="currentColor"
                strokeWidth={0.6}
                opacity={0.8}
              />
            );
          })}
        {/* woven guilloché band — two phase-shifted scalloped rings */}
        {[0, 1].map((phase) => (
          <path
            key={phase}
            d={ticks
              .map((a, i) => {
                const mid = pt(i % 2 === phase ? 166 : 158, a + 2.5);
                return `${i === 0 ? "M" : "L"} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)}`;
              })
              .join(" ") + " Z"}
            stroke="currentColor"
            strokeWidth={0.6}
            opacity={0.9}
          />
        ))}
        <circle cx={200} cy={200} r={56} stroke="currentColor" strokeWidth={1} />
        <circle cx={200} cy={200} r={50} stroke="currentColor" strokeWidth={0.6} />
      </svg>
    </div>
  );
}
