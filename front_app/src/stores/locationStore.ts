import { defineStore } from "pinia";
import { ref } from "vue";
import type { Location } from "../types/Location";

export const useLocationStore = defineStore("location", () => {
  const userLocation = ref<Location | null>(null);
  const currentLocation = ref<Location | null>(null);
  const locationError = ref<string>("");
  const loadingLocation = ref(false);

  const getUserLocation = () => {
    loadingLocation.value = true;
    locationError.value = "";

    if (!navigator.geolocation) {
      locationError.value = "Geolocation not supported";
      loadingLocation.value = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: Location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        userLocation.value = coords;
        currentLocation.value = coords;
        loadingLocation.value = false;
      },
      (err) => {
        locationError.value = err.message;
        loadingLocation.value = false;
      }
    );
  };

  const updateCurrentLocation = (location: Location) => {
    currentLocation.value = location;
  };

  return {
    userLocation,
    currentLocation,
    locationError,
    loadingLocation,
    getLocation: getUserLocation,
    updateCurrentLocation,
  };
});
