import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types/types'

// store that stores initial and current user location
export const useUserLocationStore = defineStore('userLocation', () => {
    // initial coordinates are the ones that are received from browser (they are not being changed)
    const initialCoordinates = ref<UserLocation>({
        lat: undefined,
        lng: undefined,
    })

    // current coordinates are initially initial coordinates but can then be changed from UI
    const currentCoordinates = ref<UserLocation>({
        lat: undefined,
        lng: undefined,
    })

    const setInitialCoordinates = (lat: number, lng: number) => {
        initialCoordinates.value = { lat, lng }
    }

    const setCurrentCoordinates = (lat: number, lng: number) => {
        currentCoordinates.value = { lat, lng }
    }

    return { initialCoordinates, currentCoordinates, setInitialCoordinates, setCurrentCoordinates }
})
