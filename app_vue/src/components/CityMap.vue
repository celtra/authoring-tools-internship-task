<script setup lang="ts">
    import { onMounted, watch, ref } from 'vue'
    import { useCitiesStore } from '@/stores/cities'
    import { useUserLocationStore } from '@/stores/userLocation'
    import { useDistancesStore } from '@/stores/distances'
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    // stores
    const cityStore = useCitiesStore() 
    const userLocationStore = useUserLocationStore()
    const distancesStore = useDistancesStore()

    // setup for blue marker
    const blueMarker = new L.Icon({
        iconUrl: '/marker.png',
        iconSize: [20, 24],
        iconAnchor: [10, 24],
        popupAnchor: [0, -32],
    })

    // setup for red marker
    const redMarker = new L.Icon({
        iconUrl: '/yourLocationMarker.png',
        iconSize: [20, 24],
        iconAnchor: [10, 24],
        popupAnchor: [0, -32],
    })

    // initializaton
    let cityMarkers: L.Marker[] = []
    let currentLocationMarker: L.Marker
    let map: L.Map

    // function that updates and adds markers to map 
    const updateMarkers = (map: L.Map) => {
        cityMarkers.forEach((marker) => map.removeLayer(marker))
        if (currentLocationMarker) {
            map.removeLayer(currentLocationMarker)
        }

        cityMarkers = []

        // make marker for each city
        cityStore.randomCities.forEach((city, index) => {
            const marker = L.marker([city.lat, city.lng], { icon: blueMarker }).addTo(map).bindPopup(`
                    <p>${city.name}</p>
                    <p>distance: ${distancesStore.myDistances[index]} km</p>
                    <button class='button' data-lat=${city.lat} data-lng=${city.lng}>Select this location</button>
                    `)

            // when a button on marker's popup is clicked, set current coordinates to those binded to that marker
            marker.on('popupopen', () => {
                const button = document.querySelector('.button') as HTMLButtonElement

                button.onclick = () => {
                    const lat = parseFloat(button.dataset.lat!)
                    const lng = parseFloat(button.dataset.lng!)
                    userLocationStore.setCurrentCoordinates(lat, lng)
                }
            })

            cityMarkers.push(marker)
        })

        // add red marker (current location)
        currentLocationMarker = L.marker(
            [userLocationStore.currentCoordinates.lat!, userLocationStore?.currentCoordinates.lng!],
            { icon: redMarker },
        )
            .addTo(map)
            .bindPopup(
                `
                <p>Your selected location</p>
            `,
            )
            .openPopup()
    }

    // add map and markers
    onMounted(() => {
        map = L.map('map').setView([0, 0], 2)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map)

        updateMarkers(map)
    })

    // watch when currentCoordinates change in userLocationStore
    watch(
        () => userLocationStore.currentCoordinates,
        () => {
            if (map) {
                distancesStore.updateDistances(
                    userLocationStore.currentCoordinates,
                    cityStore.randomCities,
                )
                updateMarkers(map)
            }
        },
        { deep: true },
    )
</script>

<template>
    <section class="map-section">
        <div class="map-wrapper">
            <div id="map"></div>
        </div>
    </section>
</template>

<style>
.map-section {
    width: full;
    display: flex;
    justify-content: center;
    height: 600px;
    margin-top: 4rem;
}

.map-wrapper {
    width: 92%;
    border-radius: 1rem;
    overflow: hidden;
}

.button {
    background-color: rgb(0, 106, 255);
    border: none;
    padding: 4px 8px;
    border-radius: 1rem;
    color: white;
    cursor: pointer;
}

.button:hover {
    background-color: rgb(85, 156, 255);
}

#map {
    width: 100%;
    height: 600px;
}

@media only screen and (max-width: 780px) {
    .map-wrapper {
    width: 100%;
    }
}
</style>
