import { useCitiesStore } from "../stores/cityStore";
import { useLocationStore } from "../stores/locationStore";
import { useDistanceStore } from "../stores/distanceStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { Location } from "../types/Location";

export function useCityTable(
  emit: (e: "row-click", location: Location) => void
) {
  const citiesStore = useCitiesStore();
  const locationStore = useLocationStore();
  const distanceStore = useDistanceStore();

  const { filteredCities } = storeToRefs(citiesStore);
  const { distancesMine, distancesAI } = storeToRefs(distanceStore);
  const selectedIndex = ref<number | null>(null);

  function onRowClick(city: { lat: number; lng: number }, index: number) {
    selectedIndex.value = index;

    const newLocation: Location = {
      latitude: city.lat,
      longitude: city.lng,
    };

    locationStore.updateCurrentLocation(newLocation);
    emit("row-click", newLocation);
  }

  return {
    filteredCities,
    distancesMine,
    distancesAI,
    selectedIndex,
    onRowClick,
  };
}
