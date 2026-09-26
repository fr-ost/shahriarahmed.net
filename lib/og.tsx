import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, person, site } from "@/data/portfolio";

/** Shared renderer for the Open Graph and Twitter/X share images. */

const asset = (path: string) => readFile(join(process.cwd(), "assets", path));

// Inter stands in for SF Pro, which cannot be embedded outside Apple devices.
const [interMedium, interSemiBold, portrait] = await Promise.all([
  asset("fonts/Inter-Medium.woff"),
  asset("fonts/Inter-SemiBold.woff"),
  asset("og/portrait.jpg"),
]);

const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

const INK = "#0e1010";
const MUTED = "#676d6a";
const ACCENT = "#0b6b5c";
const ACCENT_BRIGHT = "#12a386";
const PAPER = "#f7f7f4";
const LINE = "#e2e2dc";

export function renderSocialImage(size: { width: number; height: number }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: PAPER,
        fontFamily: "Inter",
        fontWeight: 500,
        color: INK,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(to right, rgba(14,16,16,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,16,16,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 760,
          padding: "64px 0 60px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: ACCENT_BRIGHT,
              marginRight: 16,
            }}
          />
          {hero.eyebrow.slice(0, 3).join("  ·  ")}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: -5.4,
            }}
          >
            {person.givenName}
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: -5.4,
            }}
          >
            {person.familyName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 40,
              fontSize: 36,
              letterSpacing: -0.7,
            }}
          >
            <div style={{ width: 44, height: 2, background: INK, marginRight: 18 }} />
            {person.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: -0.2,
            color: ACCENT,
          }}
        >
          {site.domain}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 12,
            borderRadius: 40,
            background: "#ffffff",
            border: `1px solid ${LINE}`,
            boxShadow: "0 30px 60px -30px rgba(20,22,18,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
          <img
            src={portraitSrc}
            width={336}
            height={336}
            alt=""
            style={{ borderRadius: 30, objectFit: "cover" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 8px 4px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>{person.location.city}</span>
            <span>{person.location.coordinates}</span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
