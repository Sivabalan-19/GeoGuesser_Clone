import "dotenv/config";
import fs from "fs";
import fetch from "node-fetch";

const TOKEN = process.env.MAPILLARY_TOKEN;

const results = [];

async function fetchBox(box) {
  const [west, south, east, north] = box.bbox;
  const url = `https://graph.mapillary.com/images?access_token=${TOKEN}&fields=id,computed_geometry&bbox=${west},${south},${east},${north}&limit=100`;

  console.log("📦 Fetching", box.name);

  const res = await fetch(url);
  const data = await res.json();

  if (data.data) {
    data.data.forEach((img) => {
      if (
        img.computed_geometry &&
        img.computed_geometry.coordinates &&
        img.computed_geometry.coordinates.length === 2
      ) {
        results.push({
          id: img.id,
          lat: img.computed_geometry.coordinates[1],
          lng: img.computed_geometry.coordinates[0],
        });
      } else {
        console.log("⚠️ Skipped image without coordinates:", img.id);
      }
    });
  }
}

async function run() {
  if (!TOKEN) {
    console.error(
      "Missing MAPILLARY_TOKEN. Set it in a .env file or environment, e.g.:",
    );
    console.error(
      'Windows PowerShell: $env:MAPILLARY_TOKEN="YOUR_TOKEN"; node src/generateLocations.mjs',
    );
    console.error("or create .env with MAPILLARY_TOKEN=YOUR_TOKEN");
    process.exit(1);
  }
  const boxes = [
    { name: "New York", bbox: [-74.03, 40.7, -73.98, 40.75] },
    { name: "Los Angeles", bbox: [-118.3, 34.0, -118.25, 34.05] },
    { name: "Chicago", bbox: [-87.65, 41.87, -87.6, 41.92] },
    { name: "Miami", bbox: [-80.21, 25.76, -80.16, 25.81] },
    { name: "Toronto", bbox: [-79.41, 43.64, -79.36, 43.69] },
    { name: "Mexico City", bbox: [-99.16, 19.41, -99.11, 19.46] },
    { name: "São Paulo", bbox: [-46.66, -23.57, -46.61, -23.52] },
    { name: "Buenos Aires", bbox: [-58.4, -34.63, -58.35, -34.58] },
    { name: "London", bbox: [-0.15, 51.5, -0.1, 51.55] },
    { name: "Paris", bbox: [2.32, 48.84, 2.37, 48.89] },
    { name: "Berlin", bbox: [13.38, 52.5, 13.43, 52.55] },
    { name: "Madrid", bbox: [-3.71, 40.4, -3.66, 40.45] },
    { name: "Rome", bbox: [12.47, 41.88, 12.52, 41.93] },
    { name: "Amsterdam", bbox: [4.87, 52.36, 4.92, 52.41] },
    { name: "Istanbul", bbox: [28.95, 41.0, 29.0, 41.05] },
    { name: "Moscow", bbox: [37.6, 55.74, 37.65, 55.79] },
    { name: "Dubai", bbox: [55.25, 25.2, 55.3, 25.25] },
    { name: "Delhi", bbox: [77.2, 28.6, 77.25, 28.65] },
    { name: "Mumbai", bbox: [72.85, 19.05, 72.9, 19.1] },
    { name: "Bangkok", bbox: [100.49, 13.72, 100.54, 13.77] },
    { name: "Singapore", bbox: [103.83, 1.28, 103.88, 1.33] },
    { name: "Tokyo", bbox: [139.75, 35.67, 139.8, 35.72] },
    { name: "Seoul", bbox: [126.97, 37.55, 127.02, 37.6] },
    { name: "Hong Kong", bbox: [114.15, 22.27, 114.2, 22.32] },
    { name: "Jakarta", bbox: [106.82, -6.2, 106.87, -6.15] },
    { name: "Sydney", bbox: [151.2, -33.88, 151.25, -33.83] },
    { name: "Melbourne", bbox: [144.95, -37.82, 145.0, -37.77] },
    { name: "Cape Town", bbox: [18.4, -33.94, 18.45, -33.89] },
    { name: "Johannesburg", bbox: [28.02, -26.21, 28.07, -26.16] },
    { name: "Nairobi", bbox: [36.8, -1.3, 36.85, -1.25] },
    { name: "Cairo", bbox: [31.22, 30.03, 31.27, 30.08] },
    { name: "Istanbul Asia", bbox: [29.05, 41.02, 29.1, 41.07] },
    { name: "Athens", bbox: [23.71, 37.96, 23.76, 38.01] },
    { name: "Lisbon", bbox: [-9.15, 38.7, -9.1, 38.75] },
    { name: "Prague", bbox: [14.41, 50.07, 14.46, 50.12] },
    { name: "Vienna", bbox: [16.36, 48.2, 16.41, 48.25] },
    { name: "Warsaw", bbox: [21.0, 52.22, 21.05, 52.27] },
    { name: "Stockholm", bbox: [18.05, 59.32, 18.1, 59.37] },
    { name: "Helsinki", bbox: [24.92, 60.16, 24.97, 60.21] },
    { name: "Oslo", bbox: [10.73, 59.91, 10.78, 59.96] },
    { name: "Copenhagen", bbox: [12.55, 55.67, 12.6, 55.72] },
  ];

  for (const box of boxes) {
    await fetchBox(box);
  }

  fs.writeFileSync("locations.json", JSON.stringify(results, null, 2));
  console.log(
    "✅ DONE — locations.json created with",
    results.length,
    "locations",
  );
}

run();
