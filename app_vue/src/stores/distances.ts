import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLocation } from '@/types/types'
import type { City } from '@/types/types'
import myHaversineDistance from '@/functions/haversineDistance'
import AIHaversineDistance from '@/functions/haversineDistanceAI'

// store that stores calculated distances (my function and ai function)
export const useDistancesStore = defineStore('distances', () => {
    const myDistances = ref<number[]>([]) // distances calculated with my Haversine function
    const aiDistances = ref<number[]>([]) // distances calculated with ai Haversine function

    // update the currently saved distances. Distances are calculated from userCoordinates to cities coordinates -> 25 distances
    const updateDistances = (userCoordinates: UserLocation, cities: City[]) => {
        const myDistancesArray: number[] = []
        const aiDistancesArray: number[] = []

        // loop through every city and based on its coordinates calculate the distance to user coordinates
        for (const city of cities) {
            const lat1 = userCoordinates.lat
            const lng1 = userCoordinates.lng
            const lat2 = city.lat
            const lng2 = city.lng

            // Haversine functions (mine and ai)
            const myDistance = myHaversineDistance(lat1!, lat2!, lng1!, lng2!)
            const AIDistance = AIHaversineDistance(lat1!, lng1!, lat2!, lng2!)

            myDistancesArray.push(myDistance)
            aiDistancesArray.push(AIDistance)
        }

        // set distances
        myDistances.value = myDistancesArray
        aiDistances.value = aiDistancesArray
    }

    return { myDistances, aiDistances, updateDistances }
})
