<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { apiGetMovieDetails } from "@/requests";
import { onMounted, ref } from "vue";

import { IMAGE_URL } from "@/constants";
import moment from "moment";

const store = useMainStore();
const { movieDetailId } = storeToRefs(store);
const { isFavourite, removeFromFavourites, addToFavourites } = store;
const details = ref([] as any);

const goToHomePage = () => {
    movieDetailId.value = -1;
    window.location.href = "/";
};

onMounted(async () => {
    const response = await apiGetMovieDetails(movieDetailId.value);
    details.value = response as any;
});
</script>

<template>
    <button @click="goToHomePage" class="border p-2 rounded text-white">&lt; Return to Home</button>
    <div class="flex flex-row gap-10 text-white mt-5">
        <img :src="details.poster_path ? IMAGE_URL + details.poster_path : 'default.png'" class="rounded-lg w-60 h-80" />
        <div class="flex flex-col gap-5">
            <span class="font-bold text-2xl">{{ details.title }}</span>
            <span>{{ details.overview }}</span>
        </div>
        <div class="flex flex-row gap-3">
            <div class="flex flex-col items-center gap-2 text-center whitespace-nowrap">
                <span class="text-lg">Average Vote</span>
                <span class="font-bold mt-3">{{ details.vote_average.toFixed(2) }}<span> / 10</span></span>
                <span class="text-gray-400 text-sm">{{ details.vote_count }} Votes</span>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="flex flex-col items-center gap-2">
                <span class="text-lg">Favourite</span>
                <button v-if="isFavourite(details.id)" @click="removeFromFavourites(details.id)" class="flex justify-start w-16 mt-3">
                    <img src="@/assets/heart-filled.png" />
                </button>
                <button v-else @click="addToFavourites(details)" class="flex justify-start w-16 mt-3">
                    <img src="@/assets/heart-empty.png" />
                </button>
            </div>
        </div>
    </div>
</template>
