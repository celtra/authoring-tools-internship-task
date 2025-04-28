// Formula from https://en.wikipedia.org/wiki/Haversine_formula
// Lat & Lng need to be in radians  *pi/180
// r is radius of earth (6371km)
// d = r archav(hav(fi)) = 2 r arcsin(sqrt(hav(fi)))
// hav(fi) =hav(lat2-lat1) + cos(lat1)cos(lat2)hav(lng2-lng1)
//d = 2r arcsin(sqrt((1-cos(lat2-lat1) + cos(lat1)*cos(lat2) * (1-cos(lng2-lng1)))/2))

import type { Location } from "../types/Location";

// Returns distance in km
export const haversineDistanceMine = (
  userLocation: Location,
  otherLocation: Location
) => {
  const latCity = (otherLocation.latitude * Math.PI) / 180;
  const lngCity = (otherLocation.longitude * Math.PI) / 180;
  const latUser = (userLocation.latitude * Math.PI) / 180;
  const lngUser = (userLocation.longitude * Math.PI) / 180;
  const R = 6371000;
  const p1 = 1 - Math.cos(latCity - latUser);
  const p2 =
    Math.cos(latUser) * Math.cos(latCity) * (1 - Math.cos(lngCity - lngUser));
  const d = 2 * R * Math.asin(Math.sqrt((p1 + p2) / 2));
  return Math.round(d / 1000);
};

/**
 * Calculates the distance between two geographic points using the Haversine formula.
 * @param location1 First location with latitude and longitude.
 * @param location2 Second location with latitude and longitude.
 * @returns Distance between the two points in kilometers, rounded to 3 decimal places.
 */
export function haversineDistanceAI(
  location1: Location,
  location2: Location
): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers

  const φ1 = toRadians(location1.latitude);
  const φ2 = toRadians(location2.latitude);
  const Δφ = toRadians(location2.latitude - location1.latitude);
  const Δλ = toRadians(location2.longitude - location1.longitude);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return Math.round(distance);
}
