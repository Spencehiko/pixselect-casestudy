<script setup lang="ts">
import SearchBar from "@/components/Home/SearchBar.vue";
import MoviesList from "@/components/Home/MoviesList.vue";
import HeaderButtons from "@/components/HeaderButtons.vue";
</script>

<template>
    <main class="py-10 px-20">
        <HeaderButtons :isAtHome="true" />
        <SearchBar />
        <MoviesList />
    </main>
</template>
