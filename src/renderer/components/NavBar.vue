<script setup>
</script>

<template>
  <div class="titleBar">
    <h3>{{'Spotify - ' + $route.name}}</h3>
  </div>
  <nav>
    <div class="logo">
      <img src="../public/logo.png" alt="">
    </div>

    <router-link to="/">
      <span class="material-symbols-rounded">
        home
      </span>
    </router-link>

    <router-link to="/search">
      <span class="material-symbols-rounded">
        explore
      </span>
    </router-link>

    <router-link to="/favorite">
      <span class="material-symbols-rounded">
        favorite
      </span>
    </router-link>

    <router-link to="/playlists">
      <span class="material-symbols-rounded">
        playlist_play
      </span>
    </router-link>

    <router-link to="/tracks">
      <span class="material-symbols-rounded">
        music_note
      </span>
    </router-link>

    <router-link to="/settings">
      <span class="material-symbols-rounded more">
        more_horiz
    </span>
    </router-link>
  </nav>
</template>

<style lang="scss">
nav {
  top: 40px;
  position: sticky;
  display: flex;
  min-width: 100px;
  flex-direction: column;
  margin-top: 40px;
  height: calc(100vh - 100px);
  overflow: hidden;

  .logo {
    display: flex;
    align-items: center;
    aspect-ratio: 1/0.8;
    margin: 0 auto;
    width: 90%;

    img {
      margin: 0 auto;
      height: 39px
    }
  }

  a, .more {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    aspect-ratio: 1/0.85;
  }

  .material-symbols-rounded {
    font-size: 1.7rem;
    color: rgb(128, 128, 128);
  }

  .router-link-active span {
    color: #FFFFFF;
  }
}

.titleBar {
  z-index: 1;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  top: 0;
  position: fixed;
  background-color: #000000;
  -webkit-app-region: drag;
}
</style>