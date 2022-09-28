<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const store = useMainStore();
const { movieDetailId } = storeToRefs(store);

defineProps(["isAtHome", "isAtFav"]);

const goToHomePage = () => {
    movieDetailId.value = -1;
    window.location.href = "/#/";
};

const goToFavouritesPage = () => {
    window.location.href = "/#/favourite";
};
</script>

<template>
    <div class="w-full flex flex-row mb-16">
        <button v-show="!isAtHome" @click="goToHomePage" class="border p-2 rounded mr-auto">&lt; Return to Home</button>
        <button v-show="!isAtFav" @click="goToFavouritesPage" class="border p-2 rounded ml-auto">Go to Favourites &gt;</button>
    </div>
</template>
