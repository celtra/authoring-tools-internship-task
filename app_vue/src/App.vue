<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserLocationStore } from '@/stores/userLocation'
import { useCitiesStore } from '@/stores/cities'
import countries from './functions/countries.ts'
import SelectedCoordinates from './components/SelectedCoordinates.vue'
import CityTable from '@/components/CityTable.vue'
import CityMap from '@/components/CityMap.vue'

// stores
const locationStore = useUserLocationStore()
const citiesStore = useCitiesStore()

const loading = ref<boolean>(true) // start loading
const locationDenied = ref<boolean>(false) // flag to show error if user denies

// wrap geolocation in a Promise so we can await it
const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

onMounted(async () => {
    if (navigator.geolocation) {
        try {
            const position = await getUserLocation()
            const { latitude, longitude } = position.coords

            // set user coordinates in store
            locationStore.setInitialCoordinates(latitude, longitude)
            locationStore.setCurrentCoordinates(latitude, longitude)

            // select 25 random countries
            const numberOfCountries: number = countries.length
            const randomCountries: string[] = []

            for (let i = 0; i < 25; i++) {
                const randomIndex = Math.floor(Math.random() * numberOfCountries)
                const randomCountry = countries[randomIndex]
                randomCountries.push(randomCountry)
            }

            // fetch city data
            await citiesStore.fetchRandomCities(randomCountries)

        } catch (err) {
            console.error('Location error:', err)
            locationDenied.value = true
            alert('Sorry, location access was denied.')
        } finally {
            loading.value = false
        }
    } else {
        alert('Geolocation is not supported by this browser.')
        loading.value = false
    }
})
</script>

<template>
    <div v-if="loading">Loading cities ...</div>
    <div v-else-if="locationDenied">Location denied</div>
    <div v-else>
        <SelectedCoordinates :currentLocation="locationStore.currentCoordinates" />
        <CityTable />
        <CityMap />
    </div>
</template>
