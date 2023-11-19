<script setup>
import {computed, onMounted, ref, watch} from "vue";
import { useMediaControls } from '@vueuse/core'
import {musicStore} from "../stores/MusicStore";

const store = musicStore();

const currentMusic = computed(() => {
  return store.currentMusic
})

const currentAudio = computed(() => {
  return store.music[currentMusic.value]
})

const audio = ref();
const {playing, currentTime, duration, volume} = useMediaControls(audio, {
  src: ref(currentAudio.value.song)
})

const audioVolume = ref(volume.value);

const currentAudioTime = computed(() => {
  let minutes = Math.trunc(currentTime.value / 60) + '';
  let seconds = (currentTime.value % 60).toFixed(0) + '';

  return minutes.padStart(2, 0) + ':' + seconds.padStart(2, 0)
})

const audioDuration = computed(() => {
  let minutes = Math.trunc(duration.value / 60) + '';
  let seconds = (duration.value % 60).toFixed(0) + '';

  return minutes.padStart(2, 0) + ':' + seconds.padStart(2, 0)
})

const DecrementMusicID = () => {
  store.currentMusic !== 0 ? store.currentMusic-- : '';
}

const TogglePlayingValue = () => {
  playing.value = !playing.value;
}

const IncrementMusicID = () => {
  store.currentMusic !== store.music.length-1 ? store.currentMusic++ : ''
}

onMounted(() => {
  volume.value = 0.2;
  audioVolume.value = volume.value * 100;
})

navigator.mediaSession.setActionHandler('previoustrack', () => {
  DecrementMusicID();
})

navigator.mediaSession.setActionHandler('nexttrack', () => {
  IncrementMusicID();
})

watch(currentMusic,
    (value) => {
      useMediaControls(audio, {
        src: ref(currentAudio.value.song)
      });

      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentAudio.value.name,
        artist: currentAudio.value.singer,
        artwork: [
          {
            src: currentAudio.value.image,
            type: "image/png",
            sizes: "500x500"
          }
        ]
      })

      setTimeout(() => {
        playing.value = true;
      }, 30)
    }
)

watch(currentTime,
    () => {
      if (currentTime.value === duration.value) {
        if (store.isShuffled) {
          store.currentMusic = Math.floor(Math.random() * store.music.length)
          return;
        }
        if (store.currentMusic !== store.music.length-1) {
          store.currentMusic++;
        }
      }
    }
)

watch(() => store.music,
    () => {
      useMediaControls(audio, {
        src: ref(currentAudio.value.song)
      });
      setTimeout(() => {
        playing.value = true
      }, 10);
    },
    {deep: true})

watch(audio, (value) => {
  store.audio = value;
}, {deep: true})

document.addEventListener('keyup', event => {
  if (event.code === 'Enter') {
    playing.value = !playing.value
  }
  if (event.code === 'ArrowLeft') {
    DecrementMusicID();
  }
  if (event.code === 'ArrowRight') {
    IncrementMusicID();
  }
})

</script>

<template>
  <keep-alive>
    <audio ref="audio" id="musicRoot">
    </audio>
  </keep-alive>
  <div class="media-player">
    <div class="musicBar">
      <div class="song-info">
        <div class="singer-logo"
             :style="playing ? `animation-play-state: running; background-image: url('${currentAudio.image}');` : `animation-play-state: paused; background-image: url('${currentAudio.image}');`"
        />

        <div class="song-content">
          <h3>{{currentAudio.singer}}</h3>
          <p>{{currentAudio.name}}</p>
        </div>
      </div>

      <div class="controls">
        <button class="material-symbols-rounded"
                @click="DecrementMusicID"
        >
          skip_previous
        </button>
        <button class="material-symbols-rounded" @click="TogglePlayingValue" id="butt">
          {{playing ? "pause" : "play_arrow"}}
        </button>
        <button class="material-symbols-rounded" @click="IncrementMusicID">
          skip_next
        </button>
      </div>

      <div class="music-status">
          <span class="music-current-duration">
            {{currentAudioTime}}
          </span>
        <input type="range" :max="duration" min="0" v-model="currentTime" >
        <span class="music-duration">
            {{audioDuration}}
          </span>
      </div>

      <div class="music-volume">
        <button class="material-symbols-rounded">
          {{ volume ? "volume_up" : "volume_off"}}
        </button>
        <input type="range" max="100" min="0" v-model="audioVolume" @input="volume = audioVolume / 100">
      </div>

      <div class="options">
        <button class="material-symbols-outlined" @click="setFavorite(currentAudio)">
          favorite
        </button>
        <button class="material-symbols-outlined">
          send
        </button>
        <button class="material-symbols-outlined">
          cast
        </button>
        <button class="material-symbols-outlined">
          more_vert
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.media-player {
  border-top: 1px #333333 solid;
  z-index: 2;
  font-family: 'Open Sans', sans-serif;
  position: fixed;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  background-color: #0D0D0D;

  .musicBar {
    height: 80px;
    width: 96.5%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    & > div {
      height: 70%;
    }

    .song-info {
      display: flex;
      align-items: center;
      min-width: clamp(120px, 17vw, 270px);

      .singer-logo {
        display: flex;
        background-size: cover;
        background-position: center;
        height: 90%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        animation: rotate 7s infinite linear;
      }

      .song-content {
        margin-left: 0.7rem;
        display: flex;
        flex-direction: column;
        gap: 2px;
        justify-content: center;

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }

        p {
          font-size: 0.8rem;
          color: #bcbcbc;
        }
      }
    }

    .controls {
      display: flex;
      align-items: center;
      width: 150px;
      justify-content: space-between;
      gap: 10px;

      button {
        font-size: 2rem;
        cursor: pointer;
        border: none;
        background-color: inherit;
      }

      button:nth-child(2) {
        font-size: 1.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        border-radius: 50%;
        height: 100%;
        aspect-ratio: 1/1;
        color: #0D0D0D;
      }
    }

    .music-status {
      margin-left: clamp(30px, 30vw, 45px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 13px;
      width: 100%;

      span {
        width: 41px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #d2d2d2;
      }

      input {
        appearance: none;
        height: 4px;
        width: 100%;
        border-radius: 3px;
        background-color: #484848;
        cursor: pointer;

        &[type=range]::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background-color: #3F3F3F;
        }
        &::-moz-range-thumb {
          width: 0;
          height: 0;
          opacity: 0;
        }
        &::-moz-range-progress {
          height: 100%;
          background-color: #2BD268;
          border-radius: 3px;
        }

        &::-webkit-slider-runnable-track {
          background: #3F3F3F;
          height: 4px;
          border-radius: 2px;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          color: #2BD268;
          background: #2BD268;
          margin-top: calc(2px / 2 - 12px / 2);
          height: 14px;
          width: 14px;
          border-radius: 50%;
        }
      }
    }

    .music-volume {
      margin-left: 40px;
      display: flex;
      gap: 10px;
      align-items: center;

      button {
        background-color: initial;
        border: none;
      }

      input {
        appearance: none;
        height: 4px;
        width: 120px;
        border-radius: 2px;
        background-color: #484848;
        cursor: pointer;

        &[type=range]::-moz-range-track {
          height: 3px;
          border-radius: 3px;
          background-color: #3F3F3F;
        }
        &::-moz-range-thumb {
          width: 0;
          height: 0;
          opacity: 0;
        }
        &::-moz-range-progress {
          height: 100%;
          background-color: #2BD268;
          border-radius: 3px;
        }
        &::-webkit-slider-runnable-track {
          background: #3F3F3F;
          height: 4px;
          border-radius: 2px;
        }

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          color: #2BD268;
          background: #2BD268;
          margin-top: calc(2px / 2 - 12px / 2);
          height: 14px;
          width: 14px;
          border-radius: 50%;
        }
      }
    }

    .options {
      display: flex;
      align-items: center;

      .material-symbols-outlined {
        font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
      }

      @media (max-width: 1500px) {
        & button:not(:last-child) {
          display: none;
        }
        & button:last-child {
          margin: 0 30px;
        }
      }

      button {
        border: none;
        background-color: inherit;
        cursor: pointer;
        margin-left: 35px;
        color: #858585;

        &:last-child {
          color: #FFFFFF;
          font-variation-settings:
              'FILL' 0,
              'wght' 900,
              'GRAD' 0,
              'opsz' 48
        }
      }
    }
  }
}


.bodyActive {
  overflow: hidden;
}


@keyframes rotate {
  0% {
    rotate: 0deg;
  }
  25% {
    rotate: 90deg;
  }
  50% {
    rotate: 180deg;
  }
  75% {
    rotate: 270deg;
  }
  100% {
    rotate: 360deg;
  }
}

@media screen {

}
</style>