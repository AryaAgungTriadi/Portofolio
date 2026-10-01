import { ImageResponse } from "next/og";

export const alt = "Portfolio Arya Agung Triadi — Web Development, UI/UX, dan Visual Creative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1f1f1f", color: "#faf7f2", padding: "64px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>arya<span style={{ color: "#ff944d" }}>.</span></div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#b5b2ad" }}>PORTFOLIO PERSONAL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -3 }}>Arya Agung Triadi<span style={{ color: "#ff944d" }}>.</span></div>
          <div style={{ display: "flex", fontSize: 30, color: "#b5b2ad", marginTop: 24 }}>Web Development · UI/UX · Visual Creative</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #ff944d", paddingTop: 26, fontSize: 22 }}>
          <span>Belajar. Bereksperimen. Berkarya.</span>
          <span style={{ color: "#ff944d" }}>Portfolio Arya</span>
        </div>
      </div>
    ),
    size,
  );
}
