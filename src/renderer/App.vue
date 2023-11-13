<script setup>
import NavBar from "./components/NavBar.vue";
import MediaPlayer from "./components/MediaPlayer.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {musicStore} from "./stores/MusicStore";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "./router";

const store = musicStore();
const route = useRoute()

const isLoading = ref(false)

onMounted(async () => {
  await store.fetchMainAlbums();
  await store.fetchGlobalMusic();
  await store.checkToken();
  isLoading.value = true;
  store.recentlyPlayed = JSON.parse(localStorage.getItem('last'))
})

watch(route, () => store.checkToken(), {deep: true})

// hello world
</script>

<template>
  <MediaPlayer v-if="$route.name !== 'Authentication'" />
  <NavBar v-if="$route.name !== 'Authentication'" />
  <div style="width: calc(100% - 100px); display: flex; flex-direction: column"
       :style="$route.name !== 'Authentication' ? 'margin-bottom: 80px; margin-top: 30px;' : ''" v-if="isLoading === true">
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
button {
  cursor: pointer;
}
</style>