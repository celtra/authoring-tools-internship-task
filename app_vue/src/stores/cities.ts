import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { City } from '@/types/types'

// store that stores city (and weather) data
export const useCitiesStore = defineStore('cities', () => {
    const randomCities = ref<City[]>([]) // city objects are saved here

    // Function that fetches data of 25 random countries from json file that is hosted on local server
    // For every country 1 city is selected
    // For every city we fetch weather data based on its coordinates
    const fetchRandomCities = async (randomCountries: string[]) => {
        try {
            const fetchedCities = randomCountries.map(async (country) => {
                // fetch countries from local server
                const countriesRes = await fetch(`http://localhost:3002/cities?country=${country}`)
                const countriesData = await countriesRes.json()

                // get random city from fetched data (same country)
                const randomIndex = Math.floor(Math.random() * countriesData.length)
                const selectedCity = countriesData[randomIndex]

                // fetch weather data for randomly selected city (open-meteo API)
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current=temperature_2m`)
                const weatherData = await weatherRes.json();

                return {
                    id: selectedCity.id,
                    country: selectedCity.country,
                    country_name: selectedCity.country_name,
                    name: selectedCity.name,
                    lat: selectedCity.lat,
                    lng: selectedCity.lng,
                    weather: weatherData.current.temperature_2m
                }
            })
            
            const cities = await Promise.all(fetchedCities)

            console.log(cities)

            // set randomCities to fetched cities array
            randomCities.value = cities
        } catch (error) {
            console.error('Error fetching city data', error)
        }
    }

    return {
        randomCities,
        fetchRandomCities,
    }
})
