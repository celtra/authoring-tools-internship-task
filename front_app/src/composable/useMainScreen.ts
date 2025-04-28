import { ref, computed, onMounted } from "vue";
import { useCitiesStore } from "../stores/cityStore";
import { useLocationStore } from "../stores/locationStore";
import { storeToRefs } from "pinia";

import type Globe from "../components/Globe.vue";
import type { Location } from "../types/Location";

export function useMainScreen() {
  const citiesStore = useCitiesStore();
  const locationStore = useLocationStore();

  const loading = ref(true);
  const fetchError = ref<string | null>(null);

  const { showOnlyWithMagnets } = storeToRefs(citiesStore);

  const isLoading = computed(
    () => loading.value || locationStore.loadingLocation
  );
  const showRetryLocation = computed(() => !!locationStore.locationError);
  const userLocation = computed(() => locationStore.userLocation);

  const globeRef = ref<InstanceType<typeof Globe> | null>(null);

  const handleZoomToLocation = (location: Location) => {
    globeRef.value?.zoomToLocation(location.latitude, location.longitude);
  };

  function handleUseMyLocation() {
    const loc = userLocation.value;
    if (!loc) return;

    locationStore.updateCurrentLocation(loc);
    handleZoomToLocation(loc);
  }

  async function init() {
    loading.value = true;
    fetchError.value = null;

    try {
      locationStore.getLocation();
    } catch (err) {
      fetchError.value = "Failed to load cities.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(init);

  return {
    loading,
    fetchError,
    isLoading,
    showRetryLocation,
    userLocation,
    showOnlyWithMagnets,
    globeRef,
    handleZoomToLocation,
    handleUseMyLocation,
    locationStore,
  };
}
