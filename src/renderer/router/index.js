import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from "../views/SearchView.vue";
import FavoriteView from "../views/FavoriteView.vue";
import PlaylistView from "../views/PlaylistView.vue";
import TracksView from "../views/TracksView.vue";
import AuthView from "../views/AuthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: FavoriteView
    },
    {
      path: '/playlists',
      name: 'Playlist',
      component: PlaylistView
    },
    {
      path: '/tracks',
      name: 'Tracks',
      component: TracksView
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: AuthView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router