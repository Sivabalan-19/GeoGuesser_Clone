import { useEffect, useRef, useState } from "react";
import { Viewer } from "mapillary-js";
import "mapillary-js/dist/mapillary.css";

const TOKEN = import.meta.env.VITE_MAPILLARY_TOKEN;

export default function StreetView({ imageId, onLoadingChange }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const requestIdRef = useRef(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageId) return;

    let isMounted = true;
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    if (viewerRef.current) {
      viewerRef.current.remove();
      viewerRef.current = null;
    }

    // Defer state updates to avoid synchronous setState within effect
    queueMicrotask(() => {
      setLoading(true);
      onLoadingChange?.(true);
      setError(null);
    });

    viewerRef.current = new Viewer({
      accessToken: TOKEN,
      container: containerRef.current,
    });

    // Move to the desired image and mark loaded
    viewerRef.current
      .moveTo(imageId)
      .then(() => {
        if (isMounted && requestIdRef.current === requestId) {
          setLoading(false);
          onLoadingChange?.(false);
        }
      })
      .catch((e) => {
        if (!isMounted || requestIdRef.current !== requestId) return;
        // Ignore cancellation errors (expected when switching rounds)
        if (e.name === "CancelMapillaryError" || e.message?.includes("aborted")) {
          setLoading(false);
          onLoadingChange?.(false);
          return;
        }
        console.error("StreetView moveTo failed", e);
        setError("Failed to load Street View");
        setLoading(false);
        onLoadingChange?.(false);
      });

    return () => {
      isMounted = false;
      viewerRef.current?.remove();
    };
  }, [imageId, onLoadingChange]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(118,75,162,0.15) 100%)",
            backdropFilter: "blur(8px)",
            color: "white",
            gap: 16,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "4px solid rgba(255,255,255,0.3)",
              borderTopColor: "white",
              borderRadius: "50%",
              animation: "spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            🌍 Loading Street View…
          </span>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      {error && !loading && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(239, 68, 68, 0.95)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 12,
            zIndex: 2,
            fontSize: 14,
            fontWeight: "600",
            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
