<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { RouterView, useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();

const store = useMainStore();
const { movieDetailId } = storeToRefs(store);

watch(
    () => route.params.movieId,
    (newValue) => {
        if (newValue) {
            movieDetailId.value = newValue as any;
        }
    }
);
</script>

<template>
    <RouterView class="bg-slate-900 w-full min-h-screen" />
</template>
