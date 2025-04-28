import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { type City } from "../types/ExternalData";

import { useMagnetStore } from "./magnetStore";
import { fetchCities } from "../functions/data";

export const useCitiesStore = defineStore("city", () => {
  const citiesList = ref<(City & { hasMagnet: boolean })[]>([]);
  const showOnlyWithMagnets = ref(false);

  const filteredCities = computed(() =>
    showOnlyWithMagnets.value
      ? citiesList.value.filter((city) => city.hasMagnet)
      : citiesList.value
  );

  const getCities = async () => {
    try {
      const magnetStore = useMagnetStore();

      await magnetStore.getMagnets();
      const rawCities = await fetchCities();

      const magnetCodes = magnetStore.magnetList.map((m) => m.code);

      citiesList.value = rawCities.map((city) => ({
        ...city,
        hasMagnet: magnetCodes.includes(city.country),
      }));
    } catch (err) {
      console.error("Failed to fetch cities: ", err);
    }
  };

  return { citiesList, getCities, showOnlyWithMagnets, filteredCities };
});
