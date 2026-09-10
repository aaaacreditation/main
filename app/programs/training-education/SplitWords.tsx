/**
 * Wraps each word in a clipped inline-block so GSAP can slide the words up
 * into view one by one. The space between words lives *outside* the clipped
 * box (an inline-block would swallow a trailing space). Server-safe.
 */
export default function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="tepx-word">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
