<script setup lang="ts">
import { useCityTable } from "../composable/useCityTable";
import type { Location } from "../types/Location";

const emit = defineEmits<{
  (e: "row-click", location: Location): void;
}>();

const {
  filteredCities,
  distancesMine,
  distancesAI,
  selectedIndex,
  onRowClick,
} = useCityTable(emit);
</script>

<template>
  <div class="outer-scroll-wrapper">
    <div class="rounded-mask">
      <div class="scrollable-content">
        <table>
          <thead>
            <tr>
              <th class="first-col">City</th>
              <th class="hide">Country</th>
              <th class="hide">Code</th>
              <th class="hide">Coords</th>
              <th>Distance (My)</th>
              <th class="hide">Distance (AI)</th>
              <th class="hide magnet-header">Magnet</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(city, index) in filteredCities"
              :key="city.name + index"
              :class="{ selected: selectedIndex === index }"
              @click="() => onRowClick(city, index)"
            >
              <td class="first-col">{{ city.name }}</td>
              <td class="hide">{{ city.country_name }}</td>
              <td class="hide">{{ city.country }}</td>
              <td class="hide">{{ city.lat }}, {{ city.lng }}</td>
              <td>{{ distancesMine[index] }} km</td>
              <td class="hide">{{ distancesAI[index] }} km</td>
              <td class="hide">{{ city.hasMagnet ? "Yes" : "No" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-scroll-wrapper {
  width: 100%;
  max-height: 93vh;
  margin: 1rem;
  display: flex;
  scrollbar-width: none;
}

.scrollable-content {
  overflow: auto;
  max-height: 90vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollable-content::-webkit-scrollbar {
  height: 0;
}

.rounded-mask {
  position: relative;
  margin: 1rem;
  border-radius: 3rem;
  overflow: hidden;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.9) inset,
    0 0 16px var(--color-primary-light);
}

table {
  min-width: 900px;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  background-color: transparent;
  color: white;
  table-layout: auto;
}

thead {
  position: sticky;
  top: 0;
  background-color: #172f4e;
  z-index: 1;
}

th,
td {
  padding: 1rem 1.5rem;
  text-align: left;
  vertical-align: middle;
  height: 60px;
  max-width: 50px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

th {
  background-color: var(--color-primary-light-alpha);
  color: white;
  font-weight: 600;
}

th:nth-child(3),
td:nth-child(3) {
  width: 2.5rem;
}

tbody tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.07);
}

tbody tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

tbody tr:hover,
tbody tr.selected {
  background-color: rgba(30, 144, 255, 0.3);
  cursor: pointer;
}

/* --- Scrollbar styling --- */
.scrollable-content::-webkit-scrollbar-track {
  background: #2c2c2c;
  border-radius: 32px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 32px;
  transition: background-color 0.3s ease;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

@media (max-width: 1024px) {
  table {
    font-size: 0.9rem;
  }

  .outer-scroll-wrapper {
    margin: 0;
    max-height: 42vh;
  }
}

@media (max-width: 768px) {
  table {
    font-size: 0.85rem;
    min-width: unset !important;
    width: 100%;
    table-layout: fixed;
  }

  .outer-scroll-wrapper {
    max-height: 43vh;
  }

  .hide {
    display: none;
  }
}

@media (max-width: 480px) {
  table {
    font-size: 0.8rem;
  }

  th,
  td {
    height: 30px;
  }

  .outer-scroll-wrapper {
    max-height: 43vh;
  }
}

@media (max-width: 360px) {
  table {
    font-size: 0.75rem;
  }

  .outer-scroll-wrapper {
    max-height: 45vh;
  }
}
</style>
