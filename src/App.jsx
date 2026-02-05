import { useState, useEffect, useCallback } from "react";
import StreetView from "./StreetView";
import MiniMap from "./MiniMap";
import locations from "./locations.json";

/* ---------------- HELPERS ---------------- */

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function calculateScore(distance) {
  const maxScore = 5000;
  return Math.max(0, Math.round(maxScore * Math.exp(-distance / 2000)));
}

function getRandomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}

function getCharacterReaction(score) {
  if (score >= 4500) return { emoji: "🤩", text: "AMAZING!", animation: "bounce", color: "#10b981" };
  if (score >= 3500) return { emoji: "😃", text: "GREAT!", animation: "bounce", color: "#22c55e" };
  if (score >= 2500) return { emoji: "😊", text: "GOOD!", animation: "nod", color: "#fbbf24" };
  if (score >= 1500) return { emoji: "😐", text: "OK", animation: "nod", color: "#f59e0b" };
  if (score >= 500) return { emoji: "😕", text: "MEH", animation: "shake", color: "#f97316" };
  return { emoji: "😢", text: "OH NO!", animation: "shake", color: "#ef4444" };
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const [round, setRound] = useState(getRandomLocation());
  const [guess, setGuess] = useState(null);
  const [distance, setDistance] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [svLoading, setSvLoading] = useState(true);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const locked = distance !== null;

  const handleTimeExpiry = useCallback(() => {
    if (guess) {
      // User made a guess - calculate score
      const d = getDistance(guess.lat, guess.lng, round.lat, round.lng);
      setDistance(d);
      setTotalScore((prev) => prev + calculateScore(d));
    } else {
      // No guess - set distance to a special value to show result without score
      setDistance(-1);
    }
    setMapExpanded(true);
  }, [guess, round]);

  // Timer countdown - only starts after loading finishes
  useEffect(() => {
    if (locked || timeLeft <= 0 || svLoading) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-submit when time runs out (with or without guess)
          handleTimeExpiry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [locked, timeLeft, svLoading, handleTimeExpiry]);

  function submitGuess() {
    if (!guess) return;

    const d = getDistance(guess.lat, guess.lng, round.lat, round.lng);
    setDistance(d);
    setTotalScore((prev) => prev + calculateScore(d));
    setMapExpanded(true);
  }

  function nextRound() {
    setRound(getRandomLocation());
    setGuess(null);
    setDistance(null);
    setMapExpanded(false);
    setTimeLeft(10);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <StreetView imageId={round.id} onLoadingChange={setSvLoading} />

      {/* TIMER */}
      {!locked && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              position: "relative",
              background: timeLeft <= 30
                ? "rgba(239, 68, 68, 0.6)"
                : "rgba(30, 41, 59, 0.5)",
              backdropFilter: "blur(10px)",
              padding: "12px 35px",
              borderRadius: "50px",
              fontWeight: "900",
              fontSize: "32px",
              color: "#fff",
              boxShadow: timeLeft <= 30
                ? "0 8px 32px rgba(239, 68, 68, 0.4), 0 2px 8px rgba(220, 38, 38, 0.3)"
                : "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
              animation: timeLeft <= 10 ? "pulse 0.5s ease-in-out infinite" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {/* Progress Border */}
            <div
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50px",
                background: `conic-gradient(from 0deg, transparent 0%, transparent ${100 - (timeLeft / 120) * 100}%, ${timeLeft <= 30 ? "#ef4444" : "#667eea"} ${100 - (timeLeft / 120) * 100}%)`,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "4px",
                pointerEvents: "none",
                transition: "all 0.3s ease",
              }}
            />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
      )}

      {/* MAPBOX MINIMAP */}
      <MiniMap
        guess={guess}
        setGuess={setGuess}
        target={{ lat: round.lat, lng: round.lng }}
        locked={locked}
        expanded={mapExpanded}
        onClose={nextRound}
      />

      {/* GUESS BUTTON */}
      {!locked && (
        <button
          onClick={submitGuess}
          disabled={!guess}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            padding: "16px 36px",
            fontSize: "17px",
            borderRadius: "16px",
            border: "none",
            cursor: guess ? "pointer" : "not-allowed",
            background: guess
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
            color: "white",
            fontWeight: "800",
            letterSpacing: "0.5px",
            zIndex: 10000,
            boxShadow: guess 
              ? "0 12px 40px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(118, 75, 162, 0.3)"
              : "0 4px 12px rgba(0,0,0,0.15)",
            transform: "scale(1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (guess) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 16px 48px rgba(102, 126, 234, 0.5), 0 6px 16px rgba(118, 75, 162, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = guess 
              ? "0 12px 40px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(118, 75, 162, 0.3)"
              : "0 4px 12px rgba(0,0,0,0.15)";
          }}
        >
          🎯 Guess
        </button>
      )}



      {/* RESULT BAR */}
      {locked && (() => {
        const score = distance === -1 ? 0 : calculateScore(distance);
        const reaction = getCharacterReaction(score);
        const noGuess = distance === -1;
        return (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "160px",
            background: "linear-gradient(to top, #0f172a 0%, #1e293b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "60px",
            color: "white",
            zIndex: 10001,
            boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
            animation: "slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* ANIMATED CHARACTER */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              animation: `${reaction.animation} 0.6s ease-in-out`,
            }}
          >
            <div
              style={{
                fontSize: "80px",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                animation: `${reaction.animation} 0.6s ease-in-out infinite`,
              }}
            >
              {noGuess ? "⏰" : reaction.emoji}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "900",
                color: noGuess ? "#ef4444" : reaction.color,
                letterSpacing: "2px",
                textShadow: noGuess ? "0 0 20px #ef444480" : `0 0 20px ${reaction.color}80`,
              }}
            >
              {noGuess ? "TIME'S UP!" : reaction.text}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              animation: "fadeIn 0.5s ease 0.2s backwards",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#94a3b8",
                letterSpacing: "1px",
              }}
            >
              {noGuess ? "📍 CORRECT LOCATION" : "📍 DISTANCE"}
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "900",
                color: "#ffffff",
                textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              {noGuess ? "Not Guessed" : `${distance.toFixed(0)} km`}
            </div>
          </div>

          <div
            style={{
              width: "3px",
              height: "80px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              animation: "fadeIn 0.5s ease 0.3s backwards",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#94a3b8",
                letterSpacing: "1px",
              }}
            >
              ⭐ SCORE
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "900",
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 8px rgba(251, 191, 36, 0.5))",
              }}
            >
              {score.toLocaleString()}
            </div>
          </div>

          <div
            style={{
              width: "3px",
              height: "80px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
              borderRadius: "2px",
            }}
          />

          <button
            onClick={nextRound}
            style={{
              padding: "20px 56px",
              fontSize: "19px",
              fontWeight: "900",
              letterSpacing: "1px",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              border: "none",
              borderRadius: "18px",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(34, 197, 94, 0.5)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "scale(1)",
              animation: "fadeIn 0.5s ease 0.4s backwards",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.08) translateY(-2px)";
              e.target.style.boxShadow = "0 16px 40px rgba(34, 197, 94, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 8px 32px rgba(34, 197, 94, 0.5)";
            }}
          >
            🚀 Next Location
          </button>
        </div>
        );
      })()}

      {/* TOTAL SCORE */}
      {!locked && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
            backdropFilter: "blur(10px)",
            padding: "16px 28px",
            borderRadius: "20px",
            fontWeight: "800",
            fontSize: "16px",
            color: "#1e293b",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
            border: "2px solid rgba(255,255,255,0.6)",
            transition: "all 0.3s ease",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: "20px", marginRight: "10px" }}>🏆</span>
          <span style={{ fontWeight: "900", fontSize: "18px" }}>{totalScore.toLocaleString()}</span>
          <span style={{ color: "#94a3b8", marginLeft: "6px", fontSize: "14px", fontWeight: "600" }}>pts</span>
        </div>
      )}

      {/* CSS ANIMATIONS */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes nod {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* STREET VIEW LOADER */}
      {svLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
            backdropFilter: "blur(10px)",
            zIndex: 9000,
            pointerEvents: "none",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "6px solid rgba(255,255,255,0.3)",
              borderTop: "6px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "24px",
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            🌍 Loading Street View...
          </div>
        </div>
      )}
    </div>
  );
}
