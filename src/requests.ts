const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "550629ee2fb422a5df8c8ea1db160f2a";

export const apiGetPopularMovies = () => {
    return fetch(`${API_URL}movie/popular/?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => data);
};

export const apiGetMovieDetails = (movieId: number) => {
    return fetch(`${API_URL}movie/${movieId}/?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => data);
};

export const apiSearchMovies = (query: String = "") => {
    return fetch(`${API_URL}movie/popular/?api_key=${API_KEY}&query=${query}`)
        .then((response) => response.json())
        .then((data) => data);
};
