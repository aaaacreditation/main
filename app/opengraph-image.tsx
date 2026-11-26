import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FACTS } from "../lib/facts";

/**
 * Default social / AI-preview card for the whole site.
 *
 * File-based convention: Next serves this at /opengraph-image and every route
 * inherits it unless it defines its own. Before this existed, every share and
 * every AI answer-engine preview rendered a blank card.
 *
 * Nov 26 2026 (client): the card carries the AAA seal and is set in Poppins.
 * The assets are read from public/ (present at build time and in the runner).
 * Changed the card? Bump the `v` in DEFAULT_OG_IMAGE (lib/seo.ts) so LinkedIn,
 * Facebook and WhatsApp fetch the new image instead of their cached copy.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "American Accreditation Association — internationally recognized accreditation";

const asset = (path: string) => readFile(join(process.cwd(), "public", path));

export default async function OgImage() {
  const [seal, regular, semibold] = await Promise.all([
    asset("logo/aaalog.png"),
    asset("fonts/og/Poppins-Regular.ttf"),
    asset("fonts/og/Poppins-SemiBold.ttf"),
  ]);
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          padding: "64px 64px 64px 80px",
          background: "linear-gradient(125deg, #061a2c 0%, #0b2d50 52%, #173d73 100%)",
          color: "#fff",
          fontFamily: "Poppins",
        }}
      >
        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 56, height: 4, background: "#b38a2e" }} />
            <div style={{ fontSize: 17, letterSpacing: 3, textTransform: "uppercase", color: "#f4e7c6" }}>
              American Accreditation Association
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.08, letterSpacing: -1.8 }}>
              International accreditation, accepted globally
            </div>
            <div style={{ marginTop: 22, fontSize: 25, lineHeight: 1.45, color: "rgba(255,255,255,0.78)" }}>
              Independent accreditation built on internationally recognized standards.
            </div>
          </div>

          <div style={{ display: "flex", gap: 40 }}>
            {[
              [FACTS.organizations, "Accredited organizations"],
              [FACTS.countriesPlus, "Countries served"],
              [FACTS.assessors, "Assessors & experts"],
            ].map(([big, small]) => (
              <div key={small} style={{ display: "flex", flexDirection: "column", maxWidth: 190 }}>
                <div style={{ fontSize: 44, fontWeight: 600, lineHeight: 1.1, color: "#f4e7c6" }}>{big}</div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 15,
                    lineHeight: 1.35,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  {small}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The AAA seal on a soft royal-blue glow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(36,79,147,0.75) 0%, rgba(36,79,147,0) 68%)",
          }}
        >
          <img src={sealSrc} width={400} height={378} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
