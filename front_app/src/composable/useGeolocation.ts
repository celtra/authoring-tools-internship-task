import { ref } from "vue";

export function useGeolocation() {
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);
  const error = ref<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      error.value = "Geolocation not supported";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude.value = pos.coords.latitude;
        longitude.value = pos.coords.longitude;
        error.value = null;
      },
      (err) => {
        error.value = err.message;
      }
    );
  };

  return {
    latitude,
    longitude,
    error,
    getLocation,
  };
}
