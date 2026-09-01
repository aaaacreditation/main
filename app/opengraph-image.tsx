import { ImageResponse } from "next/og";
import { FACTS } from "../lib/facts";

/**
 * Default social / AI-preview card for the whole site.
 *
 * File-based convention: Next serves this at /opengraph-image and every route
 * inherits it unless it defines its own. Before this existed, every share and
 * every AI answer-engine preview rendered a blank card.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "American Accreditation Association — internationally recognized accreditation";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(125deg, #061a2c 0%, #0b2d50 52%, #173d73 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 4, background: "#b38a2e" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f4e7c6",
            }}
          >
            American Accreditation Association
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            International accreditation, accepted globally
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 860,
            }}
          >
            Independent accreditation built on internationally recognized standards.
          </div>
        </div>

        <div style={{ display: "flex", gap: 56 }}>
          {[
            [FACTS.organizations, "Accredited organizations"],
            [FACTS.countriesPlus, "Countries served"],
            [FACTS.assessors, "Assessors & experts"],
          ].map(([big, small]) => (
            <div key={small} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 46, fontWeight: 700, color: "#f4e7c6" }}>{big}</div>
              <div
                style={{
                  fontSize: 20,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {small}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
