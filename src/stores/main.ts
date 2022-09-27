import { defineStore } from "pinia";

export const useMainStore = defineStore({
    id: "store",
    state: () => ({
        moviesList: [] as any,
        searchQuery: "" as string,
        totalPages: 0 as number,
        pageNumber: 1 as number,
        isLoading: false as boolean,
    }),
    getters: {},
    actions: {
        startLoading() {
            this.isLoading = true;
        },
        endLoading() {
            this.isLoading = false;
        },
        updateMoviesList(response: any) {
            this.moviesList = response.results;
            this.totalPages = response.total_pages > 500 ? 500 : response.total_pages;
        },
    },
    persist: true,
});
