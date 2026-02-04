import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import StreetView from "./StreetView";
import locations from "./locations.json";

// 🌍 Distance formula
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

// 🎯 Score formula
function calculateScore(distance) {
  const maxScore = 5000;
  return Math.max(0, Math.round(maxScore * Math.exp(-distance / 2000)));
}

// 📍 Map click handler
function GuessMarker({ setGuess, locked }) {
  const [pos, setPos] = useState(null);

  useMapEvents({
    click(e) {
      if (locked) return;
      setPos(e.latlng);
      setGuess(e.latlng);
    },
  });

  return pos ? <Marker position={pos} /> : null;
}

// 🎲 Random location
function getRandomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}

export default function App() {
  const [round, setRound] = useState(getRandomLocation());
  const [guess, setGuess] = useState(null);
  const [distance, setDistance] = useState(null);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const locked = distance !== null;

  function nextRound() {
    if (roundNumber >= 5) return;

    setRound(getRandomLocation());
    setGuess(null);
    setDistance(null);
    setRoundNumber((r) => r + 1);
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* 🌆 Street View */}
      <StreetView imageId={round.id} />

      {/* 🗺 Mini Map */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: "320px",
          height: "220px",
          borderRadius: "10px",
          overflow: "hidden",
          border: "2px solid white",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GuessMarker setGuess={setGuess} locked={locked} />

          {locked && (
            <>
              <Marker position={[round.lat, round.lng]} />
              <Polyline
                positions={[
                  [guess.lat, guess.lng],
                  [round.lat, round.lng],
                ]}
              />
            </>
          )}
        </MapContainer>
      </div>

      {/* 🎯 Submit Guess */}
      {guess && !locked && (
        <button
          onClick={() => {
            const d = getDistance(guess.lat, guess.lng, round.lat, round.lng);
            setDistance(d);
            setTotalScore((prev) => prev + calculateScore(d));
          }}
          style={{
            position: "absolute",
            bottom: 260,
            right: 20,
            padding: "10px 14px",
            fontSize: "14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Guess
        </button>
      )}

      {/* 🧾 Score / Round Display */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "10px 18px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        Round {roundNumber}/5 | Score: {totalScore}
      </div>

      {/* 🏁 Result Panel */}
      {distance && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "white",
            padding: "12px",
            borderRadius: "8px",
            maxWidth: "240px",
          }}
        >
          <h3>Round Result</h3>
          <p>
            You were <b>{distance.toFixed(2)} km</b> away
          </p>
          <p>
            Round Score: <b>{calculateScore(distance)}</b>
          </p>

          {roundNumber < 5 ? (
            <button onClick={nextRound}>Next Round</button>
          ) : (
            <>
              <h2>🏆 Game Over!</h2>
              <p>
                Total Score: <b>{totalScore}</b>
              </p>
              <button onClick={() => window.location.reload()}>
                Play Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
