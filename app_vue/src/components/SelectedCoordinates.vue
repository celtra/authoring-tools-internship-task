<script setup lang="ts">
import { defineProps } from 'vue'
import { useUserLocationStore } from '@/stores/userLocation'
import type { UserLocation } from '@/types/types'

defineProps<{
    currentLocation: UserLocation // current location -> location from browser or the one selected from table
}>()

const userLocationStore = useUserLocationStore() 

// if you click button Reset location, current coordinates will be reset to initial ones (the ones from browser)
const resetLocation = ():void => {
    userLocationStore.setCurrentCoordinates(
        userLocationStore.initialCoordinates.lat!,
        userLocationStore.initialCoordinates.lng!,
    )
}
</script>

<template>
    <section class="user-coords">
        <h3>Your coordinates</h3>
        <p>{{ currentLocation.lat }}</p>
        <p>{{ currentLocation.lng }}</p>

        <button @click="resetLocation">Reset location</button>
    </section>
</template>

<style scoped>
.user-coords {
    display: flex;
    width: full;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    margin-top: 2rem;
    width: full;
    margin-bottom: 2rem;
}

button {
    background-color: rgb(0, 106, 255);
    border: none;
    padding: 4px 16px;
    color: white;
    border-radius: 1rem;
    cursor: pointer;
}

button:hover {
    background-color: rgb(85, 156, 255);
}

p {
    font-weight: 200;
    margin-top: 0;
}

@media only screen and (max-width: 420px){
    .user-coords {
        font-size: 12px;
}
}
</style>
