<script setup>
import TopNav from "../components/TopNav.vue";
import {onMounted, ref} from "vue";
import {useMediaControls} from "@vueuse/core";
import {musicStore} from "../stores/MusicStore";

const store = musicStore();
const audio = ref(document.getElementById('musicRoot'))
const {playing} = useMediaControls(audio);

onMounted(() => {
  playing.value = store.playing;
})

const togglePlayArrowById = (el) => {
  if (playing.value) {
    return store.music[store.currentMusic].name === el.name ? 'pause' : 'play_arrow'
  }
  else {
    return 'play_arrow';
  }
}
</script>

<template>
  <top-nav class="nav"/>
  <div class="frame">
    <div class="favorite-music">
      <div class="music"
           v-for="(music, index) in store.music"
           :class="playing ?
               store.music[store.currentMusic].name === music.name ? 'active' : '' : ''"
      >
        <div class="music-picture" :style="`background-image: url('${music.image}');`">
          <button
              class="material-symbols-outlined"
              @click="
                    store.currentMusic = index;
                    playing = !playing
                  "
          >
            {{ togglePlayArrowById(music) }}
          </button>
        </div>
        <p class="music-name">
          {{music.name}}
        </p>
        <p class="music-singer">
          {{music.singer}}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  background-color: #000000;
  z-index: 1;
}
.frame {
  margin-top: 65px;
  margin-bottom: 35px;
  width: 100%;
  padding: 0 20px;

  .favorite-music {
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;

    .music {
      background-color: #181818;
      width: 14.5%;
      aspect-ratio: 1/1.25;
      padding: 15px;
      border-radius: 10px;
      transition: 0.2s ease;

      &:hover {
        background-color: #2c2c2c;

        .music-picture button {
          opacity: 1;
          transform: translateY(0px);
        }
      }

      .music-picture {
        position: relative;
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 10px;
        background-size: cover;
        background-position: center;

        button {
          opacity: 0;
          position: absolute;
          background-color: rgb(43, 210, 104);
          border-radius: 50%;
          border: none;
          bottom: 12px;
          right: 12px;
          font-size: 1.5rem;
          color: #000000;
          padding: 10px;
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
          transition: 0.2s;
          transform: translateY(5px);

          &:hover {
            padding: 11px;
          }
        }
      }

      .music-name {
        height: 23px;
        margin-top: 10px;
        overflow:hidden;
        white-space:nowrap;
        width: 160px;
        text-overflow: ellipsis;
        font-weight: 700;
        font-size: 1.1rem;

      }

      .music-singer {
        transition: 0.2s ease;
        font-weight: 500;
        font-size: .85rem;
        color: #868686;
      }
    }

    .active {
      background-color: #2BD268;

      &:hover {
        background-color: #2BD268;
      }

      .music-picture button {
        background-color: #1f1f1f;
        color: #FFFFFF;

        :hover {
          background-color: #000000;
          scale: (1.1);
        }
      }

      .music-singer {
        color: #FFFFFF;
      }
    }
  }
}
</style>