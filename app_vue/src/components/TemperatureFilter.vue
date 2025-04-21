<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    defineProps<{
        useFilter: boolean, // value that tracks if filter is turned on/off
        toggleUseFilter: () => void, // function that changes filter to on/off
        temperatureValue: number //  changed by slider (input) and displayed in label
    }>()

    // define the emit function to send updates back to the parent
    const emit = defineEmits<{
        (e: 'update:temperatureValue', value: number): void
    }>()

</script>

<template>
    <section class="form-container">
        <form @submit.prevent="toggleUseFilter">
            <label for="temperature-slider">Select temperature: {{ temperatureValue }}°C</label>
            <input
                type="range"
                id="temperature-slider"
                min="-50"
                max="50"
                step="1"
                :value="temperatureValue"
                @input="emit('update:temperatureValue', ($event.target as HTMLInputElement).valueAsNumber)"
            />
            <button type="submit">{{ useFilter ? 'Disable filter' : 'Enable filter'}}</button>
        </form>
    </section>
</template>

<style scoped>
    .form-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 4rem 0 4rem 0;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        width: 25%;
    }
</style>