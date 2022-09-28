import { defineStore } from "pinia";

export const useMainStore = defineStore({
    id: "store",
    state: () => ({
        moviesList: [] as any,
        favouriteMovies: [] as any,
        searchQuery: "" as string,
        totalPages: 0 as number,
        pageNumber: 1 as number,
        isLoading: false as boolean,
        movieDetailId: -1 as number,
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
        isFavourite(movieId: number): boolean {
            return this.favouriteMovies.find((movie: any) => movie.id === movieId) ? true : false;
        },
        removeFromFavourites(movieId: number) {
            this.favouriteMovies = this.favouriteMovies.filter((movie: any) => movie.id !== movieId);
        },
        addToFavourites(response: any) {
            this.favouriteMovies.push(response);
        },
    },
    persist: true,
});
