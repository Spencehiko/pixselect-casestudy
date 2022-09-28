<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { apiGetMovieDetails, apiGetMovieCredits } from "@/requests";
import { IMAGE_URL } from "@/constants";
import moment from "moment";

const store = useMainStore();
const { movieDetailId } = storeToRefs(store);
const { isFavourite, removeFromFavourites, addToFavourites } = store;

const genres = ref([] as any);
const details = ref([] as any);
const credits = ref([] as any);
const director = ref([] as any);
const writers = ref([] as any);
const cast = ref([] as any);

const getTimeFromMins = (mins: number) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "h " + minutes + "m";
};

onMounted(async () => {
    const movieDetails = await apiGetMovieDetails(movieDetailId.value);
    const movieCredits = await apiGetMovieCredits(movieDetailId.value);
    details.value = movieDetails;
    credits.value = movieCredits;
    genres.value = movieDetails.genres;
    director.value = movieCredits.crew.filter((credit: any) => credit.job === "Director");
    writers.value = movieCredits.crew.filter((credit: any) => credit.job === "Writer");
    cast.value = movieCredits.cast.splice(0, 3);
});
</script>

<template>
    <div v-if="details">
        <div class="flex flex-row gap-10 my-5 sm:flex-wrap">
            <div class="flex flex-col">
                <span class="font-bold text-5xl text-left">{{ details.title }}</span>
                <span class="mt-1 text-gray-300"
                    >Movie released on
                    <span v-if="details.release_date">{{ moment(details.release_date).format("DD/MM/YYYY") }}</span>
                    <span v-else>N/A</span>
                </span>
                <span v-if="details.runtime" class="text-gray-300">Duration: {{ getTimeFromMins(details.runtime) }}</span>
            </div>
            <div class="ml-auto flex flex-row gap-20">
                <div class="flex flex-col items-center">
                    <span class="text-lg">RATING</span>
                    <span
                        v-if="details.vote_average"
                        class="font-bold mt-1"
                        :class="[
                            { 'text-red-700': details.vote_average < 5 },
                            { 'text-yellow-500': details.vote_average > 5 && details.vote_average < 8 },
                            { 'text-green-500': details.vote_average >= 8 },
                        ]"
                        >{{ details.vote_average.toFixed(2) }}<span> / 10</span></span
                    >
                    <span v-else class="font-bold mt-3">N/A</span>
                    <span class="text-gray-400">{{ details.vote_count }} Votes</span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="text-lg text-center">FAVOURITE</span>
                    <button v-if="isFavourite(details.id)" @click="removeFromFavourites(details.id)" class="flex justify-start w-12 mt-1">
                        <img src="@/assets/heart-filled.png" />
                    </button>
                    <button v-else @click="addToFavourites(details)" class="flex justify-start w-12 mt-1">
                        <img src="@/assets/heart-empty.png" />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-row">
            <div class="block flex-col gap-3 w-60 sm:flex">
                <img :src="details.poster_path ? IMAGE_URL + details.poster_path : '/default.png'" class="rounded-lg w-60 h-80" :alt="details.title" />
                <blockquote v-if="details.tagline" class="text-xl italic font-semibold text-gray-400">
                    <svg aria-hidden="true" class="w-10 h-10 text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                        />
                    </svg>
                    <p>{{ details.tagline }}</p>
                </blockquote>
            </div>
            <div class="flex flex-col px-5 w-full sm:w-3/4 sm:px-20">
                <div v-if="genres.length" class="flex flex-row gap-2 mb-5 flex-wrap">
                    <span v-for="genre in genres" :key="genre.id" class="px-5 border border-gray-400 rounded-full bg-gray-600">
                        {{ genre.name }}
                    </span>
                </div>
                <span class="border-b border-gray-400 pb-4">{{ details.overview }}</span>
                <div class="flex flex-row flex-wrap gap-5 py-4 items-center border-b border-gray-400">
                    <span class="font-bold text-lg w-20">Director: </span>
                    <div v-for="(directorInfo, index) in director" :key="index" class="flex flex-row gap-2 items-center">
                        <img :src="directorInfo.profile_path ? IMAGE_URL + directorInfo.profile_path : '/user.png'" :alt="directorInfo.name" class="w-12 h-12 rounded-full" />
                        <span class="text-lg">{{ directorInfo.name }}</span>
                    </div>
                    <span v-if="!director.length">N/A</span>
                </div>
                <div class="flex flex-row flex-wrap gap-5 py-4 items-center border-b border-gray-400">
                    <span class="font-bold text-lg w-20">Writers: </span>
                    <div v-for="(writerInfo, index) in writers" :key="index" class="flex flex-row gap-2 items-center">
                        <img :src="writerInfo.profile_path ? IMAGE_URL + writerInfo.profile_path : '/user.png'" :alt="writerInfo.name" class="w-12 h-12 rounded-full" />
                        <span class="text-lg">{{ writerInfo.name }}</span>
                        <span v-if="writers.length > 1 && index !== writers.length - 1" class="mx-2 my-auto">⬤</span>
                    </div>
                    <span v-if="!writers.length">N/A</span>
                </div>
                <div class="flex flex-row flex-wrap gap-5 py-4 items-center border-b border-gray-400">
                    <span class="font-bold text-lg w-20">Stars: </span>
                    <div v-for="(castInfo, index) in cast" :key="index" class="flex flex-row gap-2 items-center">
                        <img :src="castInfo.profile_path ? IMAGE_URL + castInfo.profile_path : '/user.png'" :alt="castInfo.name" class="w-12 h-12 rounded-full" />
                        <span class="text-lg">{{ castInfo.name }}</span>
                        <span v-if="cast.length > 1 && index !== cast.length - 1" class="hidden mx-2 my-auto sm:block">⬤</span>
                    </div>
                    <span v-if="!cast.length">N/A</span>
                </div>
            </div>
        </div>
    </div>
</template>
