<script setup>
import {musicStore} from "../stores/MusicStore";
import {useMediaControls} from "@vueuse/core/index";
import {ref} from "vue";

const store = musicStore();
const {albums} = store;

const audio = ref(document.getElementById('musicRoot'))
const {playing} = useMediaControls(audio)

const togglePlayingValue = (value) => {
  if (store.currentPlaylistId === value.id) {
    playing.value =! playing.value;
  }
}


</script>

<template>
  <div class="music-wrap">
    <div
        class="music"
        v-for="album in albums"
        :key="album.id"
        :style="`background-image: url(${album.picture})`"
    >
      <p>{{album.tracksAmount}} Tracks</p>

      <div class="info-playlist">
        <div class="play">
          <button class="material-symbols-rounded"
                  @click="
                  store.music = album.musics;
                  store.currentMusic = 0;
                  store.currentPlaylistId = album.id;
                  togglePlayingValue(album);
          "
          >
            {{store.music == album.musics && playing ?  'pause' : 'play_arrow'}}
          </button>
        </div>
        <div class="text">
          <h3>{{album.name}}</h3>
          <p>{{album.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.music-wrap {
  display: flex;
  max-width: 100%;
  min-width: 80%;
  justify-content: center;
  gap: 25px;
  margin-bottom: 30px;


  .music {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    aspect-ratio: 1/1.3;
    max-width: 270px;
    background-color: #383838;
    border-radius: 50px;
    background-size: cover;
    background-position: center;
    padding: clamp(18px, 2vw, 30px);

    &:nth-child(1) {
      box-shadow: 8px 8px 15px 0 rgba(35, 38, 255, 0.2);
    }
    &:nth-child(2) {
      box-shadow: 8px 8px 15px 0 rgba(220, 34, 90, 0.2);
    }
    &:nth-child(3) {
      box-shadow: 8px 8px 15px 0 rgba(253, 156, 2, 0.2);
    }
    &:nth-child(4) {
      box-shadow: 8px 8px 15px 0 rgba(43, 210, 104, 0.2);
    }


    p {
      font-size: clamp(0.8rem, 1vw, 0.9rem);
      font-weight: 600;
    }

    .info-playlist {
      display: flex;
      align-items: center;
      gap: 12px;

      .play button {
        background-color: #FFFFFF;
        border-radius: 50%;
        border: none;
        height: 50px;
        aspect-ratio: 1/1;
        color: initial;
        font-size: clamp(1.4rem, 2vw, 1.6rem);
      }

      .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h3 {
          font-weight: 500;
          font-size: 1rem;
          line-height: 22px;
        }

        p {
          font-weight: 400;
          line-height: 22px;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>