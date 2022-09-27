<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { apiSearchMovies, apiGetPopularMovies } from "@/requests";

const store = useMainStore();
const { searchQuery, isLoading, pageNumber } = storeToRefs(store);
const { startLoading, endLoading, updateMoviesList } = store;
const searchMovies = async () => {
    startLoading();
    let response;
    if (!searchQuery.value.length) {
        pageNumber.value = 1;
        response = await apiGetPopularMovies();
    } else {
        pageNumber.value = 1;
        response = await apiSearchMovies();
    }
    updateMoviesList(response);
    endLoading();
};
</script>

<template>
    <div class="relative mb-10">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
        <input
            v-model="searchQuery"
            class="block p-4 pl-10 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:border-blue-500"
            placeholder="Search Movies"
            required
        />
        <button :disabled="isLoading" @click="searchMovies" class="absolute text-white font-medium rounded-lg text-sm px-4 py-2 right-2.5 bottom-2.5 bg-blue-500 outline-none hover:bg-blue-600">
            Search
        </button>
    </div>
</template>
