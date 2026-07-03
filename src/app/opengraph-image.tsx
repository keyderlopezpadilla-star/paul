import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Gestión agrícola profesional`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #071e12 0%, #0f3d24 55%, #14512f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#21a559",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            🌿
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>Agropaul</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Innovación y pasión
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#34c56a",
            }}
          >
            por la tierra
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.72)", maxWidth: 900 }}>
            Poda técnica · Gestión integral de fincas · Formación certificada
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          agropaul.es
        </div>
      </div>
    ),
    { ...size },
  );
}
