import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3210;

// Note: Since we only have one interface, I have defined it here
interface City {
  country: string;
  country_name: string;
  name: string;
  altnames: string[];
  lat: number;
  lng: number;
}

let citiesData: City[] = [];

const filePath = path.resolve(__dirname, "../../assets/cities.json");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Failed to read cities.json at startup:", err);
    process.exit(1);
  }
  try {
    citiesData = JSON.parse(data);
    console.log(`Loaded ${citiesData.length} cities`);
  } catch (e) {
    console.error("Failed to parse cities.json:", e);
    process.exit(1);
  }
});

app.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paged = citiesData.slice(start, end);
  res.json({
    total: citiesData.length,
    page,
    limit,
    data: paged,
  });
});

app.get("/api/random", (req, res) => {
  const count = parseInt(req.query.count as string) || 25;

  const selectedCountries = new Set<string>();
  const selectedCities: City[] = [];
  while (selectedCountries.size < count) {
    const randomIndex = Math.floor(Math.random() * citiesData.length);
    const city = citiesData[randomIndex];

    if (!selectedCountries.has(city.country)) {
      selectedCountries.add(city.country);
      selectedCities.push(city);
    }
  }

  res.json({
    count: selectedCities.length,
    data: selectedCities,
  });
});

app.listen(port, () => {
  console.log(`Local cities server running at http://localhost:${port}`);
});
