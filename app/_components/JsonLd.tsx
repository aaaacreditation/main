/**
 * Renders one or more JSON-LD blocks.
 *
 * Server component — the schema object is serialised at render time, so the
 * markup is present in the initial HTML where crawlers and answer engines can
 * read it without executing JavaScript.
 */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  const blocks = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema objects are built in our own code from static content, never
          // from user input. `<` is escaped so a stray angle bracket in copy
          // cannot close the script tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
