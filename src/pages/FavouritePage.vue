<script setup lang="ts">
import HeaderButtons from "@/components/HeaderButtons.vue";
import MoviesList from "@/components/Favourites/MoviesList.vue";
</script>

<template>
    <main class="py-10 px-20">
        <HeaderButtons :isAtFav="true" />
        <MoviesList />
    </main>
</template>
