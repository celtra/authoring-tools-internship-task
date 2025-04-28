<template>
  <div class="globe-wrapper" :style="globeStyle">
    <div class="globe" ref="globeContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type CSSProperties } from "vue";
import { useCitiesStore } from "../stores/cityStore";
import { useDistanceStore } from "../stores/distanceStore";
import { useLocationStore } from "../stores/locationStore";
import { storeToRefs } from "pinia";

import { useWindowSize } from "../composable/useWindowSize";
import { useGlobeInstance } from "../composable/useGlobeInstance";

const cityStore = useCitiesStore();
const distanceStore = useDistanceStore();
const locationStore = useLocationStore();
const { currentLocation, userLocation } = storeToRefs(locationStore);
const { filteredCities } = storeToRefs(cityStore);
const { distancesMine } = storeToRefs(distanceStore);

const globeContainer = ref<HTMLElement | null>(null);
const { size } = useWindowSize();

const { zoomToLocation, initGlobe, updateLabels } = useGlobeInstance(
  globeContainer,
  userLocation,
  currentLocation,
  filteredCities,
  distancesMine,
  cityStore,
  locationStore.updateCurrentLocation,
  size
);

const globeStyle = computed<CSSProperties>(() => ({
  width: `${size.value}px`,
  height: `${size.value}px`,
  clipPath: `circle(${size.value / 2}px at ${size.value / 2}px ${
    size.value / 2
  }px)`,
  position: "relative",
  margin: "0 auto",
}));

watch(
  [filteredCities, distancesMine, currentLocation],
  () => {
    updateLabels();
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  await cityStore.getCities();
  initGlobe();
});

defineExpose({
  zoomToLocation,
});
</script>

<style scoped>
.globe-wrapper {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.globe-inner {
  width: 100%;
  height: 100vh;
  max-width: 95vw;
  max-height: 95vh;
  clip-path: circle(50% at 50% 50%);
  position: relative;
}

.globe {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe:hover {
  cursor: pointer;
}

.globe:active {
  cursor: grabbing;
}
</style>
