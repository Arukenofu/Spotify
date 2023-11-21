<script setup>
import NavBar from "./components/NavBar.vue";
import MediaPlayer from "./components/MediaPlayer.vue";
import {onMounted, ref, watch} from "vue";
import {musicStore} from "./stores/MusicStore";
import {useRoute} from "vue-router";
import axios from "axios";
import {UserStore} from "./stores/UserStore";

const store = musicStore();
const route = useRoute();

const isLoading = ref(false)

onMounted(async () => {
  await store.checkToken();
  await store.fetchGlobalMusic();
  await store.fetchMainAlbums();
  UserStore().users = (await axios.get('http://localhost:3000/users')).data.rows
  isLoading.value = true;
  store.recentlyPlayed = JSON.parse(localStorage.getItem('last'));
})

watch(route, () => {
  store.checkToken();
}, {deep: true})
</script>

<template>
  <keep-alive>
    <MediaPlayer v-if="$route.name !== 'Authentication' && $route.name !== 'Settings'" />
  </keep-alive>
  <NavBar v-if="$route.name !== 'Authentication'" />
  <div style="width: calc(100% - 100px); display: flex; flex-direction: column"
       :style="$route.name !== 'Authentication' ? 'margin-bottom: 80px; margin-top: 30px;' : ''" v-if="isLoading === true">
    <router-view>

    </router-view>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
button {
  cursor: pointer;
}
</style>