import { ImageResponse } from "next/og";

export const alt = "Rodgers T. Momanyi — RTM-HD | Network Engineer · Google Data Center Technician III";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#061A4A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(246,245,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(246,245,241,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orange accent block */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,106,26,0.15)",
          }}
        />

        {/* Blue accent */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "200px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(10,77,255,0.2)",
          }}
        />

        {/* Content */}
        {/* Satori ignores z-index — paint order is DOM order, so this sits above
            the accent circles by virtue of coming after them. */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FF6A1A",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            NETWORK ENGINEER · OPTICAL INFRASTRUCTURE · CYBERSECURITY
          </div>

          {/* Satori requires an explicit `display` on any element with >1 child,
              so this is a flex column of two lines rather than a <br />-separated block. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#F6F5F1",
              fontSize: "76px",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              marginBottom: "20px",
            }}
          >
            <div>RODGERS T.</div>
            <div>MOMANYI</div>
          </div>

          <div
            style={{
              color: "#FF6A1A",
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              marginBottom: "30px",
            }}
          >
            RTM-HD
          </div>

          <div
            style={{
              color: "rgba(246,245,241,0.5)",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            DATA CENTER TECHNICIAN III · GOOGLE HAMINA DATA CENTER · FINLAND
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            color: "rgba(246,245,241,0.3)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          RTMHD.TECH
        </div>
      </div>
    ),
    { ...size }
  );
}
