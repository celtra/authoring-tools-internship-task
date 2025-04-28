import { ref } from "vue";
import { defineStore } from "pinia";
import { type Magnet } from "../types/ExternalData";
import { fetchMagnets } from "../functions/data";

export const useMagnetStore = defineStore("magnet", () => {
  const magnetList = ref<Magnet[]>([]);

  const getMagnets = async () => {
    try {
      magnetList.value = await fetchMagnets();
    } catch (err) {
      console.error("Failed to fetch magnets: ", err);
    }
  };
  return { magnetList, getMagnets };
});
