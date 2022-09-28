import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/pages/HomePage.vue"),
        },
        {
            path: "/movie/:movieId",
            name: "movie",
            component: () => import("@/pages/MoviePage.vue"),
        },
        {
            path: "/favourite",
            name: "favourite",
            component: () => import("@/pages/FavouritePage.vue"),
        },
    ],
});

export default router;
