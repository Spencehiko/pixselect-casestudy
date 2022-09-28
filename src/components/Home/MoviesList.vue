<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { apiGetPopularMovies, apiSearchMovies } from "@/requests";
import { IMAGE_URL } from "@/constants";

import { ElPagination } from "element-plus";
import moment from "moment";

const store = useMainStore();
const { moviesList, isLoading, totalPages, pageNumber, searchQuery, movieDetailId } = storeToRefs(store);
const { updateMoviesList, startLoading, endLoading } = store;

const handlePageChange = async (newPage: number) => {
    pageNumber.value = newPage;
    startLoading();
    let response;
    if (!searchQuery.value.length) {
        response = await apiGetPopularMovies();
    } else {
        response = await apiSearchMovies();
    }
    updateMoviesList(response);
    endLoading();
};

const goToDetailsPage = (movieId: number) => {
    window.location.href = "/movie/" + movieId;
};

onMounted(async () => {
    if (moviesList.value.length === 0) {
        startLoading();
        pageNumber.value = 1;
        const response = await apiGetPopularMovies();
        updateMoviesList(response);
        endLoading();
    }
});
</script>

<template>
    <div class="flex justify-center items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" v-if="isLoading">
        <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
        <span class="text-gray-200">Loading...</span>
    </div>
    <div :class="{ 'blur-sm pointer-events-none select-none': isLoading }">
        <table class="w-full text-white border-t border-white overflow-scroll">
            <tr class="border-b my-1">
                <td class="w-52 pl-5">Image</td>
                <td>Title</td>
                <td class="text-right">Release Date</td>
                <td class="text-right pr-5">Vote Average</td>
            </tr>
            <tr v-for="(movie, index) in moviesList" :key="index" class="border-b my-1">
                <td><img :src="movie.poster_path ? IMAGE_URL + movie.poster_path : 'default.png'" class="rounded-lg w-28 h-24 pl-5 py-2" /></td>
                <td>
                    <button class="font-bold text-ellipsis" @click="goToDetailsPage(movie.id)">{{ movie.title }}</button>
                </td>
                <td class="text-right">
                    <div>{{ moment(movie.release_date).format("DD/MM/YYYY") }}</div>
                </td>
                <td class="text-right pr-5">
                    <span v-if="movie.vote_count !== 0">{{ movie.vote_average + "/10" }}</span>
                    <span v-else>N/A</span>
                </td>
            </tr>
        </table>
    </div>
    <el-pagination
        class="flex justify-center mt-10"
        :class="{ 'blur-sm pointer-events-none select-none': isLoading }"
        background
        layout="prev, pager, next"
        :total="totalPages * 20"
        :page-size="20"
        :hide-on-single-page="true"
        :current-page="pageNumber"
        @current-change="handlePageChange"
    />
</template>
