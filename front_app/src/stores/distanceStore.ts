import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLocationStore } from "./locationStore";
import { useCitiesStore } from "./cityStore";

import {
  haversineDistanceAI,
  haversineDistanceMine,
} from "../functions/distance";

export const useDistanceStore = defineStore("distance", () => {
  const distancesMine = ref<number[]>([]);
  const distancesAI = ref<number[]>([]);

  const locationStore = useLocationStore();
  const cityStore = useCitiesStore();

  const calculateDistances = () => {
    const currentLocation = locationStore.currentLocation;
    const cities = cityStore.citiesList;

    if (!currentLocation || cities.length === 0) return;

    distancesMine.value = cities.map((city) =>
      haversineDistanceMine(currentLocation, {
        latitude: city.lat,
        longitude: city.lng,
      })
    );

    distancesAI.value = cities.map((city) =>
      haversineDistanceAI(currentLocation, {
        latitude: city.lat,
        longitude: city.lng,
      })
    );
  };

  watch(
    () => [locationStore.currentLocation, cityStore.citiesList],
    () => calculateDistances(),
    { deep: true }
  );

  return {
    distancesMine,
    distancesAI,
    calculateDistances,
  };
});
