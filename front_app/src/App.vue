<script setup lang="ts">
import Table from "./components/Table.vue";
import Globe from "./components/Globe.vue";
import { useMainScreen } from "./composable/useMainScreen";

const {
  isLoading,
  fetchError,
  showRetryLocation,
  userLocation,
  locationStore,
  showOnlyWithMagnets,
  globeRef,
  handleZoomToLocation,
  handleUseMyLocation,
} = useMainScreen();
</script>

<template>
  <div class="container">
    <div v-if="isLoading" class="status">Loading...</div>
    <div v-else-if="fetchError" class="status error">{{ fetchError }}</div>

    <div v-else-if="showRetryLocation" class="status error">
      <p>Location error: {{ locationStore.locationError }}</p>
      <p>
        You denied location access. Please allow it in your browser settings and
        try again.
      </p>
    </div>

    <div v-else class="content">
      <div class="main-view">
        <div class="left-container">
          <div class="title-container">
            <h1 class="title">Magnet Miles</h1>
            <p class="description">your travel map, reimagined</p>
          </div>
          <div class="globe-container">
            <div class="controls">
              <button
                class="location-btn"
                v-if="userLocation"
                @click="handleUseMyLocation"
              >
                Use My Location
              </button>

              <label class="switch-container">
                <input type="checkbox" v-model="showOnlyWithMagnets" />
                <span class="slider"></span>
                <span class="switch-text">Filter cities</span>
              </label>
            </div>
            <Globe id="globe" ref="globeRef" />
          </div>
        </div>

        <Table @row-click="handleZoomToLocation" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: white;
}

.description {
  font-size: 1.1rem;
  margin-top: 0;
  color: #fff;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.1rem;
  }
}

.main-view {
  display: flex;
  flex-direction: column;
}

.left-container {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

.globe-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#globe {
  padding-bottom: 4rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.location-btn {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2.5rem;
  height: 3rem;
  width: 16rem;
  cursor: pointer;
  background-color: var(--color-primary);
  box-shadow: 0 0 16px var(--color-primary-light-alpha);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.location-btn:hover {
  background-color: rgb(13, 103, 162);
  box-shadow: 0 0 16px var(--color-primary-light);
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: auto;
}

.switch-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  width: 60px;
  height: 34px;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}

.slider::before {
  content: "";
  position: absolute;
  width: 26px;
  height: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary-light);
}

input:focus + .slider {
  box-shadow: 0 0 10px var(--color-primary-light);
}

input:checked + .slider::before {
  transform: translateX(26px);
}

.switch-text {
  font-size: 1rem;
  color: #fff;
  user-select: none;
}

.location-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.location-info {
  flex-grow: 1;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media screen and (max-width: 1450px) {
  .left-container {
    justify-content: flex-start;
    gap: 2rem;
  }
}

@media (max-width: 1024px) {
  .left-container {
    padding: 0 1rem;
    gap: 1.25rem;
  }

  .main-view {
    flex-direction: column;
    overflow: hidden;
  }

  .main-view > * {
    flex: none;
    min-width: auto;
    overflow: hidden;
  }

  #globe {
    padding-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .main-view {
    flex-direction: row;
    overflow: auto;
  }

  .main-view > * {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .location-btn {
    width: 100%;
    max-width: 12rem;
    height: 2.5rem;
  }

  .switch-container {
    width: 100%;
    justify-content: center;
  }

  .slider {
    width: 45px;
    height: 25px;
    border-radius: 25px;
  }

  .slider::before {
    width: 20px;
    height: 20px;
    bottom: 3px;
  }

  input:checked + .slider::before {
    transform: translateX(16px);
  }
}
</style>
