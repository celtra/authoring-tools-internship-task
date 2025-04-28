import { ref } from "vue";
import Globe from "globe.gl";
import { markerSvg } from "../utils/marker";
import notoSans from "../assets/Noto Sans_Regular.typeface.json";

export function useGlobeInstance(
  containerRef: any,
  userLocation: any,
  currentLocation: any,
  filteredCities: any,
  distancesMine: any,
  cityStore: any,
  updateCurrentLocation: (loc: { latitude: number; longitude: number }) => void,
  size: any
) {
  const globeInstance = ref<any>(null);
  const zoomTimeout = ref<number | null>(null);

  function initGlobe() {
    if (!containerRef.value) return;

    globeInstance.value = new Globe(containerRef.value)
      .globeImageUrl(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
      )
      .backgroundColor("rgba(0,0,0,0)")
      .bumpImageUrl(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      )
      .height(size.value)
      .width(size.value);

    globeInstance.value.controls().autoRotate = true;
    globeInstance.value.controls().autoRotateSpeed = 0.6;

    globeInstance.value.pointOfView({
      lat: userLocation.value?.latitude,
      lng: userLocation.value?.longitude,
      altitude: 1.5,
    });

    const minZoom = 0.5;
    const maxZoom = 2.5;
    globeInstance.value.controls().addEventListener("change", () => {
      const pov = globeInstance.value.pointOfView();
      if (pov.altitude < minZoom) {
        globeInstance.value.pointOfView({ altitude: minZoom }, 0);
      } else if (pov.altitude > maxZoom) {
        globeInstance.value.pointOfView({ altitude: maxZoom }, 0);
      }
    });

    updateLabels();
  }

  function zoomToLocation(lat: number, lng: number, altitude = 0.65) {
    if (!globeInstance.value) return;
    if (zoomTimeout.value) {
      clearTimeout(zoomTimeout.value);
      zoomTimeout.value = null;
    }

    globeInstance.value.controls().autoRotate = false;
    globeInstance.value.pointOfView({ lat, lng, altitude }, 1000);

    zoomTimeout.value = window.setTimeout(() => {
      if (globeInstance.value) {
        globeInstance.value.controls().autoRotate = true;
        globeInstance.value.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
      }
      zoomTimeout.value = null;
    }, 3000);
  }

  function updateLabels() {
    if (!globeInstance.value || !filteredCities.value.length) return;

    const citiesWithDistance = filteredCities.value.map((city: any) => {
      const distance =
        distancesMine.value?.[
          cityStore.citiesList.findIndex((c: any) => c.name === city.name)
        ] ?? null;

      const isCurrentLoc =
        currentLocation.value &&
        city.lat === currentLocation.value.latitude &&
        city.lng === currentLocation.value.longitude;

      return {
        lat: city.lat,
        lng: city.lng,
        name: isCurrentLoc
          ? `You are in ${city.name}`
          : distance !== null
          ? `${city.name}`
          : city.name,
        toolTipText: isCurrentLoc
          ? `You are in ${city.name}`
          : distance !== null
          ? `${city.name} - ${distance} km`
          : city.name,
        size: city.hasMagnet ? 0.45 : 0.4,
        color: isCurrentLoc ? "red" : city.hasMagnet ? "yellow" : "white",
      };
    });

    const locationLabels = [];
    if (userLocation.value) {
      locationLabels.push({
        lat: userLocation.value.latitude,
        lng: userLocation.value.longitude,
        name: "Your location",
        toolTipText: "Your location",
        size: 0.45,
        color: "cyan",
      });
    }

    globeInstance.value
      .labelsData([...citiesWithDistance, ...locationLabels])
      .htmlElementsData([...citiesWithDistance, ...locationLabels])
      .htmlElement((d: any) => {
        const el = document.createElement("div");
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size * 25}px`;
        el.style.transition = "opacity 250ms";
        el.style.cursor = "pointer";
        return el;
      })
      .htmlElementVisibilityModifier((el: any, isVisible: boolean) => {
        el.style.opacity = isVisible ? 1 : 0;
      })
      .htmlAltitude(0.015)
      .labelText("name")
      .labelSize("size")
      .labelLabel("toolTipText")
      .labelColor("color")
      .labelDotRadius(0.01)
      .labelAltitude(0.015)
      .labelResolution(2)
      .labelsTransitionDuration(0)
      .onLabelClick((d: any) => {
        updateCurrentLocation({ latitude: d.lat, longitude: d.lng });
        zoomToLocation(d.lat, d.lng);
      })
      .labelTypeFace(notoSans);
  }

  return {
    globeInstance,
    zoomToLocation,
    initGlobe,
    updateLabels,
  };
}
