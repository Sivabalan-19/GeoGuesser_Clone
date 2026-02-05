import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import guessIconUrl from "./assets/guess.png";
import targetIconUrl from "./assets/target.png";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MiniMap({
  guess,
  setGuess,
  target,
  locked,
  expanded,
  onClose,
}) {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const guessMarker = useRef(null);
  const targetMarker = useRef(null);
  const [mapError, setMapError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const hasToken = Boolean(import.meta.env.VITE_MAPBOX_TOKEN);

  /* ---------------- CREATE MAP ---------------- */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;
    if (!hasToken) {
      setMapError("Missing VITE_MAPBOX_TOKEN");
      return;
    }

    // Small delay to ensure container is rendered
    const timer = setTimeout(() => {
      try {
        mapRef.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [0, 20],
          zoom: 1.5,
          projection: "mercator",
          renderWorldCopies: false,
          dragPan: true,
          scrollZoom: true,
        });

        mapRef.current.addControl(
          new mapboxgl.NavigationControl(),
          "top-right",
        );

        mapRef.current.on("load", () => {
          setMapLoaded(true);
        });

        mapRef.current.on("error", (e) => {
          if (e?.error?.message) {
            setMapError(e.error.message);
          }
        });

        // Fallback if load event doesn't fire
        setTimeout(() => {
          if (!mapRef.current?.loaded()) return;
          setMapLoaded(true);
        }, 3000);
      } catch (err) {
        setMapError("Failed to initialize Mapbox map");
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      mapRef.current?.remove();
    };
  }, [hasToken]);

  /* ---------------- HANDLE CLICKS ---------------- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const handleClick = (e) => {
      if (locked) return;
      setGuess({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    };

    map.on("click", handleClick);

    return () => map.off("click", handleClick);
  }, [locked, setGuess, mapLoaded]);

  /* ---------------- UPDATE GUESS MARKER ---------------- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear markers and line when no guess or new round
    if (!guess) {
      if (guessMarker.current) {
        guessMarker.current.remove();
        guessMarker.current = null;
      }
      if (targetMarker.current) {
        targetMarker.current.remove();
        targetMarker.current = null;
      }
      if (map.getSource("line")) {
        map.removeLayer("line-layer");
        map.removeSource("line");
      }
      return;
    }

    if (guessMarker.current) guessMarker.current.remove();

    const el = document.createElement("img");
    el.src = guessIconUrl;
    el.style.width = "40px";
    el.style.height = "40px";

    guessMarker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([guess.lng, guess.lat])
      .addTo(map);
  }, [guess]);

  /* ---------------- SHOW RESULT ---------------- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !locked || !guess) return;

    if (targetMarker.current) targetMarker.current.remove();

    const el = document.createElement("img");
    el.src = targetIconUrl;
    el.style.width = "44px";
    el.style.height = "44px";

    targetMarker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([target.lng, target.lat])
      .addTo(map);

    // Draw dashed line
    if (map.getSource("line")) {
      map.removeLayer("line-layer");
      map.removeSource("line");
    }

    map.addSource("line", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [guess.lng, guess.lat],
            [target.lng, target.lat],
          ],
        },
      },
    });

    map.addLayer({
      id: "line-layer",
      type: "line",
      source: "line",
      paint: {
        "line-color": "#000",
        "line-width": 3,
        "line-dasharray": [2, 2],
      },
    });

    // Fit bounds ONLY guess + target
    const bounds = new mapboxgl.LngLatBounds()
      .extend([guess.lng, guess.lat])
      .extend([target.lng, target.lat]);

    map.fitBounds(bounds, {
      padding: expanded ? 80 : 50,
      duration: 1200,
      maxZoom: 15,
    });
  }, [locked, guess, target, expanded]);

  /* ---------------- RESIZE ON EXPAND ---------------- */
  useEffect(() => {
    setTimeout(() => mapRef.current?.resize(), 300);
  }, [expanded]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: expanded ? 0 : 100,
        right: expanded ? 0 : 24,
        width: expanded ? "100vw" : "380px",
        height: expanded ? "100vh" : "260px",
        borderRadius: expanded ? 0 : "20px",
        overflow: "hidden",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 999,
        boxShadow: expanded
          ? "none"
          : "0 20px 60px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.2)",
        background: "#e2e8f0",
        border: expanded ? "none" : "3px solid rgba(255,255,255,0.5)",
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: expanded ? "100vw" : "100%",
          height: expanded ? "100vh" : "100%",
        }}
      />

      {!mapLoaded && !mapError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginBottom: "12px",
            }}
          />
          Loading map…
        </div>
      )}

      {mapError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            padding: "24px",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</div>
          <div style={{ fontWeight: "700", marginBottom: "8px" }}>Map Error</div>
          {mapError}
        </div>
      )}

      {expanded && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            padding: "14px 24px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "14px",
            fontWeight: "800",
            fontSize: "15px",
            letterSpacing: "0.5px",
            color: "#1e293b",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
          }}
        >
          ✕ Close Map
        </button>
      )}
    </div>
  );
}
