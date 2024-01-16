<script setup>
import {musicStore} from "../stores/MusicStore";
import {computed, onMounted, ref} from "vue";
import {useMediaControls} from "@vueuse/core";

const store = musicStore();
const {defaultMusic} = store;

const weeklyTracks = computed(() => {
  const object = [...defaultMusic]
  return object.sort((a, b) => b.auditions > a.auditions ? 1 : -1);
})

const audio = ref(document.getElementById('musicRoot'))
const {playing} = useMediaControls(audio)

const filterByAmount = (value) => {
  if (value < 1000000) {
    return (value / 1000) + 'K'
  } else {
    return (value / 1000000).toFixed(1) + 'M'
  }
}

const togglePlayArrowById = (el) => {
  if (playing.value) {
    return store.music[store.currentMusic].name === el.name ? 'pause' : 'play_arrow'
  }
  else {
    return 'play_arrow'
  }
}
onMounted(() => {
  playing.value = store.playing;
})
</script>

<template>
<div class="weekly-tracks">
  <h3>Рекомендуем</h3>

  <div class="container">
    <div class="track" v-for="track in weeklyTracks" :key="track.id">
      <div class="author-pfp" :style="`background-image: url('${track.image}')`" />
      <div class="text">
        <h4>{{track.singer}}</h4>
        <p>{{track.name}}</p>
      </div>
      <div class="spacer-box" />
      <span class="material-symbols-outlined headphone">
        headphones
      </span>
      <span class="auditions">
        {{filterByAmount(track.auditions)}}
      </span>
      <div class="music-hear">
        <span class="material-symbols-outlined">
           favorite
        </span>
        <div class="music">
            <span class="material-symbols-outlined"
                  @click="
                  store.music = store.defaultMusic;
                  store.currentMusic = track.id-1;
                  playing =! playing
                  "
            >
              {{togglePlayArrowById(track)}}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.weekly-tracks {
  flex: 2;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .container {
    width: 100%;
    min-height: 300px;
    background-color: #0D0D0D;
    border: #333333 1px solid;
    border-radius: 20px;
    padding: 23px 22px;

    .track {
      height: 50px;
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 25px;
      }

      .spacer-box {
        margin-left: auto;
      }

      .author-pfp {
        height: 100%;
        aspect-ratio: 1/1;
        background-color: #383838;
        border-radius: 45px;
        background-position: center;
        background-size: cover;
      }

      .text {
        max-width: 240px;
        min-width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        margin-left: 12px;

        h4 {
          font-size: 0.9rem;
          font-weight: 600;
        }

        p {
          font-size: 0.7rem;
          color: #b6b6b6;
        }
      }

      .headphone {
        font-size: 1.1rem;
        margin-right: 3px;
      }

      .auditions {
        font-size: 0.9rem;
      }

      .music-hear {
        margin-left: 15px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 100%;
        background-color: #101010;
        border: 1px #313131 solid;
        border-radius: 45px;
        width: 95px;

        & > span {
          font-size: 1.3rem;
          margin-left: 16px;
          color: #868686;
        }

        span {
          cursor: pointer;
        }

        .music {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          aspect-ratio: 1/1;
          border-radius: 45px;
          outline: 1px #6e6e6e solid;
          margin-left: auto;
          box-sizing: content-box;

          span {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
}
.material-symbols-outlined {
  font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 48
}

@media (max-width: 1400px) {

}
</style>