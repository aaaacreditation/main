// One-time generator for app/_components/world-map-data.json
// Source: world-atlas countries-110m.json (Natural Earth, public domain).
// Re-run with: node scripts/generate-world-map.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { geoNaturalEarth1, geoPath, geoArea } from "d3-geo";
import { feature, merge } from "topojson-client";

// Territories dissolved into a single country shape (no internal border).
// markerFrom keeps the location dot on the named member's landmass.
const MERGE_GROUPS = [
  { name: "Morocco", members: ["Morocco", "W. Sahara"], markerFrom: "Morocco" },
];

const W = 980;
const H = 520;

const topo = JSON.parse(readFileSync(new URL("./countries-110m.json", import.meta.url), "utf8"));
const all = feature(topo, topo.objects.countries).features;
const merged = new Set(MERGE_GROUPS.flatMap((g) => g.members));
const countries = all.filter(
  (f) => f.properties.name !== "Antarctica" && f.geometry && !merged.has(f.properties.name)
);

for (const group of MERGE_GROUPS) {
  const geometries = topo.objects.countries.geometries.filter((g) =>
    group.members.includes(g.properties.name)
  );
  const markerSource = all.find((f) => f.properties.name === group.markerFrom);
  countries.push({
    type: "Feature",
    properties: { name: group.name, markerGeometry: markerSource?.geometry },
    geometry: merge(topo, geometries),
  });
}

const projection = geoNaturalEarth1();
projection.fitSize([W, H], { type: "FeatureCollection", features: countries });
const path = geoPath(projection);

const round1 = (s) => s.replace(/-?\d+\.\d+/g, (m) => String(Math.round(Number(m) * 10) / 10));

// Marker position = centroid of the country's largest polygon, so multipart
// countries (USA, Indonesia, ...) get a dot on their main landmass.
function markerFeature(f) {
  if (f.properties.markerGeometry) {
    return markerFeature({ type: "Feature", geometry: f.properties.markerGeometry, properties: {} });
  }
  if (f.geometry.type !== "MultiPolygon") return f;
  let best = null;
  let bestArea = -1;
  for (const coordinates of f.geometry.coordinates) {
    const poly = { type: "Polygon", coordinates };
    const a = geoArea(poly);
    if (a > bestArea) {
      bestArea = a;
      best = poly;
    }
  }
  return { type: "Feature", geometry: best, properties: f.properties };
}

const data = countries
  .map((f) => {
    const d = path(f);
    if (!d) return null;
    const [cx, cy] = path.centroid(markerFeature(f));
    return {
      name: f.properties.name,
      d: round1(d),
      cx: Math.round(cx * 10) / 10,
      cy: Math.round(cy * 10) / 10,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(
  new URL("../app/_components/world-map-data.json", import.meta.url),
  JSON.stringify({ width: W, height: H, countries: data })
);

console.log(`Wrote ${data.length} countries`);
console.log(data.map((c) => c.name).join(" | "));
